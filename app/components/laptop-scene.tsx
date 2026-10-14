"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, Lightformer, PresentationControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useMemo, useRef, type MutableRefObject, type RefObject } from "react"
import { SCREEN_PX_H, SCREEN_PX_W } from "./screen-size"

/*
 * Model: "Lenovo ThinkPad Laptop" by masanimations, CC BY 4.0, via Sketchfab.
 * The file has no animation, so the lid (node "Plane_1") is re-parented to a pivot at the hinge
 * and rotated here. Numbers below were measured from the model's world-space bounding boxes.
 *
 * The terminal on the screen is an ordinary DOM element (see boot-hero.tsx). Every frame the four
 * corners of the screen are projected to page pixels and the element gets a matching CSS matrix3d.
 */
const MODEL = "/models/laptop.glb"

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ss = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

const HINGE = new THREE.Vector3(0, 0.04, -0.96)
const LEAN = 0.234 // the lid leans back this far in the model's own pose (radians)
const CLOSED = 1.805 // rotating forward by this much lays the lid flat over the keys
const SCREEN_W = 2.44
const SCREEN_H = 1.48
const SCREEN_CENTER = new THREE.Vector3(0, 0.765, -1.14)
const SCREEN_NORMAL = new THREE.Vector3(0, Math.sin(LEAN), Math.cos(LEAN))
const FOV = 35

const OVERVIEW_POS = new THREE.Vector3()
const OVERVIEW_LOOK = new THREE.Vector3(-0.8, 0.55, -0.3)
const FINAL_POS = new THREE.Vector3()
const LOOK = new THREE.Vector3()

const CORNERS: [number, number][] = [
  [-SCREEN_W / 2, SCREEN_H / 2],
  [SCREEN_W / 2, SCREEN_H / 2],
  [SCREEN_W / 2, -SCREEN_H / 2],
  [-SCREEN_W / 2, -SCREEN_H / 2],
]
const SRC: [number, number][] = [
  [0, 0],
  [SCREEN_PX_W, 0],
  [SCREEN_PX_W, SCREEN_PX_H],
  [0, SCREEN_PX_H],
]

/** Projective map from the DOM rectangle onto four screen points, as the 8 numbers of a homography. */
function homography(src: [number, number][], dst: [number, number][]): number[] {
  const A: number[][] = []
  const b: number[] = []
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i]
    const [u, v] = dst[i]
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y])
    b.push(u)
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y])
    b.push(v)
  }
  const n = 8
  for (let i = 0; i < n; i++) {
    let p = i
    for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r
    ;[A[i], A[p]] = [A[p], A[i]]
    ;[b[i], b[p]] = [b[p], b[i]]
    for (let r = i + 1; r < n; r++) {
      const f = A[r][i] / A[i][i]
      for (let c = i; c < n; c++) A[r][c] -= f * A[i][c]
      b[r] -= f * b[i]
    }
  }
  const h = new Array<number>(n)
  for (let i = n - 1; i >= 0; i--) {
    let s = b[i]
    for (let c = i + 1; c < n; c++) s -= A[i][c] * h[c]
    h[i] = s / A[i][i]
  }
  return h
}

type Props = {
  progress: MutableRefObject<number>
  screenRef: RefObject<HTMLDivElement | null>
  spin: boolean
  visible: boolean
}

useGLTF.preload(MODEL)

const tmp = new THREE.Vector3()
const nrm = new THREE.Vector3()
const ctr = new THREE.Vector3()

function Thinkpad({ progress, screenRef, spin }: Omit<Props, "visible">) {
  const gltf = useGLTF(MODEL)
  const idle = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Group>(null)
  const anchor = useRef<THREE.Group>(null)
  const glow = useRef<THREE.PointLight>(null)

  const { root, pivot } = useMemo(() => {
    const root = gltf.scene.clone(true)
    root.updateMatrixWorld(true)

    const lid = root.getObjectByName("Plane_1")
    const pivot = new THREE.Group()
    pivot.position.copy(HINGE)
    pivot.updateMatrixWorld(true)
    if (lid && lid.parent) {
      lid.updateWorldMatrix(true, false)
      const world = lid.matrixWorld.clone()
      lid.parent.remove(lid)
      const local = pivot.matrixWorld.clone().invert().multiply(world)
      local.decompose(lid.position, lid.quaternion, lid.scale)
      pivot.add(lid)
    }

    // the file has flat colours only: bring them into the warm Warp palette
    const tint: Record<string, [string, number, number]> = {
      "Material.006": ["#5c534a", 0.35, 0.5], // body
      "Material.002": ["#2f2824", 0.2, 0.6], // keys
      "Material.014": ["#9a9086", 0.5, 0.4], // aluminium plate
      "Material.011": ["#9a9086", 0.5, 0.4],
      "Material.012": ["#2c2723", 0.6, 0.5], // stray magenta placeholders
      "Material.013": ["#2c2723", 0.6, 0.5],
      material_0: ["#d9d2c6", 0, 0.6], // key legends
    }
    root.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (!mesh.isMesh) return
      const m = mesh.material as THREE.MeshStandardMaterial
      const t = tint[m.name]
      if (t) {
        m.color.set(t[0])
        m.metalness = t[1]
        m.roughness = t[2]
      }
    })
    return { root, pivot }
  }, [gltf])

  useFrame(({ camera, clock, size }) => {
    const p = progress.current
    const open = ss(0.1, 0.34, p)
    if (lidRef.current) lidRef.current.rotation.x = lerp(CLOSED, 0, open)
    // the screen throws a little mint light onto the keyboard once it is on
    if (glow.current) glow.current.intensity = ss(0.34, 0.55, p) * 2.4

    // slow turntable at the start, fading out as the lid opens
    if (idle.current) idle.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.45 * (1 - ss(0, 0.22, p))

    const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2))
    const aspect = size.width / size.height
    const d = Math.max((SCREEN_H * 1.3) / (2 * tanHalf), (SCREEN_W * 1.2) / (2 * tanHalf * aspect))

    OVERVIEW_POS.set(-0.8, lerp(2.0, 1.55, ss(0, 0.34, p)), lerp(7.0, 5.6, ss(0, 0.34, p)))
    FINAL_POS.copy(SCREEN_CENTER).addScaledVector(SCREEN_NORMAL, d)
    const t = ss(0.36, 0.86, p)
    camera.position.lerpVectors(OVERVIEW_POS, FINAL_POS, t)
    LOOK.lerpVectors(OVERVIEW_LOOK, SCREEN_CENTER, t)
    camera.lookAt(LOOK)

    // pin the DOM terminal onto the screen
    const el = screenRef.current
    const a = anchor.current
    if (!el || !a) return
    camera.updateMatrixWorld()
    a.updateWorldMatrix(true, false)
    const dst: [number, number][] = CORNERS.map(([x, y]) => {
      tmp.set(x, y, 0).applyMatrix4(a.matrixWorld).project(camera)
      return [(tmp.x * 0.5 + 0.5) * size.width, (-tmp.y * 0.5 + 0.5) * size.height]
    })
    nrm.set(0, 0, 1).transformDirection(a.matrixWorld)
    a.getWorldPosition(ctr)
    const facing = nrm.dot(tmp.copy(camera.position).sub(ctr)) > 0
    const h = homography(SRC, dst)
    el.style.transform = `matrix3d(${h[0]},${h[3]},0,${h[6]},${h[1]},${h[4]},0,${h[7]},0,0,1,0,${h[2]},${h[5]},0,1)`
    el.style.opacity = facing ? "1" : "0"
  })

  return (
    <PresentationControls
      global
      enabled={spin}
      snap
      speed={1.4}
      polar={[-0.15, 0.2]}
      azimuth={[-Math.PI / 2.4, Math.PI / 2.4]}
    >
      <group ref={idle}>
        <primitive object={root} />
        <pointLight ref={glow} position={[0, 0.75, -0.15]} color="#ffb38a" intensity={0} distance={4} decay={2} />
        <primitive object={pivot} ref={lidRef}>
          <group
            ref={anchor}
            position={[0, SCREEN_CENTER.y - HINGE.y, SCREEN_CENTER.z - HINGE.z + 0.012]}
            rotation={[-LEAN, 0, 0]}
          />
        </primitive>
      </group>
    </PresentationControls>
  )
}

export default function LaptopScene({ visible, ...props }: Props) {
  return (
    <Canvas
      className="boot__canvas"
      dpr={[1, 1.75]}
      frameloop={visible ? "always" : "never"}
      camera={{ fov: FOV, position: [-0.8, 2.0, 7.0], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 5, -5]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.2} position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer intensity={0.8} position={[5, 2, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Thinkpad {...props} />
      </Suspense>
      <ContactShadows position={[0, -0.11, -0.2]} opacity={0.55} scale={12} blur={2.6} far={3} />
    </Canvas>
  )
}

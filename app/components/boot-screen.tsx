"use client"

import Terminal from "./terminal"

export const KERNEL_LINES = [
  "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-linux-zen root=UUID=… rw quiet",
  "[    0.412038] smpboot: Total of 12 processors activated",
  "[    1.020117] nvme0n1: p1 p2 p3",
  "[  OK  ] Reached target Local File Systems.",
  "[  OK  ] Started Network Manager.",
  "[  OK  ] Started Tailscale node agent.",
  "[  OK  ] Started Docker Application Container Engine.",
  "[  OK  ] Started Beszel agent.",
  "[  OK  ] Started Uptime Kuma.",
  "[  OK  ] Started ntfy server.",
  "[  OK  ] Started SOLEN health checks.",
  "[  OK  ] Finished Restore-test last night's backup.",
  "[  OK  ] Reached target Multi-User System.",
]

/**
 * What the laptop screen shows at each scroll stage.
 * 0 off · 1 firmware · 2 bootloader · 3 kernel and services · 4 login · 5 live terminal.
 * Every line here is decoration for the boot story, not a claim about hardware.
 */
export default function BootScreen({
  stage,
  lines,
  typed,
}: {
  stage: number
  lines: number
  typed: number
}) {
  if (stage === 0) return <div className="screen screen--off" />

  return (
    <div className="screen">
      {stage === 1 && (
        <div className="screen__text">
          <p>SHINNI FIRMWARE 1.0</p>
          <p>Memory test ........ OK</p>
          <p>Detecting boot devices ........ OK</p>
          <p className="screen__dim">Press DEL to enter setup</p>
        </div>
      )}

      {stage === 2 && (
        <div className="screen__text">
          <p className="screen__center">GNU GRUB version 2.12</p>
          <ul className="grub">
            <li className="is-sel">Arch Linux (linux-zen)</li>
            <li>Arch Linux (fallback initramfs)</li>
            <li>Advanced options for Arch Linux</li>
            <li>UEFI Firmware Settings</li>
          </ul>
          <p className="screen__dim">Use the ↑ and ↓ keys to select. Booting the highlighted entry in 3s…</p>
        </div>
      )}

      {stage === 3 && (
        <div className="screen__text screen__log">
          {KERNEL_LINES.slice(0, lines).map((l, i) => (
            <p key={i} className={l.includes("OK") ? "is-ok" : "screen__dim"}>
              {l}
            </p>
          ))}
        </div>
      )}

      {stage === 4 && (
        <div className="screen__text">
          <p>Arch Linux 6.x-zen (tty1)</p>
          <p>&nbsp;</p>
          <p>shinni login: shinni</p>
          <p>Password: {"•".repeat(Math.max(0, Math.round(typed * 10)))}</p>
        </div>
      )}

      {stage === 5 && <Terminal />}
    </div>
  )
}

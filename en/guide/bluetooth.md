# Bluetooth

The Bluetooth panel manages the wireless connection between the keyboard and your hosts (computers, phones and so on): switching between host slots, setting the sleep timeout and resetting pairing information.

::: tip
This panel only appears on keyboards that support Bluetooth (it is defined per keyboard). The host slot list requires keyboard firmware that supports LINK protocol v3 or later; the protocol version is shown in [Device information](./device).
:::

## Battery mode

With the current firmware the battery mode is fixed to "auto" and managed by the firmware according to connection state and power consumption.

## Sleep timeout

The keyboard goes to sleep after a period without activity to save power. The dropdown offers 10, 15 and 30 minutes, or 1, 2, 4 and 8 hours. The sleep behavior that actually applies is decided by the firmware.

## Hosts

The "Hosts" section manages the host slots the keyboard can connect to. Every slot shows its own state:

- **Current** — the host the keyboard is connected to right now
- **Paired** — the slot holds pairing information; click it to switch over
- **Empty** — the slot is not paired yet; use the pairing key combination on the keyboard to pair it

The number of host slots is determined by the firmware. The refresh button in the top right re-reads the state of every slot, which is useful right after pairing a new host with the keyboard's pairing keys.

::: tip
With firmware older than protocol v3, only a single host dropdown is shown and the pairing state of each slot cannot be displayed.
:::

## Pairing

Clicking "reset pairing" clears the Bluetooth pairing information of **every** host slot; you will need to pair them again afterwards.

::: warning
This affects all hosts stored on the keyboard, not just the one currently connected, and it cannot be undone.
:::

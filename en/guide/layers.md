# Layers

## Keymaps and layers

A keymap is an array made of one or more layers. Each layer is itself an array of keycodes that defines what every physical key does.

Layers can be activated and deactivated independently. When several layers are active at the same time they are stacked on top of each other to form the effective layer state. Because active layers are stacked, keys in a higher layer override the same keys in lower layers.

You can assign different keycodes to different layers, which means a single key can output different keycodes depending on the layer — just like the Fn key found on laptops and off-the-shelf keyboards.

## Switching between layers

Layers can be switched in several ways by using layer keys:

- `DF(layer)` - Sets the default layer.

- `MO(layer)` - Momentarily activates a layer. The layer is activated while the key is held and deactivated as soon as it is released.

- `LM(layer, mod)` - Momentarily activates a layer and activates the given `mod` at the same time.

- `LT(layer, kc)` - Momentarily activates a layer while held and sends the keycode on tap. Only layers 0-15 are supported.

- `TG(layer)` - Toggles a layer: it is activated when inactive and deactivated when active.

- `TT(layer)` - Momentarily activates a layer while held, and deactivates it when released (similar to `MO`). If you tap the key repeatedly, the layer toggles on and off (similar to `TG`). By default five consecutive taps are required, but you can change this by defining `TAPPING_TOGGLE` — for example, `#define TAPPING_TOGGLE 2` means only two taps are needed.

- `TO(layer)` - Activates the given layer and deactivates every other layer except the default one. Unlike adding or removing a layer, this completely replaces the active layers, which uniquely lets you replace a higher layer with a lower one. It takes effect when the key is pressed.

- `OSL(layer)` - Momentarily activates a layer until the next key is pressed.

Some layer keys are available out of the box in the keycode menu. If they do not cover what you need, you can also define your own.

## Learn more

[Keymap framework - how to define your keymap](https://github.com/tmk/tmk_core/blob/master/doc/keymap.md) by TMK Core

[Keymap and Layers](https://docs.qmk.fm/keymap#keymap-and-layers) by QMK Firmware

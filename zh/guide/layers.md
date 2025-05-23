# 层

## 键位映射和层

键位映射是由一个或多个层构成的数组。每个层本身也是一个由键值码组成的数组，用于定义每个物理按键对应的操作。

层可被独立激活或禁用。当多个层同时处于激活状态时，它们将叠加组合形成当前生效的层状态。由于激活的层会以堆栈形式叠加，较高层的键位将覆盖较低层的键位。

你可以根据偏好在不同的层上映射不同的键值组合，这意味着可以使用一个按键在不同的层输出不同的键值，就像是我们经常在笔记本电脑或者量产键盘上看到的 FN 键。

## 在层间切换

我们可以通过层按键实现不同方式的层切换：

- `DF(layer)` - 切换默认层。

- `MO(layer)` - 瞬时激活层。按下时激活指定层，一旦释放键，层就会被停用。

- `LM(layer, mod)` - 瞬时激活层，但按下的同时会激活相应的 `mod`。

- `LT(layer, kc)` - 按住时瞬时激活层，并在轻按时发送按键值。仅支持 0-15 的层。

- `TG(layer)` - 切换层，如果层处于非激活状态，则激活它，反之亦然。

- `TT(layer)` - 按住时瞬时激活层，当你松开键时，层将被停用（类似于 `MO` ）。如果您重复轻按键，层将在开启和关闭之间切换（类似于 `TG` ）。默认情况下需要连续轻按5次，但您可以通过定义 `TAPPING_TOGGLE` 来更改此值 - 例如，`#define TAPPING_TOGGLE 2` 表示只需两次轻按即可切换。

- `TO(layer)` - 激活指定层并停用其他所有层（默认层除外）。此功能特殊之处在于，不同于添加/删除一个层，而是完全替换当前的活动层，独特地允许你用较低的层替换较高的层。该功能在按键按下时激活。

- `OSL(layer)` - 瞬时激活层，直到下一个按键被按下。

在键值菜单中我们预制了一部分层按键，你可以直接使用他们，如果这些按键不能满足你的需求，你也可以自定义想要的功能。

## 了解更多

[Keymap framework - how to define your keymap](https://github.com/tmk/tmk_core/blob/master/doc/keymap.md) by TMK Core

[Keymap and Layers](https://docs.qmk.fm/keymap#keymap-and-layers) by QMK Firmware

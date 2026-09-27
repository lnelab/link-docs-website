# Firmware update

We built dedicated flashing tools for keyboards running Marin Firmware.

## Updating over USB

Download [Toolbox-DFU 0.0.1.exe](https://gitee.com/lne-lab/toolbox-dfu/releases/download/0.0.1/Toolbox-DFU%200.0.1.exe)

### Things to know

Please note the following before using the tool:

- The update package does not need to be unpacked.
- Never disconnect the keyboard from the computer while flashing, or the device may be bricked.
- The tool currently only supports Windows 10/11. macOS users need to use a virtual machine or a Windows computer for now.
- If flashing fails, for example because the wrong package was selected, cut the power to the keyboard and start over.

### Steps

1. Open the flashing tool Toolbox-DFU 0.0.1.exe
2. Select the update package
3. Click start
4. Wait for flashing to finish; the device restarts automatically

![dfu-via-usb](/dfu-via-usb.png)

## Updating over Bluetooth (OTA)

::: tip
This feature is still in trial
:::

OTA runs in the browser and supports Windows, macOS and Linux.

### Steps

1. Select the update package (no need to unpack it)
2. Select the device and put it into DFU mode
3. Select the device in DFU mode again, then start the update
4. Wait for the update to finish; the device restarts automatically

![dfu-via-bluetooth](/dfu-via-bluetooth.png)

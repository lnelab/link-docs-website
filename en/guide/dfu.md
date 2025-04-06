# 固件升级

我们针对 Marin Firmware 系列固件开发了相应的固件升级工具。

## 通过 USB 进行固件升级

点击 [Toolbox-DFU 0.0.1.exe](https://gitee.com/lne-lab/toolbox-dfu/releases/download/0.0.1/Toolbox-DFU%200.0.1.exe) 进行下载

### 注意事项

在使用该工具之前请注意以下几点：

- 固件更新包无需解压。
- 升级过程中切勿断开键盘与电脑的连接，否则有变砖的风险。
- 该工具目前仅支持 Windows 10/11 系统，macOS 系统用户请暂时使用虚拟机或者 Windows 系统进行更新。
- 如果烧写发生异常，例如选择了错误的更新包，请切断键盘供电重新开始。

### 操作步骤

1. 打开刷写工具 Toolbox-DFU 0.0.1.exe
2. 选择固件更新包
3. 点击开始烧写
4. 等待烧写完成，设备将自动重启

![dfu-via-usb](/dfu-via-usb.png)

## 通过蓝牙进行固件升级（OTA）

::: tip
该功能目前还处于试用阶段
:::

OTA 功能基于浏览器开发，支持 Windows、macOS 和 Linux 等系统。

### 操作步骤

1. 选择固件更新包（不需要解压）
2. 选择设备，并使设备进入 DFU 模式
3. 再次选择 DFU 模式下的设备，然后开始更新设备
4. 等待更新完成，设备将自动重启

![dfu-via-bluetooth](/dfu-via-bluetooth.png)



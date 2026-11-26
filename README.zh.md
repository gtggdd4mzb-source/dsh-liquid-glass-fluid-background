# 液态玻璃 · 流体背景

这是 [Ink-bai5844 原插件](https://github.com/Ink-bai5844/dsh-liquid-glass-fluid-background) 的维护分支，保留原作者署名与 MIT 许可，由 **gtggdd4mzb-source** 维护。[English](README.md)

**0.3.1** 面向 **DSH 0.2.2-rc.5 桌面端和 Web 端**：提供半透明玻璃表面与 CSS 渐变流体背景，两个效果可以分别开启。渐变背景不是 WebGL 流体模拟，也不包含光学折射。

![DSH 0.2.2-rc.5 实际运行效果](assets/dsh-home.png)
![DSH 中的设置面板](assets/dsh-settings.png)

以上为桌面安装包附带的 DSH 0.2.2-rc.5 Web 前端在干净隔离 profile 中的真实截图。另附的 `preview-light.png` / `preview-dark.png` 来自测试演示页，不是宿主运行截图。

## 安装

请使用当前桌面端附带的 DSH 命令行，避免误用单独安装的旧 CLI：

```sh
dsh plugin --profile desktop add https://github.com/gtggdd4mzb-source/dsh-liquid-glass-fluid-background/releases/download/v0.3.1/dsh-liquid-glass-fluid-background-0.3.1.tgz
```

Web 端把 `desktop` 改为 `web`。首次安装后完全退出并重启 DSH，在右下方打开“液态玻璃”。

包名与插件行 ID 沿用原插件，因此同一 profile 内会替换旧版本。不要同时启用两份；如另一个主题也修改同名颜色令牌，请先停用另一个主题再查看效果。

## 功能

- 玻璃表面、流体背景、背景动画分别开关。
- 隔离、极光、日落、紫雾、海洋、银灰六种配色。
- 模糊 0–40 px、饱和度 100–220%、表面不透明度 10–100%。
- 跟随 DSH 浅深色；支持键盘、Escape 关闭后焦点返回、窄屏设置面板。
- 遵循系统低动态、减少透明度和强制对比色偏好。

设置只保存在当前设备、当前站点的 `dsh.liquid-glass.v1` 中，并兼容旧版数值与开关。存储不可用时本次会话仍可使用。表面不透明度是各材质原始不透明度的倍率，不改变文字或整个应用的不透明度。

## 兼容与卸载

通过 DSH 公开的 `webserver/index-inject` 行协议送达桌面和网页，并用不依赖已删除模块的 `dsh.client` 入口处理停用、重新启用和清理。不修改 DSH 安装文件，也不额外开放服务端口。

停用时会清理自己的样式、面板、标记、监听器、观察器与定时器。仅消费启动注入行的部署需刷新页面或重启应用才会移除效果。保存过的个人偏好会保留；需要清空时删除上述本地存储键。

每次扫描最多检查 1,600 个节点、标记 100 个表面，文字流式更新不会触发全页扫描。后续宿主布局变化可能使部分区域不再呈现玻璃效果。兼容范围限定为已验证的 0.2.2 版本族，未声称验证所有后续 DSH 版本。

插件不会访问网络、会话、文件或凭据，只读取自己的偏好、语言、宿主主题标记与表面样式。当前电脑的其他主题插件组合未作为全覆盖兼容测试；应逐个启用以排查颜色冲突。

## 开发

Node 24.9+，执行 `npm ci`、`npm run check`、`npx playwright install chromium`、`npm run test:browser`、`npm pack`。

`src/client.js` 是浏览器逻辑的唯一源码，构建脚本生成启动载荷与生命周期模块，运行时无额外依赖。仓库提交 `lib/`，直接从 GitHub 安装也有完整产物。验证范围见 [COMPATIBILITY.md](COMPATIBILITY.md)。

## 来源

原作者 **Ink-bai5844**；当前分支重做 0.2.2 加载适配、生命周期、设置面板与发布验证。MIT 许可见 [LICENSE](LICENSE)。这是独立社区插件。

# Compatibility evidence

Validation date: 2026-11-26. Current plugin: **0.4.0**. Target: installed **DeepSeek Harness Desktop 0.2.2-rc.5**, containing **@deepseek-ai/dsh 0.2.2-rc.5** and **@deepseek-ai/cordis 4.1.0**. The unrelated global CLI was 0.1.2-rc.1 and was not used as the target.

Verified:

- Node host tests: exactly one safe classic script per boot table, fresh tables, browserless import, no removed client-runtime imports, lifecycle disposer and bundle manifest.
- Actual target-host Cordis: mount plugin, collect its `webserver/index-inject` row, render using the host's own `renderIndexInjections`, dispose the plugin, and confirm the row listener is gone.
- Clean isolated DSH_HOME: install the tarball using the Desktop-bundled CLI, verify the composed bundle row and installed client hash, start the actual Web frontend, open the Plugins page, and confirm version 0.3.0 and the running component. Disable and re-enable through the host's own switch; verify UI removal and remount with no frontend exceptions. No account or model request was needed.
- Edge headless browser: eleven scenarios covering boot timing, computed surface discovery, independent switches, persistence, keyboard focus, dark theme, reduced motion, forced colors, repeat injection, client disable/re-enable cleanup, invalid settings, cross-window sync, mobile bounds and denied storage. The new regression loads dark host CSS after the skin and also writes an inline base token, then confirms transparency while enabled and the original token on disable.
- Actual native Windows Desktop: upgraded the local plugin, inspected the new controls, restored the defaults, switched light/dark through Harness settings, and toggled the backdrop off/on. The dark center panel now reveals the gradient. No private screenshots or conversations were published for this check.
- Light/dark fixture previews were inspected visually. They are labeled as fixtures, not application screenshots.
- Startup browser checks: seven scenarios cover early/client handoff without duplicate overlays, hard timeout with paused CSS animations, no repeat on plugin remount, persistent startup toggle, replay, Escape/Skip, live dark-theme adoption, scope disposal, reduced-motion autoplay suppression/static replay, and failure isolation. Light/dark startup screenshots were visually inspected.
- Native Windows 0.4.0: the installed client hash matched the built file. Relaunched the actual Desktop application, inspected the startup toggle and replay button, replayed the whale animation on screen, and confirmed it automatically returned to the working application. The user's existing glass preferences were preserved.

Scope: this evidence verifies clean installation, real-host Web startup, native Windows Desktop display, plugin management and browser behavior. It does not claim a tour of every authenticated DSH screen or compatibility with every other installed theme, future Harness version, operating system or browser. Surface detection intentionally has a bounded budget and may leave unmatched regions unstyled.

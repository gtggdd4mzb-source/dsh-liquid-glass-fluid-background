# Changelog

## 0.3.1 — 2026-11-26

- Fix the native Windows dark-theme center panel covering the gradient. The backdrop's base token now overrides later host theme sheets and inline tokens only while enabled.
- Add a regression exercising late dark styles, inline tokens, and restoration on disabling the background.
- Set explicit palette option colors for the native Windows dark-mode dropdown.
- Upgrade and inspect the user's actual native Windows Desktop, including light/dark presentation.

## 0.3.0 — 2026-11-26

- Rebuild package metadata and committed browser artifacts for DSH 0.2.2-rc.5.
- Use the public structured index-inject protocol for early Desktop/Web delivery.
- Add a dependency-free client lifecycle entry for live disable/re-enable cleanup.
- Replace duplicate runtimes safely; clear owned observers, listeners, timers, styles and attributes.
- Keep glass, gradient background and animation controls independent.
- Add six palettes, device-local settings migration, cross-window sync and safe storage fallback.
- Isolate the bilingual settings dialog in a shadow root; support keyboard, mobile, dark mode and accessibility preferences.
- Add reproducible builds, host tests, ten browser scenarios, release checksums and honest fixture previews.

## Earlier versions

The upstream project shipped 0.1.0; this machine also had local-only 0.1.x and 0.2.2-local.1 adaptations. Those are not represented as public releases of this fork.

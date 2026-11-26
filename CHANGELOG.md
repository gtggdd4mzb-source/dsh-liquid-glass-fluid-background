# Changelog

## 0.5.0 — 2026-11-26

- Add Background / Glass / Startup tabs with arrow-key navigation.
- Add four moving color layers, four flow styles, 0.10–3.00× speed, amplitude, color depth and richness.
- Add six palette swatches, four color pickers and HEX inputs; preserve custom palettes across reloads.
- Add rounded-edge SVG backdrop displacement with adjustable strength and pointer highlights; foreground text is unfiltered.
- Bound optical rendering to eight visible material surfaces; restore owned styles, filters and observers on cleanup.
- Verify refraction-only grid pixel changes and exact restoration, invalid saved colors, accessibility and persistence.
- Exercise speed, water flow, custom HEX and low-blur glass on native Windows DSH without exiting running tasks.

## 0.4.0 — 2026-11-26

- Add an optional whale-surfacing startup visual: layered ice-blue vector, perspective rise, specular sweep, waterline, reflection, ripples and droplets, then a fade to the application.
- Preserve the running startup across early boot/client ownership handoff; never replay on skin hot reload.
- Add persistent startup enable and explicit replay controls, Skip/key dismissal, reduced-motion static replay, a hard cleanup timeout and scope cleanup.
- Embed the source whale vector at build time, with no network requests or rendering library.
- Add seven startup browser scenarios, light/dark visual previews and logo source attribution.

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

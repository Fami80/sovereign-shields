## Update JurisdictionRibbon to pill-chip status bar

Refactor `src/components/landing/JurisdictionRibbon.tsx` into a compact pill-chip status bar with the following exact specs:

- Section label: "JURISDICTION STATUS" — DM Sans, 10px, letter-spacing 3px, color rgba(237,216,184,0.5), centered above the chips.
- Single horizontal row of pill chips, centered, `flex-wrap` allowed on mobile.
- Each chip:
  - Background: `rgba(212,168,130,0.08)`
  - Border: `1px solid rgba(212,168,130,0.2)`
  - Border-radius: `100px`
  - Padding: `6px 14px`
  - Content: green status dot (`6px` circle, `#4CAF50`, `margin-right: 6px`) + jurisdiction name
  - Jurisdiction name: DM Sans Medium, `12px`, color `#EDD8B8`
- Chips (in order): **MOHRE, DIFC, ADGM, Free Zones, Cross-border**
- Remove VARA and SCA entirely.
- Gap between chips: `8px`
- Section background: same as surrounding section (no distinct background color).
- No other title text.
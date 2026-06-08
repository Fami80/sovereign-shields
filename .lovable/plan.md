## Goal
Replace the current burgundy "verified-bg" parallax image behind the Exposure Calculator with a new background that matches the reference: dark green glassy dashboard aesthetic with a glowing green verified checkmark, blurred UI panels, and soft bokeh.

## Changes

1. **Generate new background image** (`src/assets/calculator-bg-green.jpg`)
   - Premium imagegen, 1536×1024
   - Prompt: dark emerald/black ambient scene, large softly glowing green circular checkmark badge on the left, blurred translucent dashboard panels in the background, subtle Arabic-script motif faintly visible, cinematic bokeh, depth-of-field, editorial finance feel, no text, no logos

2. **Swap the background in `src/components/landing/ExposureCalculator.tsx`**
   - Replace `verifiedBg` import with the new asset
   - Adjust the dark wash gradient from burgundy `rgba(30,10,14,...)` to a deep green/near-black `rgba(8,18,14,...)` so the calculator card (which stays burgundy `#2D1018`) reads cleanly against the green ambience
   - Keep parallax math, opacity (~0.55), oversize offsets, and reduced-motion handling unchanged

## Out of scope
- No copy/layout changes
- Section structure, card styling, and CTA untouched

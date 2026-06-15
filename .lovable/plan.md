## Hero Image Placement and Sizing Update

Update `src/components/landing/Hero.tsx` to fix image layout across all viewports. No changes to headline, copy, buttons, or background.

### Desktop (>1024px)
- Switch two-column grid breakpoint from `md:` to `lg:` so tablet falls back to single column.
- Replace `lg:items-stretch` with `lg:items-start` — image aligns to top of column and does not stretch below the buttons.
- Set grid gap to `32px` (`gap-8` at `lg:`).
- Desktop image (`lg:flex`): remove mask-image gradient overlay.
- Constrain image to `maxWidth: 300px` (remove `width: 42vw`).
- Apply shared image styles: `objectFit: "cover"`, `objectPosition: "center"`, `borderRadius: "12px"`, `boxShadow: "0 24px 48px rgba(30,10,14,0.4)"`.
- Keep `loading="eager"`.

### Tablet (768px–1024px)
- Image moves below the buttons (single-column layout via `lg:hidden` on the below-buttons image).
- Wrap image in a centered container (`mx-auto`).
- Set `maxWidth: 500px`, `aspectRatio: "16/9"`.
- Apply shared image styles.
- Use `loading="lazy"`.

### Mobile (<768px)
- Image stays below buttons.
- Center with `mx-auto`.
- Set `maxWidth: 400px`, `aspectRatio: "4/3"`.
- Apply shared image styles.
- Keep `loading="lazy"`.

### Safety guard
- Ensure the image is never absolutely positioned and lives in normal document flow so it cannot overlap into `JurisdictionRibbon`.

### Verification
- Preview the homepage at 1920px, 1024px, 768px, and 375px widths to confirm the image is centered, correctly sized, and does not block text or bleed into the next section.
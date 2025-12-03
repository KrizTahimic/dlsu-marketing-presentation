# Marketing Presentation

## Project Purpose
Create HTML/CSS slides for a marketing video about the thesis:
"Mechanistic Interpretability of Code Correctness in LLMs via Sparse Autoencoders"

## Design Reference
- Copy design from `../brochure/` (colors, fonts, gradients)
- CSS variables: `--primary`, `--accent`, `--background`
- Maintain gradient mesh aesthetic from brochure
- Reference `../brochure/brochure.css` for color scheme

## Slide Format
- Aspect ratio: 16:9 (1920x1080px)
- One concept per slide
- Large visuals, minimal text (for spoken voiceover)
- Clean, modern design

## Content Source
- Reuse figures from `../brochure/figures/`
- Adapt brochure text for spoken format
- Key content from brochure:
  - Problem: Polysemanticity in LLMs
  - Solution: SAE-based interpretability
  - Discovery: Correctness asymmetry
  - Applications: Error detection, steering, prompting

## File Structure
- `slides.html` - Main slide deck
- `slides.css` - Styles
- `figures/` - Symlink to brochure figures
- `convert-to-pdf.js` - Export script

## Export Workflow
1. Run `node convert-to-pdf.js screenshot` to generate PNG of each slide
2. Run `node convert-to-pdf.js pdf` to generate multi-page PDF
3. Import to Canva for recording

## Claude Workflow (IMPORTANT)
**After EVERY edit to slides.html or slides.css:**
1. Run `npm run screenshot` to regenerate slide PNGs
2. Show the user the generated screenshots so they can review and give feedback
3. This ensures visual feedback loop for iterative design

# Canada Bilingual Food Label Maker

A single-page web application for creating Canadian-style bilingual nutrition facts labels that comply with Health Canada and CFIA regulations.

![Screenshot](https://github.com/user-attachments/assets/29bf3e04-efcf-42d2-beb5-b5fd0c4ee6ed)

## Features

✅ **Bilingual Nutrition Facts Labels** - Automatically generates labels with both English and French text  
✅ **Live Preview** - See changes instantly as you type  
✅ **Automatic % Daily Value Calculation** - Computes percentages based on Canadian daily values  
✅ **Smart Rounding & Formatting** - Applies CFIA-compliant rounding rules  
✅ **Multiple Templates** - Standard, Simplified, and Dual-column layouts  
✅ **PNG Export** - Download at 1x, 2x, or 3x resolution with white or transparent backgrounds  
✅ **Bilingual UI** - Toggle between English and French interface  
✅ **Client-Side Only** - No server required, runs entirely in your browser  
✅ **Persistent State** - Auto-saves your work in browser local storage  
✅ **Accessible** - Keyboard navigable with proper ARIA labels

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## Usage

1. **Enter Serving Information**
   - Servings per container (optional)
   - Serving size in consumer-friendly format (e.g., "2/3 cup")
   - Metric equivalent (e.g., 55g)

2. **Add Nutrient Values**
   - Enter amounts for calories and macronutrients
   - Add micronutrients (Vitamin D, Calcium, Iron, Potassium)
   - % Daily Values are calculated automatically

3. **Optional Information**
   - Add ingredients list (EN/FR)
   - Include allergen statements
   - Add manufacturer information

4. **Customize Style**
   - Choose template (Standard/Simplified/Dual-column)
   - Adjust panel width
   - Toggle boldness and background transparency

5. **Export**
   - Click "Load Example" to see a sample label
   - Select export scale (1x/2x/3x)
   - Click "Download PNG" to save your label

## Configuration

### Daily Values (`public/config/dv_canada.json`)

Contains reference daily values for nutrients used in % DV calculations. Update this file when Health Canada revises daily values.

### Rounding Rules (`public/config/rules_canada.json`)

Defines how each nutrient should be rounded and displayed according to CFIA regulations:
- Decimal precision for amounts
- Thresholds for showing zero
- Which nutrients show % DV

### Translations (`src/i18n/en.json`, `src/i18n/fr.json`)

UI translations for English and French. The nutrition label itself is always bilingual.

## Architecture

```
src/
├── components/
│   ├── inputs/          # Form input sections
│   ├── preview/         # Label templates
│   ├── atoms/           # Reusable UI components
│   └── export/          # Export controls
├── store/               # Zustand state management
├── lib/                 # Rules engine & calculations
├── types/               # TypeScript interfaces
└── i18n/                # Translations

public/config/           # Configuration files (DV & rules)
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **i18next** - Internationalization
- **html-to-image** - PNG export
- **Vitest** - Unit testing

## Testing

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run specific test file
npm test src/lib/rulesEngine.test.ts
```

## Compliance Notes

This tool generates labels that follow Canadian nutrition labeling regulations, but you should:

1. **Verify daily values** - Ensure `dv_canada.json` contains current Health Canada values
2. **Check rounding rules** - Review `rules_canada.json` against latest CFIA guidance
3. **Validate output** - Always verify generated labels against official requirements
4. **Professional review** - Have labels reviewed by qualified personnel before use

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Updating Nutrition Values

To update daily values when Health Canada changes regulations:

1. Edit `public/config/dv_canada.json`
2. Update the `dv` field for changed nutrients
3. Rebuild the application
4. No code changes required

## Development

### Project Structure

The app follows a clean architecture:

- **State Management**: Zustand store with persistence
- **Rules Engine**: Pure functions for calculations (data-driven)
- **Components**: React components with TypeScript
- **Styling**: Tailwind CSS utilities

### Adding a New Nutrient

1. Add to `types/index.ts` interfaces
2. Update `dv_canada.json` with DV reference
3. Update `rules_canada.json` with formatting rules
4. Add translations to `i18n/en.json` and `i18n/fr.json`
5. Add input field in appropriate section component
6. Add display row in template component

### Adding a New Template

1. Create new template component in `components/preview/`
2. Import and add to `LabelPreview.tsx` switch statement
3. Add template option to translations
4. Add template ID to `TemplateId` type

## Support

For issues or questions, please open an issue on GitHub.

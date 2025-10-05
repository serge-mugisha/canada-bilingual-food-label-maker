# Contributing to Canada Bilingual Food Label Maker

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/canada-bilingual-food-label-maker.git
   cd canada-bilingual-food-label-maker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

## Project Structure

```
src/
├── components/
│   ├── inputs/          # Form components for data entry
│   ├── preview/         # Label template renderers
│   ├── atoms/           # Reusable UI primitives
│   └── export/          # Export/download controls
├── lib/
│   └── rulesEngine.ts   # Core calculation logic (pure functions)
├── store/
│   └── index.ts         # Zustand state management
├── types/
│   └── index.ts         # TypeScript type definitions
└── i18n/                # Translations

public/config/           # Configuration files (editable JSON)
```

## Code Style

- **TypeScript**: Use strict type checking
- **React**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Comments**: Add JSDoc comments for exported functions
- **Tests**: Write tests for new features

## Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit**
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

## Adding a New Nutrient

1. **Update Types** (`src/types/index.ts`)
   ```typescript
   export interface Nutrients {
     // ... existing
     my_nutrient?: NutrientAmount;
   }
   ```

2. **Add Daily Value** (`public/config/dv_canada.json`)
   ```json
   "my_nutrient": {
     "dv": 100,
     "unit": "mg",
     "showPercent": true
   }
   ```

3. **Add Rounding Rules** (`public/config/rules_canada.json`)
   ```json
   "my_nutrient": {
     "amountDecimals": 1,
     "thresholdZero": 0.5,
     "percentDecimals": 0
   }
   ```

4. **Add Translations** (`src/i18n/en.json` and `fr.json`)
   ```json
   "nutrients": {
     "my_nutrient": "My Nutrient"
   }
   ```

5. **Add Input Field** (in appropriate section component)
6. **Add Display Row** (in template component)
7. **Write Tests**

## Adding a New Template

1. **Create Template Component** (`src/components/preview/TemplateMyTemplate.tsx`)
   ```typescript
   export default function TemplateMyTemplate() {
     // Implement layout
   }
   ```

2. **Register Template** (`src/components/preview/LabelPreview.tsx`)
   ```typescript
   case 'my-template':
     return <TemplateMyTemplate />;
   ```

3. **Add to Types** (`src/types/index.ts`)
   ```typescript
   export type TemplateId = 'canada-standard' | 'my-template' | ...;
   ```

4. **Add Translations**

## Testing Guidelines

- Write unit tests for calculation logic
- Test edge cases (zero, negative, very large numbers)
- Test with real nutrition data
- Verify labels match CFIA requirements
- Check accessibility (keyboard navigation, screen readers)

## Pull Request Checklist

- [ ] Code builds without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Linter passes (`npm run lint`)
- [ ] Added tests for new features
- [ ] Updated documentation
- [ ] Tested manually in browser
- [ ] Checked accessibility
- [ ] Follows existing code style

## Questions?

Open an issue on GitHub or start a discussion.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

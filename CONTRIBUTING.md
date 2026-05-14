# 🤝 Contributing to CropChain

Thank you for your interest in contributing to CropChain! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, professional, and collaborative. We're building an educational platform to help farmers.

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB (local or Atlas)
- Phantom wallet (for Solana testing)
- Git

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cropchain.git
   cd cropchain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Frontend
   cp frontend/.env.example frontend/.env.local
   
   # Backend
   cp backend/.env.example backend/.env
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## Development Workflow

### Creating a Feature Branch

```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates
- `test/description` - Test additions

### Making Changes

1. **Write clean, readable code**
   - Follow existing code style
   - Use meaningful variable names
   - Add comments for complex logic
   - Keep functions small and focused

2. **Frontend Guidelines**
   ```typescript
   // ✅ GOOD: Clear, typed component
   interface CropCardProps {
     crop: ICropNFT;
     onMint?: (cropId: string) => void;
   }
   
   export const CropCard: React.FC<CropCardProps> = ({ crop, onMint }) => {
     return (
       <div className="rounded-lg border">
         {/* Component content */}
       </div>
     );
   };
   
   // ❌ AVOID: Loose typing
   export const CropCard = ({ crop }: any) => { ... }
   ```

3. **Backend Guidelines**
   ```typescript
   // ✅ GOOD: Typed controller with error handling
   export const getCrop = asyncHandler(async (req: Request, res: Response) => {
     const { id } = req.params;
     
     if (!id) {
       throw new AppError('Crop ID required', 400);
     }
     
     const crop = await CropNFT.findById(id).populate('farmer');
     if (!crop) {
       throw new AppError('Crop not found', 404);
     }
     
     res.json(crop);
   });
   
   // ❌ AVOID: Untyped, no validation
   export const getCrop = async (req, res) => {
     const crop = await CropNFT.findById(req.params.id);
     res.json(crop);
   };
   ```

4. **TypeScript Best Practices**
   - Define interfaces for all data structures
   - Use strict mode (no `any` unless unavoidable)
   - Use union types instead of string/number enums
   - Document complex types

5. **Testing Your Changes**
   ```bash
   # Build frontend
   npm run build --prefix frontend
   
   # Build backend
   npm run build --prefix backend
   
   # Run seed data
   npm run seed -w backend
   ```

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `style`, `chore`

Examples:
```
feat(auth): add JWT refresh token mechanism

fix(nft): correct metadata URI generation

docs: update deployment guide

refactor(api): extract validation logic to middleware
```

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR with description**
   - What does this PR do?
   - Why is this change needed?
   - How to test?
   - Screenshots (if UI change)

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Breaking change
   
   ## Testing
   How to test this change
   
   ## Checklist
   - [ ] Code follows style guide
   - [ ] All TypeScript types properly defined
   - [ ] No console.log statements
   - [ ] Tests added/updated
   - [ ] Documentation updated
   ```

## Code Review Process

### What We Look For

1. **Code Quality**
   - Readable and maintainable
   - Follows project conventions
   - Proper error handling
   - Security considerations

2. **Testing**
   - Features tested
   - Edge cases handled
   - Existing tests still pass

3. **Documentation**
   - Code commented where needed
   - README updated if needed
   - API docs updated if needed

4. **Performance**
   - No N+1 queries
   - Efficient algorithms
   - Proper caching

5. **Security**
   - No hardcoded secrets
   - Input validation
   - SQL/NoSQL injection prevention

### Review Feedback

- Be open to feedback
- Ask questions if unclear
- Suggest improvements
- Approve and merge when ready

## Bug Reports

### Reporting Bugs

1. **Check existing issues first**
2. **Provide detailed information**
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/logs
   - Environment (OS, Node version, etc.)

3. **Use bug report template**
   ```markdown
   ## Description
   
   ## Steps to Reproduce
   1. ...
   2. ...
   
   ## Expected Behavior
   
   ## Actual Behavior
   
   ## Environment
   - OS:
   - Node version:
   - MongoDB:
   ```

## Feature Requests

### Proposing Features

1. **Discuss first**
   - Create an issue
   - Describe the feature
   - Explain use case
   - Discuss implementation

2. **Get feedback** from maintainers

3. **Implement if approved**

4. **Submit PR** with full implementation

## Architecture & Design

### Folder Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── context/          # React Context
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities & services
│   ├── data/             # Static data & mocks
│   └── styles/           # Global styles
│
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/          # Route definitions
│   ├── models/          # MongoDB schemas
│   ├── middleware/      # Express middleware
│   ├── utils/           # Helper functions
│   ├── validators/      # Input validation
│   ├── config/          # Configuration
│   └── seeds/           # Sample data
```

### Adding New Features

1. **Backend API**
   - Create model (if new data type)
   - Create controller with validation
   - Create routes
   - Test with seed data
   - Document in README

2. **Frontend UI**
   - Create components
   - Add styling with Tailwind
   - Add to layout/pages
   - Add routes if new page
   - Add to context if global state

3. **Blockchain**
   - Test on Devnet first
   - Use Phantom wallet
   - Verify on Solana Explorer
   - Document in comments

## Database Migrations

### Adding New Fields

1. **Update model**
   ```typescript
   export const CropNFTSchema = new Schema({
     // Existing fields...
     newField: { type: String, default: '' },
   });
   ```

2. **Update seed data** if applicable

3. **Run seed script**
   ```bash
   npm run seed -w backend
   ```

4. **Document the change** in PR description

### Data Validation

Use Zod validators:

```typescript
// validators/cropValidators.ts
export const createCropSchema = z.object({
  cropName: z.string().min(3),
  cropType: z.enum(['cereal', 'vegetable', 'spice', 'fruit', 'beverage']),
  location: z.string().min(5),
});
```

## Testing Guidelines

### Unit Tests (Future)

```bash
npm run test:unit
```

### Integration Tests (Future)

```bash
npm run test:integration
```

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Works with different browsers
- [ ] Error cases handled
- [ ] Loading states visible

## Documentation

### Updating README

- Update if features change
- Add new sections if needed
- Keep examples current
- Add troubleshooting if needed

### Updating API Docs

```typescript
/**
 * Create a new crop
 * @route POST /api/crops
 * @param {string} cropName - Name of the crop
 * @param {string} cropType - Type of crop
 * @returns {ICropNFT} Created crop
 * @throws {Error} 400 - Invalid input
 * @throws {Error} 401 - Not authenticated
 */
```

### Adding Comments

```typescript
// ✅ GOOD: Explain WHY not WHAT
// We filter out deleted crops because deleted=true indicates
// soft-deleted records that shouldn't appear in listings
const activeCrops = crops.filter(c => !c.deleted);

// ❌ AVOID: Obvious comments
// Get all crops
const crops = await Crop.find();
```

## Performance Optimization

### Backend

- Use database indexes
- Implement pagination
- Cache frequently accessed data
- Optimize queries
- Use connection pooling

### Frontend

- Lazy load routes
- Memoize expensive computations
- Optimize images
- Tree-shake unused code
- Monitor bundle size

## Security

### Input Validation

```typescript
// Always validate input
const { error, data } = schema.safeParse(req.body);
if (error) throw new AppError('Invalid input', 400);
```

### Environment Variables

- Never commit `.env` files
- Add to `.gitignore`
- Document in `.env.example`
- Use in code: `process.env.VARIABLE_NAME`

### Authentication

- Use JWT tokens
- Hash passwords with bcryptjs
- Validate tokens on protected routes
- Implement role-based access

## Getting Help

- **Discord/Community**: [Link if available]
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: [Contact if available]

## Licensing

By contributing, you agree that your contributions are licensed under the project's license (MIT).

## Recognition

Contributors are recognized in:
- GitHub contributors page
- CONTRIBUTORS.md file
- Release notes

---

Thank you for contributing to CropChain! 🌾✨

Together, we're building a better system for crop tracking and authentication.

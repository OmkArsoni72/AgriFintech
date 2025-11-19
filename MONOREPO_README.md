# AgriFinAI Monorepo

> **AI-powered platform transforming Indian agriculture through financial intelligence, crop advisory, and hyperlocal insights**

This repository has been restructured as a **pnpm + Turborepo monorepo** for better code organization, faster builds, and improved developer experience.

---

## 🏗️ Monorepo Structure

```
agri-monorepo/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # Express backend API
├── packages/
│   ├── ui/           # Shared React UI components
│   ├── utils/        # Shared utility functions
│   └── types/        # Shared TypeScript types
├── infra/            # Docker, K8s, CI/CD configs
├── turbo.json        # Turborepo configuration
├── pnpm-workspace.yaml
└── package.json      # Root workspace
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+ (install with `npm install -g pnpm@8`)

### Installation

```bash
# Clone the repository
git clone https://github.com/OmkArsoni72/HackBios-AgriFintech.git
cd AgriFinAI

# Install all dependencies
pnpm install

# Start development servers (both web and API)
pnpm dev

# Build all apps
pnpm build

# Run linters
pnpm lint
```

---

## 📦 Workspace Commands

### Development
```bash
# Start all apps in development mode
pnpm dev

# Start only web app
pnpm --filter @apps/web dev

# Start only API
pnpm --filter @apps/api dev
```

### Building
```bash
# Build all packages and apps
pnpm build

# Build only web app
pnpm --filter @apps/web build

# Build with dependencies
pnpm --filter @apps/web... build
```

### Other Commands
```bash
# Lint all packages
pnpm lint

# Clean all build artifacts
pnpm clean

# Add dependency to specific package
pnpm --filter @apps/web add <package-name>
```

---

## 🌐 Applications

### Web App (`apps/web`)
**Next.js 15 frontend** with App Router, TailwindCSS, and AI integration

- **Port**: 3000 (default)
- **Tech Stack**: React 18, Next.js 15, Tailwind 4, Gemini AI
- **Features**:
  - AI Chatbot (Gemini-powered)
  - Loan marketplace
  - Weather & crop advisory
  - Soil health analysis
  - Multilingual support (i18n)

**Environment Variables** (create `apps/web/.env.local`):
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### API (`apps/api`)
**Express + MongoDB backend** for authentication, products, and loans

- **Port**: 5000 (default)
- **Tech Stack**: Express 4, MongoDB, Mongoose, JWT
- **Endpoints**:
  - `/api/auth/*` - Authentication
  - `/api/products/*` - Product management
  - `/api/loans/*` - Loan applications
  - `/api/farmers/*` - Farmer data

**Environment Variables** (create `apps/api/.env`):
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=5000
NODE_ENV=development
```

---

## 🐳 Docker Deployment

### Build Images
```bash
# Build web app
docker build -f apps/web/Dockerfile -t agri-web .

# Build API
docker build -f apps/api/Dockerfile -t agri-api .
```

### Run with Docker Compose
```bash
cd infra
docker-compose up -d
```

---

## 📚 Key Features

- **Agentic AI Chatbot**: Real-time conversational assistant (Gemini API)
- **Financial Marketplace**: Compare loans from multiple banks
- **Weather Advisory**: Hyperlocal forecasts and crop recommendations
- **Soil Health**: AI-powered analysis for better yields
- **Direct Market Access**: Connect farmers with buyers
- **Multilingual**: Hindi, Marathi, Tamil, Kannada, Gujarati, etc.

---

## 🛠️ Development Workflow

### Adding a New Package
```bash
# Create package directory
mkdir -p packages/new-package/src
cd packages/new-package

# Create package.json
cat > package.json << EOF
{
  "name": "@packages/new-package",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.js"
}
EOF

# Install from root
cd ../..
pnpm install
```

### Using Shared Packages
```javascript
// In apps/web or apps/api
import { MyComponent } from '@packages/ui';
import { myUtil } from '@packages/utils';
```

Path aliases are configured in `tsconfig.base.json`.

---

## 🔧 Turborepo Features

- **Incremental Builds**: Only rebuilds changed packages
- **Dependency Aware**: Builds packages in the correct order
- **Parallel Execution**: Runs tasks across packages simultaneously
- **Caching**: Smart caching for faster subsequent builds

### Cache Configuration
Configured in `turbo.json`:
- Build outputs cached: `.next/**`, `dist/**`
- Dev mode: no caching (for hot reload)
- Lint/test: cached based on file changes

---

## 📖 Technologies

### Frontend
- React 18, Next.js 15 (App Router)
- TailwindCSS 4, Material Tailwind
- Gemini AI, i18next

### Backend
- Express 4, MongoDB, Mongoose
- JWT authentication
- CORS, dotenv

### Monorepo Tools
- **pnpm** v8 - Fast, disk-efficient package manager
- **Turborepo** v1.10 - High-performance build system
- **TypeScript** v5.9 - Shared type definitions

---

## 📂 File Organization

### Import Paths
```typescript
// Use workspace aliases
import Header from '@packages/ui';       // Shared UI component
import { apiClient } from '@packages/utils'; // Shared utility
import type { User } from '@packages/types'; // Shared type

// Local imports within app
import MyPage from '@/app/my-page';      // apps/web internal
```

### Where to Put Code
- **Shared UI components** → `packages/ui/src/`
- **Shared utilities** → `packages/utils/src/`
- **Shared types** → `packages/types/`
- **Frontend pages** → `apps/web/app/`
- **API routes** → `apps/api/src/routes/`
- **Business logic** → respective `apps/*` folders

---

## 🚧 Migration Notes

This repo was migrated from a single-app structure to a monorepo. Key changes:

1. **Root `package.json`** now only contains workspace config and dev tools
2. **Dependencies split** between `apps/web` and `apps/api`
3. **Import paths** use `@packages/*` aliases for shared code
4. **Build commands** now use Turbo for orchestration
5. **Lockfile** changed from `package-lock.json` to `pnpm-lock.yaml`

### Breaking Changes
- Must use `pnpm` instead of `npm`
- Run commands from root with `pnpm <script>`
- Use `--filter` to target specific packages

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes in the appropriate workspace (`apps/*` or `packages/*`)
4. Run `pnpm build` and `pnpm lint` to validate
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## 📄 License

This project was built for the Capital One Launchpad Hackathon.

---

## 🙏 Acknowledgments

- **Capital One** for the hackathon opportunity
- **Google Gemini API** for AI capabilities
- **Vercel** for hosting
- **MongoDB** for database

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: [Your contact info]

**Built with ❤️ for Indian farmers**

# FullStack App

A modern fullstack application built with Next.js 16 and shadcn/ui.

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Components**: shadcn/ui 0.0.4
- **Styling**: Tailwind CSS v4.1.18
- **Language**: TypeScript 5
- **Icons**: Lucide React 0.563.0

## 📦 Installed Components

- Button
- Card
- Input

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Project Structure

```
fullstack-app/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   └── lib/              # Utility functions
├── public/               # Static assets
└── ...config files
```

## 🎨 Adding More Components

```bash
npx shadcn@latest add [component-name]
```

Available components: https://ui.shadcn.com/

## 🐳 Docker Deployment

### Build and Run Locally

```bash
# Build the Docker image
docker build -t fullstack-app .

# Run the container
docker run -p 3000:3000 fullstack-app
```

### Deploy to Dokploy

1. Push to GitHub repository
2. In Dokploy UI:
   - Connect GitHub account
   - Select `shamskholani2020/fullstack-app`
   - Configure deployment settings
   - Deploy

**Repository URL**: https://github.com/shamskholani2020/fullstack-app

## 📝 Notes

- Using Tailwind CSS v4 with PostCSS
- App Router enabled (`src` directory)
- TypeScript strict mode enabled
- ESLint configured with Next.js rules
- Docker multi-stage build optimized for production

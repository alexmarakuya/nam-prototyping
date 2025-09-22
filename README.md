# 🎯 NAM Studio - Multi-Stakeholder Prototyping Platform

A sophisticated prototyping platform where each stakeholder experiences their own branded version of the same functionality. Built with Next.js 14, TypeScript, and a powerful theming system.

## 🌟 Key Features

- **Theme-First Development**: Every component is theme-aware and adapts automatically
- **Stakeholder-Centric**: Each client gets a completely different visual experience
- **Component Reusability**: Same logic, different styling per stakeholder
- **Rapid Prototyping**: Built for speed and iteration
- **Production-Quality**: Functional prototypes with real interactions

## 🎨 Stakeholder Theme

### Acai Travel (Adventure Travel Platform)
- **Personality**: Vibrant, adventurous, inspiring
- **Colors**: Purple-pink primary (acai berry inspired), sky blue secondary, warm orange accents
- **Typography**: Poppins, friendly and modern
- **Style**: Generous rounded corners, enhanced shadows, travel-focused imagery
- **URL**: `/acai-travel`

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   - `http://localhost:3000` - Main landing page
   - `http://localhost:3000/acai-travel` - Acai Travel experience

## 🏗️ Architecture

### Theming System
- **CSS Variables**: Dynamic theming with CSS custom properties
- **Theme Provider**: React context for theme management
- **Automatic Application**: Themes apply automatically based on route

### File Structure
```
src/
├── themes/
image.png│   ├── config.ts          # Theme definitions
│   ├── provider.tsx       # Theme context
│   └── stakeholders/      # Individual themes
├── components/
│   ├── ui/               # Base components
│   └── themed/           # Stakeholder-aware components
├── app/
│   ├── [stakeholder]/    # Dynamic routes per stakeholder
│   └── page.tsx          # Landing page
└── lib/
    └── utils.ts          # Utilities
```

### Component Pattern
```typescript
// Theme-aware component example
interface ThemedComponentProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  stakeholder?: string; // Auto-detected from route
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animation**: Framer Motion
- **Components**: Headless UI
- **Development**: Storybook
- **Testing**: Vitest

## 📱 Available Pages

Acai Travel includes:
- **Home**: Travel platform overview and navigation
- **Travel Dashboard**: Booking metrics, destination analytics, and travel insights
- **Trip Planning**: Itinerary management and booking tools (coming soon)
- **Travel Preferences**: Settings for travel preferences and account management (coming soon)

## 🎯 Development Principles

1. **Theme-First**: Every component must work across all themes
2. **Consistency**: Same functionality, different presentation
3. **Performance**: Optimized for rapid iteration
4. **Accessibility**: WCAG compliant across all themes
5. **Responsive**: Mobile-first approach

## 🚀 Deployment

The application is ready for deployment on Vercel, Netlify, or any platform supporting Next.js.

```bash
npm run build
npm start
```

## 🤝 Contributing

This is a prototyping platform designed for rapid iteration and stakeholder feedback. The architecture supports easy addition of new themes and components.

## 📄 License

Built for NAM Studio prototyping purposes.
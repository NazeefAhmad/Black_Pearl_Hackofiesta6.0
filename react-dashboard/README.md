# 🖥️ React Dashboard
Part of the [Black Pearl Surveillance System](../README.md)

## Overview
Admin dashboard for the surveillance system built with React, TypeScript, and Vite.

## Features
- Real-time CCTV monitoring
- Emotion detection visualization
- Crime alerts and notifications
- Analytics dashboard
- Suspect gallery
- Heatmap visualization

## Tech Stack
- React + TypeScript + Vite
- Firebase Realtime Database
- Tailwind CSS
- Google Maps Integration

## Getting Started
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Firebase Setup
Configure Firebase in `src/lib/firebase.ts`:
```typescript
export const firebaseConfig = {
  apiKey: "AIzaSyBXWwtmlhQiNBrXivwFWk-70qqSNv2Rmos",
  authDomain: "sadam-sdm.firebaseapp.com",
  // ... other config
};
```

## Project Structure
```
src/
├── components/
│   ├── custom/       # Custom components
│   └── ui/          # UI components
├── lib/             # Utilities and configs
└── App.tsx          # Main application
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Skip Size Selection - We Want Waste

A modern, responsive React application for selecting skip sizes, built with performance and user experience in mind.

## Features

- 🎨 Modern, clean UI with Tailwind CSS
- 📱 Fully responsive design for mobile and desktop
- ⚡ Optimized performance with React 18 and Vite
- 🎭 Smooth animations with Framer Motion
- 🔄 State management with Zustand
- 🎯 TypeScript for type safety
- 🧪 Clean architecture following SOLID principles

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- Vite (Build Tool)
- Axios (API Client)

## Project Structure

```
src/
├── components/         # React components
│   ├── SkipCard.tsx   # Individual skip card component
│   └── SkipSelection.tsx # Main skip selection component
├── store/             # State management
│   └── skipStore.ts   # Zustand store for skip data
├── types/             # TypeScript type definitions
│   └── skip.ts        # Skip-related types
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Architecture Decisions

1. **State Management**: Zustand was chosen for its simplicity and performance. It provides a lightweight solution that's perfect for this use case.

2. **Component Structure**: Components are built following the Single Responsibility Principle, with clear separation of concerns:
   - `SkipCard`: Handles individual skip display and selection
   - `SkipSelection`: Manages the overall skip selection process

3. **Type Safety**: TypeScript is used throughout the application to ensure type safety and better developer experience.

4. **Styling**: Tailwind CSS is used for styling, providing:
   - Utility-first approach for rapid development
   - Consistent design system
   - Responsive design out of the box
   - Custom components for reusability

5. **Performance Optimizations**:
   - React 18 features for better performance
   - Code splitting with Vite
   - Optimized animations with Framer Motion
   - Efficient state updates with Zustand

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Design Decisions

1. **UI/UX Improvements**:
   - Clear visual hierarchy
   - Responsive grid layout
   - Smooth animations for better user feedback
   - Clear pricing and skip information
   - Mobile-first approach

2. **Accessibility**:
   - Semantic HTML
   - Proper ARIA attributes
   - Keyboard navigation support
   - High contrast text
   - Responsive text sizes

3. **Performance**:
   - Optimized bundle size
   - Lazy loading where appropriate
   - Efficient state management
   - Smooth animations with hardware acceleration

## Future Improvements

1. Add unit and integration tests
2. Implement error boundaries
3. Add loading skeletons
4. Implement skip filtering and sorting
5. Add skip comparison feature
6. Implement skip booking flow
7. Add user preferences storage
8. Implement skip availability checking

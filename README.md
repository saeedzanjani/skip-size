# Skip Size Selection Page Redesign

A modern, responsive redesign of the skip size selection page for We Want Waste, built with React and TypeScript.

## 🎯 Project Overview

This project is a redesign of the skip size selection page from [We Want Waste](https://wewantwaste.co.uk/). The goal was to create a modern, user-friendly interface while maintaining all the original functionality.

### Key Features
- Modern, clean UI design
- Fully responsive (mobile-first approach)
- Real-time skip data fetching
- Smooth animations and transitions
- Type-safe with TypeScript
- Efficient state management with Zustand
- Cached API responses for better performance

## 🛠️ Technical Stack

- **Framework**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **API Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saeedzanjani
cd skip-size
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── api/              # API client and services
├── components/       # React components
│   ├── common/      # Shared components
│   └── ...
├── config/          # Configuration files
├── layouts/         # Layout components
├── store/           # State management
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🎨 Design Approach

### UI/UX Improvements
1. **Modern Card Design**
   - Clean, shadow-based cards for skip options
   - Clear visual hierarchy
   - Smooth hover and selection states

2. **Responsive Design**
   - Mobile-first approach
   - Fluid grid layouts
   - Adaptive typography
   - Touch-friendly interactions

3. **User Experience**
   - Smooth animations for state changes
   - Clear loading states
   - Error handling with user-friendly messages
   - Intuitive skip selection process

### Code Architecture
1. **Component Structure**
   - Atomic design principles
   - Reusable components
   - Clear separation of concerns

2. **State Management**
   - Centralized store with Zustand
   - Type-safe actions and state
   - Efficient caching strategy

3. **Performance**
   - Debounced API calls
   - Memoized components
   - Optimized re-renders

## 🔄 API Integration

The application fetches skip data from:
```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

Features:
- Cached responses for better performance
- Error handling and retry logic
- Type-safe API integration
- Debounced requests to prevent rate limiting

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🧪 Testing

To run tests:
```bash
pnpm test
```

## 📝 Future Improvements

1. **Features**
   - Add skip comparison functionality
   - Implement skip size recommendations
   - Add more detailed skip information

2. **Technical**
   - Add end-to-end tests
   - Implement PWA capabilities
   - Add performance monitoring

## 📄 License

This project is created as part of a coding challenge for We Want Waste.

## 👥 Author

Saeed - https://github.com/saeedzanjani

## 🙏 Acknowledgments

- We Want Waste for providing the API and design inspiration
- The React and TypeScript communities for their excellent documentation

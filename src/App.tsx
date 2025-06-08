import { SkipSelection } from './components/SkipSelection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            We Want Waste - Skip Hire
          </h1>
        </div>
      </header>
      <main>
        <SkipSelection />
      </main>
    </div>
  );
}

export default App;

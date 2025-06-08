import { SkipSelection } from './components';
import { SkipLoader } from './components/common';
import { MainLayout } from './layouts';

function App() {
  return (
    <MainLayout>
      <SkipLoader>
        <SkipSelection />
      </SkipLoader>
    </MainLayout>
  );
}

export default App;

import { memo } from 'react';
import Container from './Container';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout = ({
  children,
  title = 'We Want Waste - Skip Hire'
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <Container className="py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {title}
          </h1>
        </Container>
      </header>
      <main>
        <Container className="py-6">
          {children}
        </Container>
      </main>
    </div>
  );
};

export default memo(MainLayout);

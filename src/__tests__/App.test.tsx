import React from 'react';
import { render, screen, type RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';

// Create query client instance
const queryClient = new QueryClient();

// Test wrapper component with proper typing
const TestWrapper: React.FC<{ initialEntries: string[] }> = ({ initialEntries }): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// Render helper function with explicit return type
const renderWithProviders = (initialEntries: string[] = ['/']): RenderResult => {
  return render(<TestWrapper initialEntries={initialEntries} />);
};

describe('App Routing', () => {
  test('redirects unauthenticated users to sign-in', async (): Promise<void> => {
    renderWithProviders(['/protected-route']);
    expect(await screen.findByText(/sign in/i)).toBeInTheDocument();
  });

  test('renders sign-in page at /signin', (): void => {
    renderWithProviders(['/signin']);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', (): void => {
    renderWithProviders(['/unknown-route']);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
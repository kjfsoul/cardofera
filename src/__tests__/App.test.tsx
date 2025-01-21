import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const renderWithProviders = (initialEntries: string[] = ['/']) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('App Routing', () => {
  test('redirects unauthenticated users to sign-in', async () => {
    renderWithProviders(['/protected-route']);
    expect(await screen.findByText(/sign in/i)).toBeInTheDocument();
  });

  test('renders sign-in page at /signin', () => {
    renderWithProviders(['/signin']);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', () => {
    renderWithProviders(['/unknown-route']);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
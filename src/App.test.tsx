// src/__tests__/App.test.tsx
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should work as expected', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});

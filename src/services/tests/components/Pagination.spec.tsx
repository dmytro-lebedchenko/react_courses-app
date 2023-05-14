import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from '../../../views/components/widgets/Pagination';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../../utils/searchHelper', () => ({
  getSearchWith: jest.fn(),
}));

describe('"Pagination" component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with one page', () => {
    const length = 10;
    const mockSearchParams = new URLSearchParams('page=1');

    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<Pagination length={length} />);

    const paginationList = screen.getByRole('list');
    const items = screen.getAllByRole('button', { name: /[0-9]+/i });

    expect(paginationList).toBeInTheDocument();
    expect(items.length).toBe(1);
  });

  it('should render with multiple pages', () => {
    const length = 50;
    const mockSearchParams = new URLSearchParams('page=1');

    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<Pagination length={length} />);

    const paginationList = screen.getByRole('list');
    const items = screen.getAllByRole('button', { name: /[0-9]+/i });

    expect(paginationList).toBeInTheDocument();
    expect(items.length).toBeGreaterThan(1);
  });

  it('should disable left button on first page', () => {
    const length = 50;
    const mockSearchParams = new URLSearchParams('page=1');

    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<Pagination length={length} />);

    const leftButton = screen.getByTestId('pagination-left');

    expect(leftButton).toBeDisabled();
  });

  it('should disable right button on last page', () => {
    const length = 50;
    const mockSearchParams = new URLSearchParams('page=5');

    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<Pagination length={length} />);

    const rightButton = screen.getByTestId('pagination-right');

    expect(rightButton).toBeDisabled();
  });

  it('should enable left button on second page', () => {
    const length = 50;
    const mockSearchParams = new URLSearchParams('page=2');

    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<Pagination length={length} />);

    const leftButton = screen.getByTestId('pagination-left');

    expect(leftButton).not.toBeDisabled();
  });

  it('should enable right button on second to last page', () => {
    const length = 50;
    const mockSearchParams = new URLSearchParams('page=4');

    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<Pagination length={length} />);

    const rightButton = screen.getByTestId('pagination-right');

    expect(rightButton).not.toBeDisabled();
  });
});

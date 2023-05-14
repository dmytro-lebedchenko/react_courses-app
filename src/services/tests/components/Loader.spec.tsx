import { render } from '@testing-library/react';

import { Loader } from '../../../views/components/ui/Loader';

describe('"Loader" component', () => {
  it('should render correctly', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.Loader');

    expect(loader).toBeInTheDocument();
  });
});

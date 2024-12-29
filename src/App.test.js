import { render, screen } from '@testing-library/react';
import App from './App';


const NpmTestPass = () => {
  return (
    <div>

    </div>
  )
}

test('renders learn react link', () => {
  render(<NpmTestPass />);
});

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import RandomText from '../RandomText';
import TextFetcher from '../TextFetcher';

test('Pass props to randomText and display a text', () => {
  const { getByTestId } = render(
    <RandomText text="Just a random text to make test fail" />
  );

  expect(getByTestId('test-text')).toHaveTextContent(
    'Just a random text to make test fail'
  );
});

test('TextFetcher fetches a random text and passes to RandomText as a prop to display it', () => {
  const { getByText } = render(<TextFetcher />);

  expect(getByText('Please load some text first')).toBeInTheDOM();

  fireEvent.click(getByText('Fetch random text'));

  expect(queryByText('Please load some text first')).not.toBeInTheDOM();
});

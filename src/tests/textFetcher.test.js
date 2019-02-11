import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as axios from 'axios';
import MockAxios from 'axios-mock-adapter';
import RandomText from '../RandomText';
import TextFetcher from '../TextFetcher';

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
afterAll(() => mock.restore());

test('Pass props to randomText and display a text', () => {
  const { getByTestId } = render(
    <RandomText text="Just a random text to make test fail" />
  );

  expect(getByTestId('test-text')).toHaveTextContent(
    'Just a random text to make test fail'
  );
});

test('TextFetcher fetches a random text and passes to RandomText as a prop to display it', () => {
  mock.onGet().replyOnce(200, {
    value: {
      randomText: 'Some text from axios fetch'
    }
  });
  const { getByText, queryByText, getByTestId } = render(<TextFetcher />);

  expect(getByText('Please load some text first')).toBeInTheDOM();

  fireEvent.click(getByText('Fetch random text'));

  expect(queryByText('Please load some text first')).not.toBeInTheDOM();
  expect(getByText('Processing...')).toBeInTheDOM();

  wait(() => expect(queryByText('Processing...')).not.toBeInTheDOM());
  expect(getByTestId('test-text')).toBeInTheDOM();
});

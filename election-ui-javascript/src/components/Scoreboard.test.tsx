import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react';
import Scoreboard from './Scoreboard';
import dataFetcher from '../dataFetcher/';

jest.mock('../dataFetcher');

test('renders Results', async () => {
  (dataFetcher as jest.Mock).mockImplementationOnce(() => {
    return Promise.resolve({
      results: {
        isComplete: false,
        results: [
          {
            party: 'Giraffe Party',
            candidateId: 2,
            votes: '9900'
          }
        ]
      },
      candidateData: [
        {
          id: 2,
          name: 'Lord Buckethead'
        }
      ]
    });
  });

  render(<Scoreboard />);

  await waitFor(() => {
    const resultParty = within(screen.getByRole('table')).getByText(
      /Giraffe Party/i
    );
    expect(resultParty).toBeInTheDocument();
  });
});

test('renders error state', async () => {
  (dataFetcher as jest.Mock).mockImplementationOnce(() => {
    throw new Error();
  });

  render(<Scoreboard />);

  await waitFor(() => {
    const errorElement = screen.getByText(/Error/i);
    expect(errorElement).toBeInTheDocument();
  });
});

test('displays the voting complete message when all votes are in', async () => {
  (dataFetcher as jest.Mock).mockImplementationOnce(() => {
    return Promise.resolve({
      results: {
        isComplete: true,
        results: [
          {
            party: 'Giraffe Party',
            candidateId: 2,
            votes: '9900'
          }
        ]
      },
      candidateData: [
        {
          id: 2,
          name: 'Lord Buckethead'
        }
      ]
    });
  });

  render(<Scoreboard />);

  await waitFor(() => {
    const votingCompleteMessage = screen.getByText(/Voting Complete/i);
    expect(votingCompleteMessage).toBeInTheDocument();
  });
});

test('fetches results again when refresh button clicked', async () => {
  (dataFetcher as jest.Mock).mockImplementationOnce(() => {
    return Promise.resolve(
      {
        results: {
          isComplete: false,
          results: [
            {
              party: 'Giraffe Party',
              candidateId: 2,
              votes: '9900'
            }
          ]
        },
        candidateData: [{
          id: 2,
          name: 'Lord Buckethead'
        }]
    });
  });

  (dataFetcher as jest.Mock).mockImplementationOnce(() => {
    return Promise.resolve(
      {
        results: {
          isComplete: false,
          results: [
            {
              party: 'Giraffe Party',
              candidateId: 2,
              votes: '12345'
            }
          ]
        },
        candidateData: [{
          id: 2,
          name: 'Lord Buckethead'
        }]
    });
  });

  render(<Scoreboard />);

  expect(dataFetcher).toHaveBeenCalledTimes(1);
  await waitFor(() => {
    const votes = screen.getByText(/9900/i);
    expect(votes).toBeInTheDocument();
  });

  const refreshButton = screen.getByText(/Refresh/i);
  fireEvent.click(refreshButton);

  expect(dataFetcher).toHaveBeenCalledTimes(2);
  await waitFor(() => {
    const votesAfterRefresh = screen.getByText(/12345/i);
    expect(votesAfterRefresh).toBeInTheDocument();
  });
});

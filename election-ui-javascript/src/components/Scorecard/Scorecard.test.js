import { render, screen } from '@testing-library/react';
import Scorecard from '.';

const results = [
  {
    'party': 'Green',
    'candidateId': 2,
    'votes': '1056'
  }
];

const candidateData = [
 {
    id: 2,
    name: 'Baldrick'
  },
];

test('renders results', async () => {
  render(<Scorecard results={results} candidateData={candidateData} />);

  const partyHeading = screen.getByText(/Party/i);
  const candidateHeading = screen.getByText(/Candidate/i);
  const votesHeading = screen.getByText(/Votes/i);

  const party = screen.getByText(/Green/i);
  const votes = screen.getByText(/1056/i);

  expect(partyHeading).toBeInTheDocument();
  expect(candidateHeading).toBeInTheDocument();
  expect(votesHeading).toBeInTheDocument();

  expect(party).toBeInTheDocument();
  expect(votes).toBeInTheDocument();
});

test('renders the candidate name', async () => { 
  render(<Scorecard results={results} candidateData={candidateData} />);
  const candidate = screen.getByText(/Baldrick/i);
  expect(candidate).toBeInTheDocument();
});

test('renders No Results if there are no results', async () => {
  render(<Scorecard />);
  const noResultsMessage = screen.getByText(/No results/i);
  expect(noResultsMessage).toBeInTheDocument();
});

test('Sets the background of the winner to yellow when voting is complete', async () => {
  render(<Scorecard results={results} candidateData={candidateData} votingComplete={true} />);
  const party = screen.getByText(/Green/i);
  expect(party).toHaveStyle('background-color: yellow');
});
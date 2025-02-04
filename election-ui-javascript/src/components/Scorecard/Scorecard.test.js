import { render, screen } from '@testing-library/react';
import Scorecard from '.';

const results = [
  {
    'party': 'Green',
    'candidateId': 2,
    'votes': '1056'
  },
  {
    'party': 'Tiger P',
    'candidateId': 3,
    'votes': '1057'
  },
];

const candidateData = [
 {
    id: 2,
    name: 'Baldrick'
  },
  {
    id: 3,
    name: 'Blackadder'
  }
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

test('Sets the background of the winner', async () => {
  render(<Scorecard results={results} candidateData={candidateData} isComplete={true} />);
  const party = screen.getByText('Tiger P');
  // eslint-disable-next-line testing-library/no-node-access
  expect(party.parentElement).toHaveStyle('background-color: lightgreen');
});
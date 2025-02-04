import fetchResults from '.';
import { fetchCandidateData, fetchResultData } from '../fakeAPI/';
import { CandidateData, MutatedData } from '../types';

jest.mock('../fakeAPI/');

const mockFakeApi = () => {
  (fetchResultData as jest.Mock).mockResolvedValue({
    isComplete: false,
    results: [
      {
        party: 'Giraffe Party',
        candidateId: 2,
        votes: '9900'
      }
    ]
  });
  
  (fetchCandidateData as jest.Mock).mockResolvedValue([
      {
        id: 2,
        name: 'Lord Buckethead'
      }
    ]
  );
};

test('returns an Object', async () => {
  mockFakeApi();
  const resultData = await fetchResults();
  expect(typeof resultData).toBe('object');
});

test('response contains a result array', async () => {
  mockFakeApi();
  const { results } = await fetchResults();
  expect(Array.isArray(results.results)).toBe(true);
});

test('response contains the candidiate data', async () => {
  mockFakeApi();
  const { candidateData } = await fetchResults();
  expect(Array.isArray(candidateData)).toBe(true);
});


import fetchResults from '.';
import { fetchResultData } from '../fakeAPI/';
import { MutatedData } from '../types';

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
  };

test('returns an Object', async () => {
  mockFakeApi();
  const resultData = await fetchResults();
  expect(typeof resultData).toBe('object');
});

test('response contains a result array', async () => {
  mockFakeApi();
  const resultData: MutatedData = await fetchResults();
  console.log("🚀 ~ test ~ resultData:", resultData)
  expect(Array.isArray(resultData.results)).toBe(true);
});

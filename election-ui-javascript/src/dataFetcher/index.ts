import { fetchResultData, fetchCandidateData } from '../fakeAPI/'; // Let's imagine this is an external service that we are calling via https
import { DefaultData } from '../types';

async function fetchResults() {
  const results = await fetchResultData();
  const candidateData = fetchCandidateData();

  return results;
}

export default fetchResults;

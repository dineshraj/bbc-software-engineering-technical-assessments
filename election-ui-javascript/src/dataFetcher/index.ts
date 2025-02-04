import { fetchResultData, fetchCandidateData } from '../fakeAPI/'; // Let's imagine this is an external service that we are calling via https

async function fetchResults() {
  const results = await fetchResultData();
  const candidateData = await fetchCandidateData();

  return { results, candidateData };
}

export default fetchResults;

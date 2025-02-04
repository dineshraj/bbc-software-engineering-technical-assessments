import { CandidateData, Item } from '../../types';
import './Scorecard.css';

interface ScorecardProps {
  results: Item[];
  candidateData: CandidateData[],
  isComplete: boolean;
}

const sortResults = (results: Item[]) => {
  return results.sort((a, b) => {
    const votesA = parseInt(a.votes);
    const votesB = parseInt(b.votes);
    return votesB - votesA;
  });
}

function Scorecard({ results, candidateData, isComplete }: ScorecardProps) {
  if (!results || results.length === 0) {
    return <div>No results</div>;
  }

  let scores = [];
  results = sortResults(results);
  for (let i = 0; i < results.length; i++) {
    const candidateId = results[i].candidateId;
    const candidate = candidateData.filter((candiate) => candiate.id === candidateId);
    const ScorecardWinner = isComplete && i === 0 ? {backgroundColor: 'lightgreen'} : {};

    scores.push(
      <tr key={i} style={ScorecardWinner}>
        <td>{results[i].party}</td>
        <td>{candidate[0].name}</td>
        <td>{results[i].votes}</td>
      </tr>
    )
  }

  if (isComplete) {
    console.log(scores);
    
  
  }
  
  return (
    <div className="Scorecard">
        <table className="Scorecard-table">
          <thead>
            <tr>
              <th>Party</th>
              <th>Candidate</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {scores}
          </tbody>
        </table>
    </div>
  );
}

export default Scorecard;

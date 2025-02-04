import React, { useState, useEffect } from 'react';
import Logo from './logo/logo';
import fetchData from '../dataFetcher';
import Scorecard from './Scorecard';
import './Scoreboard.css';
import PartyLinks from "./PartyLinks";
import { CandidateData, Item, MutatedData } from '../types';

function Scoreboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<MutatedData>({ results: [], isComplete: false });
  const [candidateData, setCandidateData] = useState<CandidateData[]>([]);

  async function getData() {
    try {
      setLoading(true);
      const { results, candidateData } = await fetchData();
      setResults(results);
      setCandidateData(candidateData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Scoreboard">
      <header className="Election-scoreboard-header">
        <Logo language="en" />
      </header>
      <main>
        {
          loading ? <h2>Loading...</h2> :
          error ? <h1>Error</h1> :
              <>
                {results.isComplete && <p className='completed'>VOTING COMPLETE</p>}
                <h1>Results</h1>
                <Scorecard results={results.results} isComplete={results.isComplete} candidateData={candidateData} />
                <button onClick={getData} className="Scoreboard-refresh">Refresh</button>
            <h1>Learn more about the parties...</h1>
            <PartyLinks />
          </>
        }
      </main>
    </div>
  );
}

export default Scoreboard;

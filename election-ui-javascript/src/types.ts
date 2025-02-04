export interface MetaData {
  isComplete: boolean;
}

export interface Item {
  party: string;
  candidateId: number;
  votes: string;
}


export interface DefaultData {
  metadata: MetaData;
  results: Item[];
}

export interface SvgProps {
  'aria-hidden': boolean;
  display: string;
  focusable: boolean;
  height: string;
  preserveAspectRatio: string;
}

export interface MutatedData {
  isComplete: boolean;
  results: Item[];
}

export interface CandidateData {
  id: number;
  name: string;
}
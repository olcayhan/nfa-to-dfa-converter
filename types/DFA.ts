type DFA = {
  states: string[][];
  alphabet: string[];
  transitions: { [transition: string]: string[] };
  startState: string[] | null;
  acceptStates: string[][];
};

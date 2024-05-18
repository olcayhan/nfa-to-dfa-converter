type NFA = {
  states: string[];
  alphabet: string[];
  transitions: { [state: string]: { [symbol: string]: string[] } };
  startState: string;
  acceptStates: Set<string>;
};

type NFAPure = {
  states: string;
  alphabet: string;
  transitions: string;
  startState: string;
  acceptStates: string;
};

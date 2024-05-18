class NFAtoDFAConverter {
  nfa: NFA;
  dfa: DFA;

  constructor(nfa: NFA) {
    this.nfa = nfa;
    this.dfa = {
      states: [],
      alphabet: nfa.alphabet,
      transitions: {},
      startState: null,
      acceptStates: [],
    };
  }

  epsilonClosure(states: string[]): string[] {
    let closure = new Set<string>(states);
    let stack = [...states];

    while (stack.length > 0) {
      let state = stack.pop()!;
      if (this.nfa.transitions[state] && this.nfa.transitions[state][""]) {
        for (let nextState of this.nfa.transitions[state][""]) {
          if (!closure.has(nextState)) {
            closure.add(nextState);
            stack.push(nextState);
          }
        }
      }
    }

    return Array.from(closure);
  }

  convert(): DFA {
    let startClosure = this.epsilonClosure([this.nfa.startState]);
    this.dfa.startState = startClosure;
    let unmarkedStates: string[][] = [startClosure];
    this.dfa.states.push(startClosure);

    while (unmarkedStates.length > 0) {
      let currentDFAState = unmarkedStates.pop()!;
      for (let symbol of this.nfa.alphabet) {
        let newState = new Set<string>();
        for (let nfaState of currentDFAState) {
          if (
            this.nfa.transitions[nfaState] &&
            this.nfa.transitions[nfaState][symbol]
          ) {
            for (let nextState of this.nfa.transitions[nfaState][symbol]) {
              newState.add(nextState);
            }
          }
        }
        let newClosure = this.epsilonClosure(Array.from(newState));
        if (
          !this.dfa.states.some(
            (state) => JSON.stringify(state) === JSON.stringify(newClosure)
          )
        ) {
          this.dfa.states.push(newClosure);
          unmarkedStates.push(newClosure);
        }
        this.dfa.transitions[`${JSON.stringify(currentDFAState)}-${symbol}`] =
          newClosure;
      }
    }

    for (let dfaState of this.dfa.states) {
      if (dfaState.some((nfaState) => this.nfa.acceptStates.has(nfaState))) {
        this.dfa.acceptStates.push(dfaState);
      }
    }

    return this.dfa;
  }
}

export default NFAtoDFAConverter;

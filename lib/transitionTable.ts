import { DFA } from "@/types/DFA";

export const generateTransitionTable = (automaton: DFA) => {
  const table = [];
  for (const state of automaton.states) {
    for (const symbol of automaton.alphabet) {
      const key = `${JSON.stringify(state)}-${symbol}`;
      const nextState = automaton.transitions[key] || [];
      table.push({
        currentState: JSON.stringify(state)
          .replace(/"/g, "")
          .replace(/,/g, ", "),
        symbol: symbol,
        nextState: JSON.stringify(nextState)
          .replace(/"/g, "")
          .replace(/,/g, ", "),
      });
    }
  }
  return table;
};

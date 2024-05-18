import { DFA } from "@/types/DFA";

export const generateFormalLanguage = (automaton: DFA) => {
  const states = Array.from(automaton.states).join(" | ");
  const alphabet = Array.from(automaton.alphabet).join(" | ");
  const startState = automaton.startState;
  const acceptStates = Array.from(automaton.acceptStates).join(" | ");

  const transitions = Object.entries(automaton.transitions)
    .map(([key, value]) => {
      const [state, symbol] = key.split("-");
      const nextState = Array.isArray(value) ? value.join(", ") : value;
      return `${state} --${symbol}--> ${nextState}`;
    })
    .join("\n");

  return { states, alphabet, startState, acceptStates, transitions };
};

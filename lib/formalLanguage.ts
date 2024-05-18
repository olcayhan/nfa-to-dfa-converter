import { DFA } from "@/types/DFA";

export const generateFormalLanguage = (automaton: DFA) => {
  const states = Array.from(automaton.states).join(" | ");
  const alphabet = Array.from(automaton.alphabet).join(" | ");
  const startState = automaton.startState;
  const acceptStates = Array.from(automaton.acceptStates).join(" | ");

  let transitions = "";
  for (const [key, value] of Object.entries(automaton.transitions)) {
    const [state, symbol] = key.split("-");
    const nextState = Array.isArray(value) ? value.join(", ") : value;
    transitions += `${state} --${symbol}--> ${nextState}\n`;
  }

  return { states, alphabet, startState, acceptStates, transitions };
};

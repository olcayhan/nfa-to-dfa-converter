# NFA to DFA Conversion Project Report

## Table of Contents

1. Introduction
2. Project Steps
    - Taking an NFA from the User
    - Conversion of NFA to DFA
    - Visualization and Representation
3. Examples
    - Input NFA
    - Converted DFA
4. Conclusion

## 1. Introduction

This project involves converting a Non-deterministic Finite Automaton (NFA), which may include empty transitions, into a Deterministic Finite Automaton (DFA). The conversion process is documented and visualized in three different formats: table, graphic, and formal language. The objective is to provide a clear and comprehensive demonstration of the conversion process from NFA to DFA.

## 2. Project Steps

### Taking an NFA from the User

The user is required to input the following details for the NFA:
- **States**: A set of states in the NFA.
- **Alphabet**: A set of input symbols.
- **Transitions**: A dictionary where each key is a state and each value is another dictionary. The nested dictionary's keys are input symbols (including the empty string for epsilon transitions) and the values are lists of states.
- **Start State**: The initial state of the NFA.
- **Accept States**: A set of accepting states in the NFA.

### Conversion of NFA to DFA

The conversion process includes the following steps:
1. **Epsilon Closure Calculation**: Determine the set of states reachable from a given state on epsilon (empty string) transitions.
2. **DFA Initialization**: Initialize the DFA with the epsilon closure of the NFA's start state.
3. **State Processing**: Iteratively process each state and input symbol in the NFA to build the DFA. This involves computing the new state transitions by combining sets of NFA states.
4. **Handling Accept States**: Mark the DFA states as accepting if any of their constituent NFA states are accepting.

### Visualization and Representation

The project displays the conversion process in three formats:
- **Table Format**: Transition tables for both the NFA and DFA, detailing how each state transitions to others based on input symbols.
- **Graphic Format**: Visual state diagrams for both the NFA and DFA, created using a graph visualization library.
- **Formal Language Form**: Mathematical notation and definitions for both the NFA and DFA, describing their components and transition functions.

## 3. Examples

### Input NFA

- **States**: `q0, q1, q2`
- **Alphabet**: `a, b`
- **Transitions**:
    ```
    {
      "q0": { "a": ["q0", "q1"], "b": ["q0"], "": ["q2"] },
      "q1": { "a": ["q2"], "b": ["q2"] },
      "q2": { "a": ["q2"], "b": ["q2"] }
    }
    ```
- **Start State**: `q0`
- **Accept States**: `q2`

### Converted DFA

- **States**: `["q0"], ["q0", "q1"], ["q0", "q2"], ["q0", "q1", "q2"]`
- **Alphabet**: `a, b`
- **Transitions**:
    ```
    {
      "[\"q0\"]-a": ["q0", "q1"],
      "[\"q0\"]-b": ["q0"],
      "[\"q0\",\"q1\"]-a": ["q0", "q1", "q2"],
      "[\"q0\",\"q1\"]-b": ["q0", "q2"],
      "[\"q0\",\"q2\"]-a": ["q0", "q1", "q2"],
      "[\"q0\",\"q2\"]-b": ["q0", "q2"],
      "[\"q0\",\"q1\",\"q2\"]-a": ["q0", "q1", "q2"],
      "[\"q0\",\"q1\",\"q2\"]-b": ["q0", "q2"]
    }
    ```
- **Start State**: `["q0"]`
- **Accept States**: `["q0", "q2"]`

## 4. Conclusion

The project successfully converts an NFA with possible empty transitions to an equivalent DFA. By documenting the conversion process and visualizing the results in table, graphic, and formal language formats, the project provides a thorough understanding of the conversion process. This comprehensive approach ensures that the resulting DFA is correctly derived from the input NFA and aids in understanding the intricacies of automaton theory.

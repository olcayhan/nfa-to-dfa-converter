"use client";
import { useState } from "react";
import NFAtoDFAConverter from "../lib/nfaToDfaConverter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DfaVisualization from "../components/DfaVisualization";
import NfaVisualization from "../components/NfaVisualization";
import TransitionTable from "../components/TransitionTable";
import FormalLanguage from "../components/FormalLanguage";
import { generateTransitionTable } from "../lib/transitionTable";
import { generateFormalLanguage } from "../lib/formalLanguage";
import styles from "../styles/Home.module.css";

const IndexPage = () => {
  const [nfa, setNfa] = useState({
    states: "",
    alphabet: "",
    transitions: "",
    startState: "",
    acceptStates: "",
  });

  const [dfa, setDfa] = useState(null);
  const [parsedNfa, setParsedNfa] = useState(null);
  const [nfaTable, setNfaTable] = useState([]);
  const [dfaTable, setDfaTable] = useState([]);
  const [nfaFormalLanguage, setNfaFormalLanguage] = useState("");
  const [dfaFormalLanguage, setDfaFormalLanguage] = useState("");

  const handleChange = (e) => {
    setNfa({ ...nfa, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    try {
      const formattedNfa = {
        states: new Set(nfa.states.split(",").map((s) => s.trim())),
        alphabet: new Set(nfa.alphabet.split(",").map((s) => s.trim())),
        transitions: JSON.parse(
          nfa.transitions
            .replace(/(\w+):/g, '"$1":')
            .replace(/:(\w+)/g, ':"$1"')
        ),
        startState: nfa.startState.trim(),
        acceptStates: new Set(nfa.acceptStates.split(",").map((s) => s.trim())),
      };

      const converter = new NFAtoDFAConverter(formattedNfa);
      const convertedDfa = converter.convert();
      setDfa(convertedDfa);
      setParsedNfa(formattedNfa);
      setNfaTable(generateTransitionTable(formattedNfa));
      setDfaTable(generateTransitionTable(convertedDfa));
      setNfaFormalLanguage(generateFormalLanguage(formattedNfa, "NFA"));
      setDfaFormalLanguage(generateFormalLanguage(convertedDfa, "DFA"));
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>NFA to DFA Converter</h1>
      <TextField
        label="States (comma separated)"
        name="states"
        value={nfa.states}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Alphabet (comma separated)"
        name="alphabet"
        value={nfa.alphabet}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Transitions (JSON format)"
        name="transitions"
        value={nfa.transitions}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Start State"
        name="startState"
        value={nfa.startState}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Accept States (comma separated)"
        name="acceptStates"
        value={nfa.acceptStates}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Convert to DFA
      </Button>

{/*       {parsedNfa && (
        <div style={{ marginTop: "40px" }}>
          <h2>NFA</h2>
          <pre>{JSON.stringify(parsedNfa, null, 2)}</pre>
          <NfaVisualization nfa={parsedNfa} />
          <h3>Transition Table</h3>
          <TransitionTable table={nfaTable} />
          <h3>Formal Language Representation</h3>
          <FormalLanguage formalLanguage={nfaFormalLanguage} />
        </div>
      )} */}

      {dfa && (
        <div style={{ marginTop: "40px" }}>
          <h2>DFA</h2>
          <DfaVisualization dfa={dfa} />
          <h3>Transition Table</h3>
          <TransitionTable table={dfaTable} />
          <h3>Formal Language Representation</h3>
          <FormalLanguage formalLanguage={dfaFormalLanguage} />
        </div>
      )}
    </div>
  );
};

export default IndexPage;

"use client";
import { useState } from "react";
import NFAtoDFAConverter from "../lib/nfaToDfaConverter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DfaVisualization from "../components/DfaVisualization";
import TransitionTable from "../components/TransitionTable";
import FormalLanguage from "../components/FormalLanguage";
import { generateTransitionTable } from "../lib/transitionTable";
import { generateFormalLanguage } from "../lib/formalLanguage";
import { NFAPure } from "@/types/NFA";
import { DFA } from "@/types/DFA";

const IndexPage = () => {
  const [nfa, setNfa] = useState<NFAPure>({
    states: "",
    alphabet: "",
    transitions: "",
    startState: "",
    acceptStates: "",
  });

  const [dfa, setDfa] = useState<DFA | null>(null);
  const [dfaTable, setDfaTable] = useState<any[]>([]);
  const [dfaFormalLanguage, setDfaFormalLanguage] = useState<any>({});

  const handleChange = (e: any) => {
    setNfa({ ...nfa, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    try {
      const formattedNfa: any = {
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
      const convertedDfa: any = converter.convert();
      setDfa(convertedDfa);
      setDfaTable(generateTransitionTable(convertedDfa));
      setDfaFormalLanguage(generateFormalLanguage(convertedDfa));
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto p-5">
      <h1 className="text-[32px] font-semibold">NFA to DFA Converter</h1>
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

      {dfa && (
        <div className="flex flex-col justify-start items-center mt-5 gap-10">
          <div className="w-full">
            <h2 className="font-semibold text-center text-[24px]">DFA</h2>
            <DfaVisualization dfa={dfa} />
          </div>
          <div className="w-full">
            <h2 className="font-semibold text-center text-[24px]">
              Transition Table
            </h2>
            <TransitionTable table={dfaTable} />
          </div>
          <div className="w-full">
            <h2 className="font-semibold text-center text-[24px]">
              Formal Language Representation
            </h2>
            <FormalLanguage formalLanguage={dfaFormalLanguage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;

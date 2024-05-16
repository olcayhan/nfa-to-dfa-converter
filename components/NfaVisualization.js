"use client";
import { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";

const NfaVisualization = ({ nfa }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!nfa) return;

    const nodes = new DataSet(
      Array.from(nfa.states).map((state, index) => ({
        id: state,
        label: state,
        shape: nfa.acceptStates.has(state) ? "ellipse" : "circle",
      }))
    );

    const edges = new DataSet();
    for (const [fromState, transitions] of Object.entries(nfa.transitions)) {
      for (const [symbol, toStates] of Object.entries(transitions)) {
        for (const toState of toStates) {
          edges.add({
            from: fromState,
            to: toState,
            label: symbol || "ε", // Use ε for epsilon transitions
            arrows: "to",
          });
        }
      }
    }

    const data = { nodes, edges };

    const options = {
      edges: {
        arrows: {
          to: {
            enabled: true,
            type: "arrow",
          },
        },
      },
      nodes: {
        shape: "ellipse",
      },
      physics: {
        enabled: false,
      },
    };

    const network = new Network(container.current, data, options);

    return () => {
      network.destroy();
    };
  }, [nfa]);

  return <div ref={container} style={{ height: "500px" }} />;
};

export default NfaVisualization;

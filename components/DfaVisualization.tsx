"use client";
import { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";

const DfaVisualization = ({ dfa }: any) => {
  const container = useRef<any>(null);

  useEffect(() => {
    if (!dfa) return;

    const nodes = new DataSet(
      dfa.states.map((state: any, index: number) => ({
        id: index,
        label: state.join(", "),
        shape: dfa.acceptStates.some(
          (acceptState: any) =>
            JSON.stringify(acceptState) === JSON.stringify(state)
        )
          ? "ellipse"
          : "circle",
      }))
    );

    const edges = new DataSet(
      Object.entries(dfa.transitions).map(([key, value]) => {
        const [fromState, symbol] = key.split("-");
        const fromStateIndex = dfa.states.findIndex(
          (state) => JSON.stringify(state) === fromState
        );
        const toStateIndex = dfa.states.findIndex(
          (state) => JSON.stringify(state) === JSON.stringify(value)
        );
        return {
          from: fromStateIndex,
          to: toStateIndex,
          label: symbol,
          arrows: "to",
        };
      })
    );

    const data: any = { nodes, edges };

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
  }, [dfa]);

  return (
    <div
      ref={container}
      className="w-full h-[500px] border-2 border-blue-400"
    />
  );
};

export default DfaVisualization;

import { NFAPure } from "@/types/NFA";

const FormalLanguage = ({ formalLanguage }: { formalLanguage: NFAPure }) => {
  return (
    <div className="border-[2px] border-blue-300 text-center">
      <div className="flex flex-col justify-start items-center gap-4 p-3">
        <div className="w-full grid grid-cols-2 border-b-2 p-2">
          <p className="font-semibold col-span-1">States</p>
          <div className="col-span-1">{formalLanguage.states}</div>
        </div>
        <div className="w-full grid grid-cols-2 border-b-2 p-2">
          <p className="font-semibold col-span-1">Alphabet</p>
          <div className="col-span-1">{formalLanguage.alphabet}</div>
        </div>
        <div className="w-full grid grid-cols-2 border-b-2 p-2">
          <p className="font-semibold col-span-1">Start State</p>
          <div className="col-span-1">{formalLanguage.startState}</div>
        </div>
        <div className="w-full grid grid-cols-2 border-b-2 p-2">
          <p className="font-semibold col-span-1">Accept States</p>
          <div className="col-span-1">{formalLanguage.acceptStates}</div>
        </div>
        <div className="w-full grid grid-cols-2 border-b-2 p-2">
          <p className="font-semibold col-span-1">Transitions</p>
          <div className="col-span-1 whitespace-pre-wrap">
            {formalLanguage.transitions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormalLanguage;

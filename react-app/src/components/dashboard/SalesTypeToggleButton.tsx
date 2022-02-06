import { atom, useAtom } from "jotai";
import { useCallback } from "react";

export const salesTypeAtom = atom<"historical" | "predicted">("historical");

export const SalesTypeToggleButton = () => {
  const [salesType, setsalesType] = useAtom(salesTypeAtom);

  const togglesalesType = useCallback(
    (event) => {
      setsalesType(salesType === "historical" ? "predicted" : "historical");
    },
    [salesType, setsalesType]
  );

  const label = `View ${salesType === "historical" ? "Predicted" : "Historical"} Sales`;

  return (
    <button
      type="button"
      className="w-44 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-cyan-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      onClick={togglesalesType}
    >
      {label}
    </button>
  );
};

export default SalesTypeToggleButton;

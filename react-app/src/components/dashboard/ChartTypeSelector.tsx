import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { atom, useAtom } from "jotai";
import { Fragment, useCallback, useState } from "react";

const types = [
  { id: 1, name: "Line Graph" },
  { id: 2, name: "Bar Graph" },
  { id: 3, name: "Scatter Plot" },
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export const chartTypeAtom = atom<"line" | "bar" | "scatter">("line");

export default function ChartTypeSelector() {
  const [selected, setSelected] = useState(types[0]);
  const [, setChartType] = useAtom(chartTypeAtom);

  const onSelect = useCallback(
    (type: { id: number; name: string }) => {
      setSelected(type);
      switch (type.id) {
        case 1:
          return setChartType("line");
        case 2:
          return setChartType("bar");
        default:
          return setChartType("scatter");
      }
    },
    [setSelected, setChartType]
  );

  return (
    <Listbox value={selected} onChange={onSelect}>
      {({ open }) => (
        <>
          <Listbox.Label className="inline-flex text-sm font-medium text-gray-700">Visualization: </Listbox.Label>
          <div className="mt-1 ml-3 relative inline-flex">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
              <span className="block truncate w-32">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {types.map((type) => (
                  <Listbox.Option
                    key={type.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-cyan-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={type}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                          {type.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-cyan-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

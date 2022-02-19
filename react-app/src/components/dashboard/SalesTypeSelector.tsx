import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { atom, useAtom } from "jotai";
import { Fragment } from "react";

export const salesTypeAtom = atom<"historical" | "predicted" | "errors">("historical");

const salesTypes = ["historical", "predicted", "errors"];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const SalesTypeSelector = () => {
  const [salesType, setSalesType] = useAtom(salesTypeAtom);

  return (
    <Listbox value={salesType} onChange={setSalesType}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Sales Type:</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="w-32 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
              <span className="block truncate">{capitalize(salesType)}</span>
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
                {salesTypes.map((type, index) => (
                  <Listbox.Option
                    key={index}
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
                          {capitalize(type)}
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
};

export default SalesTypeSelector;

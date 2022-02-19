import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { atom, useAtom } from "jotai";
import { Fragment } from "react";

export const productFamilyAtom = atom("all_products");

export const productFamilies = {
  all_products: "All Products",
  automotive: "Automotive",
  baby_care: "Baby Care",
  beauty: "Beauty",
  beverages: "Beverages",
  books: "Books",
  bread_bakery: "Bread Bakery",
  celeberation: "Celebration",
  cleaning: "Cleaning",
  dairy: "Dairy",
  deli: "Deli",
  eggs: "Eggs",
  frozen_foods: "Frozen Foods",
  grocery_i: "Grocery I",
  grocery_ii: "Grocery II",
  hardware: "Hardware",
  home_and_kitchen_i: "Home and Kitchen I",
  home_and_kitchen_ii: "Home and Kitchen II",
  home_appliances: "Home Appliances",
  home_care: "Home Care",
  ladieswear: "Ladieswear",
  lawn_and_garden: "Lawn and Garden",
  lingerie: "Lingerie",
  liquor_wine_beer: "Liquor wine Beer",
  magazines: "Magazines",
  meats: "Meats",
  personal_care: "Personal Care",
  pet_supplies: "Pet Supplies",
  players_and_electronics: "Players and Electronics",
  poultry: "Poultry",
  prepared_foods: "Prepared Foods",
  produce: "Produce",
  school_and_office_supplies: "School and Office Supplies",
  seafood: "Seafood",
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const ProductFamilySelector = () => {
  const [productFamily, setProductFamily] = useAtom(productFamilyAtom);

  const selectedProductFamily = (productFamilies as any)[productFamily];

  return (
    <Listbox value={productFamily} onChange={setProductFamily}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Product Family:</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="w-64 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
              <span className="block truncate">{selectedProductFamily}</span>
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
                {Object.keys(productFamilies).map((key, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-cyan-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={key}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                          {(productFamilies as any)[key]}
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

export default ProductFamilySelector;

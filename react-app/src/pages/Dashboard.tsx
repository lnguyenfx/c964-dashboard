import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, OfficeBuildingIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";
import { Fragment } from "react";

import ChartTypeSelector, { chartTypeAtom } from "../components/dashboard/ChartTypeSelector";
import ProductFamilySelector, { productFamilyAtom } from "../components/dashboard/ProductFamilySelector";
import SalesChart from "../components/dashboard/SalesChart";
import SalesTypeSelector, { salesTypeAtom } from "../components/dashboard/SalesTypeSelector";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  const [salesType] = useAtom(salesTypeAtom);
  const [chartType] = useAtom(chartTypeAtom);
  const [productFamily] = useAtom(productFamilyAtom);

  const hour = new Date().getHours();
  const timeGreet = `Good ${hour >= 18 ? "evening" : hour >= 12 ? "afternoon" : "morning"}`;

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="flex flex-col flex-1">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex items-center">Today is Tuesday, August 15, 2017</div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    <img
                      className="min-w-[2rem] h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                      <span className="sr-only">Open user menu for </span>Cecilia Klein
                    </span>
                    <ChevronDownIcon
                      className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/logout"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "w-full text-left block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 pb-8">
          {/* Page header */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div className="flex min-w-0">
                  {/* Profile */}
                  <div className="flex items-center">
                    <img
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                      alt=""
                    />
                    <div>
                      <div className="flex items-center">
                        <img
                          className="h-16 w-16 rounded-full sm:hidden"
                          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                          alt=""
                        />
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                          {timeGreet}, Cecilia
                        </h1>
                      </div>
                      <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Company</dt>
                        <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                          <OfficeBuildingIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          Regional Store Manager
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4 flex items-center flex-col">
                  <ChartTypeSelector />
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4 flex items-center flex-col">
                  <ProductFamilySelector />
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4 flex items-center flex-col">
                  <SalesTypeSelector />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-center">
              <SalesChart salesType={salesType} chartType={chartType} productFamily={productFamily} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

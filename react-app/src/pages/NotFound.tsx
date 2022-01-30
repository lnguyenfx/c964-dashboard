import { Link } from "react-router-dom";

import logo from "../logo.svg";

function NotFound() {
  return (
    <div className="bg-gray-100 min-h-full pt-16 pb-12 flex flex-col">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">Workflow</span>
            <img className="h-12 w-auto" src={logo} alt="" />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
            <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-6">
              <button className="text-base font-medium text-cyan-600 hover:text-cyan-500">
                <Link to="/">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;

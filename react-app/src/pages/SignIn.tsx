import { LockClosedIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";
import React, { createRef, useCallback, useEffect, useState } from "react";

import ErrorsPanel from "../components/common/ErrorsPanel";
import { userAtom } from "../hooks/useUser";

function SignIn() {
  const [user, setUser] = useAtom(userAtom);
  const [errors, setErrors] = useState<Array<string>>([]);

  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const onLogin = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();

      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else if (response.status < 500) {
          const data = await response.json();
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setErrors(["An error occurred. Please try again."]);
          }
        } else {
          setErrors(["An error occurred. Please try again."]);
        }
      } catch (error) {
        setErrors(["An error occurred. Please try again."]);
      }
    },
    [emailRef, passwordRef, setUser, setErrors]
  );

  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);

  if (user) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <ErrorsPanel errors={errors} />
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                ref={emailRef}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              onClick={onLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

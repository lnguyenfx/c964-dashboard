import { useAtom } from "jotai";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { userAtom } from "../hooks/useUser";

function Logout() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (user) {
      (async () => {
        const response = await fetch("/api/auth/logout", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setUser(null);
        }
      })();
    }
  }, [user, setUser]);

  return user ? null : <Navigate to="/" />;
}

export default Logout;

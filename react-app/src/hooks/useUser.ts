import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

export const userAtom = atom(null);

export function useUser() {
  const [user, setUser] = useAtom(userAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }

    (async () => {
      const response = await fetch("/api/auth/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          setUser(null);
        } else {
          setUser(data);
        }
      } else {
        setUser(null);
      }
      setLoaded(true);
    })();
  }, [loaded, setUser, setLoaded]);

  return [loaded, user, setUser] as const;
}

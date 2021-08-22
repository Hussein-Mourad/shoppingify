import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface IUser {
  _id: string;
  username: string;
}

export default function useAuthentication() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/", {
          method: "POST",
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setIsLoading(false);
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
        setIsLoading(false);
      }
    })();

    return () => {};
  }, []);

  return { user, isLoading };
}

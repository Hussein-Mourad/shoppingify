import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
        const response = await axios.post("/api/auth/");
        setUser(response.data.user);
        setIsLoading(false);
      } catch (err) {
        router.push("/login");
      }
    })();

    return () => {};
  }, []);

  return { user, isLoading };
}

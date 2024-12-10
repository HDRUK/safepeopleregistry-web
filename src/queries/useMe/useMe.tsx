import { getMe } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export default function useMe() {
  const query = useQuery({
    queryKey: ["getMe"],
    queryFn: () => {
      return getMe({
        error: {
          message: "getMe",
        },
      });
    },
  });

  return query;
}

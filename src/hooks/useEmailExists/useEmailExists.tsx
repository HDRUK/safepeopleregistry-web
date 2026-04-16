import { getUsers } from "@/app/actions/users";
import { useQuery } from "@tanstack/react-query";

const useEmailExists = (email: string) => {
  return useQuery({
    queryKey: ["getUsersByEmail", email],
    queryFn: () => getUsers({ email }),
    enabled: !!email,
    select: data => data.data.data.length > 0,
  });
};

export default useEmailExists;

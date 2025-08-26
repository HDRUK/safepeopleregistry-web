import { putActionLogQuery } from "@/services/action_logs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ActionLogUpdater = () => {
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const markActionComplete = params?.get("markActionComplete");

  const { mutateAsync } = useMutation({
    ...putActionLogQuery(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getActionLogs"],
      });
    },
  });

  useEffect(() => {
    const updateLog = async () => {
      if (!markActionComplete) return;

      const id = Number(markActionComplete);
      if (Number.isNaN(id)) return;

      try {
        await mutateAsync(id);

        const newParams = new URLSearchParams(params?.toString());
        newParams.delete("markActionComplete");
        router.replace(`?${newParams.toString()}`);
      } catch (error) {
        console.error("Failed to update action log:", error);
      }
    };
    updateLog();
  }, [markActionComplete]);

  return null;
};

export default ActionLogUpdater;

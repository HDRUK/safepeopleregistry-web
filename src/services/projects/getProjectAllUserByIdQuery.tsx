import getProjectAllUserByUserId from "@/app/actions/projects/getProjectAllUserByUserId";
import { createQuery } from "../../utils/query";
import { QueryOptions, ResponseJson } from "../../types/requests";
import { ProjectAllUserResponse } from "./types";

export default (projectId: number, userId: number, options?: QueryOptions) =>
  createQuery<ResponseJson<ProjectAllUserResponse>>(
    {
      queryKey: [
        "getProjectAllUserByUserId",
        String(projectId),
        String(userId),
      ],
      queryFn: async ({ queryKey }, queryFnOptions) =>
        getProjectAllUserByUserId(+queryKey[1], +queryKey[2], queryFnOptions),
    },
    options
  );

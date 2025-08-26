import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getEntityProjects, { ProjectEntities } from "./getEntityProjects";

interface GetEntityProjectsQuery<T> extends Partial<PaginatedQueryProps<T>> {
  variant: ProjectEntities;
}

export default function useEntityProjectsQuery<T>(
  id: number,
  {
    variant,
    defaultQueryParams,
    queryKeyBase,
    ...restParams
  }: GetEntityProjectsQuery<T>
) {
  const queryKey = queryKeyBase || ["getProjects"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `title:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getEntityProjects(variant, id, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}

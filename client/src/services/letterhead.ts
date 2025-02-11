import { getLetterHead } from "@/api/letterhead";
import { type LetterHeadApiResponse } from "@/schemas/letterheadSchema";
import { type UseQueryConfig } from "@/types/common";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useGetLetterHead = (params: { id: string }, config: UseQueryConfig = {}) =>
  useQuery({
    queryKey: ["letterHead", params],
    queryFn: () => getLetterHead(params),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
    ...config
  }) as UseQueryResult<LetterHeadApiResponse, Error>;

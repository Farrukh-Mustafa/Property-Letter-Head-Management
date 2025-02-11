import { type QueryKey, type UseQueryOptions } from "@tanstack/react-query";

export type MongoDocument<T> = T & { _id: string };

export type UseQueryConfig<T = unknown> = {
  queryKey?: QueryKey;
  queryParams?: Record<string, unknown>;
} & Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

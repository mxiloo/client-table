import { useQuery } from '@tanstack/react-query';
import { getClient } from '../utils/api';
import { TClient } from '../types/types';

export function useClientById(id: number | null, enabled: boolean) {
  return useQuery<TClient>({
    queryKey: ['client', id],
    queryFn: () => getClient(id!), // id гарантированно не null, потому что enabled === true
    enabled: enabled && !!id, // включить только если id есть
    staleTime: Infinity,
  });
}

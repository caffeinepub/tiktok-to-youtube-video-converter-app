import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ConversionEntry } from '@/backend';

export function useConversionHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<ConversionEntry[]>({
    queryKey: ['conversionHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversionHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

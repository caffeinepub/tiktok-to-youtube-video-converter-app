import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { getLocalHistory, addToLocalHistory, deleteFromLocalHistory } from './historyStorage';
import { HistoryEntry } from './historyTypes';
import type { ConversionEntry } from '@/backend';

export function useHistory() {
  const { actor, isFetching: isActorFetching } = useActor();
  const queryClient = useQueryClient();

  // Get backend history
  const backendHistoryQuery = useQuery<ConversionEntry[]>({
    queryKey: ['conversionHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversionHistory();
    },
    enabled: !!actor && !isActorFetching,
  });

  // Get local history
  const localHistoryQuery = useQuery<HistoryEntry[]>({
    queryKey: ['localHistory'],
    queryFn: () => getLocalHistory(),
  });

  // Add conversion mutation
  const addConversionMutation = useMutation({
    mutationFn: async (data: {
      tiktokUrl: string;
      preset: string;
      outputFilename: string;
    }) => {
      // Add to local storage
      const localEntry = addToLocalHistory({
        tiktokUrl: data.tiktokUrl,
        timestamp: Date.now(),
        preset: data.preset,
        outputFilename: data.outputFilename,
      });

      // Try to add to backend if actor is available
      if (actor) {
        try {
          await actor.addConversion(data.tiktokUrl, data.preset, data.outputFilename);
        } catch (error) {
          console.warn('Failed to save to backend:', error);
        }
      }

      return localEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localHistory'] });
      queryClient.invalidateQueries({ queryKey: ['conversionHistory'] });
    },
  });

  // Delete from local history
  const deleteLocalMutation = useMutation({
    mutationFn: async (id: string) => {
      deleteFromLocalHistory(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localHistory'] });
    },
  });

  // Merge backend and local history
  const mergedHistory: HistoryEntry[] = [
    ...(localHistoryQuery.data || []),
    ...(backendHistoryQuery.data || []).map((entry) => ({
      id: `backend-${entry.timestamp}`,
      tiktokUrl: entry.tiktokUrl,
      timestamp: Number(entry.timestamp) / 1_000_000, // Convert nanoseconds to milliseconds
      preset: entry.preset,
      outputFilename: entry.outputFilename,
    })),
  ]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 50);

  return {
    history: mergedHistory,
    isLoading: localHistoryQuery.isLoading || backendHistoryQuery.isLoading,
    addConversion: addConversionMutation.mutate,
    deleteLocal: deleteLocalMutation.mutate,
  };
}

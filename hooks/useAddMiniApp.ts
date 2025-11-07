import { useCallback } from 'react';

export function useAddMiniApp() {
  const addMiniApp = useCallback(async () => {
    // Placeholder for mini app addition logic
    console.log('Adding mini app...');
  }, []);

  return { addMiniApp };
}
import { useEffect } from 'react';

export function useQuickAuth(isInFarcaster: boolean) {
  useEffect(() => {
    if (isInFarcaster) {
      // Placeholder for quick auth logic
      console.log('Quick auth initialized');
    }
  }, [isInFarcaster]);
}
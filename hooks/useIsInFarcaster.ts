export function useIsInFarcaster(): boolean {
  // Placeholder for checking if app is in Farcaster
  return typeof window !== 'undefined' && window.parent !== window;
}
'use client';

import { useEffect } from 'react';

export function ReadyNotifier() {
  useEffect(() => {
    console.log('Mini-app is ready');
  }, []);

  return null;
}
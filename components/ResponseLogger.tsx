'use client';

import { useEffect } from 'react';

export function ResponseLogger() {
  useEffect(() => {
    console.log('Response Logger initialized');
  }, []);

  return null;
}
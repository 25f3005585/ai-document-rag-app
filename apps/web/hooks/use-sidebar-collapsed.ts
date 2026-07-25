'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'askdocs:sidebar-collapsed:v1';

export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  const toggle = () => {
    setCollapsed((current) => {
      const next = !current;
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        // ignore
      }
      return next;
    });
  };

  return { collapsed, ready, toggle };
}

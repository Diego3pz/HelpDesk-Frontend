'use client';

import { useEffect, useState } from 'react';

export function usePersistentCollapse() {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin-sidebar-collapsed');
    setCollapsed(stored === 'true');
  }, []);

  const toggle = () => {
    const newValue = !collapsed;
    localStorage.setItem('admin-sidebar-collapsed', String(newValue));
    setCollapsed(newValue);
  };

  return { collapsed, toggle };
}

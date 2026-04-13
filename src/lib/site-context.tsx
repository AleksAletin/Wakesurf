'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SiteId } from './sites';

const SiteContext = createContext<SiteId>('wake');

export function SiteProvider({ site, children }: { site: SiteId; children: ReactNode }) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteId {
  return useContext(SiteContext);
}

export type SiteId = 'wake' | 'parusnik';

export interface SiteConfig {
  id: SiteId;
  name: string;
  shortName: string;
  domain: string;
  url: string;
  tagline: string;
  phone: string;
  color: string;
}

export const SITES: Record<SiteId, SiteConfig> = {
  wake: {
    id: 'wake',
    name: 'PandaWake',
    shortName: 'PandaWake',
    domain: 'pandawake.ru',
    url: 'https://pandawake.ru',
    tagline: 'Вейксёрф и экстрим на воде',
    phone: '+7 (980) 184-07-00',
    color: 'cyan',
  },
  parusnik: {
    id: 'parusnik',
    name: 'Яхт-клуб Парусник',
    shortName: 'Парусник',
    domain: 'parusnik-club.ru',
    url: 'https://parusnik-club.ru',
    tagline: 'Беседки, рыбалка и отдых на воде',
    phone: '+7 (915) 488-81-21',
    color: 'emerald',
  },
};

export function getOtherSite(current: SiteId): SiteConfig {
  return current === 'wake' ? SITES.parusnik : SITES.wake;
}

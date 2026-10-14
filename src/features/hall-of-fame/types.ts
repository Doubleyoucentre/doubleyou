/** Public field contracts reused from the Hall of Fame shared-data implementation. */
export type ImpactStatistic = {
    id: string;
    label: string;
    value: number | string;
    prefix?: string;
};

export type ContributorCategory =
    | "individuals"
    | "african-diaspora"
    | "organizations"
    | "friends-of-africa";

export type Contributor = {
    id: string;
    initiativeId: string;
    name: string;
    country: string;
    quote: string;
    category: ContributorCategory;
    supportLabel: string;
    amountLabel: string;
    amountMinor: number;
    currency: string;
    photoUrl: string;
};

export type Story = {
    id: string;
    slug: string;
    headline: string;
    summary: string;
    category: string;
    date: string;
    imageUrl: string;
    imageAlt: string;
    link?: string;
    readTime?: string;
    heroImageUrl?: string;
    highlights?: string[];
    body?: string[];
};

export type MapCountry = {
    code: string;
    name: string;
    latitude: number;
    longitude: number;
    contributorCount: number;
};
/** Public exposure is separately approved; identity/contact and payment models remain richer. */
export type PublicContributor = Pick<Contributor, 'id' | 'name'> & Partial<Omit<Contributor, 'id' | 'name'>> & {profession?:string;bio?:string};

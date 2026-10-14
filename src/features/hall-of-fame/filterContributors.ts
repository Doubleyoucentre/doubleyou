/** Reused from Abraham's existing Hall of Fame contributor/search implementation. */
import type { PublicContributor, ContributorCategory } from "./types.ts";

export const contributorFilters = [
  { id: "all", label: "All Contributors" },
  { id: "individuals", label: "Individuals" },
  { id: "african-diaspora", label: "African Diaspora" },
  { id: "organizations", label: "Organizations" },
  { id: "friends-of-africa", label: "Friends of Africa" },
] as const satisfies readonly { id: "all" | ContributorCategory; label: string }[];

export type ContributorFilterId = (typeof contributorFilters)[number]["id"];

const categoryLabels: Record<ContributorCategory, string> = {
  individuals: "Individuals",
  "african-diaspora": "African Diaspora",
  organizations: "Organizations",
  "friends-of-africa": "Friends of Africa",
};

export function filterContributors(
  contributors: PublicContributor[],
  query: string,
  category: ContributorFilterId,
): PublicContributor[] {
  const needle = query.trim().toLowerCase();

  return contributors.filter((contributor) => {
    const categoryMatches =
      category === "all" || contributor.category === category;
    if (!categoryMatches) return false;
    if (!needle) return true;

    const profession = contributor.category ? categoryLabels[contributor.category] : '';
    const haystack = [
      contributor.name,
      contributor.country,
      profession,
      contributor.profession,
      contributor.supportLabel,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(needle);
  });
}

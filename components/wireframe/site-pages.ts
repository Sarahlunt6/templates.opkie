/**
 * Single source of truth for the interior pages every template ships as
 * wireframes. Footers (sitemap column), wire shells, and route files all
 * read from this list so the site map can't drift between templates.
 */

export interface SitePage {
  /** URL segment under the template home (e.g. "about" → /t5/about). */
  slug: string;
  /** Short label used in footers and inline links. */
  label: string;
  /** Page title used in metadata and the wireframe H1. */
  title: string;
  /** Meta description base (practice name is appended by the route). */
  description: string;
}

export const SITE_PAGES: SitePage[] = [
  {
    slug: "about",
    label: "About",
    title: "About Us",
    description: "Our story, mission, and the team behind the practice.",
  },
  {
    slug: "services",
    label: "Services",
    title: "Dental Services",
    description:
      "Preventive, cosmetic, restorative, and emergency dental care.",
  },
  {
    slug: "doctors",
    label: "Meet the Doctors",
    title: "Meet the Doctors",
    description: "Doctor profiles, credentials, and philosophy of care.",
  },
  {
    slug: "new-patients",
    label: "New Patients",
    title: "New Patient Information",
    description:
      "What to expect at your first visit, forms, and office policies.",
  },
  {
    slug: "smile-gallery",
    label: "Smile Gallery",
    title: "Smile Gallery",
    description: "Real patient before-and-after results.",
  },
  {
    slug: "financing",
    label: "Financing & Insurance",
    title: "Financing & Insurance",
    description:
      "Insurance plans, membership savings, and flexible payment options.",
  },
  {
    slug: "contact",
    label: "Contact",
    title: "Contact Us",
    description: "Locations, hours, directions, and how to reach the office.",
  },
];

/** Looks up a site page by slug — route files use this for their metadata. */
export function getSitePage(slug: string): SitePage {
  const page = SITE_PAGES.find((entry) => entry.slug === slug);
  if (!page) throw new Error(`Unknown site page slug: ${slug}`);
  return page;
}

/**
 * Builds the href for an interior page relative to the template home.
 * In the template hub, homeHref is "/t1".."/t5" → "/t5/about".
 * In a scaffolded client site, homeHref is "/" (or the prop was omitted,
 * i.e. "") → "/about".
 */
export function pageHref(homeHref: string, slug: string): string {
  if (!homeHref || homeHref === "/") return `/${slug}`;
  return `${homeHref}/${slug}`;
}

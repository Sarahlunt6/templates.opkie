import Link from "next/link";

export default function HomePage() {
  const templates = [
    {
      id: "t1",
      name: "The Clinical Authority",
      subtitle: "Classic Editorial / Prestige Layout",
      tags: ["High-End Cosmetic", "Multi-Doctor Legacy", "Serif Typography"],
    },
    {
      id: "t2",
      name: "The Tech Innovator",
      subtitle: "Modern Digital Clinical Design",
      tags: ["Invisalign Flagships", "Advanced Laser/3D", "Card-Based Interactive"],
    },
    {
      id: "t3",
      name: "The Community & Family Hub",
      subtitle: "Warm, High-Trust, Approachable",
      tags: ["Pediatric & Family", "Dental Phobia Alleviation", "Soft Geometry"],
    },
    {
      id: "t4",
      name: "The Cosmetic Showcase",
      subtitle: "Visual Transformations Focus",
      tags: ["Orthodontics Specialists", "Veneers & Makeovers", "Portfolio Driven"],
    },
    {
      id: "t5",
      name: "The Boutique Concierge",
      subtitle: "Bespoke Oral Wellness Experience",
      tags: ["Holistic / Fee-for-Service", "Biological Dentistry", "Zen-Minimalist"],
    },
  ];

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-mainText mb-4">
            Dental Template Hub
          </h1>
          <p className="text-lg text-neutral-muted max-w-2xl mx-auto">
            Evaluate 5 conversion-optimized layouts designed for dental and orthodontic practices.
            Select a template to preview the full structure.
          </p>
        </header>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/${template.id}`}
              className="group card-elevated p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Template Preview Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl font-serif font-bold text-brand-primary/30">
                  {template.id.toUpperCase()}
                </span>
              </div>

              {/* Template Info */}
              <h2 className="text-xl font-semibold text-brand-mainText group-hover:text-brand-primary transition-colors">
                {template.name}
              </h2>
              <p className="text-sm text-neutral-muted mt-1 mb-3">
                {template.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-brand-accent/20 text-brand-mainText"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <footer className="mt-16 text-center">
          <p className="text-sm text-neutral-muted">
            All templates use neutral default styling. Custom branding and practice data
            are applied post-selection via the theme override system.
          </p>
        </footer>
      </div>
    </main>
  );
}

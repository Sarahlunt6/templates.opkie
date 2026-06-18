export default function HomePage() {
  const templates = [
    { id: "t1", name: "Template 1" },
    { id: "t2", name: "Template 2" },
    { id: "t3", name: "Template 3" },
    { id: "t4", name: "Template 4" },
    { id: "t5", name: "Template 5" },
  ];

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-brand-mainText">
            Select a Template
          </h1>
        </header>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <a
              key={template.id}
              href={`/${template.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden border border-neutral-border hover:border-brand-primary hover:shadow-lg transition-all duration-200"
            >
              {/* Template Preview Image */}
              <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden">
                <img
                  src={`/images/templates/${template.id}-preview.png`}
                  alt={template.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Template Name */}
              <div className="p-4 bg-white">
                <h2 className="text-lg font-medium text-brand-mainText group-hover:text-brand-primary transition-colors text-center">
                  {template.name}
                </h2>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

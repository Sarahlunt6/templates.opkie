export default function HomePage() {
  const templates = [
    { id: "t1", name: "Template 1" },
    { id: "t2", name: "Template 2" },
    { id: "t3", name: "Template 3" },
    { id: "t4", name: "Template 4" },
    { id: "t5", name: "Template 5" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight">
            Choose Your Template
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Click any template to preview
          </p>
        </header>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <a
              key={template.id}
              href={`/${template.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Template Preview Image */}
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img
                  src={`/images/templates/${template.id}-preview.png`}
                  alt={template.name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300" />
              </div>

              {/* Template Name */}
              <div className="px-6 py-5 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                    {template.name}
                  </h2>
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

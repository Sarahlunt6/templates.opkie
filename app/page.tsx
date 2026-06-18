export default function HomePage() {
  const templates = [
    { id: "t1", name: "Template 1" },
    { id: "t2", name: "Template 2" },
    { id: "t3", name: "Template 3" },
    { id: "t4", name: "Template 4" },
    { id: "t5", name: "Template 5" },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                Template Gallery
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Select a template to preview the full design
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {templates.length} templates available
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Template Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {templates.map((template, index) => (
            <a
              key={template.id}
              href={`/${template.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-xl overflow-hidden ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-lg transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              {/* Template Preview Image */}
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img
                  src={`/images/templates/${template.id}-preview.png`}
                  alt={template.name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-slate-900 shadow-sm">
                      Preview Template
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium text-slate-900">
                    {template.name}
                  </h2>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

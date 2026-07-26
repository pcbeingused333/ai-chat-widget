import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Demo banner */}
      <div className="bg-indigo-600 px-4 py-2 text-center text-sm text-white">
        Demo site · click the <span className="font-semibold">💬 chat bubble</span> (bottom-right) to try the AI assistant
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-600">Café Aurora</p>
        <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Specialty coffee &amp; brunch<br />in downtown Toronto
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
          Freshly roasted coffee, all-day brunch, and a dog-friendly patio — a 3-minute walk from Osgoode station.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="#menu" className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-700">
            See the menu
          </a>
          <a href="#visit" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Visit us
          </a>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-center text-2xl font-semibold text-slate-900">On the menu</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "Coffee", items: ["Espresso — $3.00", "Cappuccino — $4.25", "Latte — $4.50", "Oat / almond / soy — +$0.75"] },
              { t: "Brunch (until 2 PM)", items: ["Avocado toast — $12", "Breakfast burrito — $13", "Buttermilk pancakes — $11", "Granola bowl — $10"] },
              { t: "Bakery", items: ["Butter croissant — $3.75", "Banana bread — $4.00", "Gluten-free muffin — $4.25"] },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="mb-3 font-semibold text-indigo-700">{c.t}</h3>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-slate-900">Hours</h2>
            <ul className="space-y-1.5 text-slate-600">
              <li>Monday–Friday · 7:00 AM – 6:00 PM</li>
              <li>Saturday–Sunday · 8:00 AM – 5:00 PM</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-slate-900">Find us</h2>
            <p className="text-slate-600">
              128 Queen Street West, Toronto, ON<br />
              (416) 555-0199 · hello@cafeaurora.example
            </p>
          </div>
        </div>
        <p className="mt-10 rounded-2xl bg-indigo-50 p-4 text-center text-sm text-indigo-800">
          Questions about the menu, hours or dietary options? Ask our AI assistant — the 💬 bubble in the corner.
        </p>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">
        Demo landing page · AI chat widget built by Alex Castillo · Café Aurora is fictional.
      </footer>

      <ChatWidget />
    </main>
  );
}

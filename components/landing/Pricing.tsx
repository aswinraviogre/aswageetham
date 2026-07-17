const plans = [
  { name: "Basic", price: "Free", description: "One event page and simple RSVP." },
  { name: "Premium", price: "$29", description: "Gallery, custom colors, and reminders." },
  { name: "Studio", price: "$79", description: "Multi-event flow with advanced analytics." },
];

export function Pricing() {
  return (
    <section id="pricing" className="rounded-3xl border border-zinc-200 bg-white p-8">
      <h2 className="text-2xl font-bold text-zinc-900">Pricing</h2>
      <p className="mt-2 text-sm text-zinc-600">Choose the plan that fits your celebration.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-1 text-2xl font-bold text-rose-700">{plan.price}</p>
            <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const featureItems = [
  {
    title: "Personalized URL",
    description: "Share a custom invite link such as /invite/riya-arjun.",
  },
  {
    title: "Event Timeline",
    description: "Highlight key moments for your ceremony and reception.",
  },
  {
    title: "Guest RSVP",
    description: "Track confirmations and dietary preferences digitally.",
  },
];

export function Features() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {featureItems.map((item) => (
        <article key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
        </article>
      ))}
    </section>
  );
}

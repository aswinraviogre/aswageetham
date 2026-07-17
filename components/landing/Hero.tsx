import Link from "next/link";

export function Hero() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-rose-100 to-orange-100 p-8 sm:p-12">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-rose-700">
        Save the Date Platform
      </p>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        Beautiful digital wedding invitations made simple.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-zinc-700 sm:text-lg">
        Create a personalized invite page, share your story, and collect RSVPs in one place.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/invite/riya-arjun"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          Preview Invite
        </Link>
        <a
          href="#pricing"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 hover:bg-white"
        >
          See Pricing
        </a>
      </div>
    </section>
  );
}

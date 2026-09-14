import { notFound } from "next/navigation";

import { invites } from "@/data/invites";
import { ThemeWrapper } from "@/components/invite/ThemeWrapper";

import Link from "next/link";

type InvitePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return invites.map((invite) => ({ slug: invite.slug }));
}

export async function generateMetadata({ params }: InvitePageProps) {
  const { slug } = await params;
  const invite = invites.find((i) => i.slug === slug);

  if (!invite) return {};

  const defaultDesc = `You are cordially invited to the wedding of ${invite.couple} on ${invite.date}.`;

  return {
    title: `Wedding Invitation | ${invite.couple}`,
    description: invite.ogDescription || defaultDesc,
    openGraph: {
      title: `${invite.couple} - Save The Date`,
      description: invite.ogDescription || defaultDesc,
      images: [
        {
          url: invite.ogImage || "/SAVE.png",
          width: 1200,
          height: 630,
          alt: invite.couple,
        },
      ],
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params;
  const invite = invites.find((i) => i.slug === slug);

  if (!invite) notFound();

  if (invite.theme === "kerala" || invite.theme === "christian" || invite.theme === "royal" || invite.theme === "elegant-christian" || invite.theme === "ajay-aparna" || invite.theme === "sreejith-sukanya" || invite.theme === "vishnu-athulya" || invite.theme === "ashwageetham") {
    return <ThemeWrapper invite={invite} />;
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Link href="/" className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black/70 transition-colors border border-white/20 text-sm">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Exit Design
      </Link>
      {/* HERO */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold">{invite.couple}</h1>
        <p className="mt-4">{invite.date}</p>
      </section>

      {/* GALLERY */}
      <section className="grid grid-cols-2 gap-2 p-5">
        {invite.images.map((img, i) => (
          <img key={i} src={img} alt="" className="h-full w-full object-cover" />
        ))}
      </section>

      {/* EVENT */}
      <section className="py-10 text-center">
        <h2 className="text-2xl">Venue</h2>
        <p>{invite.venue}</p>
      </section>

      {/* RSVP */}
      <section className="py-10 text-center">
        <a
          href={`https://wa.me/${invite.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-yellow-400 px-6 py-3 text-black"
        >
          RSVP on WhatsApp
        </a>
      </section>
    </main>
  );
}

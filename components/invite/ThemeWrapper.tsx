"use client";

import dynamic from "next/dynamic";
import type { InviteData } from "@/data/invites";

const KeralaTheme = dynamic(() => import("./KeralaTheme").then(m => m.KeralaTheme), { ssr: false });
const ChristianTheme = dynamic(() => import("./ChristianTheme").then(m => m.ChristianTheme), { ssr: false });
const RoyalTheme = dynamic(() => import("./RoyalTheme").then(m => m.RoyalTheme), { ssr: false });
const ElegantChristianTheme = dynamic(() => import("./ElegantChristianTheme").then(m => m.ElegantChristianTheme), { ssr: false });
const AjayAparnaTheme = dynamic(() => import("./AjayAparnaTheme").then(m => m.AjayAparnaTheme), { ssr: false });

export function ThemeWrapper({ invite }: { invite: InviteData }) {
  if (invite.theme === "kerala") return <KeralaTheme invite={invite} />;
  if (invite.theme === "christian") return <ChristianTheme invite={invite} />;
  if (invite.theme === "royal") return <RoyalTheme invite={invite} />;
  if (invite.theme === "elegant-christian") return <ElegantChristianTheme invite={invite} />;
  if (invite.theme === "ajay-aparna") return <AjayAparnaTheme invite={invite} />;
  return null;
}

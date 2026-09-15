"use client";

import { invites } from "@/data/invites";
import { AswgeeTheme } from "@/components/invite/aswgee";

export function LandingHome() {
  const invite =
    invites.find((i) => i.theme === "ashwageetham") ||
    invites.find((i) => i.slug.includes("aswanth")) ||
    invites[invites.length - 1];

  return <AswgeeTheme invite={invite} />;
}

export default LandingHome;

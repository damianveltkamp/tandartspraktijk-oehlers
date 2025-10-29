import type { HTMLAttributes } from "react";
import type { TeamMemberType } from "./components/TeamMember/TeamMember.types";

export interface TeamProps extends HTMLAttributes<HTMLElement> {
  description: string;
  teamMembers: TeamMemberType[];
  title: string;
}

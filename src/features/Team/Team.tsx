import { isEven } from "@/utils/calculations";
import { TeamMember } from "./components/TeamMember/TeamMember";
import type { TeamMemberType } from "./components/TeamMember/TeamMember.types";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TeamProps extends HTMLAttributes<HTMLElement> {
  description: string;
  teamMembers: TeamMemberType[];
  title: string;
}

export const Team = ({
  title,
  description,
  teamMembers,
  className,
  ...props
}: TeamProps) => {
  return (
    <div
      id="feature-team"
      className={twMerge("flex flex-col gap-30", className)}
      {...props}
    >
      <div className="flex flex-col gap-15 text-center lg:text-left">
        <h2 className="typography-headline-2">{title}</h2>
        <p className="typography-body">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-20 md:grid-cols-3">
        {teamMembers.map(({ name, jobtitle }, index) => {
          const isLastItem = teamMembers.length === index + 1;
          const evenAmountOfTeamMembers = isEven(teamMembers);

          return (
            <TeamMember
              key={name}
              name={name}
              jobtitle={jobtitle}
              shouldBePlacedInTheMiddle={Boolean(
                isLastItem && !evenAmountOfTeamMembers,
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

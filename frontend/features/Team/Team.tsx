import { isEven } from "@/utils/calculations";
import { TeamMember } from "./components/TeamMember/TeamMember";
import { twMerge } from "tailwind-merge";
import type { TeamProps } from "./Team.types";

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
        {teamMembers.map(({ name, jobTitle, jobDescription, image }, index) => {
          const isLastItem = teamMembers.length === index + 1;
          const evenAmountOfTeamMembers = isEven(teamMembers);

          return (
            <TeamMember
              key={name}
              name={name}
              jobTitle={jobTitle}
              jobDescription={jobDescription}
              image={image}
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

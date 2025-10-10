import type { TeamProps } from "@/features/Team/Team.types";
import type { Team } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

export const teamAdapter = (data: null | Team | undefined) => {
  if (!data) return null;

  const teamData: TeamProps = {
    title: data.heading,
    description: data.description,
    teamMembers:
      data.members?.map((teamMember) => {
        const imageSrc = urlForImage(teamMember.image.image).url();

        return {
          name: teamMember.name,
          jobTitle: teamMember.jobTitle,
          jobDescription: teamMember.jobDescription,
          image: {
            src: imageSrc,
            alt: teamMember.image.alt,
          },
        };
      }) ?? [],
  };

  return teamData;
};

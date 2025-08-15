export interface TeamMemberType {
  jobtitle: string;
  name: string;
}

export interface TeamMemberProps extends TeamMemberType {
  shouldBePlacedInTheMiddle: boolean;
}

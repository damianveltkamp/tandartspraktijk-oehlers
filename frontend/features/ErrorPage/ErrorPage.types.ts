import type { ReactNode } from "react";

export interface ErrorPageProps {
  /** Action affordances (a link home, a retry button) rendered under the copy. */
  children?: ReactNode;
  description: string;
  title: string;
}

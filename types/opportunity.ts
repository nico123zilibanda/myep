export type ResourceType = "VIDEO" | "PDF" | "LINK" | null;

export interface Category {
  name: string;
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;

  requirements?: string | null;
  howToApply?: string | null;

  deadline: string;
  location?: string | null;

  isSaved: boolean;

  Category?: Category | null;

  resourceType?: ResourceType;
  resourceUrl?: string | null;
}
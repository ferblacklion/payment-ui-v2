export type Payment = {
  id: string;
  name: string;
  person: string;
  image?: string | null;
  updated?: number;
  datetime: number;
};

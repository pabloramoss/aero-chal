interface SortType {
  title: string;
  value: "lowest" | "highest" | "recent";
}

export const sortByOptions: SortType[] = [
  {
    value: "recent",
    title: "Most Recent",
  },
  {
    value: "lowest",
    title: "Lowest Price",
  },
  {
    value: "highest",
    title: "Highest Price",
  },
];

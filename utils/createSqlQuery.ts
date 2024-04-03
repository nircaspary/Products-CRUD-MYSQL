import { getKeys } from "./getKeys";

export type QueryObj = {
  fields?: string;
  sort?: SortObj;
  page?: number;
  limit?: number;
} & FilterObj;
type SortObj = Record<string, Record<"DESC" | "ASC", string>>;
type FilterObj = Record<string, string | Record<"lt" | "gt" | "lte" | "gte", string>>;

export const createSqlQuery = (tableName: string, query: qs.ParsedQs & QueryObj) => {
  const { fields, sort, limit, page } = query;
  return `SELECT ${fields || "*"} FROM ${tableName}  ${filter(query)}
  ORDER BY ${sort ? `${sortFunc(sort)}` : "createdAt ASC"} 
  ${limit ? `LIMIT ${limit}` : ""} 
  ${page ? `OFFSET ${limit! * (page - 1)}` : ""}`;
};

const transformer = (s: "lt" | "gt" | "lte" | "gte") => {
  switch (s) {
    case "lt":
      return "<";
    case "gt":
      return ">";
    case "lte":
      return "<=";
    case "gte":
      return ">=";
    default:
      return "";
  }
};
const filter = (filterObj: FilterObj) => {
  const queryObj = { ...filterObj };
  const exludedFields = ["page", "sort", "limit", "fields", "search"];
  exludedFields.forEach((field) => delete queryObj[field]);
  if (Object.keys(queryObj).length > 0) {
    const query = `WHERE ${Object.entries(queryObj)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`;
        } else {
          const filterKey = getKeys(value)[0];
          const filterValue = value[filterKey as keyof typeof value];
          return `${key} ${transformer(filterKey)} '${filterValue}'`;
        }
      })
      .join(" AND ")}`;
    return query;
  }
  return "";
};

const sortFunc = (sortingObj: SortObj) => {
  const query = Object.entries(sortingObj)
    .map(([key, value]) => `${value} ${key}`)
    .join("");
  return query;
};

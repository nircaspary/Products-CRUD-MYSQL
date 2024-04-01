export const createSqlQuery = <T extends Object>(obj: T) => {
  const objKeys = Object.keys(obj);
  console.log(objKeys);
  return `(${objKeys.map((key) => `\`${key}\``)}) VALUES (${Array.from(Array(objKeys.length - 1))
    .map(() => "?, ")
    .join("")}?)` as const;
};

function capitaliseFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const toCamelCase = (str: string) =>
  str?.replace(/[-_]+([a-z])/g, (_, char) => char.toUpperCase());

const anyIncludes = (value: string | null, list: string[]) => {
  return !!(
    value && list.find((listValue: string) => value.includes(listValue))
  );
};

function toTitleCase(str: string): string {
  if (!str.includes("_")) {
    return str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
  }

  return str
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toSentenceCase(str: string): string {
  return str.toLowerCase().replace(/(^\s*\w|[.!?] s*\w)/g, function replace(c) {
    return c.toUpperCase();
  });
}

function getRandomString(length: number = 40) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach(number => {
    result += chars[number % chars.length];
  });
  return result;
}

export {
  capitaliseFirstLetter,
  toTitleCase,
  toCamelCase,
  anyIncludes,
  getRandomString,
  toSentenceCase,
};

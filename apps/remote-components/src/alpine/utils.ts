const serializeFunction = (
  key: string,
  value: Function,
  originalObject: Record<string, any>
) => {
  const functionBody = value.toString();
  const isMethod = originalObject.__proto__[key] === value;
  return isMethod
    ? `${key}${functionBody.slice("function".length)}`
    : `${functionBody}`;
};

const serializeValue = (key: string, value: string) =>
  `${key}: ${JSON.stringify(value)}`;

export const serializeAlpineData = (data: Record<string, any>) => {
  const entries = Object.entries(data);

  const serializedEntries = entries.map(([key, value]) => {
    return typeof value === "function"
      ? serializeFunction(key, value, data)
      : serializeValue(key, value);
  });

  const templateLiteralCode = `{\n  ${serializedEntries.join(",\n  ")}\n}`;

  return templateLiteralCode;
};

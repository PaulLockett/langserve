function isAccessibleObject(x: unknown): x is Record<string | number, unknown> {
  return typeof x === "object" && x != null;
}

export function traverseNaiveJsonPath(
  x: unknown,
  path: string | number | Array<string | number>
) {
  const queue = Array.isArray(path) ? path : [path];
  let tmp: unknown = x;
  while (queue.length > 0) {
    const first = queue.shift()!;
    if (first === "") continue;
    if (Array.isArray(tmp)) {
      tmp = tmp[+first];
    } else if (isAccessibleObject(tmp)) {
      tmp = tmp[first];
    } else {
      return undefined;
    }
  }

  return tmp;
}

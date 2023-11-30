// @ts-check
const matchFlag = new RegExp(/^-*/);
/**
 * @description - Converts an array of arguments into an object.
 * @param {string[]} args - An array of arguments, defaults to `process.argv`.
 * @returns {Record<string, string>} - An object with the arguments as keys and their values as values.
 * */
export const deserializeArgumentList = /* # __PURE__ */ (
  args = process.argv,
  start = 2
) => {
  /** @type {Record<string, string>} */
  const res = {};
  let name = '';
  let indexOf = 0;
  for (let i = start; i < args.length; i++) {
    const [match] = /** @type {RegExpMatchArray} */ (args[i].match(matchFlag));
    if (!match.length) {
      continue;
    }

    name = args[i].slice(match.length);
    indexOf = name.indexOf('=');
    if (indexOf > -1) {
      res[name.slice(0, indexOf)] = name.slice(indexOf + 1);
    } else if (name && i + 1 < args.length && !args[i + 1].startsWith('-')) {
      i++;
      res[name] = args[i];
    } else {
      res[name] = 'true';
    }
  }

  return res;
};

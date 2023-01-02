/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import tty from "tty";

const colors = {
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  grey: "\x1b[90m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",

  value: "",
};

const proxy = {
  get: (object, property) => {
    if (property === "value") {
      return (value: string) => `${colors.value}${value}\x1b[0m`;
    } else {
      const nProxy = new Proxy({ ...colors, value: "" }, proxy);
      colors.value += colors[property] as string;
      return nProxy;
    }
  },
};

export default new Proxy(colors, {
  get: (object, property) => {
    if (property === "value") {
      return (value: string) => `${colors.value}${value}\x1b[0m`;
    } else {
      const nProxy = new Proxy(colors, proxy);
      colors.value += colors[property] as string;
      return nProxy;
    }
  },
});

/**
 * This codeblock originated from the NPM package "picocolors" by alexayraspopov
 *
 * picocolors links:
 *
 * - Github: https://github.com/alexeyraspopov/picocolors
 * - NPM: https://www.npmjs.com/package/picocolors
 * - Author: https://github.com/alexeyraspopov
 *
 * Thank you alexayraspopov!
 */
export const isColorSupported =
  !("NO_COLOR" in process.env || process.argv.includes("--no-color")) &&
  ("FORCE_COLOR" in process.env ||
    process.argv.includes("--color") ||
    process.platform === "win32" ||
    ((Boolean(tty.isatty(1))) && process.env.TERM !== "dumb") ||
    "CI" in process.env);

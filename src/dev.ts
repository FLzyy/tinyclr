import tinyclr, { isColorSupported } from "./index.js";

console.log(isColorSupported);
console.log(tinyclr.bold.underscore.red.bgWhite.value("Hello World!"));

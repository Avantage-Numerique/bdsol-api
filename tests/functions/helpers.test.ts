import {Str} from "../../src/helpers";

const baseString = "Sur la place et dans le pré-plein de rage à_gagner le temps que j'ai donné _ ou sur la place granger ?";
console.log("Test Str helper");
console.log("camel", Str.camel(baseString));
console.log("studly", Str.studly(baseString));
console.log("snake", Str.snake(baseString));
console.log("kebab", Str.kebab(baseString));
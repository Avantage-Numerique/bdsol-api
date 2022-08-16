
//  String helpers

/**
 *  String helpers to manage string in dynamic calling and sanitization contexte.
 *  Like changing a camel case to a Studly case. Or a snake case to a kebab case.
 *  Really close to the Laravel implementation for their Support Str helper
 *  Could use lodash for casing ?
 *  @features
 *  string caching, help for multiple call on the same string.
 */
export class Str {

    public static cache:any;
    public static SEPARATE_WORDS = /^(.)|\s+(.)/g;
    public static POSSIBLE_SLUG_CHAR = /._|-/g;
    public static NO_SPACE = /\s+/g;
    public static ALLOW_CHAR = /[^A-Z0-9\s]+/ig;
    public static EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    public static URL = /[a-z0-9]/g;//use this for the slug function : https://www.npmjs.com/package/any-ascii


    public static DELIMITERS:any = {
        "underscore": "_",
        "dash": "-",
        "none": ""
    }

    private static initCache(scope:string, key:string)
    {
        if (Str.cache === undefined) {
            Str.cache = {};
        }
        if (Str.cache[scope] === undefined) {
            Str.cache[scope] = {};
        }
        if (Str.cache[scope][key] === undefined) {
            Str.cache[scope][key] = {};
        }
        return Str.cache[scope];
    }


    public static camel(str:string):string {
        const key:string = str;
        const cacheScope = Str.initCache("camel", key);

        if (cacheScope[key] !== undefined &&
            typeof cacheScope[key] === "string") {
            return cacheScope[key];
        }

        return cacheScope[key] = Str.firstCharUpper(Str.studly(str));
    }


    /**
     * Change the string to the kebab case (with all word separated to word-word-word)
     * This function uses the snake method with the - delimiter param
     * @param str {string} the string to be change into X format.
     */
    public static kebab(str:string):string {
        return Str.snake(str, "dash");
    }


    /**
     * Change the string with all word separated to word_word_word all lower case
     * Used too for the Kebab casing : word-word-word
     * @param str {string} the string to be change into X format.
     * @param delimiter {string} Will seperate all the the word with that character. Snake is _ and kebab is -.
     */
    public static snake(str:string, delimiter="underscore"):string
    {
        const key:string = str;
        const cacheScope = Str.initCache("snake", key);

        if (cacheScope[key] !== undefined &&
            cacheScope[key][delimiter] !== undefined) {
            return cacheScope[key][delimiter];
        }

        str = Str.allowedChars(str);

        if (!Str.isLower(str)) {
            str = Str.upperCaseWords(str);
        }

        str = str.replace(Str.NO_SPACE, '');
        str = Str.lower(
            str.replace(
                /(.)(?=[A-Z])/g,
                '$1' + Str.DELIMITERS[delimiter])
        );

        return cacheScope[key][delimiter] = str;
    }

    /**
     * Change a string to a studly casing : ChangeAStringToAStudlyCasing.
     * @param str {string} The string to parse.
     */
    public static studly(str:string):string
    {
        const key:string = str;
        const cacheScope = Str.initCache("studly", key);

        if (cacheScope[key] !== undefined &&
            typeof cacheScope[key] === "string") {
            return cacheScope[key];
        }
        str = Str.allowedChars(str);
        str = str.replace(Str.POSSIBLE_SLUG_CHAR, " ");
        str = Str.upperCaseWords(str).replace(" ", "");

        return cacheScope[key] = str.replace(Str.NO_SPACE, "");
    }


    public static lower(str:string):string {
        return str.toLowerCase();
    }

    public static isLower(str:string):boolean {
        return str === str.toLowerCase();
    }

    /**
     * Could be usefull but it's the same as Lower.
     * @param str
     */
    public static isAllCharsAre(str:string):boolean {
        let isIt = false;
        for (const char of str) {
            if (char === " ") continue;
            isIt = char === char.toLowerCase() && isIt;
        }
        return isIt;
    }

    public static upper(str:string):string {
        return str.toUpperCase();
    }

    public static isUpper(str:string):boolean {
        return str === str.toUpperCase();
    }

    public static slug(str:string, sep:string = "-") {
        return Str.snake(str, sep);
    }

    /**
     * Change every word first letter to uppercase
     * This is ucwords in typescript by Matt Stypa https://github.com/MattStypa/ucwords-js/blob/master/src/ucwords.js
     * to avoid adding a dependency for this. npm package : https://www.npmjs.com/package/ucwords
     * @param str {string} the string to change to Cap Word.
     */
    public static upperCaseWords(str:string)
    {
        return str.replace(Str.SEPARATE_WORDS, function(match) {
            return match.toUpperCase();
        });
    }

    public static firstCharUpper(str:string) {
        return str.charAt(0).toLowerCase() + str.substring(1, str.length);
    }

    public static allowedChars(str:string):string {
        return str.replace(Str.ALLOW_CHAR, "");
    }

    public static noSpaces(str:string):string {
        return str.replace(Str.NO_SPACE, "")
    }

}
class Rules{

    /**
     * @enum - Message d'erreur de bris de règle.
    */
    static ruleErrorMsg = {
        isDefined: "isDefined : n'est pas définie (typeof == undefined).",
        isString: "isString : n'est pas un string (typeof != 'string').",
        isNotEmpty: "isNotEmpty : est vide. ( == '' )"
    }

    /**
     * @method isDefined - Vérifie si la valeur est définie ( typeof != undefined )
     */
    static isDefined(value:any):boolean {
        return typeof value != undefined && value != null;
    }

    /**
     * @method isNotNull - Vérifie si la valeur est non nulle ( != null ) 
     */
    static isNotNull(value:any):boolean {
        return value !== null;
    }

    /**
     * @method isString - Vérifie si la valeur est un string ( typeof == "string" )
     */
    static isString(value:any):boolean {
        return typeof value == "string";
    }

    /**
     * @method isNotEmpty - Vérifie si la valeur est string et non vide ( != "" )
     */
    static isNotEmpty(value:any):boolean {
        return this.isString(value) && value != "";
    }

    /**
     * @method minLength - Vérifie si c'est un string, d'une longueur plus grand ou égal au paramètre
     */
    static minLength(value:any):boolean {
        return true;
    }
}


export default Rules;
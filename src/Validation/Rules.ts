class Rules{

    /**
     * @enum - Message d'erreur de bris de règle.
    */
    static ruleErrorMsg = {
        isDefined: "isDefined : n'est pas définie (typeof == undefined || == null).",
        isNotNull: "isNotNull : est null. ( != null)",
        isString: "isString : n'est pas un string (typeof != 'string').",
        isNotEmpty: "isNotEmpty : est vide. ( == '' )",
        minLength: "minLength : n'a pas la longueur minimale requise ou n'est pas un string.",
        maxLength: "maxLength : dépasse la longueur maximal permise ou n'est pas un string.",
        idValid: "idValid : L'id fournit n'est pas valide (.length != 24).",
        isObject: "isObject : n'est pas un objet (typeof != 'object')."
    }

    /**
     * @method isDefined - Vérifie si la valeur est définie ( typeof != undefined )
     */
    static isDefined(value:any):boolean {
        return typeof value != undefined;
    }

    /**
     * @method isNotNull - Vérifie si la valeur est non nulle ( != null ) 
     */
    static isNotNull(value:any):boolean {
        if (this.isDefined(value))
            return value !== null;
        return true;
    }

    /**
     * @method isString - Vérifie si la valeur est un string ( typeof == "string" )
     */
    static isString(value:any):boolean {
        if (this.isDefined(value))
            return typeof value == "string";
        return true;
    }

    /**
     * @method isNotEmpty - Vérifie si la valeur est string et non vide ( != "" )
     */
    static isNotEmpty(value:any):boolean {
        if (this.isDefined(value))
            return this.isString(value) && value != "";
        return true;
    }

    /**
     * @method minLength - Vérifie si c'est un string, d'une longueur plus grand ou égal au paramètre
     */
    static minLength(value:any, length:number):boolean {
        if (this.isDefined(value))
            return this.isString(value) && value.length >= length;
        return true;
    }

    /**
     * @method maxLength - Vérifie si c'est un string, d'une longueur plus petit ou égal au paramètre
     */
    static maxLength(value:any, length:number):boolean {
        if (this.isDefined(value))
            return this.isString(value) && value.length <= length;
        return true;
    }

    /**
     * @method maxLength - Vérifie qu'un id est présent et valide
     */
    static idValid(value:any):boolean {
        if (this.isDefined(value))
            return value.length == 24;
        return true;
    }

    /**
     * @method isObject - Vérifie que la valeur est un object
     */
    static isObject(value:any):boolean {
        if (this.isDefined(value))
            return typeof value == 'object';
        return true;
    }
    
}


export default Rules;

interface RuleHandler {
    setNext(handler: RuleHandler): RuleHandler;

    handle(rule:string, value:any, param?:any): string;

    errMsg:string;
}

abstract class AbstractRuleHandler implements RuleHandler {
    private nextHandler: RuleHandler;

    public setNext(handler: RuleHandler): RuleHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(rule: string, value:any, param?:any): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(rule, value, param);
        }

        return "\nLa règle "+rule+ "n'est pas implémentée.";
    }

    errMsg:string;
}

export class isDefined extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "isDefined") {
            if (value !== undefined && typeof value !== 'undefined')
                return "OK";
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "isDefined : n'est pas définie (typeof == undefined || == null).";
}

export class isNotNull extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "isNotNull") {
            if (value !== null)
                return "OK";
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "isNotNull : est null. ( != null)";
}

export class isString extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "isString") {
            if (typeof value == "string")
                return "OK";
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "isString : n'est pas un string (typeof != 'string').";
}

export class isNotEmpty extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "isNotEmpty") {
            if (typeof value == "string" && value != "")
                return "OK";
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "isNotEmpty : est vide. ( == '' )";
}

export class minLength extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "minLength") {
            if (typeof value == "string" && value.length >= param)
                return "OK";
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "minLength : n'a pas la longueur minimale requise ou n'est pas un string.";
}

export class maxLength extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "maxLength") {
            if (typeof value == "string" && value.length <= param)
                return "OK";
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "maxLength : dépasse la longueur maximal permise ou n'est pas un string.";
}

export class idValid extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "idValid") {
            if (typeof value == "string" && value.length == 24)
                return "OK"
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "idValid : L'id fournit n'est pas valide (.length != 24).";
}

export class isObject extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "isObject") {
            if (typeof value == 'object')
                return "OK"
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "isObject : n'est pas un objet (typeof != 'object').";
}

export class objectNotEmpty extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "objectNotEmpty") {
            if (value !== undefined && typeof value !== 'undefined')
                return "OK";
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "objectNotEmpty : l'objet à traiter ne contient aucun champs";
}

export class isDate extends AbstractRuleHandler {
    public handle(rule:string, value:any, param?:any) :string {
        if (rule === "isDate") {
            const date = new Date(value);
            if (date instanceof Date && !isNaN(date.valueOf()))
                return "OK"
            return this.errMsg;
        }
        return super.handle(rule, value, param);
    }
    public errMsg = "isDate : n'est pas une date ou du bon format.";
}



class EnumHelper {

    public static enumToStringArray (baseEnum:any) {
        return Object.values(baseEnum)
    }

    public static enumToSelectOptions (baseEnum:any) {
        const selectOptions:any[] = [];
        Object.keys(baseEnum).forEach( (el:any) => {
            selectOptions.push( { value : baseEnum[el], label : el} )
        });
    }
}

export default EnumHelper;
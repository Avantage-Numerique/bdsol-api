

class EnumHelper {

    public static enumToStringArray (baseEnum:any) {
        return Object.values(baseEnum)
    }

    public static enumToSelectOptions (baseEnum:any) {
        const selectOptions:any[] = [];
        Object.keys(baseEnum).forEach( (el:any) => {
            //Not returning empty string element as option to select, but allow enum to accept "" for non required if select is blank.
            if(el == "")
                return;
            selectOptions.push( { value : baseEnum[el], label : el} )
        });
        return selectOptions;
    }
}

export default EnumHelper;
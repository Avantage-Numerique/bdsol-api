import { insertBadgeInArray, removeBadgeInArray } from "./MiddlewareInsertBadges";

class BadgeTypes {

    /**
     * @param CB{any}
     * @method CB.condition
     */
    static badges:any =
    {
        CB :
        {
            name: "CB",
            fullName: "Croissant Boréal",
            label: "Croissant Boréal",
            iconPath: "",
            iconAlt: "",
            iconDescription: "",
            condition(document:any){
                if(document?.region !== undefined){
                    if(BadgeTypes.badges.CB.acceptedRegion.includes(document.region))
                        insertBadgeInArray(document.badges, "CB");
                    else
                        removeBadgeInArray(document.badges, "CB");
                }
            },
            acceptedRegion:["abitibi-temiscamingue", "north Ontario", "baies-james"],
            type:"Badge"
        }
    }

    static allBadgeTypes(){
        return Object.keys(this.badges)
    }
}

export default BadgeTypes
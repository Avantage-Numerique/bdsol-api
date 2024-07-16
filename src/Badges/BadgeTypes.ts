import { insertBadgeInArray, removeBadgeFromArray } from "./MiddlewareInsertBadges";

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
            description: "se trouve sur le croissant boréal",
            iconPath: "/badges-icons/badge-croissant-boreal.svg",
            iconAlt: "Badge Croissant Boréal",
            iconDescription: "",
            condition(document:any){
                if(document?.region !== undefined){
                    if(BadgeTypes.badges.CB.acceptedRegion.includes(document.region))
                        insertBadgeInArray(document.badges, "CB");
                    else
                        removeBadgeFromArray(document.badges, "CB");
                }
            },
            acceptedRegion:["abitibi-temiscamingue", "north Ontario", "baies-james"],
            type:"Badge"
        }
    }

    static allBadgeTypes(){
        return Object.keys(this.badges)
    }

    static populateBadgesArray(document:any){
        //If badges exist
        const populatedBadge :any = [];
        if(Array.isArray(document.badges) && document.badges.length > 0)
        {
            document.badges.forEach((elem: any) => {
                if(BadgeTypes.badges?.[elem] !== undefined){
                    populatedBadge.push(BadgeTypes.badges[elem])
                }
            });
        }
        document.badges = populatedBadge;
        return;
    }
}

export default BadgeTypes
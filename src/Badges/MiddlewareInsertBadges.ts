import BadgeTypes from "./BadgeTypes";

/**
 * Takes and verify informations of document and insert badges
 * 
 */
export const middlewareInsertBadges = (document: any) => {

    //Define badges as an empty array if not defined
    if(document?.badges === undefined)
        document.badges = [];

    
    BadgeTypes.allBadgeTypes().forEach(elem => {
        BadgeTypes.badges[elem].condition(document);
    })
}

export const insertBadgeInArray = (badgesArray:[string], badgeType:string) => {
    //if badgeType is not included, insert it
    if(!badgesArray.includes(badgeType))
        badgesArray.push(badgeType);
}

export const removeBadgeFromArray = (badgesArray:[string], badgeType:string) => {
    //if badgeType is in array
    if(badgesArray.includes(badgeType)){
        const index = badgesArray.indexOf(badgeType);
        //Remove badge from array
        badgesArray.splice(index, 1);
    }

}

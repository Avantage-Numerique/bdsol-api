
export const defaultUserEmailWelcome:string = "Cher canard";
export const getUserWelcome = (userDocument:any) => {
    let welcomeName = defaultUserEmailWelcome;
    const properties:Array<string> = ["firstName", "name", "lastName"];
    for (const property of properties) {
        if (userDocument[property] && typeof userDocument[property] === "string" && userDocument[property] !== "") {
            welcomeName = userDocument[property];
            break;
        }
    }
    return welcomeName;
}
import { StatusStates } from "../../Moderation/Schemas/StatusSchema";

export const fakePersons = [
    {
        //slug: "patrick-watson",
        lastName:"Watson",
        firstName:"Patrick",
        nickname:"PoW",
        description:"Chanteur",
        "status": {
            "state":StatusStates.accepted,
            "lastModifiedBy":"000000000000000000000000"
        }
    },
    {
        //slug: "jean-marc-parent",
        lastName:"Parent",
        firstName:"Jean-Marc",
        nickname:"Mickette",
        description:"Humour",
        "status": {
            "state":StatusStates.accepted,
            "lastModifiedBy":"000000000000000000000000"
        }
    }
];
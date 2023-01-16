import { StatusStates } from "../../Database/Schemas/StatusSchema";

export const fakePersons = [
    {
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
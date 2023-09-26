import {MetaStates} from "../../Moderation/Schemas/MetaSchema";

export const fakePersons = [
    {
        //slug: "patrick-watson",
        lastName:"Watson",
        firstName:"Patrick",
        nickname:"PoW",
        description:"Chanteur",
        "meta": {
            "state":MetaStates.accepted,
            "lastModifiedBy":"000000000000000000000000"
        }
    },
    {
        //slug: "jean-marc-parent",
        lastName:"Parent",
        firstName:"Jean-Marc",
        nickname:"Mickette",
        description:"Humour",
        "meta": {
            "state":MetaStates.accepted,
            "lastModifiedBy":"000000000000000000000000"
        }
    }
];
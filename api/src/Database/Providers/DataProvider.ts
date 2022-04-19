import Provider, {BaseProvider} from "./Provider";


export class DataProvider extends BaseProvider implements Provider {

    constructor(name='data') {
        super(name);
    }

}
import {Service} from "../../Database/Service";
import AbstractModel from "../Model";

export interface ControllerContract {
    service: Service;
    name: string;
    entity: AbstractModel;
}
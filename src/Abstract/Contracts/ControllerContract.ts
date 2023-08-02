import {Service} from "../../Database/Service";
import AbstractModel from "../Model";

export interface ControllerContract {
    service: Service;
    entity: AbstractModel;
}
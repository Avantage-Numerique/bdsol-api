import {Service} from "@database/Service";
import AbstractModel from "@core/Model";

export interface ControllerContract {
    service: Service;
    entity: AbstractModel;
}
import type {Service} from "../Service";

export default interface SeederTaskContract {
    service: Service,
    data: any,
    whereKeys: any
}
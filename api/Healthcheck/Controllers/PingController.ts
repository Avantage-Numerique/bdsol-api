
interface PingResponse {
    message: string;
}

//set http headers 200,500, etc here ?

export default class PingController {
    public async getMessage(): Promise<PingResponse> {
        return {
            message: "pong",
        };
    }
}

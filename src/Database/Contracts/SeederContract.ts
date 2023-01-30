
export interface SeederContract {
    up: (entity:string) => Promise<void>;
    onUp: (error:any, result:any) => void;
    down: () => Promise<void>;
    onDown: (error:any, result:any) => void;
    seed: (data:any) => Promise<void>;
}
import schedule from "node-schedule";

interface JobSheet {
    name:string;
    messages?:any;
    callback:any;
    rule:schedule.RecurrenceRule;
}

class Sheet implements JobSheet {
    public name:string;
    public messages:any;
    public callback:any;
    public rule:schedule.RecurrenceRule;

    constructor(jobParams:any) {
        this.name = jobParams.name;
        this.messages = jobParams.messages;
        this.callback = jobParams.callback;
        this.rule = jobParams.rule;
    }

    public run() {

    }
}

export {Sheet, JobSheet}
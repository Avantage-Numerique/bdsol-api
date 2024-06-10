import schedule, {Job} from "node-schedule";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

interface JobSheet {
    name:string;
    messages?:any;
    callback:any;
    rule:schedule.RecurrenceRule;
    scheduledJob:Job;
    schedule: () => Job;
}

class Sheet implements JobSheet {
    public name:string;
    public messages:any;
    public callback:any;
    public rule:schedule.RecurrenceRule;
    public scheduledJob:Job;

    constructor(jobParams:any) {
        this.name = jobParams.name;
        this.messages = jobParams.messages;
        this.callback = jobParams.callback;
        this.rule = jobParams.rule;
    }

    public schedule() {
        this.scheduledJob = schedule.scheduleJob(this.name, this.rule, this.callback);
        this._registerEvents();
        return this.scheduledJob;
    }


    /**
     * A `run` event after each execution.
     * A `scheduled` event each time they're scheduled to run.
     * A `canceled` event when an invocation is canceled before it's executed.
     * Note that canceled is the single-L American spelling.
     * An `error` event when a job invocation triggered by a schedule throws or returns a rejected Promise.
     * A `success` event when a job invocation triggered by a schedule returns successfully or returns a resolved Promise. In any case, the success event receives the value returned by the callback or in case of a promise, the resolved value.
     */
    private _registerEvents() {
        console.log("Job's Sheet : registering events");
        this.scheduledJob.addListener("run", this.onRun);
        this.scheduledJob.addListener("scheduled", this.onScheduled);
        this.scheduledJob.addListener("canceled", this.onCanceled);
        this.scheduledJob.addListener("error", this.onError);
        this.scheduledJob.addListener("success", this.onSuccess);
    }

    private _unregisterEvents() {
        console.log("Job's Sheet : **un**registering events");
        this.scheduledJob.removeListener("run", this.onRun);
        this.scheduledJob.removeListener("scheduled", this.onScheduled);
        this.scheduledJob.removeListener("canceled", this.onCanceled);
        this.scheduledJob.removeListener("error", this.onError);
        this.scheduledJob.removeListener("success", this.onSuccess);
    }

    public onRun(e:Event) {
        LogHelper.debug("OnRUn", e);
    }

    public onScheduled(e:Event) {
        LogHelper.debug("OnScheduled", e);
    }

    public onCanceled(e:Event) {
        LogHelper.debug("OnCanceled", e);
    }

    public onError(e:Event) {
        LogHelper.debug("OnError", e);
    }

    public onSuccess(e:Event) {
        LogHelper.debug("OnSuccess", e);
    }


}

export {Sheet, JobSheet}
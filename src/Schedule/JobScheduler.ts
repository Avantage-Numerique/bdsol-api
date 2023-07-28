import schedule from 'node-schedule';
import {TestJob} from "@src/Schedule/Jobs/TestJob";

class JobScheduler {

    public jobs:Array<any>;
    public defaultIntervale:string;
    public defaultRule:schedule.RecurrenceRule;

    constructor() {
        this.jobs = [];
        this.defaultRule = new schedule.RecurrenceRule();
        this.defaultRule.second = 5;
        this.defaultIntervale = '5 * * * * *';
    }

    public init() {
        console.log("Job scheduler  :  init");
        this.add(TestJob);

        this.schedule();
    }

    public schedule() {
        console.log("Job scheduler  :  schedule");
        if (this.jobs.length > 0) {
            for (const job of this.jobs) {
                console.log("Job scheduler  :  schedule", job.rule, job.callback);
                schedule.scheduleJob(job.rule, job.callback);
            }
        }
        this._registerEvents();
    }

    private _registerEvents() {
        console.log("Job scheduler  :  register events");
    }

    private _down() {
        //schedule.gracefulShutdown();
    }

    public add(job:any, rule:schedule.RecurrenceRule|string=this.defaultRule) {
        console.log("Job scheduler  :  add");
        this.jobs.push({
            callback: job,
            rule: rule
        });
    }

}
export default JobScheduler;
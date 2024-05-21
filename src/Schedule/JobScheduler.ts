import schedule, {Job} from 'node-schedule';
import {JobSheet, Sheet} from "@src/Schedule/Sheet";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

/**
 * Help mananging the task preparation for the node-scheduler.
 * With job's sheet we prepare job to be schedule in the node-schedule.
 */
class JobScheduler {

    public jobs:Array<JobSheet>;
    public scheduledJobs:Array<Job>;
    public defaultIntervale:string;
    public defaultRule:schedule.RecurrenceRule;
    public defaultTestRule:schedule.RecurrenceRule;

    constructor() {
        this.jobs = [];
        this.scheduledJobs = [];
        this.defaultRule = new schedule.RecurrenceRule();
        this.defaultTestRule = new schedule.RecurrenceRule();
        /**
         * recurs: true,
         * year: null,
         * month: null,
         * date: null,
         * dayOfWeek: null,
         * hour: null,
         * minute: null,
         * second: 5
         */
        //this.defaultRule.hour = 12;
        //this.defaultRule.minute = 1;
        this.defaultRule.minute = 15;
        //this.defaultTestRule.second = 2;
        this.defaultIntervale = '* /5 * * * *';
    }


    public init(sheets:Array<JobSheet>=[]) {
        if (sheets.length > 0) {
            for (const sheet of sheets) {
                this.add(sheet);
            }
            LogHelper.info(`[SCHEDULER] Initiated with ${this.jobs.length}`);
            this.schedule();
            return;
        }
        LogHelper.info(`[SCHEDULER] No jobSheet to schedule.`);
    }


    public schedule() {
        if (this.jobs.length > 0) {
            for (const sheet of this.jobs) {
                this.scheduledJobs.push(sheet.schedule());
            }
        }
        LogHelper.info(`[SCHEDULER] ${this.jobs.length} sheet registered.`);
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
        //console.log("Job scheduler  :  register events");

    }


    private async _down() {
        LogHelper.info(`[SCHEDULER] gracefulShutdown`);
        await schedule.gracefulShutdown();
    }


    public createSheet(name:string, jobCallback:any, rule:schedule.RecurrenceRule=this.defaultRule, message:string="") {
        console.log("[SCHEDULER] CreateSheet", name, "rule", rule);
        return new Sheet({
            name: name,
            rule: rule,
            callback: jobCallback,
            message:message
        });
    }

    public add(sheet:JobSheet) {
        this.jobs.push(sheet);
    }

    public createRule(param:string, value:number):schedule.RecurrenceRule {
        const rule:schedule.RecurrenceRule = new schedule.RecurrenceRule();
        Object.assign(rule, {[param]: value});
        return rule;
    }

}
export default JobScheduler;
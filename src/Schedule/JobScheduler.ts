import schedule from 'node-schedule';
import {JobSheet, Sheet} from "@src/Schedule/Sheet";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

/**
 * Help mananging the task preparation for the node-scheduler.
 * With job's sheet we prepare job to be schedule in the node-schedule.
 */
class JobScheduler {

    public jobs:Array<JobSheet>;
    public defaultIntervale:string;
    public defaultRule:schedule.RecurrenceRule;
    public defaultTestRule:schedule.RecurrenceRule;

    constructor() {
        this.jobs = [];
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
        this.defaultRule.hour = 12;//it minutes in fact.
        this.defaultTestRule.second = 2;//it minutes in fact.
        this.defaultIntervale = '5 * * * * *';
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
        LogHelper.info(`[SCHEDULER] Initiation because there is no jobSheet to schedule.`);
    }


    public schedule() {
        if (this.jobs.length > 0) {
            for (const sheet of this.jobs) {
                schedule.scheduleJob(sheet.name, sheet.rule, sheet.callback);
            }
        }
        LogHelper.info(`[SCHEDULER] ${this.jobs.length} sheet registered.`);
        //this._registerEvents();
    }


    private _registerEvents() {
        //console.log("Job scheduler  :  register events");
    }


    private async _down() {
        LogHelper.info(`[SCHEDULER] gracefulShutdown`);
        await schedule.gracefulShutdown();
    }


    public createSheet(name:string, jobCallback:any, rule:schedule.RecurrenceRule=this.defaultRule, message:string="") {
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
        console.log("createRule", rule);
        return rule;
    }

}
export default JobScheduler;
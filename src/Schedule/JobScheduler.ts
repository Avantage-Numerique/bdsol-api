import schedule from 'node-schedule';
import {JobSheet, Sheet} from "@src/Schedule/Sheet";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

class JobScheduler {

    public jobs:Array<JobSheet>;
    public defaultIntervale:string;
    public defaultRule:schedule.RecurrenceRule;

    constructor() {
        this.jobs = [];
        this.defaultRule = new schedule.RecurrenceRule();
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
        this.defaultRule.second = 1;//it minutes in fact.
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
        console.log("Job scheduler  :  schedule");
        if (this.jobs.length > 0) {
            for (const sheet of this.jobs) {
                console.log("Job scheduler  :  schedule",sheet.name,  sheet.rule, sheet.callback);
                schedule.scheduleJob(sheet.name, sheet.rule, sheet.callback);
            }
        }
        LogHelper.info(`[SCHEDULER] ${this.jobs.length} sheet registered.`);
        //this._registerEvents();
    }


    private _registerEvents() {
        console.log("Job scheduler  :  register events");
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
        console.log("Job scheduler  :  add");
        this.jobs.push(sheet);
    }

}
export default JobScheduler;
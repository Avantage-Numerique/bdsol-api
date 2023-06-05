import SeederTaskContract from "../Seeders/SeederTaskContract";
import SeedData from "../Seeders/seed-data";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

const taskSeeder = async (tasks:Array<SeederTaskContract>, seederClass:typeof SeedData = SeedData) => {

    //Loop through the services that need to be seeded
    for (const task of tasks) {

        LogHelper.info(`[BD][SEEDERS][SEEDING][LOOPING] task`);
        try {
            const seeder = new seederClass(task.service, task.data, task.whereKeys);
            LogHelper.info(`[BD][SEEDERS][SEEDING] task`);//${task.service.constructor.name} with ${task.data.constructor.name}
            await seeder.up();
        } catch (e: any) {
            LogHelper.raw(`[BD][SEEDERS][SEEDING][ERROR] Can't seed`, e);// ${task.service.constructor.name} with ${task.data.constructor.name}
            throw e;
        }
    }
}

export {taskSeeder};
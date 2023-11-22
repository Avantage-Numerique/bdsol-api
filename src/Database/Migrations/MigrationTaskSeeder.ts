import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import SeedData from "@database/Seeders/SeedData";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

const taskSeeder = async (tasks:Array<SeederTaskContract>, seederClass:typeof SeedData = SeedData) => {
    //Loop through the services that need to be seeded
    for (const task of tasks) {
        LogHelper.info("[Migration][Seeding] Creating the the seeder with task data");
        const seeder = new SeedData(task.service, task.data, task.whereKeys);
        await seeder.up();
    }
}

export {taskSeeder};
import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import SeedData from "@database/Seeders/SeedData";

const taskSeeder = async (tasks:Array<SeederTaskContract>, seederClass:typeof SeedData = SeedData) => {
    //Loop through the services that need to be seeded
    for (const task of tasks) {
        try {
            const seeder = new SeedData(task.service, task.data, task.whereKeys);
            await seeder.up();
        } catch (e: any) {
            throw e;
        }
    }
}

export {taskSeeder};
import SeederTaskContract from "../Seeders/SeederTaskContract";
import SeedData from "../Seeders/seed-data";

const taskSeeder = async (tasks:Array<SeederTaskContract>, seederClass:typeof SeedData = SeedData) => {
    //Loop through the services that need to be seeded
    for (const task of tasks) {
        try {
            const seeder = new seederClass(task.service, task.data, task.whereKeys);
            await seeder.up();
        } catch (e: any) {
            throw e;
        }
    }
}

export {taskSeeder};

// Import your models here

import LogHelper from "../src/Monitoring/Helpers/LogHelper";

export async function up (): Promise<void> {
  LogHelper.info("Migrating initiated");
}
export async function down (): Promise<void> {
    LogHelper.info("Migrating down.");
}
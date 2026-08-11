import { PasswordsController } from "../Controllers/PasswordsController";

export class HashingMiddleware {
    public static handler(): any {
        return async function () {
            if (!this.isModified("password")) return;
            this.password = await PasswordsController.hash(this.password);
        };
    }

    public static findOneAndUpdateHandler(): any {
        return async function () {
            const updatedEntry: any = this.getUpdate();

            if (updatedEntry.password === undefined) return;
            updatedEntry.password = await PasswordsController.hash(updatedEntry.password);
        };
    }
}

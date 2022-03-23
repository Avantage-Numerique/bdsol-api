
const data = require("../../../../data/users");

class UserController
{
    #users;

    getUser($userId) {
        if (!this.#users) {
            this.#users = require("../../../../data/users");
        }
        return this.#users;
    }

    async get() {
        return new Promise((resolve, _) => resolve(data));
    }

    async
}
module.exports = UserController;
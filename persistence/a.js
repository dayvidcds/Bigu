class UserStore {
    constructor() {
        if (!UserStore.instance) {
            this._data = [];
            UserStore.instance = this;
            console.log('new');
        }

        return UserStore.instance;
    }

    //rest is the same code as preceding example

}

const instance = new UserStore();
instance._data[0] = 'dido';
Object.freeze(instance);

module.exports = instance;
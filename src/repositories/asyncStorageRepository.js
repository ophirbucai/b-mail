
export class AsyncStorage {
    static getItem(key) {
        return new Promise((resolve, reject) => {
            try {
                resolve(localStorage.getItem(key));
            } catch (error) {
                reject(error);
            }
        });
    }

    static setItem(key, value) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, value)
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    static removeItem(key) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.removeItem(key)
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}
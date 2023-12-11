
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
                resolve(localStorage.setItem(key, value));
            } catch (error) {
                reject(error);
            }
        });
    }

    static removeItem(key) {
        return new Promise((resolve, reject) => {
            try {
                resolve(localStorage.removeItem(key));
            } catch (error) {
                reject(error);
            }
        });
    }
}
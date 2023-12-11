import { storageService as asyncStorageService } from "./asyncStorageService.js";

export const mailService = {
    getById,
    query,
    save,
    remove,
}

const MAIL_KEY = 'mails';
async function query() {
    return asyncStorageService.query(MAIL_KEY);
}

function getById(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId);
}

function save(mail) {
    if (mail.id) {
        return _put(mail);
    } else {
        return _post(mail);
    }
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId);
}

function _put(mail) {
    return asyncStorageService.put(MAIL_KEY, mail);
}

function _post(mail) {
    mail = { ...mail, isRead: false, isStarred: false, sentAt: Date.now() };
    return asyncStorageService.post(MAIL_KEY, mail);
}

import {lStorage} from "@utils/storage/index.js";

const access_token = 'access_token'
const access_user = 'access_user'
const access_id = 'access_id'
const access_status = 'access_status'

export function getToken() {
    return lStorage.get(access_token)
}

export function setToken(token) {
    lStorage.set(access_token, token)
}

export function removeToken() {
    lStorage.remove(access_token)
}

export function getUser() {
    return lStorage.get(access_user)
}

export function setUser(userInfo) {
    lStorage.set(access_user, userInfo)
}

export function removeUser() {
    lStorage.remove(access_user)
}

export function getId() {
    return lStorage.get(access_id)
}

export function setId(id) {
    lStorage.set(access_id, id)
}

export function removeId() {
    lStorage.remove(access_id)
}

export function getStatus() {
    return lStorage.get(access_status) === undefined ? false : lStorage.get(access_status)
}

export function setStatus() {
    return lStorage.set(access_status, true)
}

export function removeStatus() {
    lStorage.remove(access_status)
}

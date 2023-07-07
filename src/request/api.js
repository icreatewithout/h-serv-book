import {handlerData, handlerParams, http} from "@/request/index.js";

export default {
    //登录接口
    login: (data) => http.post('/auth/login', handlerData(data), {haveToken: false}),
    getQr: () => http.get(`/auth/qr${handlerParams({})}`, {haveToken: false}),
    appQr: () => http.get(`/auth/app/qr${handlerParams({})}`, {haveToken: false}),
    qrLogin: (uuid) => http.get(`/auth/qr/login/${uuid}${handlerParams({})}`, {haveToken: false}),
    user: () => http.get(`/auth/user${handlerParams()}`, {haveToken: true}),
    update: (data) => http.put(`/auth/update`, handlerData(data), {haveToken: true}),
    logout: () => http.get(`/auth/logout${handlerParams({})}`, {haveToken: true}),
    getCode: () => http.get(`/auth/code${handlerParams({})}`, {haveToken: false}),
    downApp: (uuid, id) => `/api/auth/app/down/${uuid}/${id}${handlerParams({})}`,

    upFile: (data) => http.post('/file/upload', data, {haveToken: true}),

    homeGreat: (data) => http.get(`/book/home/great${handlerParams(data)}`, {haveToken: false}),
    home200: (data) => http.get(`/book/home/top200${handlerParams(data)}`, {haveToken: false}),
    home50: (data) => http.get(`/book/home/top50${handlerParams(data)}`, {haveToken: false}),
    homeNew: (data) => http.get(`/book/home/new50${handlerParams(data)}`, {haveToken: false}),
    homeRand: () => http.get(`/book/home/rand${handlerParams({})}`, {haveToken: false}),

    searchBook: (data) => http.get(`/book/search${handlerParams(data)}`, {haveToken: false}),
    searchAuthor: (data) => http.get(`/book/author${handlerParams(data)}`, {haveToken: false}),
    searchAuthorBook: (data) => http.get(`/book/author/book${handlerParams(data)}`, {haveToken: false}),

    category: () => http.get(`/book/category/list${handlerParams({})}`, {haveToken: false}),
    book: (data) => http.get(`/book/list${handlerParams(data)}`, {haveToken: false}),
    bookDetail: (id) => http.get(`/book/detail/${id}${handlerParams({})}`, {haveToken: false}),
    catalog: (data) => http.get(`/book/catalog/list${handlerParams(data)}`, {haveToken: false}),
    content: (cid) => http.get(`/book/content/${cid}${handlerParams({})}`, {haveToken: true}),
    start: (bid) => http.get(`/book/content/start/${bid}${handlerParams({})}`, {haveToken: false}),
    prevContent: (bid, cid) => http.get(`/book/content/prev/${bid}/${cid}${handlerParams({})}`, {haveToken: false}),
    netxContent: (bid, cid) => http.get(`/book/content/next/${bid}/${cid}${handlerParams({})}`, {haveToken: false}),

    shelfList: (data) => http.get(`/book/shelf/list${handlerParams(data)}`, {haveToken: true}),
    addShelf: (bid) => http.post(`/book/shelf/${bid}`, handlerData({}), {haveToken: true}),

    getRate: (id) => http.get(`/book/rate/${id}${handlerParams({})}`, {haveToken: true}),
    rate: (data) => http.post(`/book/rate`, handlerData(data), {haveToken: true}),
    rateList: (data) => http.get(`/book/rate/list${handlerParams(data)}`, {haveToken: false}),
    calculate: (id) => http.get(`/book/rate/calculate/${id}${handlerParams({})}`, {haveToken: true}),
}






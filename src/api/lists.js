import { apiData } from './settings';

export const getAllLists = async () => {
    const url = `${apiData.apiHost}/lists/getAll`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${await localStorage.getItem('accessToken')}`
        }
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const postNewList = async (name) => {
    const url = `${apiData.apiHost}/lists/add`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await localStorage.getItem('accessToken')}`
        },
        body: `{
            "name":"${name}"
        }`
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const putEditList = async (oldname, newname, newicon) => {
    const url = `${apiData.apiHost}/lists/edit/${oldname}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await localStorage.getItem('accessToken')}`
        },
        body: `{
            "newname":"${newname}",
            "newicon":"${newicon}"
        }`
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}
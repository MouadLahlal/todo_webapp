import { apiData } from "./settings";

export const putChangeUsername = async (username) => {
    const url = `${apiData.apiHost}/user/changeUsername`;
    const data = `{
        "newUsername":"${username}"
    }`
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const putChangeEmail = async (email) => {
    const url = `${apiData.apiHost}/user/changeEmail`;
    const data = `{
        "newEmail":"${email}"
    }`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const putChangePassword = async (oldPassword, newPassword) => {
    const url = `${apiData.apiHost}/user/changePassword`;
    const data = `{
        "oldPassword":"${oldPassword}",
        "newPassword":"${newPassword}"
    }`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}
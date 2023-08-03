import { apiData } from './settings';

export const postLogin = async (username, password) => {
    const url = `${apiData.apiHost}/auth/login`;
    const data = `{
        "username": "${username}",
        "password": "${password}"
    }`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const postSignup = async (username, email, password) => {
    const url = `${apiData.apiHost}/auth/signup`;
    const data = `{
        "username": "${username}",
        "email": "${email}",
        "password": "${password}"
    }`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const postCheckLogged = async () => {
    const url = `${apiData.apiHost}/auth/login/checkLogged`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Contet-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}
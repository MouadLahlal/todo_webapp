import { apiData } from './settings';

export const getAllLists = async () => {
    const url = `${apiData.apiHost}/lists/getAll`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const postNewList = async (name) => {
    const url = `${apiData.apiHost}/lists/add`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: `{
            "name":"${name}"
        }`
    });
    return await response.json();
}
import { apiData } from './settings';

export const getProgress = async () => {
    const url = `https://${apiData.apiHost}/stats/getProgress`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const getStatistic = async () => {
    const url = `https://${apiData.apiHost}/stats/getStatistic`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const getTodaysTask = async () => {
    const url = `https://${apiData.apiHost}/lists/getToday`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const getImportantTask = async () => {
    const url = `https://${apiData.apiHost}/lists/getImportant`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}
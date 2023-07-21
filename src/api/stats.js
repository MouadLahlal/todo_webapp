import { apiData } from './settings';

export const getProgress = async () => {
    const url = `${apiData.apiHost}/stats/getProgress`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const getStatistic = async () => {
    const url = `${apiData.apiHost}/stats/getStatistic`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}
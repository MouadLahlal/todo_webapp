import { apiData } from './settings';

export const getProgress = async () => {
    const url = `https://${apiData.apiHost}/stats/getProgress`;
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.JDJiJDEwJDdnVkJ2cjhIdHRiZzg4SlhjWUw0NS44amo2VWF3MHRpTmlSM2pTMENDbTFULmFwLmlTMmRt.iC4Mezo8SQB6VZcwncIeWWPyN02LXioxH2zC1XXXK3c'
        }
    });
    return await response.json();
}

export const getStatistic = async () => {
    const url = `https://${apiData.apiHost}/stats/getStatistic`;
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.JDJiJDEwJDdnVkJ2cjhIdHRiZzg4SlhjWUw0NS44amo2VWF3MHRpTmlSM2pTMENDbTFULmFwLmlTMmRt.iC4Mezo8SQB6VZcwncIeWWPyN02LXioxH2zC1XXXK3c'
        }
    });
    return await response.json();
}

export const getTodaysTask = async () => {
    const url = `https://${apiData.apiHost}/lists/getToday`;
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.JDJiJDEwJDdnVkJ2cjhIdHRiZzg4SlhjWUw0NS44amo2VWF3MHRpTmlSM2pTMENDbTFULmFwLmlTMmRt.iC4Mezo8SQB6VZcwncIeWWPyN02LXioxH2zC1XXXK3c'
        }
    });
    return await response.json();
}

export const getImportantTask = async () => {
    const url = `https://${apiData.apiHost}/lists/getImportant`;
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.JDJiJDEwJDdnVkJ2cjhIdHRiZzg4SlhjWUw0NS44amo2VWF3MHRpTmlSM2pTMENDbTFULmFwLmlTMmRt.iC4Mezo8SQB6VZcwncIeWWPyN02LXioxH2zC1XXXK3c'
        }
    });
    return await response.json();
}
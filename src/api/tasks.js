import { apiData } from './settings';

export const getTodaysTask = async () => {
    const url = `${apiData.apiHost}/lists/getToday`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const getImportantTask = async () => {
    const url = `${apiData.apiHost}/lists/getImportant`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const getListTasks = async (listName) => {
    const url = `${apiData.apiHost}/lists/${listName}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const postNewTask = async (task, note, expiration, priority, list) => {
    const url = `${apiData.apiHost}/tasks/add`;
    const data = `{
        "task": "${task}",
        ${note.length > 0 ? `"note": "${note}",`: ""}
        ${expiration.length > 0 ? `"expiration": "${expiration}",`: ""}
        ${priority.length > 0 ? `"priority": "${priority}",`: ""}
        "list": "${list}"
    }`;
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
    });
    return await response.json();
}

export const postDone = async (idtask) => {
    const url = `${apiData.apiHost}/tasks/${idtask}/done`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const postUndone = async (idtask) => {
    const url = `${apiData.apiHost}/tasks/${idtask}/undone`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return await response.json();
}

export const postEditTask = async (task) => {
    const url = `${apiData.apiHost}/tasks/modify`;
    const data = `{
        "idtask":"${task.idtask}",
        "task":"${task.task}",
        "note":"${task.note}",
        "expiration":"${task.expiration}",
        "priority":"${task.priority}",
        "list":"${task.list}"
    }`;
    console.log(task, data, url);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
    });
    return await response.json();
}
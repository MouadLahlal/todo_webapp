import { apiData } from './settings';

export const getTodaysTask = async () => {
    const url = `${apiData.apiHost}/lists/getToday`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const getImportantTask = async () => {
    const url = `${apiData.apiHost}/lists/getImportant`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const getListTasks = async (listName) => {
    const url = `${apiData.apiHost}/lists/list/${listName}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
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
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const postDone = async (idtask) => {
    const url = `${apiData.apiHost}/tasks/done/${idtask}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const postUndone = async (idtask) => {
    const url = `${apiData.apiHost}/tasks/undone/${idtask}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}

export const postEditTask = async (task) => {
    const url = `${apiData.apiHost}/tasks/edit`;
    if (task.priority === "null") task.priority = null;
    const data = `{
        "idtask":"${task.idtask}",
        ${task.task?`"task":"${task.task}",`:""}
        ${task.note?`"note":"${task.note}",`:""}
        ${task.expiration?`"expiration":"${task.expiration}",`:""}
        ${task.priority?`"priority":"${task.priority}",`:""}
        ${task.list?`"list":"${task.list}"`:""}
    }`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
    });
    let res = {body: await response.json(), ok:response.ok};
    return res;
}
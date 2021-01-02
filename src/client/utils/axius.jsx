/* eslint-disable */
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { func } from '.';

export const apnData = (obj) => {
    const body = new FormData();
    for (var p in obj) {
        var value = obj[p];
        if (Array.isArray(value)) {
            value.forEach(val => {
                body.append(`${p}[]`, val);
            });
        } else {
            body.append(p, value);
        }
    }
    return body;
}

export const apiHeaders = (type = '') => {
    var token = func.getStorage('token') || '';
    if (type === 'file') {
        return {
            'Accept': 'application/json',
        };
    } else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
}


export const post = async (action, data = {}) => {
    let headers = apiHeaders();
    let url = func.api.baseUrl + action;
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { status: 606, result: 'Network request failed', error };
    }
}

export const get = async (action, data = {}) => {
    let headers = apiHeaders();
    let url = func.api.baseUrl + action;
    return axios({
        method: 'GET', url,
        headers,
        params: data
    }).then(response => {
        const res = response.data;
        return res;
    }).catch(error => {
        return { status: 606, result: 'Network request failed', error };
    });
}

export const put = async (action, data = {}) => {
    let headers = apiHeaders();
    let url = func.api.baseUrl + action;
    try {
        let response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { status: 606, result: 'Network request failed', error };
    }
}

export const delte = async (action, data = {}) => {
    let headers = apiHeaders();
    try {
        let response = await fetch(func.api.baseUrl + action, {
            method: 'DELETE',
            headers,
            body: JSON.stringify(data),
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { status: 606, result: 'Network request failed', error: error };
    }
}

export const postFile = async (action, data = {}) => {
    let headers = apiHeaders('file');
    try {
        let response = await fetch(func.api.baseUrl + action, {
            method: 'POST',
            headers,
            body: apnData(data)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { status: 606, result: 'Network request failed', error: error };
    }
}
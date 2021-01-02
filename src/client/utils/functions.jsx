/* eslint-disable */
import React from 'react';
import { Modal } from 'antd';

export const app = {
    dbpref: 'quin',
};

export const api = {
    baseUrl: 'http://localhost:3000/api/',
}

// Storage
export const setStorage = (key, value) => {
    if (key && value) {
        localStorage.setItem(app.dbpref + key, value);
    }
}
export const getStorage = (key) => {
    const value = localStorage.getItem(app.dbpref + key);
    return value || '';
}
export const setStorageJson = (key, value) => {
    if (key && value) {
        localStorage.setItem(app.dbpref + key, JSON.stringify(value));
    }
}
export const getStorageJson = (key) => {
    if (key) {
        const value = localStorage.getItem(app.dbpref + key);
        return JSON.parse(value) || [];
    }
}
export const delStorage = (key) => {
    if (key) {
        localStorage.removeItem(app.dbpref + key);
    }
}

// Spinners
export const fspinner = <div style={{ textAlign: 'center', color: '#999', lineHeight: 320 + 'px', width: 100 + '%' }}><i className="fa fa-spin fa-circle-o-notch fa-5x"></i></div>;
export const fspinner_sm = <div style={{ textAlign: 'center', color: '#999', lineHeight: 120 + 'px', width: 100 + '%' }}><i className="fa fa-spin fa-circle-o-notch fa-3x"></i></div>;
export const fspinner_xs = <i className="fa fa-spin fa-circle-o-notch"></i>;

export const redirect = (to) => {
    window.location = to;
}

export const generateOptions = (length, step = 1) => {
    const arr = [];
    for (let value = 0; value < length; value += step) {
        arr.push(value);
    }
    return arr;
};

export const hasR = (role) => {
    return true;
    // let user = getStorageJson('user');
    // let myRoles = ((user.role || {}).data || '').split(',');
    // return (myRoles.includes(role) || myRoles.includes('*'));
};

export const numberFormat = (number, minimumFractionDigits = 0) => {
    return new Intl.NumberFormat('en-IN', { minimumFractionDigits }).format(number);
}

export const loading = (content) => {
    return new Promise((resolve) => {
        content = <div dangerouslySetInnerHTML={{ __html: `<i class="fa fa-spin fa-spinner"></i> <span>${content}</span>` }} />
        const loading = Modal.info({
            icon: null,
            title: null,
            centered: true,
            content,
            width: '250px',
            cancelText: <div />,
        });
        resolve(loading);
    });
}

export const alert = (title, content, props, onOK) => {
    Modal.warning({
        icon: null,
        title,
        centered: true,
        content: <span dangerouslySetInnerHTML={{ __html: content }} />,
        okText: 'Okay!',
        width: '300px',
        cancelText: <div />,
        ...props,
        onOk: (close) => {
            close();
            onOK && onOK();
        }
    });
}
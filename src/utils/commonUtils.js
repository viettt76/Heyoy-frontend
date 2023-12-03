import { useIntl } from 'react-intl';

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const useFormatMessage = (messageId) => {
    return useIntl().formatMessage({ id: messageId });
};

export const convertBufferToString = (buffer = '') => {
    return new Buffer(buffer, 'base64').toString('binary');
};

export const convertDateToTimestamp = (date) => {
    return Math.floor(new Date(new Date(date).setHours(0, 0, 0)).getTime() / 1000) * 1000;
};

// date format 'dd/MM/yyyy'
export const convertTimestampToDate = (timestamp) => {

};
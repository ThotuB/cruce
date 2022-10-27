import axios from 'axios';
import { SITE_URL } from 'constants/site_contants';
import { IMessage } from 'types/game';

export async function getMessages() {
    const url = `/api/chat`;

    return await axios.get(url);
}

export async function postMessage(message: IMessage) {
    const url = `/api/chat`;

    return await axios.post(url, message);
}
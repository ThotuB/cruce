import axios from 'axios';
import { SITE_URL } from 'constants/site_contants';
import { User } from 'firebase/auth';
import { ITable, IUser } from 'types/game';

export async function getTables() {
    const url = `/api/tables`;

    return await axios.get(url)
}

export async function getTable(id: string) {
    const url = `/api/tables/${id}`;

    return await axios.get(url)
}

export async function postTable(table: ITable) {
    const url = `/api/tables`;

    return await axios.post(url, table)
}

export async function joinTable(id: string, user: IUser) {
    const url = `/api/tables/${id}/join`;

    return await axios.put(url, { user })
}

async function deleteTable(id: string) {
    const url = `/api/tables/${id}`;

    return await axios.delete(url)
}

export async function leaveTable(id: string, joined: number) {
    if (joined === 1) {
        return await deleteTable(id)
    }

    const url = `/api/tables/${id}/leave`;

    return axios.put(url, {})
}
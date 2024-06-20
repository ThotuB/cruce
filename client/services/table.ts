import {
    CreateTableRequest,
    GetTableRequest,
    JoinTableRequest,
    LeaveTableRequest,
    ListAllTablesRequest,
} from "proto/table_pb"
import { tableClient } from "utils/grpc"

export async function getTables() {
    const req = new ListAllTablesRequest()

    return await tableClient.listAll(req)
}

export async function getTable(id: number) {
    const req = new GetTableRequest({
        id: id,
    })

    return await tableClient.get(req)
}

export async function postTable(table: CreateTableRequest) {
    return await tableClient.create(table, {})
}

export async function joinTable(table_id: number, user_id: string) {
    const req = new JoinTableRequest({
        tableId: table_id,
        userId: user_id,
    })

    await tableClient.join(req)

    return table_id
}

export async function leaveTable(id: number) {
    const req = new LeaveTableRequest({
        id: id,
    })

    return await tableClient.leave(req)
}

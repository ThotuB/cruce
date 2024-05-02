import { CreateTableRequest, GetTableRequest, JoinTableRequest, LeaveTableRequest, ListAllTablesRequest } from 'proto/table_pb';
import { tableClient } from 'utils/grpc';

export async function getTables() {
    console.log("getTables")

    const req = new ListAllTablesRequest()

    return await tableClient.listAll(req)
}

export async function getTable(id: number) {
    console.log("getTable")

    const req = new GetTableRequest({
        id: id
    })

    return await tableClient.get(req)
}

export async function postTable(table: CreateTableRequest) {
    console.log("postTable")

    return await tableClient.create(table, {})
}

export async function joinTable(id: number) {
    console.log("joinTable")

    const req = new JoinTableRequest({
        id: id
    })

    await tableClient.join(req)

    return id
}

export async function leaveTable(id: number) {
    console.log("leaveTable")

    const req = new LeaveTableRequest({
        id: id
    })

    return await tableClient.leave(req)
}

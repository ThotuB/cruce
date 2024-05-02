import { createPromiseClient } from "@connectrpc/connect"
import { createGrpcWebTransport } from "@connectrpc/connect-web"
import { TableService } from "proto/table_connect"
import { UserService } from "proto/user_connect"

const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:8081"
})

export const tableClient = createPromiseClient(TableService, transport)
export const userClient = createPromiseClient(UserService, transport)

import { CreateUserRequest } from "proto/user_pb"
import { userClient } from "utils/grpc"

export async function postUser(user: CreateUserRequest) {
    console.log("postTable")

    return await userClient.create(user, {})
}


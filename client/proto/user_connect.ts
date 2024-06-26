// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=none"
// @generated from file user.proto (package cruce, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateUserRequest, CreateUserResponse } from "./user_pb";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service cruce.UserService
 */
export const UserService = {
  typeName: "cruce.UserService",
  methods: {
    /**
     * @generated from rpc cruce.UserService.Create
     */
    create: {
      name: "Create",
      I: CreateUserRequest,
      O: CreateUserResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;


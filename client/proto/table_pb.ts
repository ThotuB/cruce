// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file table.proto (package cruce, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum cruce.GameMode
 */
export enum GameMode {
  /**
   * @generated from enum value: GAME_MODE_1_V_1 = 0;
   */
  GAME_MODE_1_V_1 = 0,

  /**
   * @generated from enum value: GAME_MODE_1_V_1_V_1 = 1;
   */
  GAME_MODE_1_V_1_V_1 = 1,

  /**
   * @generated from enum value: GAME_MODE_2_V_2 = 2;
   */
  GAME_MODE_2_V_2 = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(GameMode)
proto3.util.setEnumType(GameMode, "cruce.GameMode", [
  { no: 0, name: "GAME_MODE_1_V_1" },
  { no: 1, name: "GAME_MODE_1_V_1_V_1" },
  { no: 2, name: "GAME_MODE_2_V_2" },
]);

/**
 * @generated from enum cruce.Points
 */
export enum Points {
  /**
   * @generated from enum value: POINTS_6 = 0;
   */
  POINTS_6 = 0,

  /**
   * @generated from enum value: POINTS_11 = 1;
   */
  POINTS_11 = 1,

  /**
   * @generated from enum value: POINTS_21 = 2;
   */
  POINTS_21 = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Points)
proto3.util.setEnumType(Points, "cruce.Points", [
  { no: 0, name: "POINTS_6" },
  { no: 1, name: "POINTS_11" },
  { no: 2, name: "POINTS_21" },
]);

/**
 * @generated from enum cruce.Time
 */
export enum Time {
  /**
   * @generated from enum value: TIME_5S = 0;
   */
  TIME_5S = 0,

  /**
   * @generated from enum value: TIME_15S = 1;
   */
  TIME_15S = 1,

  /**
   * @generated from enum value: TIME_30S = 2;
   */
  TIME_30S = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Time)
proto3.util.setEnumType(Time, "cruce.Time", [
  { no: 0, name: "TIME_5S" },
  { no: 1, name: "TIME_15S" },
  { no: 2, name: "TIME_30S" },
]);

/**
 * @generated from message cruce.CreateTableRequest
 */
export class CreateTableRequest extends Message<CreateTableRequest> {
  /**
   * @generated from field: cruce.GameMode mode = 1;
   */
  mode = GameMode.GAME_MODE_1_V_1;

  /**
   * @generated from field: cruce.Points points = 2;
   */
  points = Points.POINTS_6;

  /**
   * @generated from field: cruce.Time time = 3;
   */
  time = Time.TIME_5S;

  /**
   * @generated from field: bool iber = 4;
   */
  iber = false;

  /**
   * @generated from field: bool cheating = 5;
   */
  cheating = false;

  /**
   * @generated from field: optional string password = 6;
   */
  password?: string;

  /**
   * @generated from field: string user_id = 7;
   */
  userId = "";

  constructor(data?: PartialMessage<CreateTableRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.CreateTableRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "mode", kind: "enum", T: proto3.getEnumType(GameMode) },
    { no: 2, name: "points", kind: "enum", T: proto3.getEnumType(Points) },
    { no: 3, name: "time", kind: "enum", T: proto3.getEnumType(Time) },
    { no: 4, name: "iber", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "cheating", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 7, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTableRequest {
    return new CreateTableRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTableRequest {
    return new CreateTableRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTableRequest {
    return new CreateTableRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTableRequest | PlainMessage<CreateTableRequest> | undefined, b: CreateTableRequest | PlainMessage<CreateTableRequest> | undefined): boolean {
    return proto3.util.equals(CreateTableRequest, a, b);
  }
}

/**
 * @generated from message cruce.CreateTableResponse
 */
export class CreateTableResponse extends Message<CreateTableResponse> {
  /**
   * @generated from field: int32 table_id = 1;
   */
  tableId = 0;

  constructor(data?: PartialMessage<CreateTableResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.CreateTableResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "table_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTableResponse {
    return new CreateTableResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTableResponse {
    return new CreateTableResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTableResponse {
    return new CreateTableResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTableResponse | PlainMessage<CreateTableResponse> | undefined, b: CreateTableResponse | PlainMessage<CreateTableResponse> | undefined): boolean {
    return proto3.util.equals(CreateTableResponse, a, b);
  }
}

/**
 * @generated from message cruce.ListAllTablesRequest
 */
export class ListAllTablesRequest extends Message<ListAllTablesRequest> {
  constructor(data?: PartialMessage<ListAllTablesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.ListAllTablesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListAllTablesRequest {
    return new ListAllTablesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListAllTablesRequest {
    return new ListAllTablesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListAllTablesRequest {
    return new ListAllTablesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListAllTablesRequest | PlainMessage<ListAllTablesRequest> | undefined, b: ListAllTablesRequest | PlainMessage<ListAllTablesRequest> | undefined): boolean {
    return proto3.util.equals(ListAllTablesRequest, a, b);
  }
}

/**
 * @generated from message cruce.ListAllTablesResponse
 */
export class ListAllTablesResponse extends Message<ListAllTablesResponse> {
  /**
   * @generated from field: repeated cruce.Table tables = 1;
   */
  tables: Table[] = [];

  constructor(data?: PartialMessage<ListAllTablesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.ListAllTablesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "tables", kind: "message", T: Table, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListAllTablesResponse {
    return new ListAllTablesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListAllTablesResponse {
    return new ListAllTablesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListAllTablesResponse {
    return new ListAllTablesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListAllTablesResponse | PlainMessage<ListAllTablesResponse> | undefined, b: ListAllTablesResponse | PlainMessage<ListAllTablesResponse> | undefined): boolean {
    return proto3.util.equals(ListAllTablesResponse, a, b);
  }
}

/**
 * @generated from message cruce.Table
 */
export class Table extends Message<Table> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: cruce.GameMode mode = 2;
   */
  mode = GameMode.GAME_MODE_1_V_1;

  /**
   * @generated from field: cruce.Points points = 3;
   */
  points = Points.POINTS_6;

  /**
   * @generated from field: cruce.Time time = 4;
   */
  time = Time.TIME_5S;

  /**
   * @generated from field: bool iber = 5;
   */
  iber = false;

  /**
   * @generated from field: bool cheating = 6;
   */
  cheating = false;

  /**
   * @generated from field: optional string password = 7;
   */
  password?: string;

  constructor(data?: PartialMessage<Table>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.Table";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "mode", kind: "enum", T: proto3.getEnumType(GameMode) },
    { no: 3, name: "points", kind: "enum", T: proto3.getEnumType(Points) },
    { no: 4, name: "time", kind: "enum", T: proto3.getEnumType(Time) },
    { no: 5, name: "iber", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "cheating", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 7, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Table {
    return new Table().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Table {
    return new Table().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Table {
    return new Table().fromJsonString(jsonString, options);
  }

  static equals(a: Table | PlainMessage<Table> | undefined, b: Table | PlainMessage<Table> | undefined): boolean {
    return proto3.util.equals(Table, a, b);
  }
}

/**
 * @generated from message cruce.JoinTableRequest
 */
export class JoinTableRequest extends Message<JoinTableRequest> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  constructor(data?: PartialMessage<JoinTableRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.JoinTableRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JoinTableRequest {
    return new JoinTableRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JoinTableRequest {
    return new JoinTableRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JoinTableRequest {
    return new JoinTableRequest().fromJsonString(jsonString, options);
  }

  static equals(a: JoinTableRequest | PlainMessage<JoinTableRequest> | undefined, b: JoinTableRequest | PlainMessage<JoinTableRequest> | undefined): boolean {
    return proto3.util.equals(JoinTableRequest, a, b);
  }
}

/**
 * @generated from message cruce.JoinTableResponse
 */
export class JoinTableResponse extends Message<JoinTableResponse> {
  constructor(data?: PartialMessage<JoinTableResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.JoinTableResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JoinTableResponse {
    return new JoinTableResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JoinTableResponse {
    return new JoinTableResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JoinTableResponse {
    return new JoinTableResponse().fromJsonString(jsonString, options);
  }

  static equals(a: JoinTableResponse | PlainMessage<JoinTableResponse> | undefined, b: JoinTableResponse | PlainMessage<JoinTableResponse> | undefined): boolean {
    return proto3.util.equals(JoinTableResponse, a, b);
  }
}

/**
 * @generated from message cruce.LeaveTableRequest
 */
export class LeaveTableRequest extends Message<LeaveTableRequest> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  constructor(data?: PartialMessage<LeaveTableRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.LeaveTableRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LeaveTableRequest {
    return new LeaveTableRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LeaveTableRequest {
    return new LeaveTableRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LeaveTableRequest {
    return new LeaveTableRequest().fromJsonString(jsonString, options);
  }

  static equals(a: LeaveTableRequest | PlainMessage<LeaveTableRequest> | undefined, b: LeaveTableRequest | PlainMessage<LeaveTableRequest> | undefined): boolean {
    return proto3.util.equals(LeaveTableRequest, a, b);
  }
}

/**
 * @generated from message cruce.LeaveTableResponse
 */
export class LeaveTableResponse extends Message<LeaveTableResponse> {
  constructor(data?: PartialMessage<LeaveTableResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.LeaveTableResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LeaveTableResponse {
    return new LeaveTableResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LeaveTableResponse {
    return new LeaveTableResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LeaveTableResponse {
    return new LeaveTableResponse().fromJsonString(jsonString, options);
  }

  static equals(a: LeaveTableResponse | PlainMessage<LeaveTableResponse> | undefined, b: LeaveTableResponse | PlainMessage<LeaveTableResponse> | undefined): boolean {
    return proto3.util.equals(LeaveTableResponse, a, b);
  }
}

/**
 * @generated from message cruce.GetTableRequest
 */
export class GetTableRequest extends Message<GetTableRequest> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  constructor(data?: PartialMessage<GetTableRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.GetTableRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTableRequest {
    return new GetTableRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTableRequest {
    return new GetTableRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTableRequest {
    return new GetTableRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetTableRequest | PlainMessage<GetTableRequest> | undefined, b: GetTableRequest | PlainMessage<GetTableRequest> | undefined): boolean {
    return proto3.util.equals(GetTableRequest, a, b);
  }
}

/**
 * @generated from message cruce.GetTableResponse
 */
export class GetTableResponse extends Message<GetTableResponse> {
  /**
   * @generated from field: cruce.Table table = 1;
   */
  table?: Table;

  constructor(data?: PartialMessage<GetTableResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cruce.GetTableResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "table", kind: "message", T: Table },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTableResponse {
    return new GetTableResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTableResponse {
    return new GetTableResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTableResponse {
    return new GetTableResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetTableResponse | PlainMessage<GetTableResponse> | undefined, b: GetTableResponse | PlainMessage<GetTableResponse> | undefined): boolean {
    return proto3.util.equals(GetTableResponse, a, b);
  }
}

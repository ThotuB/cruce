// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file protocol/game/server_protocol.proto (package protocol, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { GameProtocolHeader } from "./header_pb.js";

/**
 * @generated from message protocol.GameServerProtocol
 */
export class GameServerProtocol extends Message<GameServerProtocol> {
  /**
   * @generated from field: protocol.GameProtocolHeader header = 1;
   */
  header?: GameProtocolHeader;

  constructor(data?: PartialMessage<GameServerProtocol>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.GameServerProtocol";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "header", kind: "message", T: GameProtocolHeader },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GameServerProtocol {
    return new GameServerProtocol().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GameServerProtocol {
    return new GameServerProtocol().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GameServerProtocol {
    return new GameServerProtocol().fromJsonString(jsonString, options);
  }

  static equals(a: GameServerProtocol | PlainMessage<GameServerProtocol> | undefined, b: GameServerProtocol | PlainMessage<GameServerProtocol> | undefined): boolean {
    return proto3.util.equals(GameServerProtocol, a, b);
  }
}

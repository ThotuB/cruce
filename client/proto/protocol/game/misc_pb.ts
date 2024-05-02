// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file protocol/game/misc.proto (package protocol, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum protocol.CardSuit
 */
export enum CardSuit {
  /**
   * @generated from enum value: ROSU = 0;
   */
  ROSU = 0,

  /**
   * @generated from enum value: DUBA = 1;
   */
  DUBA = 1,

  /**
   * @generated from enum value: VERDE = 2;
   */
  VERDE = 2,

  /**
   * @generated from enum value: GHINDA = 3;
   */
  GHINDA = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(CardSuit)
proto3.util.setEnumType(CardSuit, "protocol.CardSuit", [
  { no: 0, name: "ROSU" },
  { no: 1, name: "DUBA" },
  { no: 2, name: "VERDE" },
  { no: 3, name: "GHINDA" },
]);

/**
 * @generated from enum protocol.CardValue
 */
export enum CardValue {
  /**
   * @generated from enum value: ACE = 0;
   */
  ACE = 0,

  /**
   * @generated from enum value: TEN = 1;
   */
  TEN = 1,

  /**
   * @generated from enum value: KING = 2;
   */
  KING = 2,

  /**
   * @generated from enum value: QUEEN = 3;
   */
  QUEEN = 3,

  /**
   * @generated from enum value: JACK = 4;
   */
  JACK = 4,

  /**
   * @generated from enum value: NINE = 5;
   */
  NINE = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(CardValue)
proto3.util.setEnumType(CardValue, "protocol.CardValue", [
  { no: 0, name: "ACE" },
  { no: 1, name: "TEN" },
  { no: 2, name: "KING" },
  { no: 3, name: "QUEEN" },
  { no: 4, name: "JACK" },
  { no: 5, name: "NINE" },
]);

/**
 * @generated from message protocol.Card
 */
export class Card extends Message<Card> {
  /**
   * @generated from field: protocol.CardSuit suit = 1;
   */
  suit = CardSuit.ROSU;

  /**
   * @generated from field: protocol.CardValue value = 2;
   */
  value = CardValue.ACE;

  constructor(data?: PartialMessage<Card>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.Card";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "suit", kind: "enum", T: proto3.getEnumType(CardSuit) },
    { no: 2, name: "value", kind: "enum", T: proto3.getEnumType(CardValue) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Card {
    return new Card().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Card {
    return new Card().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Card {
    return new Card().fromJsonString(jsonString, options);
  }

  static equals(a: Card | PlainMessage<Card> | undefined, b: Card | PlainMessage<Card> | undefined): boolean {
    return proto3.util.equals(Card, a, b);
  }
}

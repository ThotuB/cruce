// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file protocol/game/client_protocol.proto (package protocol, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { GameProtocolHeader } from "./header_pb";
import { Card, CardSuit } from "./misc_pb";

/**
 * @generated from enum protocol.CardState
 */
export enum CardState {
  /**
   * @generated from enum value: DISABLED = 0;
   */
  DISABLED = 0,

  /**
   * @generated from enum value: ENABLED = 1;
   */
  ENABLED = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(CardState)
proto3.util.setEnumType(CardState, "protocol.CardState", [
  { no: 0, name: "DISABLED" },
  { no: 1, name: "ENABLED" },
]);

/**
 * @generated from message protocol.GameClientProtocol
 */
export class GameClientProtocol extends Message<GameClientProtocol> {
  /**
   * @generated from field: protocol.GameProtocolHeader header = 1;
   */
  header?: GameProtocolHeader;

  /**
   * @generated from field: protocol.PlayerPov player_pov = 2;
   */
  playerPov?: PlayerPov;

  constructor(data?: PartialMessage<GameClientProtocol>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.GameClientProtocol";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "header", kind: "message", T: GameProtocolHeader },
    { no: 2, name: "player_pov", kind: "message", T: PlayerPov },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GameClientProtocol {
    return new GameClientProtocol().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GameClientProtocol {
    return new GameClientProtocol().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GameClientProtocol {
    return new GameClientProtocol().fromJsonString(jsonString, options);
  }

  static equals(a: GameClientProtocol | PlainMessage<GameClientProtocol> | undefined, b: GameClientProtocol | PlainMessage<GameClientProtocol> | undefined): boolean {
    return proto3.util.equals(GameClientProtocol, a, b);
  }
}

/**
 * @generated from message protocol.PlayerPov
 */
export class PlayerPov extends Message<PlayerPov> {
  /**
   * @generated from field: uint32 team_1_score = 1;
   */
  team1Score = 0;

  /**
   * @generated from field: uint32 team_2_score = 2;
   */
  team2Score = 0;

  /**
   * @generated from field: uint32 team_1_points = 3;
   */
  team1Points = 0;

  /**
   * @generated from field: uint32 team_2_points = 4;
   */
  team2Points = 0;

  /**
   * @generated from field: repeated protocol.HandCard hand_cards = 5;
   */
  handCards: HandCard[] = [];

  /**
   * @generated from field: repeated protocol.TableCard played_cards = 6;
   */
  playedCards: TableCard[] = [];

  /**
   * @generated from field: optional protocol.Auction auction = 7;
   */
  auction?: Auction;

  /**
   * @generated from field: optional protocol.CardSuit trump = 8;
   */
  trump?: CardSuit;

  /**
   * @generated from field: bool cheat_button = 9;
   */
  cheatButton = false;

  /**
   * @generated from field: repeated protocol.Player players = 10;
   */
  players: Player[] = [];

  constructor(data?: PartialMessage<PlayerPov>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.PlayerPov";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "team_1_score", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "team_2_score", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "team_1_points", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "team_2_points", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "hand_cards", kind: "message", T: HandCard, repeated: true },
    { no: 6, name: "played_cards", kind: "message", T: TableCard, repeated: true },
    { no: 7, name: "auction", kind: "message", T: Auction, opt: true },
    { no: 8, name: "trump", kind: "enum", T: proto3.getEnumType(CardSuit), opt: true },
    { no: 9, name: "cheat_button", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 10, name: "players", kind: "message", T: Player, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlayerPov {
    return new PlayerPov().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlayerPov {
    return new PlayerPov().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlayerPov {
    return new PlayerPov().fromJsonString(jsonString, options);
  }

  static equals(a: PlayerPov | PlainMessage<PlayerPov> | undefined, b: PlayerPov | PlainMessage<PlayerPov> | undefined): boolean {
    return proto3.util.equals(PlayerPov, a, b);
  }
}

/**
 * @generated from message protocol.Player
 */
export class Player extends Message<Player> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: string avatar = 3;
   */
  avatar = "";

  constructor(data?: PartialMessage<Player>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.Player";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "avatar", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Player {
    return new Player().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Player {
    return new Player().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Player {
    return new Player().fromJsonString(jsonString, options);
  }

  static equals(a: Player | PlainMessage<Player> | undefined, b: Player | PlainMessage<Player> | undefined): boolean {
    return proto3.util.equals(Player, a, b);
  }
}

/**
 * @generated from message protocol.HandCard
 */
export class HandCard extends Message<HandCard> {
  /**
   * @generated from field: protocol.Card card = 1;
   */
  card?: Card;

  /**
   * @generated from field: protocol.CardState state = 2;
   */
  state = CardState.DISABLED;

  constructor(data?: PartialMessage<HandCard>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.HandCard";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "card", kind: "message", T: Card },
    { no: 2, name: "state", kind: "enum", T: proto3.getEnumType(CardState) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HandCard {
    return new HandCard().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HandCard {
    return new HandCard().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HandCard {
    return new HandCard().fromJsonString(jsonString, options);
  }

  static equals(a: HandCard | PlainMessage<HandCard> | undefined, b: HandCard | PlainMessage<HandCard> | undefined): boolean {
    return proto3.util.equals(HandCard, a, b);
  }
}

/**
 * @generated from message protocol.TableCard
 */
export class TableCard extends Message<TableCard> {
  /**
   * @generated from field: optional protocol.Card card = 1;
   */
  card?: Card;

  constructor(data?: PartialMessage<TableCard>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.TableCard";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "card", kind: "message", T: Card, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TableCard {
    return new TableCard().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TableCard {
    return new TableCard().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TableCard {
    return new TableCard().fromJsonString(jsonString, options);
  }

  static equals(a: TableCard | PlainMessage<TableCard> | undefined, b: TableCard | PlainMessage<TableCard> | undefined): boolean {
    return proto3.util.equals(TableCard, a, b);
  }
}

/**
 * @generated from message protocol.Auction
 */
export class Auction extends Message<Auction> {
  /**
   * @generated from field: bool visible = 1;
   */
  visible = false;

  /**
   * @generated from field: repeated protocol.Bid bids = 2;
   */
  bids: Bid[] = [];

  /**
   * @generated from field: uint32 max_bid = 3;
   */
  maxBid = 0;

  constructor(data?: PartialMessage<Auction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.Auction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "visible", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "bids", kind: "message", T: Bid, repeated: true },
    { no: 3, name: "max_bid", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Auction {
    return new Auction().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Auction {
    return new Auction().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Auction {
    return new Auction().fromJsonString(jsonString, options);
  }

  static equals(a: Auction | PlainMessage<Auction> | undefined, b: Auction | PlainMessage<Auction> | undefined): boolean {
    return proto3.util.equals(Auction, a, b);
  }
}

/**
 * @generated from message protocol.Bid
 */
export class Bid extends Message<Bid> {
  /**
   * @generated from field: optional uint32 value = 1;
   */
  value?: number;

  constructor(data?: PartialMessage<Bid>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protocol.Bid";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Bid {
    return new Bid().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Bid {
    return new Bid().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Bid {
    return new Bid().fromJsonString(jsonString, options);
  }

  static equals(a: Bid | PlainMessage<Bid> | undefined, b: Bid | PlainMessage<Bid> | undefined): boolean {
    return proto3.util.equals(Bid, a, b);
  }
}


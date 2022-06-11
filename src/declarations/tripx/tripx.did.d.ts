import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AccountIdentifier = string;
export type Balance = bigint;
export type Extension = string;
export type Memo = Array<number>;
export interface MintRequest { 'to' : User, 'metadata' : [] | [Array<number>] }
export type SubAccount = Array<number>;
export type TokenIdentifier = string;
export type TokenIndex = number;
export interface TransferRequest {
  'to' : User,
  'token' : TokenIdentifier,
  'notify' : boolean,
  'from' : User,
  'memo' : Memo,
  'subaccount' : [] | [SubAccount],
  'amount' : Balance,
}
export type TransferResponse = { 'ok' : Balance } |
  {
    'err' : { 'CannotNotify' : AccountIdentifier } |
      { 'InsufficientBalance' : null } |
      { 'InvalidToken' : TokenIdentifier } |
      { 'Rejected' : null } |
      { 'Unauthorized' : AccountIdentifier } |
      { 'Other' : string }
  };
export type User = { 'principal' : Principal } |
  { 'address' : AccountIdentifier };
export interface tripX_NFT {
  'extensions' : ActorMethod<[], Array<Extension>>,
  'getMinter' : ActorMethod<[], Principal>,
  'mintNFT' : ActorMethod<[MintRequest], TokenIndex>,
  'setMinter' : ActorMethod<[Principal], undefined>,
  'transfer' : ActorMethod<[TransferRequest], TransferResponse>,
}
export interface _SERVICE extends tripX_NFT {}

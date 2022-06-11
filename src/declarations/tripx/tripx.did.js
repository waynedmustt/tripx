export const idlFactory = ({ IDL }) => {
  const Extension = IDL.Text;
  const AccountIdentifier = IDL.Text;
  const User = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier,
  });
  const MintRequest = IDL.Record({
    'to' : User,
    'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TokenIndex = IDL.Nat32;
  const TokenIdentifier = IDL.Text;
  const Memo = IDL.Vec(IDL.Nat8);
  const SubAccount = IDL.Vec(IDL.Nat8);
  const Balance = IDL.Nat;
  const TransferRequest = IDL.Record({
    'to' : User,
    'token' : TokenIdentifier,
    'notify' : IDL.Bool,
    'from' : User,
    'memo' : Memo,
    'subaccount' : IDL.Opt(SubAccount),
    'amount' : Balance,
  });
  const TransferResponse = IDL.Variant({
    'ok' : Balance,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier,
      'Other' : IDL.Text,
    }),
  });
  const tripX_NFT = IDL.Service({
    'extensions' : IDL.Func([], [IDL.Vec(Extension)], ['query']),
    'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
    'mintNFT' : IDL.Func([MintRequest], [TokenIndex], []),
    'setMinter' : IDL.Func([IDL.Principal], [], []),
    'transfer' : IDL.Func([TransferRequest], [TransferResponse], []),
  });
  return tripX_NFT;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };

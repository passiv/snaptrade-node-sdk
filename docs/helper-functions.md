## Helper Functions

### _generates RSA private/public keys_

Generates RSA private and public keys. Stores the private key to a `JSON` file in a `relative` path provided and returns the public key.

##### Signature:

```typescript
generateRSA(path: string): string
```

##### Example:

```typescript
const publicKey = snapTrade.generateRSA('rsa/privateKey.json');
```

### _decrypts the shared key_

Decrypts the encrypted shared key, using the provided path to the `JSON` file where the private key is stored.

##### Signature:

```typescript
 decryptSharedKey(
    privateKeyFilePath: string,
    encryptedSharedKey: string
  ): string
```

##### Example:

```typescript
const decryptedSharedKey = snapTrade.decryptSharedKey(
  'rsa/privateKey.json',
  'ENCRYPTED_SHARED_KEY'
);
```

### _decrypts the message_

Decrypts the encrypted message using the decrypted shared key and the `encryptedMessageData` object, which contains `encryptedMessage`, `tag` and `nonce`.

##### Signature:

```typescript
  decryptMessage(
    sharedKey: string,
    encryptedMessageData: {
      encryptedMessage: string;
      tag: string;
      nonce: string;
    }
  ): string
```

##### Example:

```typescript
const decryptedMessage = snapTrade.decryptMessage('SHARED_KEY', {
  encryptedMessage: 'ENCRYPTED_MESSAGE',
  tag: 'TAG',
  nonce: 'NONCE',
});
```

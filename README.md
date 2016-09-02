# JavaScript cryptography [![Code Climate](https://codeclimate.com/github/Metalnem/javascript-crypto/badges/gpa.svg)](https://codeclimate.com/github/Metalnem/javascript-crypto) [![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/metalnem/javascript-crypto/master/LICENSE)

Web Cryptography API [[1](https://www.w3.org/TR/WebCryptoAPI/)] is an standardized interface allowing a script to use basic cryptographic operations. However, it exposes a bunch of primitives that are very easy to misuse, or are inherently unsafe. This library demonstrates safe usage of Web Cryptography API. It tries to select safe algorithms and parameters and help you avoid most of the common mistakes. You can either use it as a library, or just copy and paste functions that you need.

## Design choices

This library was heavily inspired by George Tankersley's cryptopasta library [[2](https://github.com/gtank/cryptopasta)], from which it borrows most of the design choices. You can find more information about selecting right cryptographic primitives at [[3](http://www.daemonology.net/blog/2009-06-11-cryptographic-right-answers.html)] or [[4](https://gist.github.com/tqbf/be58d2d39690c3b366ad)].

### Encryption

When encrypting data, you should always always use authenticated encryption modes. The only authenticated mode offered by Web Cryptography API is AES-GCM, so that mode was used in this library. Key size is fixed to 256 bits, and nonces are randomly generated (for more info, see the discussion about randomly generated nonces at [[10](https://github.com/gtank/cryptopasta/issues/14)].

## Word of caution

You should never implement crypto yourself (especially in JavaScript). Just use TLS. If you want to know more about why JavaScript cryptography is a bad idea, go to [[5](https://rdist.root.org/2010/11/29/final-post-on-javascript-crypto/)], [[7](https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2011/august/javascript-cryptography-considered-harmful/)] or [[8](https://tonyarcieri.com/whats-wrong-with-webcrypto)]. That being said, there are some use cases for JavaScript crypto. Read more about that at [[6](https://vnhacker.blogspot.rs/2014/06/why-javascript-crypto-is-useful.html)] or [[11](https://www.w3.org/TR/2013/WD-webcrypto-usecases-20130108/)].

## API

### Encryption

```javaScript
Promise<CryptoKey> newEncryptionKey();

Promise<ArrayBuffer> encrypt(
	ArrayBuffer|ArrayBufferView plaintext,
	CryptoKey key
);

Promise<ArrayBuffer> decrypt(
	ArrayBuffer|ArrayBufferView ciphertext,
	CryptoKey key
);
```

### Authentication

```javaScript
Promise<CryptoKey> newMacKey();

Promise<ArrayBuffer> generateMac(
	ArrayBuffer|ArrayBufferView message,
	CryptoKey key
);

Promise<Boolean> verifyMac(
	ArrayBuffer|ArrayBufferView mac,
	ArrayBuffer|ArrayBufferView message,
	CryptoKey key
);
```

### Signing

```javaScript
Promise<CryptoKeyPair> newSigningKey();

Promise<ArrayBuffer> sign(
	ArrayBuffer|ArrayBufferView message,
	CryptoKey privateKey
);

Promise<Boolean> verify(
	ArrayBuffer|ArrayBufferView signature,
	ArrayBuffer|ArrayBufferView message,
	CryptoKey publicKey
);
```

### Hashing

```javaScript
Promise<ArrayBuffer> hashPassword(String password);

Promise<Boolean> verifyPasswordHash(
	ArrayBuffer|ArrayBufferView hash,
	String password
);
```

### Marshalling

```javaScript
Promise<ArrayBuffer> exportEncryptionKey(CryptoKey key);
Promise<CryptoKey> importEncryptionKey(ArrayBuffer buffer);

Promise<ArrayBuffer> exportPublicKey(CryptoKey publicKey);
Promise<CryptoKey> importPublicKey(ArrayBuffer buffer);

Promise<ArrayBuffer> exportPrivateKey(CryptoKey privateKey);
Promise<CryptoKey> importPrivateKey(ArrayBuffer buffer);
```

## Examples

### Encryption

```javaScript
const message = "I'm cooking MC's like a pound of bacon";
const key = window.newEncryptionKey();

const ciphertext = key.then(key => {
	const encoded = new TextEncoder('utf-8').encode(message);
	return window.encrypt(encoded, key);
});

ciphertext.then(ciphertext => console.log(new Uint8Array(ciphertext)));

const plaintext = ciphertext.then(ciphertext => {
	return key.then(key => window.decrypt(ciphertext, key));
}).then(plaintext => {
	return new TextDecoder('utf-8').decode(plaintext);
});

plaintext.then(plaintext => console.log(plaintext));
```

### Authentication
```javaScript
const message = "I'm cooking MC's like a pound of bacon";
const encoded = new TextEncoder('utf-8').encode(message);
const key = window.newMacKey();

const mac = key.then(key => window.generateMac(encoded, key))
mac.then(mac => console.log(new Uint8Array(mac)));

const valid = mac.then(mac => key.then(key => window.verifyMac(mac, encoded, key)));
valid.then(valid => console.log(valid));
```

### Signing
```javaScript
const message = "I'm cooking MC's like a pound of bacon";
const encoded = new TextEncoder('utf-8').encode(message);
const key = window.newSigningKey();

const sig = key.then(key => window.sign(encoded, key.privateKey));
sig.then(sig => console.log(new Uint8Array(sig)));

const valid = sig.then(sig => key.then(key => window.verify(sig, encoded, key.publicKey)));
valid.then(valid => console.log(valid));
```

### Hashing
```javaScript
const password = 'password12345';

const hash = window.hashPassword(password);
hash.then(hash => console.log(new Uint8Array(hash)));

const valid = hash.then(hash => window.verifyPasswordHash(hash, password));
valid.then(valid => console.log(valid));
```

### Marshalling
```javaScript
const exported = window.newEncryptionKey().then(window.exportEncryptionKey);
exported.then(exported => console.log(new Uint8Array(exported)));

const ciphertext = exported.then(window.importEncryptionKey).then(key => {
	const message = "I'm cooking MC's like a pound of bacon";
    const encoded = new TextEncoder('utf-8').encode(message);
    return window.encrypt(encoded, key);
});

ciphertext.then(ciphertext => console.log(new Uint8Array(ciphertext)));
```

## Browser compatibility

- Edge 12
- Firefox 34
- Chrome 37
- Safari 7.1
- Opera 24
- iOS Safari 8
- Android Browser 51
- Chrome for Android 51

## References

[1] [Web Cryptography API](https://www.w3.org/TR/WebCryptoAPI/)  
[2] [cryptopasta](https://github.com/gtank/cryptopasta)  
[3] [Cryptographic Right Answers](http://www.daemonology.net/blog/2009-06-11-cryptographic-right-answers.html)   
[4] [(Updated) Cryptographic Right Answers](https://gist.github.com/tqbf/be58d2d39690c3b366ad)  
[5] [Final post on Javascript crypto](https://rdist.root.org/2010/11/29/final-post-on-javascript-crypto/)  
[6] [Javascript Crypto Is Useful](https://vnhacker.blogspot.rs/2014/06/why-javascript-crypto-is-useful.html)  
[7] [Javascript Cryptography Considered Harmful](https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2011/august/javascript-cryptography-considered-harmful/)  
[8] [What’s wrong with in-browser cryptography?](https://tonyarcieri.com/whats-wrong-with-webcrypto)  
[9] [Nonce-Disrespecting Adversaries: Practical Forgery Attacks on GCM in TLS](https://www.usenix.org/system/files/conference/woot16/woot16-paper-bock.pdf)  
[10] [GCM cannot be used with random nonces](https://github.com/gtank/cryptopasta/issues/14)  
[11] [Web Cryptography API Use Cases](https://www.w3.org/TR/2013/WD-webcrypto-usecases-20130108/)

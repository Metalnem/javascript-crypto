# JavaScript cryptography [![Code Climate](https://codeclimate.com/github/Metalnem/javascript-crypto/badges/gpa.svg)](https://codeclimate.com/github/Metalnem/javascript-crypto) [![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/metalnem/javascript-crypto/master/LICENSE)

Web Cryptography API [[1](https://www.w3.org/TR/WebCryptoAPI/)] is an standardized interface allowing a script to use basic cryptographic operations. However, it exposes a bunch of primitives that are very easy to misuse, or are inherently unsafe. This library demonstrates safe usage of Web Cryptography API. It tries to select safe algorithms and parameters and help you avoid most of the common mistakes. You can either use it as a library, or just copy and paste functions that you need. It was heavily inspired by George Tankersley's cryptopasta library [[2](https://github.com/gtank/cryptopasta)], from which it borrows most of the recommendations.

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

# KryptoBreaker

Step-by-step calculators for classical and public-key cryptography. Enter your keys and messages, and you get the answer along with every intermediate value: the square-and-multiply tables, the extended Euclid tables, the per-letter working, and the matrix inverses.

**Ciphers:** Caesar, affine, Vigenère, Hill  
**Public key:** RSA and ElGamal (key generation, encryption, decryption, signatures, verification), Diffie–Hellman  
**Helpers:** modular inverse, modular exponentiation, modulo, letter ↔ number table

Every page works offline as an installable PWA. Inputs live in the URL, so any calculation can be shared as a link.

## Correctness

All maths lives in [`src/lib/crypto`](src/lib/crypto) as pure, UI-free functions:

- `BigInt` everywhere, so results stay exact far beyond 2⁵³.
- Inputs outside an algorithm's domain throw an `InputError` naming the offending field. Examples: a non-invertible affine or Hill key, `gcd(e, φ) ≠ 1`, a composite `p`, an ElGamal nonce not coprime with `p − 1`, out-of-range signature values. The UI shows the error next to the result instead of a wrong answer.
- Unit tests cover known vectors and edge cases. Property-based tests ([fast-check](https://fast-check.dev)) check that decrypting an encryption returns the input, that signatures verify, that Bézout identities hold, and that `modPow` and the determinants agree with independent reference implementations.

Classical ciphers use the 26-letter Latin alphabet (`a = 0 … z = 25`). Other characters pass through unchanged; Hill skips them and pads the last block with `a`.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui (Radix) · React Router · Vitest · Playwright · oxlint / oxfmt · Bun

## Development

```sh
bun install
bun run dev        # http://localhost:5173
bun run check      # typecheck, lint, format check, unit tests
bun run e2e        # Playwright: desktop, Pixel 7 and iPhone viewports, plus axe accessibility checks
bun run build
```

## Deployment

```sh
docker build -t kryptobreaker .
docker run -p 8080:80 kryptobreaker
```

The image builds the app with Bun and serves `dist/` with nginx. Firebase Analytics config is read from `VITE_FIREBASE_*` variables (see `.env.production`); analytics loads lazily after the first paint.

[English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md)

# hand-rolled-math

Math written by hand. **No NURBS library, no FFT library, no black boxes** — sin only where sin belongs.

Every folder holds one piece of work, kept exactly as written, next to a version you can open in a browser.

---

## Sine-product prime sieve — `sieve/`

Multiply one sine per prime:

$$
F(x) \;=\; \prod_{p \in \{2,\,3,\,5,\,\dots\}} \sin\!\left(\frac{\pi x}{p}\right)
$$

Every factor is zero exactly where `x` is a multiple of `p` — so as soon as `x` is divisible by any prime in the list, the whole product vanishes.
(Strictly: with the first `k` primes, for `x` larger than the biggest of them and `k ≥ √x`, "product is non-zero" is the same as "`x` is prime".)
The program plots that curve and marks the primes it used under it.

- **179 lines**, Python + `pygame`, **no math library**: the primes, the product and the auto-scaling are all computed inside this file — `pygame` only opens a window and draws lines
- run it: `pip install pygame` then `python sieve/埃氏筛连续数学版本.py`
- browser version: open `sieve/web/index.html` — no server, no build, works on a phone (sliders instead of drag handles)
- every claim below has a `file:line` behind it: [docs/claims.md](docs/claims.md)

**Where the idea came from** (his own account, as relayed by his father): while playing with the Riemann zeta function and reading how the 1/2-line (Riemann hypothesis) is used to predict primes, he noticed a `sin` sitting in there. Sine is periodic — one period, one gap — and a sieve needs exactly that: a way to knock out a number every period. So he gave each prime its own sine and multiplied them. The original quote, sentence by sentence, is in [docs/provenance.md](docs/provenance.md).

**Known limitation, kept as written.** The loop breaks once the product falls below `1e-14` (`sieve/埃氏筛连续数学版本.py:37`). Past roughly 20 primes that happens near the left edge of the range, so the drawn curve flattens into a straight line on zero. The browser version accumulates `log|F|` instead of multiplying — same function, no underflow.

**What it is and isn't.** The identity is not new: it is the multiplicative idea behind Euler's product for the zeta function, written continuously. Independently derived and implemented here; the honest claim is *derived and built*, not *discovered*.

---

## License

[MIT](LICENSE) © 2026 Xichun Guo

[English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md)

# sieve/ — sine-product prime sieve

Multiply one sine per prime:

$$
F(x) = \prod_{p \in \lbrace 2, 3, 5, \dots \rbrace} \sin\left(\frac{\pi x}{p}\right)
$$

Every factor is zero exactly where `x` is a multiple of `p` — so as soon as `x` is divisible by any prime in the list, the whole product vanishes.
(Strictly: with the first `k` primes, for `x` larger than the biggest of them and `k ≥ √x`, "product is non-zero" is the same as "`x` is prime".)
The program plots that curve and marks the primes it used under it.

## Files

- `埃氏筛连续数学版本.py` — the original, **179 lines**, Python + `pygame`, kept exactly as written (filename included). No math library: the primes, the product and the auto-scaling are all computed inside this file — `pygame` only opens a window and draws lines
- `web/index.html` + `web/sieve.js` — the browser port; open the HTML directly, no server and no build, with sliders instead of drag handles so it works on a phone; hover any integer to see what that number really is

## How to run

```bash
pip install pygame
python 埃氏筛连续数学版本.py
```

Browser version: just open `web/index.html`. The same page is online at <https://vocalb1.com/static/prime.html>.

## Where the idea came from

The author was playing with the Riemann zeta function and reading how the 1/2-line (Riemann hypothesis) is used to predict primes, when he noticed a `sin` sitting in there. Sine is periodic — one period, one gap — and a sieve needs exactly that: a way to knock out a number every period. So he gave each prime its own sine and multiplied them.

## Not a logic error — a precision threshold

The loop breaks once the product falls below `1e-14` (`埃氏筛连续数学版本.py:37`). The cutoff reads "below this, call it zero" (a number the author **tuned by feel, not calculated**) — mathematically the zeros are still zeros, so the logic is fine; but with enough primes and `x` near the left edge of the range, the true value drops to the `1e-71` scale, and every one of those points gets treated as zero, so the curve collapses onto the axis. The browser version accumulates `log|F|` instead of multiplying: the same function, written so that stretch stays visible.

The identity is not new: it is the multiplicative idea behind Euler's product for the zeta function, written continuously.

---

Back to [README](../README.md) · [MIT](../LICENSE) © 2026 Xichun Guo

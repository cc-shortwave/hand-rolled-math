# sieve/

Sine-product prime sieve. One sine per prime, multiplied together:

```
F(x) = Π sin(πx/p)     p = 2, 3, 5, 7, ...
```

Zero wherever `x` is a multiple of some `p` in the set, non-zero on the primes — so plotting it shows the primes in range.

- `埃氏筛连续数学版本.py` — the original, **179 lines**, Python + `pygame`, kept exactly as written (filename included). No math library: the primes, the product and the scaling are computed in the file itself.
- `web/index.html` + `web/sieve.js` — browser port; open the HTML directly (no server, no build), drag-free sliders for touch

```bash
pip install pygame
python 埃氏筛连续数学版本.py
```

Not a logic error, a precision threshold: the loop breaks below `1e-14` (line 37), i.e. "below this, call it zero". With more than ~20 primes the true value drops to the `1e-71` scale near the left edge, gets treated as zero, and the curve flattens. The browser port sums logs instead, which keeps that stretch visible.

Back to [README](../README.md)

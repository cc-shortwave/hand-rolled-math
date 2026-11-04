# sieve/

Sine-product prime sieve. One sine per prime, multiplied together:

```
F(x) = Π sin(πx/p)     p = 2, 3, 5, 7, ...
```

Zero wherever `x` is a multiple of some `p` in the set, non-zero on the primes — so plotting it shows the primes in range.

- `埃氏筛连续数学版本.py` — the original, **179 lines**, Python + `pygame`, kept exactly as written (filename included)
- `web/index.html` — browser port, single file, open it directly; drag-free sliders for touch

```bash
pip install pygame
python 埃氏筛连续数学版本.py
```

Known limitation: the product loop breaks below `1e-14` (line 37), which flattens the curve once more than ~20 primes are used. The browser port sums logs instead.

Back to [README](../README.md) · claims with file:line → [docs/claims.md](../docs/claims.md)

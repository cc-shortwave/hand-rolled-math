(() => {
  const cv = document.getElementById('cv');
  const ctx = cv.getContext('2d');
  const $ = id => document.getElementById(id);
  const st = { k: 10, xmax: 120, log: true, prime: true, zeros: true, gain: 1 };
  // 支持 #k=45&x=300&mode=lin 这样的链接，方便直接指向某个视图
  (() => {
    const h = new URLSearchParams(location.hash.replace(/^#/, ''));
    if (h.has('k')) st.k = Math.min(45, Math.max(1, +h.get('k')));
    if (h.has('x')) st.xmax = Math.min(600, Math.max(20, +h.get('x')));
    if (h.get('mode') === 'lin') st.log = false;
    if (h.get('zeros') === '0') st.zeros = false;
  })();

  // ---------- 素数 ----------
  function genPrimes(n) {
    const ps = [];
    for (let c = 2; ps.length < n; c++) {
      let ok = true;
      for (const p of ps) {
        if (p * p > c) break;
        if (c % p === 0) {
          ok = false;
          break;
        }
      }
      if (ok) ps.push(c);
    }
    return ps;
  }
  const isPrime = n => {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  };

  // ---------- F(x)：用 log 累加，彻底避开下溢 ----------
  // 返回 log10|F|；遇到零因子（|sin| 小于 1e-12，即整数倍）返回 -Infinity
  const SIN_ZERO = 1e-12;
  function log10F(x, ps) {
    let s = 0;
    for (const p of ps) {
      const t = Math.abs(Math.sin((Math.PI * x) / p));
      if (t < SIN_ZERO) return -Infinity; // 真零：x 是 p 的倍数
      s += Math.log10(t);
    }
    return s;
  }
  // 整数 x 是否被用到的素数整除（精确零点判据，不受浮点影响）
  const isZeroInt = (n, ps) => ps.some(p => n % p === 0);

  function draw() {
    const dpr = window.devicePixelRatio || 1;
    const cssW = cv.clientWidth || 900,
      cssH = cssW < 520 ? 320 : 440;
    cv.width = Math.round(cssW * dpr);
    cv.height = Math.round(cssH * dpr);
    cv.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const ps = genPrimes(st.k);
    const pmax = ps[ps.length - 1],
      bound = pmax * pmax; // 可判上界：x ≤ p_n² 时「F≠0 ⟺ 素数」才成立
    const vbEl = $('vb');
    if (vbEl) vbEl.textContent = '可判到 ' + bound;
    const M = { l: 52, r: 16, t: 18, b: 84 };
    const W = cssW - M.l - M.r,
      H = cssH - M.t - M.b;

    // 采样：均匀网格 + 所有整数（整数必须精确采样，否则踩不到真正的零点）
    const N = Math.max(600, Math.round(W * 2));
    const raw = [];
    for (let i = 0; i <= N; i++) raw.push((st.xmax * i) / N);
    for (let n = 0; n <= st.xmax; n++) raw.push(n);
    raw.sort((a, b) => a - b);
    const xs = [],
      ys = [];
    let lo = Infinity,
      hi = -Infinity;
    for (let i = 0; i < raw.length; i++) {
      const x = raw[i];
      if (i && Math.abs(x - xs[xs.length - 1]) < 1e-9) continue;
      const v = log10F(x, ps);
      xs.push(x);
      ys.push(v);
      if (isFinite(v)) {
        if (v < lo) lo = v;
        if (v > hi) hi = v;
      }
    }
    if (!isFinite(lo)) {
      lo = -30;
      hi = 1;
    }
    // 对数轴：把 -Infinity 画在底部之下
    const pad = Math.max(2, (hi - lo) * 0.08);
    const yTop = hi + pad,
      yBot = lo - pad;
    const X = x => M.l + (x / st.xmax) * W;
    const Ylog = v => M.t + ((yTop - (isFinite(v) ? v : yBot)) / (yTop - yBot)) * H;
    const Ylin = v => {
      // 线性模式：|F| 归一化后取增益
      const a = isFinite(v) ? Math.pow(10, v) : 0;
      return M.t + H - Math.min(1, a * st.gain) * H * 0.94;
    };
    const Y = st.log ? Ylog : Ylin;

    // 网格
    ctx.strokeStyle = '#1b2130';
    ctx.lineWidth = 1;
    const gstep = Math.max(1, Math.round(st.xmax / 10));
    for (let g = 0; g <= st.xmax; g += gstep) {
      const px = Math.round(X(g)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(px, M.t);
      ctx.lineTo(px, M.t + H);
      ctx.stroke();
    }
    // 基线
    ctx.strokeStyle = '#2b3242';
    ctx.beginPath();
    ctx.moveTo(M.l, M.t + H + 0.5);
    ctx.lineTo(M.l + W, M.t + H + 0.5);
    ctx.stroke();

    // 可判边界：p² 右侧的曲线不再代表"是不是素数"，只代表"有没有被前 k 个素数整除"
    if (bound < st.xmax) {
      const xb = X(bound);
      ctx.fillStyle = 'rgba(255,90,90,.08)';
      ctx.fillRect(xb, M.t, M.l + W - xb, H);
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = 'rgba(255,120,120,.55)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(xb, M.t);
      ctx.lineTo(xb, M.t + H);
      ctx.stroke();
      ctx.restore();
    }

    // 曲线
    ctx.strokeStyle = '#00dcff';
    ctx.lineWidth = 1.6;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i < xs.length; i++) {
      const px = X(xs[i]),
        py = Y(ys[i]);
      const clipped = py > M.t + H + 6;
      if (clipped) {
        pen = false;
        continue;
      }
      if (!pen) {
        ctx.moveTo(px, py);
        pen = true;
      } else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 边界标签放在曲线之上，加一块暗底，别被曲线埋掉
    if (bound < st.xmax) {
      const xb2 = X(bound),
        room = M.l + W - xb2;
      const txt = 'p² = ' + bound + ' 起只能判 n-粗糙数';
      ctx.save();
      ctx.font = '11px ui-monospace,Menlo,monospace';
      const tw = ctx.measureText(txt).width;
      let tx = room > tw + 24 ? xb2 + 8 : xb2 - tw - 8;
      tx = Math.max(M.l + 4, Math.min(tx, M.l + W - tw - 4));
      const ty = M.t + 8;
      ctx.fillStyle = 'rgba(10,12,20,.78)';
      ctx.fillRect(tx - 5, ty - 2, tw + 10, 16);
      ctx.fillStyle = 'rgba(255,160,160,.95)';
      ctx.textAlign = 'left';
      ctx.fillText(txt, tx, ty + 11);
      ctx.restore();
    }

    // 精确零点：曲线上已经包含整数采样点，零点会自然落成一整根竖刺。
    // 线性模式下零点不可见，单独在底部打标记。
    if (!st.log && st.zeros) {
      ctx.fillStyle = 'rgba(0,220,255,.6)';
      for (let n = 2; n <= st.xmax; n++) {
        if (!isZeroInt(n, ps)) continue;
        ctx.fillRect(Math.round(X(n)) - 1, M.t + H - 12, 2, 8);
      }
    }

    // ---- 底部筛子条：每个整数一格，颜色说明它被怎么处理 ----
    {
      const y0 = M.t + H + 8,
        hh = 12;
      const cw = W / st.xmax;
      for (let n = 2; n <= st.xmax; n++) {
        const x0 = X(n),
          x1 = Math.min(X(n + 1), M.l + W) - X(n);
        const pr = isPrime(n),
          z = isZeroInt(n, ps) && !pr; // 素数在列表里也会使 F=0，但它不是"被筛掉"
        let col;
        if (z)
          col = 'rgba(0,220,255,.30)'; // 被筛掉
        else if (pr)
          col = 'rgba(255,150,38,.95)'; // 幸存且真是素数
        else col = 'rgba(200,50,50,.75)'; // 幸存但其实是合数（漏过）
        ctx.fillStyle = col;
        ctx.fillRect(x0 + (x1 > 3 ? 0.5 : 0), y0, Math.max(1, x1 - (x1 > 3 ? 1 : 0)), hh);
      }
      ctx.strokeStyle = '#2b3242';
      ctx.strokeRect(M.l + 0.5, y0 + 0.5, W, hh);
    }

    // 整数刻度
    const nice = v => {
      for (const s of [1, 2, 5, 10, 20, 25, 50, 100]) if (v <= s) return s;
      return 200;
    };
    const stepI = nice(st.xmax / Math.max(5, Math.floor(W / 46)));
    for (let n = 0; n <= st.xmax; n += stepI) {
      const px = X(n);
      const pr = isPrime(n),
        z = isZeroInt(n, ps) && n >= 2;
      if (st.prime && pr) {
        ctx.fillStyle = '#ff9626';
        ctx.fillRect(Math.round(px) - 1, M.t + H + 2, 2, 9);
      } else if (z && st.zeros) {
        ctx.fillStyle = 'rgba(0,220,255,.55)';
        ctx.fillRect(Math.round(px) - 1, M.t + H + 2, 2, 6);
      }
      if (n % stepI === 0) {
        ctx.fillStyle = '#6b7688';
        ctx.font = '11px ui-monospace,Menlo,monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(n), px, M.t + H + 38);
      }
    }
    // 轴标签
    ctx.fillStyle = '#6b7688';
    ctx.font = '11px ui-monospace,Menlo,monospace';
    ctx.textAlign = 'right';
    if (st.log) {
      const t1 = Math.ceil(yTop),
        b1 = Math.floor(yBot);
      for (let v = b1; v <= t1; v += Math.max(1, Math.round((t1 - b1) / 5))) {
        const py = Ylog(v);
        ctx.fillText('1e' + v, M.l - 8, py + 4);
      }
      ctx.save();
      ctx.translate(14, M.t + H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('log₁₀ |F|', 0, 0);
      ctx.restore();
    } else {
      for (const f of [0, 0.25, 0.5, 0.75, 1]) {
        const y = M.t + H - f * H * 0.94;
        ctx.fillText((f / st.gain).toFixed(2), M.l - 8, y + 4);
      }
      ctx.save();
      ctx.translate(14, M.t + H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('|F| × gain', 0, 0);
      ctx.restore();
    }

    // ---------- 统计（只在 x > 最大已用素数 的范围内判，避免把"素数被自己筛掉"算成错） ----------
    let zeros = 0; // 只数"被筛掉的合数"；列表里的素数自身也会让 F=0，不算进来
    for (let n = 2; n <= st.xmax; n++) if (isZeroInt(n, ps) && !isPrime(n)) zeros++;
    let ok = 0;
    let tot = 0;
    const leaked = [];
    for (let n = pmax + 1; n <= st.xmax; n++) {
      const survivor = !isZeroInt(n, ps); // F≠0 ⇒ 没被任何已用素数整除
      const real = isPrime(n);
      tot++;
      if (survivor === real) ok++;
      else if (survivor && !real) leaked.push(n); // 合数漏过去（因子全都 > pmax）
    }
    $('sPrimes').textContent = `${st.k} 个（最大 ${pmax}）`;
    $('sZeros').textContent = zeros;
    $('sOk').textContent = ok;
    $('sTot').textContent = tot;
    $('sWarn').textContent =
      tot === 0
        ? `x 上限比最大素数 ${pmax} 还短，这段没有可判的整数 —— 把 x 拉到 ${Math.min(600, pmax * 2)} 以上再看`
        : leaked.length
          ? `合数漏过 ${leaked.length} 个（最小 ${leaked[0]}，因子都 > ${pmax}）`
          : '这段范围内幸存者全是素数 ✓';
  }

  // ---------- 交互 ----------
  function syncHash() {
    // 拖完滑杆地址栏跟着变，复制链接就能分享当前视图
    try {
      history.replaceState(
        null,
        '',
        '#k=' + st.k + '&x=' + st.xmax + (st.log ? '' : '&mode=lin') + (st.zeros ? '' : '&zeros=0'),
      );
    } catch (e) {
      /* file:// 或被沙箱限制时忽略 */
    }
  }
  $('k').addEventListener('input', e => {
    st.k = +e.target.value;
    $('vk').textContent = st.k;
    syncHash();
    draw();
  });
  $('xmax').addEventListener('input', e => {
    st.xmax = +e.target.value;
    $('vx').textContent = st.xmax;
    syncHash();
    draw();
  });
  $('gain').addEventListener('input', e => {
    st.gain = +e.target.value;
    $('vg').textContent = st.gain.toFixed(1) + '×';
    draw();
  });
  const toggle = (id, key) =>
    $(id).addEventListener('click', e => {
      st[key] = !st[key];
      e.currentTarget.setAttribute('aria-pressed', st[key]);
      draw();
    });
  $('mLog').addEventListener('click', () => {
    st.log = true;
    $('mLog').setAttribute('aria-pressed', true);
    $('mLin').setAttribute('aria-pressed', false);
    draw();
  });
  $('mLin').addEventListener('click', () => {
    st.log = false;
    $('mLin').setAttribute('aria-pressed', true);
    $('mLog').setAttribute('aria-pressed', false);
    draw();
  });
  toggle('tPrime', 'prime');
  toggle('tZeros', 'zeros');
  // 控件初始值跟随 hash
  $('k').value = st.k;
  $('vk').textContent = st.k;
  $('xmax').value = st.xmax;
  $('vx').textContent = st.xmax;
  if (!st.log) {
    $('mLin').setAttribute('aria-pressed', true);
    $('mLog').setAttribute('aria-pressed', false);
  }
  $('tZeros').setAttribute('aria-pressed', st.zeros);

  addEventListener('resize', draw);
  draw();
})();

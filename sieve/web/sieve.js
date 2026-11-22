// ── i18n ─────────────────────────────────────────────────────────
const I18N = {
  zh: {
    title: '用正弦乘积筛质数',
    sub: '每一个 sin(πx/p) 的零点都落在 p 的倍数上。把前 n 个质数的正弦乘起来，零点的集合就是“能被这些小质数整除的数”。剩下不为零的地方，就是质数。',
    controls: '参数',
    primeCount: '参与相乘的质数个数',
    xRange: '横轴范围',
    ygain: '纵向增益',
    lgInvalid: '无效区 x ≤ p：质数被自己筛掉',
    lgValid: '有效区 p < x ≤ p²：这里才分得出质数',
    lgOver: '超界区 x > p²：只能判 n-粗糙数',
    lgUsed: '已参与相乘的质数',
    lgUnused: '视野内但没参与相乘的质数',
    lgDetected: '被曲线判定出来的质数',
    hint: '把「质数个数」往下拉，可判上限 p² 会跟着往左移；在有效区里，曲线不为零的位置正好是质数。',
    sUsed: '已用质数',
    sValid: '可判范围',
    sHit: '有效区一致率',
    sFound: '判定出质数',
    sReal: '该区间实际质数',
    sMax: '最大参与质数',
    sBound: '可判上限 p²',
    sOver: '超界段',
    sLeak: '漏过合数',
    capBound: '可判到',
    warnNoValid: '⚠ 横轴全在无效区：x 还没越过最大质数',
    warnOver: '⚠ 横轴已越过 p²：右边那些“幸存者”里有合数，不能当质数看',
    rgInvalid: '无效区',
    rgValid: '有效区',
    rgOver: '只能判 n-粗糙数',
    source: '源码',
    tipInvalidPrime: '质数 —— 不过在无效区：它自己也在乘数里',
    tipInvalidComp: '合数 —— p 能整除它',
    tipValidPrime: '质数 ✓ 判对了',
    tipValidComp: '合数 —— 被前 n 个质数筛掉',
    tipOverPrime: '质数 —— 已越过 p²，这里不保证',
    tipOverComp: '漏网合数 —— 前 n 个质数都除不尽它',
    tipValue: 'F =',
  },
  en: {
    title: 'Sieving Primes with Sines',
    sub: 'Every sin(πx/p) has zeros exactly at multiples of p. Multiply the sines of the first n primes and the zeros become "numbers divisible by some small prime". Where the product stays non-zero, you have a prime.',
    controls: 'Controls',
    primeCount: 'Primes multiplied',
    xRange: 'X range',
    ygain: 'Y gain',
    lgInvalid: 'Invalid x ≤ p: a listed prime zeroes itself out',
    lgValid: 'Valid p < x ≤ p²: primes are readable here',
    lgOver: 'Beyond p²: only n-rough numbers can be judged',
    lgUsed: 'Primes in the product',
    lgUnused: 'Primes in view, not in the product',
    lgDetected: 'Primes detected by the curve',
    hint: 'Lower the prime count and the p² limit shifts left. Inside the valid band, every non-zero point of the curve is a prime.',
    sUsed: 'primes used',
    sValid: 'judge range',
    sHit: 'accuracy in band',
    sFound: 'detected',
    sReal: 'actual primes there',
    sMax: 'largest prime used',
    sBound: 'limit p²',
    sOver: 'beyond p²',
    sLeak: 'leaked composites',
    capBound: 'judges up to',
    warnNoValid: '⚠ The whole x range is in the invalid zone: x never passes the largest prime',
    warnOver: '⚠ x range passes p²: the survivors on the right include composites',
    rgInvalid: 'invalid',
    rgValid: 'valid',
    rgOver: 'rough numbers only',
    source: 'Source',
    tipInvalidPrime: 'prime — but in the invalid band: it is one of the factors itself',
    tipInvalidComp: 'composite — p divides it',
    tipValidPrime: 'prime ✓ judged right',
    tipValidComp: 'composite — sieved out',
    tipOverPrime: 'prime — past p², not guaranteed here',
    tipOverComp: 'leaked composite — none of the first n primes divides it',
    tipValue: 'F =',
  },
  ja: {
    title: '正弦の積で素数をふるい分ける',
    sub: 'sin(πx/p) の零点はちょうど p の倍数に来ます。最初の n 個の素数の正弦を掛け合わせると、零点の集合は「小さい素数で割り切れる数」になります。零点でない場所が素数です。',
    controls: 'パラメータ',
    primeCount: '掛け合わせる素数の個数',
    xRange: '横軸の範囲',
    ygain: '縦方向のゲイン',
    lgInvalid: '無効域 x ≦ p：素数自身が零点になる',
    lgValid: '有効域 p < x ≦ p²：ここでだけ素数が分かる',
    lgOver: '範囲外 x > p²：n-ラフ数しか判別できない',
    lgUsed: '積に含まれる素数',
    lgUnused: '視野内だが積に含まれない素数',
    lgDetected: '曲線が素数と判定した点',
    hint: '素数の個数を下げると判定上限 p² が左へ動きます。有効域では、曲線がゼロでない点がそのまま素数です。',
    sUsed: '使用素数',
    sValid: '判定範囲',
    sHit: '有効域の一致率',
    sFound: '検出した素数',
    sReal: 'その区間の実際の素数',
    sMax: '最大の素数',
    sBound: '判定上限 p²',
    sOver: '範囲外',
    sLeak: '取りこぼした合成数',
    capBound: '判定上限',
    warnNoValid: '⚠ 横軸がすべて無効域です：x が最大の素数を超えていません',
    warnOver: '⚠ 横軸が p² を超えています：右側の「生存者」には合成数が混じります',
    rgInvalid: '無効域',
    rgValid: '有効域',
    rgOver: 'n-ラフ数のみ',
    source: 'ソース',
    tipInvalidPrime: '素数 —— ただし無効域：それ自身が積に含まれる',
    tipInvalidComp: '合成数 —— p で割り切れる',
    tipValidPrime: '素数 ✓ 正しく判定',
    tipValidComp: '合成数 —— ふるい落とされた',
    tipOverPrime: '素数 —— p² の外なので、ここでは保証されない',
    tipOverComp: '取りこぼした合成数 —— 最初の n 個の素数では割り切れない',
    tipValue: 'F =',
  },
};

const _h = new URLSearchParams(location.hash.replace(/^#/, ''));
const store = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  },
};
let LANG = _h.get('lang') || store.get('lang') || 'zh';
if (!I18N[LANG]) LANG = 'zh';
const T = k => I18N[LANG][k] ?? k;

function applyLang() {
  document.documentElement.lang = LANG === 'zh' ? 'zh-CN' : LANG;
  document.querySelectorAll('[data-t]').forEach(el => (el.textContent = T(el.dataset.t)));
  document
    .querySelectorAll('.langs button')
    .forEach(b => b.classList.toggle('active', b.dataset.lang === LANG));
  draw();
}
document.querySelectorAll('.langs button').forEach(b =>
  b.addEventListener('click', () => {
    LANG = b.dataset.lang;
    store.set('lang', LANG);
    applyLang();
  }),
);

// ── 数学 ─────────────────────────────────────────────────────────
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
function firstPrimes(n) {
  const out = [];
  let c = 2;
  while (out.length < n) {
    if (isPrime(c)) out.push(c);
    c++;
  }
  return out;
}
// ∏ sin(πx/p)，靠近零点时提前退出（和原件同一写法）
function product(x, ps) {
  let r = 1;
  for (let i = 0; i < ps.length; i++) {
    r *= Math.sin((Math.PI * x) / ps[i]);
    if (Math.abs(r) < 1e-13) return 0;
  }
  return r;
}
// 整数点是否真的被筛掉：必须用整数整除判，不能拿浮点结果猜
// （sin(π) 在双精度里是 1.2e-16，不等于 0）
function isZeroInt(n, ps) {
  for (let i = 0; i < ps.length; i++) if (n % ps[i] === 0) return true;
  return false;
}

// ── 画布 ─────────────────────────────────────────────────────────
const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
const hc = document.getElementById('hint'); // 悬停用的副画布（只画指示，不碰主画布）
const hx = hc.getContext('2d');
const tip = document.getElementById('tip');
let geom = null; // draw() 结束时写入，供悬停用
let W = 900,
  H = 460; // 逻辑尺寸
// ?cover=1200x900 → 只留画布铺满窗口，用来出封面图（日常访问不会触发）
const COVER = new URLSearchParams(location.search).get('cover');
if (COVER) {
  const m = /^(\d+)x(\d+)$/.exec(COVER === '1' ? '1200x900' : COVER);
  if (m) {
    W = +m[1];
    H = +m[2];
  }
  document.body.style.margin = '0';
  document
    .querySelectorAll('header, .panel, .langs, .back')
    .forEach(e => (e.style.display = 'none'));
  const mn = document.querySelector('main');
  mn.style.cssText = 'margin:0;padding:0;display:block;max-width:none';
  const st = document.querySelector('.stage');
  st.style.cssText =
    'border:none;border-radius:0;width:' + W + 'px;height:' + H + 'px;background:#050810';
  cv.style.width = W + 'px';
  cv.style.height = H + 'px';
}
const FS = COVER ? 1.5 : 1; // 出封面时字放大，缩到卡片尺寸才看得清
const PAD = { l: 54, r: 22, t: 26, b: 46 };

function fitCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = W * dpr;
  cv.height = H * dpr;
  hc.width = cv.width;
  hc.height = cv.height;
  cv.style.height = (cv.clientWidth * H) / W + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', fitCanvas);

const $ = id => document.getElementById(id);
const state = { n: 10, xMax: 70, gain: 100 };

function readInputs() {
  state.n = +$('sN').value;
  state.xMax = +$('sX').value;
  state.gain = +$('sY').value;
  $('vN').textContent = state.n;
  $('vX').textContent = state.xMax;
  $('vY').textContent = (state.gain / 100).toFixed(1) + '×';
}

function draw() {
  fitCanvas();
  readInputs();

  const ps = firstPrimes(state.n);
  const pMax = ps[ps.length - 1];
  const bound = pMax * pMax; // 可判上限：x ≤ p² 时「非零 ⟺ 质数」才成立
  const xMax = state.xMax;
  $('vBound').textContent = T('capBound') + ' ' + bound;

  // 自适应缩放：采样估算最大绝对值
  let maxAbs = 0;
  for (let i = 0; i <= 220; i++) {
    const x = (i / 220) * xMax;
    const v = Math.abs(product(x, ps));
    if (v > maxAbs) maxAbs = v;
  }
  if (maxAbs < 1e-12) maxAbs = 1;

  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const x0 = PAD.l,
    y0 = PAD.t + plotH / 2;
  const X = x => x0 + (x / xMax) * plotW;
  const Y = v => y0 - (v / maxAbs) * (state.gain / 100) * (plotH / 2);

  ctx.clearRect(0, 0, W, H);
  hideHover(); // 参数一变，旧提示就作废

  // ── 三段底纹：无效 x ≤ p ／ 有效 p < x ≤ p² ／ 超界 x > p²
  const xInvalidEnd = X(Math.min(pMax, xMax));
  ctx.fillStyle = 'rgba(255,255,255,.035)';
  ctx.fillRect(x0, PAD.t, xInvalidEnd - x0, plotH);

  let xValidEnd = xInvalidEnd;
  if (pMax < xMax) {
    xValidEnd = X(Math.min(bound, xMax));
    const g = ctx.createLinearGradient(xInvalidEnd, 0, xValidEnd, 0);
    g.addColorStop(0, 'rgba(57,224,240,.10)');
    g.addColorStop(1, 'rgba(57,224,240,.02)');
    ctx.fillStyle = g;
    ctx.fillRect(xInvalidEnd, PAD.t, xValidEnd - xInvalidEnd, plotH);

    if (bound < xMax) {
      ctx.fillStyle = 'rgba(255,92,92,.075)';
      ctx.fillRect(xValidEnd, PAD.t, X(xMax) - xValidEnd, plotH);
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = 'rgba(255,120,120,.6)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(xValidEnd, PAD.t);
      ctx.lineTo(xValidEnd, PAD.t + plotH);
      ctx.stroke();
      ctx.restore();
    }
  }

  // 网格
  ctx.strokeStyle = 'rgba(255,255,255,.06)';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#6b7f94';
  ctx.font = Math.round(11 * FS) + 'px ui-monospace,monospace';
  const step = Math.max(1, Math.round(xMax / 14));
  for (let x = 0; x <= xMax; x += step) {
    ctx.beginPath();
    ctx.moveTo(X(x), PAD.t);
    ctx.lineTo(X(x), PAD.t + plotH);
    ctx.stroke();
    ctx.fillText(String(x), X(x) - 5, PAD.t + plotH + 16);
  }
  // 零轴
  ctx.strokeStyle = 'rgba(255,255,255,.22)';
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + plotW, y0);
  ctx.stroke();

  // 横轴上的质数标记（橙=已参与，红=视野内没参与）
  ctx.font = Math.round(10 * FS) + 'px ui-monospace,monospace';
  const validEnd = Math.min(bound, xMax);
  let real = 0;
  for (let x = 2; x <= xMax; x++) {
    const prime = isPrime(x);
    if (prime) {
      const used = x <= pMax;
      ctx.strokeStyle = used ? 'rgba(255,154,60,.85)' : 'rgba(255,92,92,.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(X(x), y0 - (used ? 5 : 8));
      ctx.lineTo(X(x), y0 + (used ? 5 : 8));
      ctx.stroke();
      // 出封面时不画这排红字：和绿色「判定出质数」的标签重复，画面太挤
      if (!used && !COVER && xMax <= 100) {
        ctx.fillStyle = 'rgba(255,92,92,.95)';
        ctx.fillText(String(x), X(x) - 5, PAD.t + plotH - 4);
      }
    }
    if (x > pMax && x <= validEnd && prime) real++;
  }

  // 曲线：每个区合成一条 path（逐段描边会在拐点留缝，看着断断续续）
  const SEG = Math.max(2, Math.round(plotW * 1.6)); // 采样密度：约 29 点 / 1 个单位
  const zoneOf = x => (x <= pMax ? 0 : x <= bound ? 1 : 2);
  const pts = [];
  for (let i = 0; i <= SEG; i++) {
    const xx = (i / SEG) * xMax;
    pts.push({ x: X(xx), y: Y(product(xx, ps)), z: zoneOf(xx) });
  }
  const STYLE = [
    { c: 'rgba(120,134,150,.65)', w: 1.3 }, // 无效区
    { c: 'rgba(57,224,240,.95)', w: 1.9 }, // 有效区
    { c: 'rgba(255,140,120,.88)', w: 1.5 }, // 超界区
  ];
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  for (let z = 0; z < 3; z++) {
    ctx.strokeStyle = STYLE[z].c;
    ctx.lineWidth = STYLE[z].w;
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i < pts.length; i++) {
      const p0 = pts[i];
      if (p0.z !== z && !(i > 0 && pts[i - 1].z === z)) {
        pen = false;
        continue;
      }
      if (pen) ctx.lineTo(p0.x, p0.y);
      else {
        ctx.moveTo(p0.x, p0.y);
        pen = true;
      }
    }
    ctx.stroke();
  }

  // 区域标注：画在曲线之上 + 暗底，免得被密集的尖刺盖住
  ctx.font = Math.round(11 * FS) + 'px -apple-system,sans-serif';
  function tag(text, x, color, alignRight) {
    ctx.save();
    const tw = ctx.measureText(text).width;
    const tx = alignRight ? Math.max(M_l(), x - tw - 6) : x;
    ctx.fillStyle = 'rgba(8,10,18,.78)';
    ctx.fillRect(tx - 5, PAD.t + 4, tw + 10, Math.round(11 * FS) + 7);
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.fillText(text, tx, PAD.t + 8 + Math.round(11 * FS));
    ctx.restore();
  }
  const M_l = () => x0 + 3;
  if (pMax >= xMax) {
    tag(T('rgInvalid'), x0 + 8, 'rgba(160,170,190,.85)', false);
  } else {
    tag(T('rgValid'), X(pMax) + 8, 'rgba(57,224,240,.85)', false);
    if (bound < xMax) {
      const room = X(xMax) - X(bound);
      const label = 'p² = ' + bound + ' · ' + T('rgOver');
      tag(label, room > 230 ? X(bound) + 8 : X(bound) - 8, 'rgba(255,160,160,.95)', room <= 230);
    }
  }

  // 有效区里被判定出来的质数（整数点用整除判零点，不用浮点猜）
  let found = 0;
  for (let x = pMax + 1; x <= validEnd; x++) {
    if (isZeroInt(x, ps)) continue;
    found++;
    if (xMax <= 140) {
      ctx.fillStyle = '#6ee7a8';
      ctx.beginPath();
      ctx.arc(X(x), Y(product(x, ps)), 2.6, 0, Math.PI * 2);
      ctx.fill();
      if (xMax <= 100) {
        const yy = Math.max(PAD.t + 12, Y(product(x, ps)) - 9);
        const lb = String(x);
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(5,8,16,.92)'; // 描一圈暗底，压在曲线上也读得清
        ctx.strokeText(lb, X(x) - 5, yy);
        ctx.fillStyle = 'rgba(110,231,168,.98)';
        ctx.fillText(lb, X(x) - 5, yy);
        ctx.restore();
      }
    }
  }

  // 超界段里漏网的合数（幸存但不是质数）
  let leaks = 0,
    firstLeak = 0;
  if (bound < xMax) {
    for (let x = Math.max(bound + 1, pMax + 1); x <= xMax; x++) {
      if (!isZeroInt(x, ps) && !isPrime(x)) {
        leaks++;
        if (!firstLeak) firstLeak = x;
      }
    }
  }

  // ── 侧栏数字
  const acc = found ? (found === real ? '100%' : ((found / real) * 100).toFixed(1) + '%') : '—';
  $('stats').innerHTML =
    `<div>${T('sMax')}：<b>${pMax}</b>（${T('sUsed')} ${ps.length}）</div>` +
    `<div>${T('sBound')}：<b>${bound}</b></div>` +
    `<div>${T('sValid')}：<b>${pMax + 1} – ${validEnd}</b></div>` +
    `<div>${T('sFound')}：<b>${found}</b> / ${T('sReal')} <b>${real}</b></div>` +
    `<div>${T('sHit')}：<b>${acc}</b></div>` +
    (leaks
      ? `<div class="warn">${T('sOver')} ${bound + 1} – ${xMax}：${T('sLeak')} <b>${leaks}</b>（${firstLeak}）</div>`
      : '') +
    (pMax >= xMax ? `<div class="warn">${T('warnNoValid')}</div>` : '') +
    (leaks ? `<div class="warn">${T('warnOver')}</div>` : '');

  geom = { ps, pMax, bound, xMax, X, Y }; // 留给悬停提示用
}

// ── 悬停说明：指针靠近某个整数时，说清这个数是什么
function hideHover() {
  hx.setTransform(1, 0, 0, 1, 0, 0);
  hx.clearRect(0, 0, hc.width, hc.height);
  tip.style.display = 'none';
}

function hoverAt(ev) {
  if (COVER || !geom) return;
  const r = cv.getBoundingClientRect();
  const mx = ((ev.clientX - r.left) / r.width) * W;
  const my = ((ev.clientY - r.top) / r.height) * H;
  const { ps, pMax, bound, xMax, X, Y } = geom;
  const n = Math.round(((mx - PAD.l) / (W - PAD.l - PAD.r)) * xMax);
  const inPlot = my >= PAD.t - 8 && my <= H - PAD.b + 8;
  // 容差按屏幕像素算，手机窄屏下也点得中
  const nearPx = Math.abs(X(n) - mx) * (r.width / W);
  if (!inPlot || n < 2 || n > xMax || nearPx > 10) return hideHover();

  const zone = n <= pMax ? 0 : n <= bound ? 1 : 2; // 0 无效 / 1 可判 / 2 超界
  const zeroed = isZeroInt(n, ps);
  const prime = isPrime(n);
  const key =
    zone === 0
      ? prime
        ? 'tipInvalidPrime'
        : 'tipInvalidComp'
      : zeroed
        ? 'tipValidComp'
        : zone === 1
          ? 'tipValidPrime'
          : prime
            ? 'tipOverPrime'
            : 'tipOverComp';
  const color = ['#a0aabe', zeroed ? '#ff8f8f' : '#6ee7a8', prime ? '#ffd08a' : '#ff8f8f'][zone];
  const v = zeroed ? 0 : product(n, ps);

  // 副画布：竖虚线 + 圈出那个点
  const dpr = hc.width / W;
  hx.setTransform(dpr, 0, 0, dpr, 0, 0);
  hx.clearRect(0, 0, W, H);
  hx.save();
  hx.strokeStyle = 'rgba(255,255,255,.20)';
  hx.setLineDash([3, 4]);
  hx.lineWidth = 1;
  hx.beginPath();
  hx.moveTo(X(n), PAD.t);
  hx.lineTo(X(n), H - PAD.b);
  hx.stroke();
  hx.restore();
  hx.beginPath();
  hx.arc(X(n), Y(v), 5, 0, Math.PI * 2);
  hx.strokeStyle = color;
  hx.lineWidth = 2;
  hx.stroke();

  // 提示框：横向跟着数走，纵向压在画布上沿，免得盖住曲线
  tip.innerHTML =
    `<b>${n}</b><span style="color:${color}">${T(key)}</span>` +
    `<i>${T('tipValue')} ${v === 0 ? '0' : v.toExponential(2)}</i>`;
  tip.style.display = 'block';
  const scale = r.width / W;
  const sx = X(n) * scale;
  const half = tip.offsetWidth / 2;
  tip.style.left = Math.min(Math.max(sx, half + 4), r.width - half - 4) + 'px';
  tip.style.top = (PAD.t + 6) * scale + 'px';
}

// ── 深链：#k=4&x=200 之类，方便分享/截图
function applyHash() {
  const h = new URLSearchParams(location.hash.replace(/^#/, ''));
  if (h.has('k')) $('sN').value = Math.max(1, Math.min(45, +h.get('k')));
  if (h.has('x')) $('sX').value = Math.max(10, Math.min(200, +h.get('x')));
  if (h.has('y')) $('sY').value = Math.max(10, Math.min(300, +h.get('y')));
}
function syncHash() {
  const q = `k=${$('sN').value}&x=${$('sX').value}`;
  if (location.hash.replace(/^#/, '') === q) return;
  try {
    history.replaceState(null, '', '#' + q);
  } catch (e) {
    /* file:// 下不允许改历史 */
  }
}
applyHash();

['sN', 'sX', 'sY'].forEach(id =>
  $(id).addEventListener('input', () => {
    draw();
    syncHash();
  }),
);

cv.addEventListener('pointermove', hoverAt);
cv.addEventListener('pointerdown', hoverAt); // 触屏点一下也能看
cv.addEventListener('pointerleave', ev => {
  // 触屏抬手也会触发 pointerleave，那时别急着关
  if (ev.pointerType !== 'touch') hideHover();
});

applyLang();

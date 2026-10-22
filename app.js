// ============================================================
// 健身小程序 · 独立源码版
// 数据全部存浏览器 localStorage，不依赖任何服务器
// ============================================================

const LS_KEY = 'fitness_app_v1';

const store = {
  load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
  },
  save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }
};

let db = Object.assign({ plan: [], weekdays: [1, 3, 5], records: [] }, store.load());
// plan: [{ id, sets }]  weekdays: 1=周一 ... 7=周日

let curEquip = 'all';                     // 器械筛选：all 全部 | floor 纯空手 | wall 墙面 | dumbbell 哑铃 | barbell 杠铃 | band 弹力带 | pullup 单杠 | wheel 健腹轮
const EQUIP_LABEL = { floor: '纯空手', wall: '需墙面', dumbbell: '哑铃', barbell: '杠铃', band: '弹力带', pullup: '单杠', wheel: '健腹轮' };
const curMuscles = new Set(MUSCLES);      // 当前勾选的肌群
const exById = Object.fromEntries(EXERCISES.map(e => [e.id, e]));

const $ = sel => document.querySelector(sel);

// ---------------- 图解 SVG ----------------
function frameGroup(ex, frame, cls, label) {
  const lines = (frame.lines || []).map(([x1, y1, x2, y2]) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`).join('');
  const extra = (frame.extra || []).map(([x1, y1, x2, y2]) =>
    `<line class="scene" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`).join('');
  return `<g class="${cls}">
    <circle cx="${frame.head[0]}" cy="${frame.head[1]}" r="8"/>
    ${lines}${extra}
    <text class="phase" x="8" y="16">${label}</text>
  </g>`;
}

function arrowSvg(a) {
  if (!a) return '';
  const head = (x, y, rot) =>
    `<polygon class="arrowhead" points="0,-5 4,3 -4,3" transform="translate(${x},${y}) rotate(${rot})"/>`;
  if (a.type === 'updown') return `<g class="arrow"><line x1="${a.x}" y1="${a.y - 13}" x2="${a.x}" y2="${a.y + 13}"/>${head(a.x, a.y - 15, 0)}${head(a.x, a.y + 15, 180)}</g>`;
  if (a.type === 'up') return `<g class="arrow"><line x1="${a.x}" y1="${a.y + 12}" x2="${a.x}" y2="${a.y - 12}"/>${head(a.x, a.y - 14, 0)}</g>`;
  if (a.type === 'leftright') return `<g class="arrow"><line x1="${a.x - 15}" y1="${a.y}" x2="${a.x + 15}" y2="${a.y}"/>${head(a.x - 17, a.y, -90)}${head(a.x + 17, a.y, 90)}</g>`;
  if (a.type === 'hold') return `<text class="holdtxt" x="${a.x}" y="${a.y}">保 持</text>`;
  return '';
}

function diagramSvg(ex) {
  return `<svg viewBox="0 0 200 120" role="img" aria-label="${ex.name}图解">
    <style>
      line, circle { stroke:#1d2129; stroke-width:3.5; stroke-linecap:round; fill:none; }
      .scene { stroke:#9ca3af; stroke-width:3; stroke-dasharray:5 4; }
      .ground { stroke:#d1d5db; stroke-width:2; }
      .phase { font-size:10px; fill:#6b7280; stroke:none; }
      .arrow line { stroke:#ff6b35; stroke-width:2.5; }
      .arrowhead { fill:#ff6b35; stroke:none; }
      .holdtxt { font-size:11px; fill:#ff6b35; stroke:none; letter-spacing:2px; }
    </style>
    <line class="ground" x1="6" y1="104" x2="194" y2="104"/>
    ${frameGroup(ex, ex.frames[0], 'frame-a', '起始')}
    ${frameGroup(ex, ex.frames[1], 'frame-b', '发力')}
    ${arrowSvg(ex.arrow)}
  </svg>`;
}

// 动画规则（用户定）：默认静止在起始帧，鼠标悬停（触屏点一下）才动
// 真人图：左右双格照片，悬停时画面在起始格 / 发力格之间滑动
function diagramHtml(ex) {
  if (ex.video) {
    return `<div class="diagram video" data-id="${ex.id}">
      <div class="video-frame">
        <video src="${ex.video}" muted loop playsinline preload="metadata"></video>
      </div>
    </div>`;
  }
  if (ex.img) {
    return `<div class="diagram photo" data-id="${ex.id}" title="把鼠标放上来（或点一下）看动作">
      <div class="photo-frame">
        <img src="${ex.img}" alt="${ex.name}真人示范图">
        <span class="badge b-start">起始</span><span class="badge b-effort">发力</span>
      </div>
    </div>`;
  }
  if (!ex.frames) {
    return `<div class="diagram pending" data-id="${ex.id}"><p class="pending-txt">🎬 真人动图制作中</p></div>`;
  }
  return `<div class="diagram" data-id="${ex.id}" title="把鼠标放上来（或点一下）看动作">
    ${diagramSvg(ex)}
  </div>`;
}

// ---------------- 动作库 ----------------
function renderChips() {
  $('#muscleChips').innerHTML = MUSCLES.map(m =>
    `<button class="chip ${curMuscles.has(m) ? 'active' : ''}" data-muscle="${m}">${m}</button>`).join('');
  document.querySelectorAll('#muscleChips .chip').forEach(c => {
    c.onclick = () => {
      const m = c.dataset.muscle;
      curMuscles.has(m) ? curMuscles.delete(m) : curMuscles.add(m);
      renderChips(); renderLibrary();
    };
  });
}

function renderLibrary() {
  const list = EXERCISES.filter(e =>
    (curEquip === 'all' || e.mode === curEquip) && curMuscles.has(e.muscle));
  $('#libraryEmpty').hidden = list.length > 0;
  $('#exerciseGrid').innerHTML = list.map(ex => {
    const inPlan = db.plan.some(p => p.id === ex.id);
    return `<article class="card">
      <div class="card-head"><h3>${ex.name}</h3><span class="en">${ex.en}</span></div>
      <div class="tags"><span class="tag">${ex.muscle}</span><span class="tag gray">${ex.level}</span><span class="tag gray">${EQUIP_LABEL[ex.mode] || ex.mode}</span>${ex.video ? '<span class="tag">真人动图</span>' : ex.img ? '<span class="tag">真人示范</span>' : ''}</div>
      ${diagramHtml(ex)}
      <p class="dose">建议：<b>${ex.sets} 组 × ${ex.reps}</b></p>
      <p class="tip">口诀：${ex.tip}</p>
      <div class="card-actions">
        <button class="btn add ${inPlan ? 'added' : ''}" data-id="${ex.id}">${inPlan ? '✓ 已在计划' : '+ 加入计划'}</button>
      </div>
    </article>`;
  }).join('');

  // 触屏没有悬停：点一下图解切换播放状态
  document.querySelectorAll('.diagram').forEach(d => {
    const v = d.querySelector('video');
    if (v) {
      d.addEventListener('mouseenter', () => v.play());
      d.addEventListener('mouseleave', () => v.pause());
      d.onclick = () => { v.paused ? v.play() : v.pause(); };
    } else {
      d.onclick = () => d.classList.toggle('playing');
    }
  });
  document.querySelectorAll('.btn.add').forEach(b => b.onclick = () => {
    const id = b.dataset.id;
    if (db.plan.some(p => p.id === id)) { toast('已经在计划里了'); return; }
    db.plan.push({ id, sets: exById[id].sets });
    store.save(db); renderLibrary(); renderPlan();
    toast('已加入计划');
  });
}

// ---------------- 我的计划 ----------------
const WEEK_LABELS = ['一', '二', '三', '四', '五', '六', '日'];

function renderWeekdays() {
  $('#weekdayChips').innerHTML = WEEK_LABELS.map((w, i) => {
    const d = i + 1;
    return `<button class="chip ${db.weekdays.includes(d) ? 'active' : ''}" data-day="${d}">周${w}</button>`;
  }).join('');
  document.querySelectorAll('#weekdayChips .chip').forEach(c => c.onclick = () => {
    const d = +c.dataset.day;
    const i = db.weekdays.indexOf(d);
    i >= 0 ? db.weekdays.splice(i, 1) : db.weekdays.push(d);
    store.save(db); renderWeekdays(); renderWorkout();
  });
}

function renderPlan() {
  $('#planEmpty').style.display = db.plan.length ? 'none' : 'block';
  $('#planList').innerHTML = db.plan.map((p, idx) => {
    const ex = exById[p.id];
    return `<div class="plan-item">
      <div class="grow"><b>${ex.name}</b> <small style="color:#6b7280">${ex.muscle} · 每次 ${ex.reps}</small></div>
      <div class="stepper">组数
        <button data-act="minus" data-idx="${idx}">−</button><b>${p.sets}</b>
        <button data-act="plus" data-idx="${idx}">+</button>
      </div>
      <button class="remove" data-idx="${idx}">移除</button>
    </div>`;
  }).join('');
  document.querySelectorAll('#planList .stepper button').forEach(b => b.onclick = () => {
    const p = db.plan[+b.dataset.idx];
    p.sets = Math.min(10, Math.max(1, p.sets + (b.dataset.act === 'plus' ? 1 : -1)));
    store.save(db); renderPlan(); renderWorkout();
  });
  document.querySelectorAll('#planList .remove').forEach(b => b.onclick = () => {
    db.plan.splice(+b.dataset.idx, 1);
    store.save(db); renderPlan(); renderWorkout();
  });
}

// ---------------- 训练 ----------------
let session = null; // { items: [{ id, sets, done:Set }] }
let forceSession = false;

function todayDow() { const d = new Date().getDay(); return d === 0 ? 7 : d; }

function buildSession() {
  session = { items: db.plan.map(p => ({ id: p.id, sets: p.sets, done: new Set() })) };
}

function renderWorkout() {
  const isDay = db.weekdays.includes(todayDow());
  const showSession = db.plan.length > 0 && (isDay || forceSession);
  $('#workoutEmpty').hidden = showSession;
  $('#finishBtn').hidden = !showSession;
  if (!showSession) { $('#workoutHead').innerHTML = ''; $('#workoutList').innerHTML = ''; session = null; return; }
  if (!session) buildSession();
  $('#workoutHead').innerHTML = `<p style="margin-bottom:10px">今天练 <b>${session.items.length}</b> 个动作，做完一组点亮一颗点。${isDay ? '' : '（今天不是计划日，这是加练）'}</p>`;
  $('#workoutList').innerHTML = session.items.map((it, ii) => {
    const ex = exById[it.id];
    const dots = Array.from({ length: it.sets }, (_, si) =>
      `<button class="set-dot ${it.done.has(si) ? 'done' : ''}" data-item="${ii}" data-set="${si}">${si + 1}</button>`).join('');
    return `<div class="work-item">
      <div class="grow"><b>${ex.name}</b> <small style="color:#6b7280">${ex.reps} / 组</small></div>
      <div class="sets-check">${dots}</div>
    </div>`;
  }).join('');
  document.querySelectorAll('.set-dot').forEach(d => d.onclick = () => {
    const it = session.items[+d.dataset.item];
    const s = +d.dataset.set;
    it.done.has(s) ? it.done.delete(s) : it.done.add(s);
    if (!isDay) forceSession = true;
    renderWorkout();
  });
}

$('#finishBtn').onclick = () => {
  if (!session) return;
  const totalSets = session.items.reduce((n, it) => n + it.done.size, 0);
  if (totalSets === 0) { toast('先点亮至少一组再完成'); return; }
  const names = session.items.filter(it => it.done.size > 0).map(it => exById[it.id].name);
  db.records.unshift({ date: new Date().toISOString(), names, sets: totalSets });
  store.save(db);
  session = null; forceSession = false;
  renderWorkout(); renderHistory();
  toast('打卡成功，练完了 🎉');
  switchTab('history');
};

// 非训练日时，在训练页给一个「今天加练」入口
setInterval(() => {
  const el = $('#workoutEmpty');
  if (el && !el.hidden && db.plan.length > 0 && !db.weekdays.includes(todayDow()) && !forceSession) {
    if (!document.getElementById('extraBtn')) {
      const b = document.createElement('button');
      b.id = 'extraBtn'; b.className = 'primary-btn'; b.textContent = '今天加练一次';
      b.onclick = () => { forceSession = true; renderWorkout(); };
      el.after(b);
    }
  }
}, 800);

// ---------------- 记录 ----------------
function renderHistory() {
  const recs = db.records;
  $('#historyEmpty').style.display = recs.length ? 'none' : 'block';
  const now = new Date();
  const monday = new Date(now); monday.setDate(now.getDate() - (todayDow() - 1)); monday.setHours(0, 0, 0, 0);
  const weekCount = recs.filter(r => new Date(r.date) >= monday).length;
  const totalSets = recs.reduce((n, r) => n + (r.sets || 0), 0);
  $('#statsBox').innerHTML = `
    <div class="stat"><b>${recs.length}</b><span>累计训练（次）</span></div>
    <div class="stat"><b>${weekCount}</b><span>本周训练（次）</span></div>
    <div class="stat"><b>${totalSets}</b><span>累计完成（组）</span></div>`;
  $('#historyList').innerHTML = recs.map(r => {
    const d = new Date(r.date);
    const when = `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    return `<div class="hist-item"><span>${when}</span><small>${r.names.join('、')} · 共 ${r.sets} 组</small></div>`;
  }).join('');
}

// ---------------- 全局 ----------------
function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
}
document.querySelectorAll('.tab').forEach(t => t.onclick = () => switchTab(t.dataset.tab));

document.querySelectorAll('#modeSeg .seg-btn').forEach(b => b.onclick = () => {
  document.querySelectorAll('#modeSeg .seg-btn').forEach(x => x.classList.toggle('active', x === b));
  curEquip = b.dataset.mode;
  renderLibrary();
});

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1600);
}

renderChips();
renderLibrary();
renderWeekdays();
renderPlan();
renderWorkout();
renderHistory();

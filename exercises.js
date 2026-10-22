// ============================================================
// 动作库数据
// 规则（和原版小程序一致）：
// 1. 只收录公认的经典自重动作，不自创冷门动作
// 2. 「纯空手」= 只用地板和自重，不靠桌椅墙面等任何道具
// 3. 斜方肌不设专项
// 4. 每个动作带两帧图解（起始 / 发力）+ 方向箭头 + 大白话口诀
//
// frames: 两个关键帧，frame = { head:[cx,cy], lines:[[x1,y1,x2,y2],...] }
// 坐标系 viewBox = 0 0 200 120，地面 y≈104，侧面视角为主
// arrow: 箭头提示 { x, y, type: 'updown'|'up'|'leftright'|'hold' }
// ============================================================

const EXERCISES = [
  // ---------------- 胸 ----------------
  {
    id: 'pushup', name: '标准俯卧撑', en: 'Push-Up', muscle: '胸', mode: 'floor',
    img: 'img/pushup.jpg', video: 'video/pushup.mp4',
    level: '新手', sets: 4, reps: '8–12 次',
    tip: '身体绷成一条直线，胸口贴地再推起，别塌腰别撅屁股',
    arrow: { x: 14, y: 78, type: 'updown' },
    frames: [
      { head: [30, 52], lines: [[38, 56, 92, 60], [42, 58, 46, 80], [46, 80, 48, 102], [92, 60, 126, 74], [126, 74, 164, 100]] },
      { head: [30, 66], lines: [[38, 70, 92, 72], [42, 72, 24, 86], [24, 86, 48, 102], [92, 72, 126, 82], [126, 82, 164, 100]] }
    ]
  },
  {
    id: 'wide-pushup', name: '宽距俯卧撑', en: 'Wide Push-Up', muscle: '胸', mode: 'floor',
    video: 'video/wide-pushup.mp4',
    level: '新手', sets: 4, reps: '8–12 次',
    tip: '手比肩宽出一大截，重点练胸的外侧，下去时胸口找地',
    arrow: { x: 14, y: 78, type: 'updown' },
    frames: [
      { head: [30, 52], lines: [[38, 56, 92, 60], [42, 58, 46, 80], [46, 80, 48, 102], [92, 60, 126, 74], [126, 74, 164, 100]] },
      { head: [30, 66], lines: [[38, 70, 92, 72], [42, 72, 24, 86], [24, 86, 48, 102], [92, 72, 126, 82], [126, 82, 164, 100]] }
    ]
  },
  {
    id: 'knee-pushup', name: '跪姿俯卧撑', en: 'Knee Push-Up', muscle: '胸', mode: 'floor',
    video: 'video/knee-pushup.mp4',
    level: '新手', sets: 3, reps: '10–15 次',
    tip: '膝盖着地当支点，上身照样一条线，标准版做不动先练这个',
    arrow: { x: 14, y: 76, type: 'updown' },
    frames: [
      { head: [30, 50], lines: [[38, 54, 88, 58], [42, 56, 46, 79], [46, 79, 48, 102], [88, 58, 112, 100], [112, 100, 138, 84]] },
      { head: [30, 64], lines: [[38, 68, 88, 70], [42, 70, 26, 84], [26, 84, 48, 102], [88, 70, 112, 100], [112, 100, 138, 84]] }
    ]
  },
  // ---------------- 背 ----------------
  {
    id: 'superman', name: '超人式', en: 'Superman', muscle: '背', mode: 'floor',
    img: 'img/superman.jpg', video: 'video/superman.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '趴平，手脚同时往上抬，像超人起飞，顶峰停一秒再放下',
    arrow: { x: 100, y: 40, type: 'up' },
    frames: [
      { head: [28, 92], lines: [[36, 95, 100, 97], [40, 95, 70, 100], [100, 97, 150, 100]] },
      { head: [28, 78], lines: [[36, 84, 100, 86], [40, 84, 66, 62], [100, 86, 152, 70]] }
    ]
  },
  {
    id: 'prone-y', name: '俯卧 Y 字伸展', en: 'Prone Y Raise', muscle: '背', mode: 'floor',
    video: 'video/prone-y.mp4',
    level: '新手', sets: 3, reps: '10–12 次',
    tip: '趴着，双臂往前上方举成字母 Y，大拇指朝天，练上背',
    arrow: { x: 84, y: 48, type: 'up' },
    frames: [
      { head: [28, 92], lines: [[36, 95, 100, 97], [40, 95, 74, 99], [100, 97, 150, 100]] },
      { head: [28, 84], lines: [[36, 88, 100, 92], [40, 88, 70, 60], [100, 92, 150, 100]] }
    ]
  },
  {
    id: 'prone-t', name: '俯卧 T 字伸展', en: 'Prone T Raise', muscle: '背', mode: 'floor',
    video: 'video/prone-t.mp4',
    level: '新手', sets: 3, reps: '10–12 次',
    tip: '趴着，双臂向两侧打开成字母 T，肩胛骨往中间夹',
    arrow: { x: 84, y: 48, type: 'up' },
    frames: [
      { head: [28, 92], lines: [[36, 95, 100, 97], [40, 95, 58, 101], [100, 97, 150, 100]] },
      { head: [28, 84], lines: [[36, 88, 100, 92], [40, 88, 64, 74], [100, 92, 150, 100]] }
    ]
  },
  {
    id: 'bird-dog', name: '鸟狗式', en: 'Bird Dog', muscle: '背', mode: 'floor',
    video: 'video/bird-dog.mp4',
    level: '新手', sets: 3, reps: '每侧 8–10 次',
    tip: '四点跪好，对侧手脚同时往外伸平，腰别晃，慢慢来',
    arrow: { x: 168, y: 46, type: 'up' },
    frames: [
      { head: [30, 56], lines: [[38, 58, 96, 58], [42, 58, 44, 100], [96, 58, 98, 98], [98, 98, 124, 100]] },
      { head: [30, 56], lines: [[38, 58, 96, 58], [42, 58, 88, 50], [96, 58, 152, 54], [42, 58, 44, 100]] }
    ]
  },
  // ---------------- 肩 ----------------
  {
    id: 'pike-pushup', name: '派克俯卧撑', en: 'Pike Push-Up', muscle: '肩', mode: 'floor',
    img: 'img/pike-pushup.jpg', video: 'video/pike-pushup.mp4',
    level: '进阶', sets: 4, reps: '6–10 次',
    tip: '屁股撅到最高，头往两手中间的地面扎，推起来全靠肩',
    arrow: { x: 14, y: 84, type: 'updown' },
    frames: [
      { head: [36, 72], lines: [[44, 70, 96, 32], [48, 68, 50, 86], [50, 86, 50, 102], [96, 32, 128, 62], [128, 62, 162, 100]] },
      { head: [34, 86], lines: [[42, 84, 96, 38], [46, 82, 30, 92], [30, 92, 50, 102], [96, 38, 128, 64], [128, 64, 162, 100]] }
    ]
  },
  {
    id: 'bear-hold', name: '熊爬保持', en: 'Bear Hold', muscle: '肩', mode: 'floor',
    video: 'video/bear-hold.mp4',
    level: '新手', sets: 3, reps: '20–30 秒',
    tip: '四点撑地，膝盖离地一拳高悬空，背放平，撑住别塌',
    arrow: { x: 168, y: 46, type: 'hold' },
    frames: [
      { head: [30, 54], lines: [[38, 56, 96, 56], [42, 56, 44, 100], [96, 56, 100, 86], [100, 86, 126, 100]] },
      { head: [30, 56], lines: [[38, 58, 96, 58], [42, 58, 44, 100], [96, 58, 100, 88], [100, 88, 126, 100]] }
    ]
  },
  // ---------------- 肱二头 ----------------
  {
    id: 'self-curl', name: '自抗阻弯举', en: 'Self-Resisted Bicep Curl', muscle: '肱二头', mode: 'floor',
    video: 'video/self-curl.mp4',
    level: '新手', sets: 3, reps: '每侧 10–12 次',
    tip: '一只手往上弯，另一只手压着它使劲拦，全程对抗着慢慢动',
    arrow: { x: 140, y: 56, type: 'updown' },
    frames: [
      { head: [100, 24], lines: [[100, 34, 100, 82], [104, 40, 106, 62], [106, 62, 104, 84], [96, 40, 84, 58], [84, 58, 102, 78], [100, 82, 94, 106], [100, 82, 108, 106]] },
      { head: [100, 24], lines: [[100, 34, 100, 82], [104, 40, 106, 62], [106, 62, 112, 40], [96, 40, 84, 56], [84, 56, 108, 50], [100, 82, 94, 106], [100, 82, 108, 106]] }
    ]
  },
  // ---------------- 肱三头 ----------------
  {
    id: 'diamond-pushup', name: '钻石俯卧撑', en: 'Diamond Push-Up', muscle: '肱三头', mode: 'floor',
    video: 'video/diamond-pushup.mp4',
    level: '进阶', sets: 4, reps: '6–12 次',
    tip: '两手在胸口正下方比个钻石形，胳膊肘贴着身体往下压',
    arrow: { x: 14, y: 78, type: 'updown' },
    frames: [
      { head: [30, 52], lines: [[38, 56, 92, 60], [42, 58, 47, 80], [47, 80, 49, 102], [92, 60, 126, 74], [126, 74, 164, 100]] },
      { head: [30, 66], lines: [[38, 70, 92, 72], [42, 72, 30, 88], [30, 88, 49, 102], [92, 72, 126, 82], [126, 82, 164, 100]] }
    ]
  },
  {
    id: 'floor-extension', name: '地板臂屈伸', en: 'Floor Tricep Extension', muscle: '肱三头', mode: 'floor',
    video: 'video/floor-extension.mp4',
    level: '进阶', sets: 3, reps: '8–12 次',
    tip: '小臂整个贴地撑着，靠大臂后侧发力把身体顶成俯卧撑位',
    arrow: { x: 14, y: 78, type: 'updown' },
    frames: [
      { head: [30, 60], lines: [[38, 63, 92, 64], [42, 64, 48, 100], [48, 100, 78, 100], [92, 64, 126, 76], [126, 76, 164, 100]] },
      { head: [30, 52], lines: [[38, 56, 92, 60], [42, 58, 46, 80], [46, 80, 48, 102], [92, 60, 126, 74], [126, 74, 164, 100]] }
    ]
  },
  // ---------------- 核心 ----------------
  {
    id: 'plank', name: '平板支撑', en: 'Plank', muscle: '核心', mode: 'floor',
    img: 'img/plank.jpg', video: 'video/plank.mp4',
    level: '新手', sets: 3, reps: '30–60 秒',
    tip: '小臂撑地，身体一条直线，肚子收紧，宁可少撑别塌腰',
    arrow: { x: 168, y: 40, type: 'hold' },
    frames: [
      { head: [30, 58], lines: [[38, 60, 100, 62], [42, 60, 46, 100], [46, 100, 74, 100], [100, 62, 132, 76], [132, 76, 166, 100]] },
      { head: [30, 59], lines: [[38, 61, 100, 63], [42, 61, 46, 100], [46, 100, 74, 100], [100, 63, 132, 77], [132, 77, 166, 100]] }
    ]
  },
  {
    id: 'dead-bug', name: '死虫式', en: 'Dead Bug', muscle: '核心', mode: 'floor',
    video: 'video/dead-bug.mp4',
    level: '新手', sets: 3, reps: '每侧 8–10 次',
    tip: '仰卧，手脚朝天，对侧手脚慢慢放平，腰始终贴紧地面',
    arrow: { x: 168, y: 40, type: 'updown' },
    frames: [
      { head: [40, 94], lines: [[48, 97, 100, 97], [54, 95, 52, 56], [100, 97, 100, 68], [100, 68, 124, 68]] },
      { head: [40, 94], lines: [[48, 97, 100, 97], [54, 95, 22, 86], [100, 97, 150, 88], [54, 95, 52, 56]] }
    ]
  },
  {
    id: 'crunch', name: '卷腹', en: 'Crunch', muscle: '核心', mode: 'floor',
    video: 'video/crunch.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '只抬肩背，不用坐起来，用肚子把上身往里卷，别用手拽脖子',
    arrow: { x: 14, y: 60, type: 'updown' },
    frames: [
      { head: [26, 92], lines: [[34, 96, 86, 98], [40, 94, 62, 89], [86, 98, 104, 72], [104, 72, 128, 101]] },
      { head: [36, 72], lines: [[44, 77, 86, 98], [48, 79, 66, 88], [86, 98, 104, 72], [104, 72, 128, 101]] }
    ]
  },
  {
    id: 'russian-twist', name: '俄罗斯转体', en: 'Russian Twist', muscle: '核心', mode: 'floor',
    video: 'video/russian-twist.mp4',
    level: '新手', sets: 3, reps: '每侧 10–12 次',
    tip: '坐着脚离地，双手抱拳往左右两边转，转的是腰不是胳膊',
    arrow: { x: 100, y: 16, type: 'leftright' },
    frames: [
      { head: [100, 42], lines: [[100, 54, 100, 97], [100, 64, 130, 72], [100, 97, 84, 82], [84, 82, 74, 64], [100, 97, 116, 82], [116, 82, 126, 64]] },
      { head: [100, 42], lines: [[100, 54, 100, 97], [100, 64, 70, 72], [100, 97, 84, 82], [84, 82, 74, 64], [100, 97, 116, 82], [116, 82, 126, 64]] }
    ]
  },
  // ---------------- 墙面（可选模式） ----------------
  {
    id: 'wall-pushup', name: '墙壁俯卧撑', en: 'Wall Push-Up', muscle: '胸', mode: 'wall',
    video: 'video/wall-pushup.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '离墙一臂远撑住，身体倾斜一条线，胸口往墙上贴了再推开',
    arrow: { x: 60, y: 108, type: 'leftright' },
    frames: [
      { head: [64, 32], lines: [[70, 40, 104, 70], [72, 42, 50, 48], [50, 48, 28, 56], [104, 70, 140, 105]], extra: [[24, 8, 24, 108]] },
      { head: [58, 36], lines: [[64, 44, 100, 72], [66, 46, 54, 64], [54, 64, 28, 56], [100, 72, 140, 105]], extra: [[24, 8, 24, 108]] }
    ]
  },
  {
    id: 'wall-handstand', name: '靠墙倒立撑', en: 'Wall Handstand Push-Up', muscle: '肩', mode: 'wall',
    video: 'video/wall-handstand.mp4',
    level: '进阶', sets: 3, reps: '3–6 次',
    tip: '先练靠墙倒立站稳，再慢慢屈肘让头接近地面，量力而行',
    arrow: { x: 60, y: 84, type: 'updown' },
    frames: [
      { head: [42, 72], lines: [[34, 64, 38, 28], [30, 102, 34, 64], [38, 28, 27, 6]], extra: [[24, 8, 24, 108]] },
      { head: [46, 84], lines: [[36, 74, 40, 34], [30, 102, 48, 78], [48, 78, 36, 74], [40, 34, 27, 6]], extra: [[24, 8, 24, 108]] }
    ]
  },
  {
    id: 'db-floor-press', name: '地板哑铃卧推', en: 'Dumbbell Floor Press', muscle: '胸', mode: 'dumbbell',
    video: 'video/db-floor-press.mp4',
    level: '新手', sets: 4, reps: '8–12 次',
    tip: '躺地上往天花板推，手肘轻轻点地就往上送，别砸胳膊'
  },
  {
    id: 'db-row', name: '单臂哑铃划船', en: 'One-Arm Dumbbell Row', muscle: '背', mode: 'dumbbell',
    video: 'video/db-row.mp4',
    level: '新手', sets: 4, reps: '每侧 10–12 次',
    tip: '一只手把哑铃拉到裤兜边，背别扭、别耸肩，像拉锯慢慢来'
  },
  {
    id: 'db-curl', name: '哑铃弯举', en: 'Dumbbell Curl', muscle: '肱二头', mode: 'dumbbell',
    video: 'video/db-curl.mp4',
    level: '新手', sets: 3, reps: '10–15 次',
    tip: '大臂钉在身体两边别晃，只抬小臂，别用腰甩'
  },
  {
    id: 'db-hammer-curl', name: '锤式弯举', en: 'Hammer Curl', muscle: '肱二头', mode: 'dumbbell',
    video: 'video/db-hammer-curl.mp4',
    level: '新手', sets: 3, reps: '10–15 次',
    tip: '拳头朝上像握着锤子，抬到胸口再慢慢放下'
  },
  {
    id: 'db-press', name: '哑铃推举', en: 'Dumbbell Shoulder Press', muscle: '肩', mode: 'dumbbell',
    video: 'video/db-press.mp4',
    level: '进阶', sets: 4, reps: '8–12 次',
    tip: '从肩膀推到头顶正上方，别耸肩、别塌腰'
  },
  {
    id: 'db-lateral-raise', name: '哑铃侧平举', en: 'Dumbbell Lateral Raise', muscle: '肩', mode: 'dumbbell',
    video: 'video/db-lateral-raise.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '像往两边倒水一样抬到肩高就停，宁可用轻的，也别甩'
  },
  {
    id: 'db-overhead-ext', name: '哑铃颈后臂屈伸', en: 'Overhead Dumbbell Extension', muscle: '肱三头', mode: 'dumbbell',
    video: 'video/db-overhead-ext.mp4',
    level: '进阶', sets: 3, reps: '10–12 次',
    tip: '双手抱一只哑铃举过头顶再放到脑后，手肘朝前别往外撇'
  },
  {
    id: 'db-fly', name: '地板哑铃飞鸟', en: 'Dumbbell Floor Fly', muscle: '胸', mode: 'dumbbell',
    video: 'video/db-fly.mp4',
    level: '进阶', sets: 3, reps: '10–12 次',
    tip: '像抱一棵大树那样张开再合拢，手肘始终微微弯着'
  },
  {
    id: 'bb-row', name: '杠铃划船', en: 'Barbell Row', muscle: '背', mode: 'barbell',
    video: 'video/bb-row.mp4',
    level: '进阶', sets: 4, reps: '8–12 次',
    tip: '俯身时背要平别弓，杠往肚脐方向拉，肩胛夹紧停一下'
  },
  {
    id: 'bb-curl', name: '杠铃弯举', en: 'Barbell Curl', muscle: '肱二头', mode: 'barbell',
    video: 'video/bb-curl.mp4',
    level: '新手', sets: 3, reps: '8–12 次',
    tip: '手肘钉在腰边别前后晃，杠起落都慢，别借腰甩'
  },
  {
    id: 'bb-press', name: '站姿杠铃推举', en: 'Barbell Overhead Press', muscle: '肩', mode: 'barbell',
    video: 'video/bb-press.mp4',
    level: '进阶', sets: 4, reps: '6–10 次',
    tip: '从锁骨推到头顶正上方，屁股夹紧别往后仰'
  },
  {
    id: 'bb-bench', name: '杠铃卧推', en: 'Barbell Bench Press', muscle: '胸', mode: 'barbell',
    video: 'video/bb-bench.mp4',
    level: '进阶', sets: 4, reps: '6–10 次',
    tip: '必须有卧推凳和架子，最好有人在旁边保护；杠落到胸口再推起，别逞重量'
  },
  {
    id: 'band-row', name: '弹力带划船', en: 'Band Row', muscle: '背', mode: 'band',
    video: 'video/band-row.mp4',
    level: '新手', sets: 4, reps: '12–15 次',
    tip: '脚踩住带子往后拽，胳膊肘贴着身子过腰，夹紧后背停一秒'
  },
  {
    id: 'band-face-pull', name: '弹力带面拉', en: 'Band Face Pull', muscle: '背', mode: 'band',
    video: 'video/band-face-pull.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '带子拴在和脸差不多高的地方，往耳朵两边拉，两手往外掰开'
  },
  {
    id: 'band-chest-press', name: '弹力带胸推', en: 'Band Chest Press', muscle: '胸', mode: 'band',
    video: 'video/band-chest-press.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '带子绕过后背、两头攥在手里往前推，推到底手臂别锁太死'
  },
  {
    id: 'band-curl', name: '弹力带弯举', en: 'Band Curl', muscle: '肱二头', mode: 'band',
    video: 'video/band-curl.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '脚踩住带子往上抬，抬到顶挤一下二头，再慢慢放'
  },
  {
    id: 'band-press', name: '弹力带推举', en: 'Band Overhead Press', muscle: '肩', mode: 'band',
    video: 'video/band-press.mp4',
    level: '新手', sets: 3, reps: '10–12 次',
    tip: '踩住带子往上推过头顶，别耸肩，腰别往后塌'
  },
  {
    id: 'band-pushdown', name: '弹力带下压', en: 'Band Triceps Pushdown', muscle: '肱三头', mode: 'band',
    video: 'video/band-pushdown.mp4',
    level: '新手', sets: 3, reps: '12–15 次',
    tip: '带子挂在高处（门框上），手肘夹紧身体，只动小臂往下压到底'
  },
  {
    id: 'pull-up', name: '引体向上', en: 'Pull-Up', muscle: '背', mode: 'pullup',
    video: 'video/pull-up.mp4',
    level: '进阶', sets: 4, reps: '3–8 次',
    tip: '正手握杠，下巴过杠再慢慢放到底，别蹬腿甩；做不了先练吊杠和慢速下放'
  },
  {
    id: 'chin-up', name: '反手引体向上', en: 'Chin-Up', muscle: '肱二头', mode: 'pullup',
    video: 'video/chin-up.mp4',
    level: '进阶', sets: 4, reps: '3–8 次',
    tip: '手心朝自己反手握杠，二头和背一起拉，比正手稍微友好点'
  },
  {
    id: 'hanging-leg-raise', name: '悬垂举腿', en: 'Hanging Leg Raise', muscle: '核心', mode: 'pullup',
    video: 'video/hanging-leg-raise.mp4',
    level: '进阶', sets: 3, reps: '8–12 次',
    tip: '挂在杠上把腿抬到水平，靠肚子卷起来，别荡秋千；太难先屈膝抬'
  },
  {
    id: 'dead-hang', name: '悬垂吊杠', en: 'Dead Hang', muscle: '背', mode: 'pullup',
    video: 'video/dead-hang.mp4',
    level: '新手', sets: 3, reps: '20–40 秒',
    tip: '双手挂住、脚离地、全身放松往下沉，练握力和肩膀，是引体的第一步'
  },
  {
    id: 'wheel-kneeling', name: '跪姿健腹轮', en: 'Ab Wheel Rollout (Kneeling)', muscle: '核心', mode: 'wheel',
    video: 'video/wheel-kneeling.mp4',
    level: '进阶', sets: 3, reps: '6–10 次',
    tip: '跪着往前滚到身体成一条直线就用肚子拉回来，宁可滚短点也别塌腰；新手在前面放个东西挡住轮子'
  },
  {
    id: 'wheel-standing', name: '站姿健腹轮', en: 'Ab Wheel Rollout (Standing)', muscle: '核心', mode: 'wheel',
    video: 'video/wheel-standing.mp4',
    level: '进阶', sets: 3, reps: '3–5 次',
    tip: '健腹轮的毕业动作：跪姿能稳稳做 15 个之前，别碰这个'
  }
];

const MUSCLES = ['胸', '背', '肩', '肱二头', '肱三头', '核心'];

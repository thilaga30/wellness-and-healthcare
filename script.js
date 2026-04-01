// ===== UTILITIES =====
const $ = id => document.getElementById(id);
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const load = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
function formatDate(d) { return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
function addDays(dateStr, n) { const d = new Date(dateStr); d.setDate(d.getDate() + n); return d; }
function setText(id, t) { const e = $(id); if (e) e.textContent = t; }

// ===== TRANSLATIONS =====
const TRANSLATIONS = {
  en: {
    welcome: 'Welcome, User 💕', lastPeriod: 'Last Period', nextPeriod: 'Next Period',
    pregnancy: 'Pregnancy', cycleLen: 'Cycle Length', notifications: 'Notifications',
    quickActions: 'Quick Actions', todayMood: "Today's Mood", dailyTips: 'Daily Health Tips',
    trackPreg: 'Track Pregnancy', logPeriod: 'Log Period', viewDiet: 'View Diet',
    calcBtn: 'Calculate', saveBtn: 'Save', gotIt: 'Got it',
    delayAlert: 'Your period is delayed. Consult a doctor.',
    periodSoon: 'Period expected soon. Be prepared!',
    lmpLabel: 'Last Menstrual Period Date', periodLabel: 'Period Start Date',
    deliveryDate: 'Estimated Delivery Date', pregStatus: 'Pregnancy Status',
    currentWeek: 'Current Week', trimester: 'Trimester',
    eatThese: 'EAT THESE', avoidThese: 'AVOID THESE',
    waterReminder: 'Water Reminder', sleepTracker: 'Sleep Tracker',
    healthTip: 'Health Tip of the Day', yogaTimer: 'Start Timer',
    startQuiz: 'Start Self-Check', noData: 'No data yet. Please enter your details.',
    dashboard: 'Dashboard', periodTracker: 'Period Tracker', dietPlan: 'Diet Plan',
    healthIssues: 'Health Issues', yogaWellness: 'Yoga & Wellness',
    pregnancyTracker: 'Pregnancy Tracker', home: 'Home', darkMode: 'Dark Mode',
    language: 'Language', notifications2: 'Notifications', cycleLength: 'Cycle Length',
    duration: 'Duration', daysRemaining: 'Days Remaining', symptoms: 'Symptoms',
    moodTracker: 'Mood Tracker', painRelief: 'Pain Relief', periodDiet: 'Period Diet',
    symptomsGuide: 'Symptoms Guide', weeklyDiet: 'Weekly Diet Chart',
    exerciseWellness: 'Exercise & Wellness', mealPlan: 'Sample Meal Plan',
    generalDiet: 'General Diet', pregnancyDiet: 'Pregnancy Diet',
    whenToSeeDoctor: 'When to See a Doctor', selfCheck: 'Self-Check Quiz',
    periodYoga: 'Period Yoga', pregnancyYoga: 'Pregnancy Yoga', generalYoga: 'General Yoga'
  },
  ta: {
    welcome: 'வரவேற்கிறோம் 💕', lastPeriod: 'கடைசி மாதவிடாய்', nextPeriod: 'அடுத்த மாதவிடாய்',
    pregnancy: 'கர்ப்பம்', cycleLen: 'சுழற்சி நீளம்', notifications: 'அறிவிப்புகள்',
    quickActions: 'விரைவு செயல்கள்', todayMood: 'இன்றைய மனநிலை', dailyTips: 'தினசரி குறிப்புகள்',
    trackPreg: 'கர்ப்பம் கண்காணி', logPeriod: 'மாதவிடாய் பதிவு', viewDiet: 'உணவு திட்டம்',
    calcBtn: 'கணக்கிடு', saveBtn: 'சேமி', gotIt: 'சரி',
    delayAlert: 'மாதவிடாய் தாமதம். மருத்துவரை அணுகவும்.',
    periodSoon: 'மாதவிடாய் விரைவில் வரும்!',
    lmpLabel: 'கடைசி மாதவிடாய் தேதி', periodLabel: 'மாதவிடாய் தொடக்க தேதி',
    deliveryDate: 'மதிப்பிடப்பட்ட பிரசவ தேதி', pregStatus: 'கர்ப்ப நிலை',
    currentWeek: 'தற்போதைய வாரம்', trimester: 'மூன்று மாதம்',
    eatThese: 'சாப்பிடுங்கள்', avoidThese: 'தவிர்க்கவும்',
    waterReminder: 'தண்ணீர் நினைவூட்டல்', sleepTracker: 'தூக்க கண்காணிப்பு',
    healthTip: 'இன்றைய உடல்நல குறிப்பு', yogaTimer: 'நேரம் தொடங்கு',
    startQuiz: 'சுய பரிசோதனை', noData: 'தரவு இல்லை. உங்கள் விவரங்களை உள்ளிடவும்.',
    dashboard: 'டாஷ்போர்டு', periodTracker: 'மாதவிடாய் கண்காணிப்பு', dietPlan: 'உணவு திட்டம்',
    healthIssues: 'உடல்நல பிரச்சினைகள்', yogaWellness: 'யோகா & ஆரோக்கியம்',
    pregnancyTracker: 'கர்ப்ப கண்காணிப்பு', home: 'முகப்பு', darkMode: 'இருண்ட பயன்முறை',
    language: 'மொழி', notifications2: 'அறிவிப்புகள்', cycleLength: 'சுழற்சி நீளம்',
    duration: 'கால அளவு', daysRemaining: 'மீதமுள்ள நாட்கள்', symptoms: 'அறிகுறிகள்',
    moodTracker: 'மனநிலை கண்காணிப்பு', painRelief: 'வலி நிவாரணம்', periodDiet: 'மாதவிடாய் உணவு',
    symptomsGuide: 'அறிகுறி வழிகாட்டி', weeklyDiet: 'வாராந்திர உணவு அட்டவணை',
    exerciseWellness: 'உடற்பயிற்சி & ஆரோக்கியம்', mealPlan: 'உணவு திட்டம்',
    generalDiet: 'பொது உணவு', pregnancyDiet: 'கர்ப்ப உணவு',
    whenToSeeDoctor: 'மருத்துவரை எப்போது சந்திக்க வேண்டும்', selfCheck: 'சுய பரிசோதனை',
    periodYoga: 'மாதவிடாய் யோகா', pregnancyYoga: 'கர்ப்ப யோகா', generalYoga: 'பொது யோகா'
  },
  tanglish: {
    welcome: 'Welcome, User 💕', lastPeriod: 'Last Period', nextPeriod: 'Next Period',
    pregnancy: 'Pregnancy', cycleLen: 'Cycle Length', notifications: 'Notifications',
    quickActions: 'Quick Actions', todayMood: 'Indha Naal Mood', dailyTips: 'Daily Health Tips',
    trackPreg: 'Pregnancy Track Pannu', logPeriod: 'Period Log Pannu', viewDiet: 'Diet Paaru',
    calcBtn: 'Calculate Pannu', saveBtn: 'Save Pannu', gotIt: 'Seri',
    delayAlert: 'Unoda period late aaguthu. Doctor kitta po.',
    periodSoon: 'Period varaporuthu. Ready aago!',
    lmpLabel: 'Last Period Date Podu', periodLabel: 'Period Start Date',
    deliveryDate: 'Delivery Date', pregStatus: 'Pregnancy Status',
    currentWeek: 'Ippo Evlo Week', trimester: 'Trimester',
    eatThese: 'Saapidu', avoidThese: 'Thavirku',
    waterReminder: 'Thaani Kudikanum', sleepTracker: 'Thookam Track',
    healthTip: 'Indha Naal Health Tip', yogaTimer: 'Timer Start',
    startQuiz: 'Quiz Aaramba', noData: 'Data illai. Ungal details podu.',
    dashboard: 'Dashboard', periodTracker: 'Period Tracker', dietPlan: 'Diet Plan',
    healthIssues: 'Health Issues', yogaWellness: 'Yoga & Wellness',
    pregnancyTracker: 'Pregnancy Tracker', home: 'Home', darkMode: 'Dark Mode',
    language: 'Mozhi', notifications2: 'Notifications', cycleLength: 'Cycle Length',
    duration: 'Duration', daysRemaining: 'Meetha Naal', symptoms: 'Symptoms',
    moodTracker: 'Mood Track', painRelief: 'Vali Neekkam', periodDiet: 'Period Diet',
    symptomsGuide: 'Symptoms Guide', weeklyDiet: 'Weekly Diet',
    exerciseWellness: 'Exercise & Wellness', mealPlan: 'Meal Plan',
    generalDiet: 'General Diet', pregnancyDiet: 'Pregnancy Diet',
    whenToSeeDoctor: 'Doctor Kitta Eppo Poga Vendum', selfCheck: 'Self Check',
    periodYoga: 'Period Yoga', pregnancyYoga: 'Pregnancy Yoga', generalYoga: 'General Yoga'
  },
  hi: {
    welcome: 'स्वागत है, उपयोगकर्ता 💕', lastPeriod: 'अंतिम माहवारी', nextPeriod: 'अगली माहवारी',
    pregnancy: 'गर्भावस्था', cycleLen: 'चक्र की लंबाई', notifications: 'सूचनाएं',
    quickActions: 'त्वरित क्रियाएं', todayMood: 'आज का मूड', dailyTips: 'दैनिक स्वास्थ्य सुझाव',
    trackPreg: 'गर्भावस्था ट्रैक करें', logPeriod: 'माहवारी दर्ज करें', viewDiet: 'आहार देखें',
    calcBtn: 'गणना करें', saveBtn: 'सहेजें', gotIt: 'ठीक है',
    delayAlert: 'माहवारी देर से है। डॉक्टर से मिलें।',
    periodSoon: 'माहवारी जल्द आने वाली है!',
    lmpLabel: 'अंतिम माहवारी की तारीख', periodLabel: 'माहवारी शुरू होने की तारीख',
    deliveryDate: 'अनुमानित प्रसव तिथि', pregStatus: 'गर्भावस्था की स्थिति',
    currentWeek: 'वर्तमान सप्ताह', trimester: 'तिमाही',
    eatThese: 'खाएं', avoidThese: 'परहेज करें',
    waterReminder: 'पानी की याद', sleepTracker: 'नींद ट्रैकर',
    healthTip: 'आज का स्वास्थ्य सुझाव', yogaTimer: 'टाइमर शुरू',
    startQuiz: 'स्व-जांच शुरू', noData: 'कोई डेटा नहीं। अपना विवरण दर्ज करें।',
    dashboard: 'डैशबोर्ड', periodTracker: 'माहवारी ट्रैकर', dietPlan: 'आहार योजना',
    healthIssues: 'स्वास्थ्य समस्याएं', yogaWellness: 'योग और स्वास्थ्य',
    pregnancyTracker: 'गर्भावस्था ट्रैकर', home: 'होम', darkMode: 'डार्क मोड',
    language: 'भाषा', notifications2: 'सूचनाएं', cycleLength: 'चक्र की लंबाई',
    duration: 'अवधि', daysRemaining: 'शेष दिन', symptoms: 'लक्षण',
    moodTracker: 'मूड ट्रैकर', painRelief: 'दर्द निवारण', periodDiet: 'माहवारी आहार',
    symptomsGuide: 'लक्षण मार्गदर्शिका', weeklyDiet: 'साप्ताहिक आहार चार्ट',
    exerciseWellness: 'व्यायाम और स्वास्थ्य', mealPlan: 'भोजन योजना',
    generalDiet: 'सामान्य आहार', pregnancyDiet: 'गर्भावस्था आहार',
    whenToSeeDoctor: 'डॉक्टर से कब मिलें', selfCheck: 'स्व-जांच प्रश्नोत्तरी',
    periodYoga: 'माहवारी योग', pregnancyYoga: 'गर्भावस्था योग', generalYoga: 'सामान्य योग'
  }
};

// ===== LANGUAGE SYSTEM =====
function t(key) {
  const lang = load('lang') || 'en';
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['en'][key] || key;
}

function applyLang() {
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    el.textContent = t(key);
  });
  const sel = $('langSelect');
  if (sel) sel.value = load('lang') || 'en';
}

function setLang(lang) {
  save('lang', lang);
  applyLang();
}

// ===== DARK MODE =====
function initTheme() {
  const theme = load('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  save('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = $('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== MOBILE NAV =====
function toggleMobileNav() {
  const nav = $('mobileNav');
  if (nav) nav.classList.toggle('open');
}

// ===== NOTIFICATIONS =====
function toggleNotif() {
  const dd = $('notifDropdown');
  if (dd) dd.classList.toggle('open');
}

document.addEventListener('click', function (e) {
  const bell = $('notifBell');
  const dd = $('notifDropdown');
  if (dd && bell && !bell.contains(e.target) && !dd.contains(e.target)) {
    dd.classList.remove('open');
  }
  const hamburger = $('hamburger');
  const mobileNav = $('mobileNav');
  if (mobileNav && hamburger && !hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('open');
  }
});

// ===== POPUP =====
function showPopup(icon, title, msg) {
  const overlay = $('popupOverlay');
  if (!overlay) return;
  setText('popupIcon', icon);
  setText('popupTitle', title);
  setText('popupMessage', msg);
  overlay.classList.add('open');
}

function closePopup() {
  const overlay = $('popupOverlay');
  if (overlay) overlay.classList.remove('open');
}

// ===== VOICE INPUT =====
function initVoice(targetId) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showPopup('🎤', 'Not Supported', 'Voice input is not supported in your browser. Please use Chrome.');
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    const target = $(targetId);
    if (target) target.value = transcript;
  };
  recognition.onerror = function () {
    showPopup('🎤', 'Voice Error', 'Could not capture voice. Please try again.');
  };
}

// ===== WATER TRACKER =====
function initWaterTracker() {
  const count = load('waterCount') || 0;
  renderWater(count);
}

function toggleGlass(idx) {
  let count = load('waterCount') || 0;
  count = (idx + 1 <= count) ? idx : idx + 1;
  save('waterCount', count);
  renderWater(count);
}

function renderWater(count) {
  document.querySelectorAll('.glass-btn').forEach((btn, i) => {
    btn.classList.toggle('filled', i < count);
  });
  setText('waterCount', count + '/8');
}

// ===== SLEEP TRACKER =====
function saveSleep() {
  const val = $('sleepInput') ? parseFloat($('sleepInput').value) || 7 : 7;
  save('sleepHours', val);
  setText('sleepDisplay', val + ' hrs');
  const pct = Math.min((val / 9) * 100, 100);
  const fill = $('sleepBarFill');
  if (fill) fill.style.width = pct + '%';
  showPopup('😴', 'Sleep Saved!', `You slept ${val} hours. ${val >= 7 ? 'Great job! 🌟' : 'Try to get at least 7-8 hours.'}`);
}

function initSleep() {
  const val = load('sleepHours') || 7;
  setText('sleepDisplay', val + ' hrs');
  const inp = $('sleepInput');
  if (inp) inp.value = val;
  const fill = $('sleepBarFill');
  if (fill) fill.style.width = Math.min((val / 9) * 100, 100) + '%';
}

// ===== MINI CALENDAR =====
function renderMiniCalendar() {
  const cal = $('miniCal');
  if (!cal) return;
  const pd = load('periodData');
  const today = new Date();
  const year = today.getFullYear(), month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let periodDays = [];
  if (pd && pd.startDate) {
    for (let i = 0; i < (pd.duration || 5); i++) {
      const d = addDays(pd.startDate, i);
      if (d.getMonth() === month && d.getFullYear() === year) periodDays.push(d.getDate());
    }
  }
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let html = `<div class="cal-header">${monthNames[month]} ${year}</div><div class="cal-grid">`;
  ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(d => html += `<div class="cal-day-label">${d}</div>`);
  for (let i = 0; i < firstDay; i++) html += `<div></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate();
    const isPeriod = periodDays.includes(d);
    html += `<div class="cal-day${isToday ? ' today' : ''}${isPeriod ? ' period-day' : ''}">${d}</div>`;
  }
  html += '</div>';
  cal.innerHTML = html;
}

// ===== DASHBOARD =====
const DAILY_TIPS = [
  'Drink at least 8 glasses of water today 💧',
  'Take a 20-minute walk to boost your mood 🚶‍♀️',
  'Eat iron-rich foods like spinach and lentils 🥬',
  'Practice deep breathing for 5 minutes 🌬️',
  'Get 7-8 hours of quality sleep tonight 😴',
  'Include calcium-rich foods in your diet 🥛',
  'Stretch for 10 minutes to relieve tension 🧘‍♀️',
  'Limit caffeine and sugar intake today ☕',
  'Connect with a friend or loved one 💕',
  'Take your vitamins and supplements 💊',
  'Avoid processed foods and eat whole grains 🌾',
  'Practice gratitude — write 3 things you are thankful for 📝'
];

function initDashboard() {
  const pd = load('periodData');
  const pregData = load('pregData');

  if (pd && pd.startDate) {
    setText('dashLastPeriod', formatDate(pd.startDate));
    const nextDate = addDays(pd.startDate, pd.cycleLength || 28);
    setText('dashNextPeriod', formatDate(nextDate));
    const today = new Date();
    const daysUntil = daysBetween(today.toISOString().split('T')[0], nextDate.toISOString().split('T')[0]);
    const delayAlert = $('dashDelayAlert');
    const reminderAlert = $('dashReminderAlert');
    if (daysUntil < 0 && Math.abs(daysUntil) > 5) {
      if (delayAlert) { delayAlert.style.display = 'flex'; delayAlert.querySelector('span') && (delayAlert.querySelector('span').textContent = t('delayAlert')); }
    } else if (daysUntil >= 0 && daysUntil <= 3) {
      if (reminderAlert) { reminderAlert.style.display = 'flex'; }
    }
  } else {
    setText('dashLastPeriod', '—');
    setText('dashNextPeriod', '—');
  }

  if (pregData && pregData.lmpDate) {
    const weeks = Math.floor(daysBetween(pregData.lmpDate, new Date().toISOString().split('T')[0]) / 7);
    setText('dashPregWeek', weeks > 0 ? `Week ${weeks}` : '—');
  } else {
    setText('dashPregWeek', '—');
  }

  setText('dashCycleLen', pd ? (pd.cycleLength || 28) + ' days' : '28 days');

  buildNotifications(pd, pregData);
  initWaterTracker();
  initSleep();
  renderMiniCalendar();

  const dayIndex = new Date().getDate() % DAILY_TIPS.length;
  setText('dailyTipText', DAILY_TIPS[dayIndex]);
}

function buildNotifications(pd, pregData) {
  const list = $('notifList');
  const ddList = $('notifDropdownList');
  const notifs = [];

  if (pd && pd.startDate) {
    const nextDate = addDays(pd.startDate, pd.cycleLength || 28);
    const daysUntil = daysBetween(new Date().toISOString().split('T')[0], nextDate.toISOString().split('T')[0]);
    if (daysUntil < 0 && Math.abs(daysUntil) > 5) {
      notifs.push({ icon: '⚠️', title: 'Period Delayed', text: `Your period is ${Math.abs(daysUntil)} days late.` });
    } else if (daysUntil >= 0 && daysUntil <= 3) {
      notifs.push({ icon: '🩸', title: 'Period Coming Soon', text: `Expected in ${daysUntil} day(s). Be prepared!` });
    } else if (daysUntil > 0) {
      notifs.push({ icon: '📅', title: 'Next Period', text: `Expected in ${daysUntil} days.` });
    }
  }

  if (pregData && pregData.lmpDate) {
    const weeks = Math.floor(daysBetween(pregData.lmpDate, new Date().toISOString().split('T')[0]) / 7);
    notifs.push({ icon: '🤰', title: 'Pregnancy Update', text: `You are at week ${weeks}. Stay hydrated!` });
  }

  notifs.push({ icon: '💧', title: 'Water Reminder', text: 'Have you had 8 glasses of water today?' });
  notifs.push({ icon: '🧘', title: 'Yoga Time', text: 'Try a 10-minute yoga session for wellness.' });
  notifs.push({ icon: '🥗', title: 'Nutrition Tip', text: 'Include iron and folate-rich foods today.' });

  if (list) {
    list.innerHTML = notifs.map(n => `
      <div class="notif-card">
        <span class="notif-icon">${n.icon}</span>
        <div class="notif-text"><strong>${n.title}</strong>${n.text}</div>
      </div>`).join('');
  }

  if (ddList) {
    ddList.innerHTML = notifs.map(n => `
      <div class="notif-card">
        <span class="notif-icon">${n.icon}</span>
        <div class="notif-text"><strong>${n.title}</strong>${n.text}</div>
      </div>`).join('');
  }
}

// ===== PREGNANCY =====
const babySizes = {
  4: 'Baby is the size of a poppy seed 🌱',
  8: 'Baby is the size of a raspberry 🫐',
  10: 'Baby is the size of a strawberry 🍓',
  12: 'Baby is the size of a lime 🍋',
  16: 'Baby is the size of an avocado 🥑',
  20: 'Baby is the size of a banana 🍌',
  24: 'Baby is the size of an ear of corn 🌽',
  28: 'Baby is the size of an eggplant 🍆',
  32: 'Baby is the size of a squash 🎃',
  36: 'Baby is the size of a honeydew melon 🍈',
  40: 'Baby is fully grown and ready! 👶'
};

function getBabySize(week) {
  const keys = Object.keys(babySizes).map(Number).sort((a, b) => a - b);
  let msg = babySizes[4];
  for (const k of keys) { if (week >= k) msg = babySizes[k]; }
  return msg;
}

function initPregnancy() {
  const pregData = load('pregData');
  if (pregData && pregData.lmpDate) {
    const inp = $('lmpDate');
    if (inp) inp.value = pregData.lmpDate;
    renderPregnancy(pregData.lmpDate);
  }
}

function calculatePregnancy() {
  const inp = $('lmpDate');
  if (!inp || !inp.value) {
    showPopup('⚠️', 'Missing Date', 'Please enter your Last Menstrual Period date.');
    return;
  }
  save('pregData', { lmpDate: inp.value });
  renderPregnancy(inp.value);
}

function renderPregnancy(lmpDate) {
  const today = new Date();
  const lmp = new Date(lmpDate);
  const daysPreg = daysBetween(lmpDate, today.toISOString().split('T')[0]);
  const week = Math.max(0, Math.floor(daysPreg / 7));
  const trimester = week <= 12 ? 1 : week <= 26 ? 2 : 3;
  const deliveryDate = addDays(lmpDate, 280);
  const pct = Math.min(Math.round((week / 40) * 100), 100);

  setText('pregWeek', `Week ${week}`);
  setText('pregTrimester', `Trimester ${trimester}`);
  setText('pregDelivery', formatDate(deliveryDate));
  setText('pregPct', pct + '%');
  setText('babySize', getBabySize(week));

  const fill = $('pregBarFill');
  if (fill) fill.style.width = pct + '%';

  const results = $('pregResults');
  if (results) results.style.display = 'block';

  renderPregWarnings(week);
  showPopup('🤰', 'Pregnancy Calculated!', `You are at Week ${week}, Trimester ${trimester}. ${getBabySize(week)}`);
}

function renderPregWarnings(week) {
  const el = $('pregWarnings');
  if (!el) return;
  let warnings = [
    '🩸 Seek help immediately if you notice heavy bleeding.',
    '😵 Report dizziness, severe headaches, or vision changes.',
    '🤢 Persistent vomiting — stay hydrated and consult your doctor.',
    '💢 Severe abdominal pain needs immediate medical attention.'
  ];
  if (week > 35) {
    warnings.push('👶 You are near delivery! Watch for contractions and water breaking.');
    warnings.push('🏥 Keep your hospital bag ready and emergency contacts handy.');
  }
  el.innerHTML = warnings.map(w => `<li class="item-list-item">⚠️ ${w}</li>`).join('');
}

// ===== PERIOD =====
function initPeriod() {
  const pd = load('periodData');
  if (pd) {
    if ($('periodStartDate')) $('periodStartDate').value = pd.startDate || '';
    if ($('cycleLength')) $('cycleLength').value = pd.cycleLength || 28;
    if ($('periodDuration')) $('periodDuration').value = pd.duration || 5;
    renderPeriod(pd);
  }
  loadSymptoms();
  loadMood();
}

function savePeriod() {
  const startDate = $('periodStartDate') ? $('periodStartDate').value : '';
  const cycleLength = $('cycleLength') ? parseInt($('cycleLength').value) || 28 : 28;
  const duration = $('periodDuration') ? parseInt($('periodDuration').value) || 5 : 5;
  if (!startDate) {
    showPopup('⚠️', 'Missing Date', 'Please enter your period start date.');
    return;
  }
  const data = { startDate, cycleLength, duration };
  save('periodData', data);
  renderPeriod(data);
  showPopup('✅', 'Period Saved!', `Next period expected on ${formatDate(addDays(startDate, cycleLength))}.`);
}

function renderPeriod(data) {
  if (!data || !data.startDate) return;
  const nextDate = addDays(data.startDate, data.cycleLength || 28);
  setText('periodLast', formatDate(data.startDate));
  setText('periodNext', formatDate(nextDate));
  setText('periodCycleLen', (data.cycleLength || 28) + ' days');
  setText('periodDur', (data.duration || 5) + ' days');

  const today = new Date();
  const daysUntil = daysBetween(today.toISOString().split('T')[0], nextDate.toISOString().split('T')[0]);
  setText('daysRemaining', daysUntil > 0 ? daysUntil + ' days' : 'Overdue by ' + Math.abs(daysUntil) + ' days');

  checkDelay(data);
}

function checkDelay(data) {
  if (!data || !data.startDate) return;
  const nextDate = addDays(data.startDate, data.cycleLength || 28);
  const today = new Date();
  const daysUntil = daysBetween(today.toISOString().split('T')[0], nextDate.toISOString().split('T')[0]);
  const delayAlert = $('periodDelayAlert');
  const reminder = $('periodReminder');
  if (daysUntil < -5) {
    if (delayAlert) delayAlert.style.display = 'flex';
    if (reminder) reminder.style.display = 'none';
  } else if (daysUntil >= 0 && daysUntil <= 3) {
    if (reminder) reminder.style.display = 'flex';
    if (delayAlert) delayAlert.style.display = 'none';
  } else {
    if (delayAlert) delayAlert.style.display = 'none';
    if (reminder) reminder.style.display = 'none';
  }
}

// ===== SYMPTOMS =====
function toggleSymptom(el, symptom) {
  el.classList.toggle('active');
  let symptoms = load('symptoms') || [];
  if (symptoms.includes(symptom)) symptoms = symptoms.filter(s => s !== symptom);
  else symptoms.push(symptom);
  save('symptoms', symptoms);
}

function loadSymptoms() {
  const symptoms = load('symptoms') || [];
  document.querySelectorAll('.symptom-tag').forEach(tag => {
    if (symptoms.includes(tag.dataset.symptom)) tag.classList.add('active');
  });
}

// ===== MOOD =====
function setMood(el, emoji, label) {
  document.querySelectorAll('.mood-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  setText('moodEmoji', emoji);
  setText('moodLabel', label);
  save('mood', { emoji, label });
}

function loadMood() {
  const mood = load('mood');
  if (mood) {
    setText('moodEmoji', mood.emoji || '😊');
    setText('moodLabel', mood.label || 'Happy');
    document.querySelectorAll('.mood-opt').forEach(o => {
      if (o.textContent.trim() === mood.emoji) o.classList.add('selected');
    });
  }
}

// ===== HEALTH QUIZ =====
const quizQuestions = [
  { q: 'Do you have irregular periods?', condition: 'PCOS' },
  { q: 'Do you feel constantly tired or weak?', condition: 'Anemia' },
  { q: 'Have you noticed sudden weight changes?', condition: 'Thyroid' },
  { q: 'Do you feel anxious or stressed often?', condition: 'Stress' },
  { q: 'Do you have acne or excess hair growth?', condition: 'PCOS' }
];

let quizAnswers = [];
let currentQ = 0;

function startQuiz() {
  quizAnswers = [];
  currentQ = 0;
  showQuestion();
  const qs = $('quizStart');
  const qa = $('quizArea');
  const qr = $('quizResultArea');
  if (qs) qs.style.display = 'none';
  if (qa) qa.style.display = 'block';
  if (qr) qr.style.display = 'none';
}

function answerQuiz(ans) {
  quizAnswers.push({ ...quizQuestions[currentQ], ans });
  currentQ++;
  if (currentQ < quizQuestions.length) showQuestion();
  else showQuizResult();
}

function showQuestion() {
  setText('quizQ', `Q${currentQ + 1} of ${quizQuestions.length}: ${quizQuestions[currentQ].q}`);
}

function showQuizResult() {
  const yesAnswers = quizAnswers.filter(a => a.ans === 'yes');
  const conditions = [...new Set(yesAnswers.map(a => a.condition))];
  let result = conditions.length === 0
    ? '✅ Great! No major concerns detected. Keep maintaining a healthy lifestyle with balanced diet and regular exercise.'
    : `⚠️ Based on your answers, you may want to check: ${conditions.join(', ')}. Please consult a doctor for proper diagnosis and treatment.`;
  setText('quizResult', result);
  const qa = $('quizArea');
  const qr = $('quizResultArea');
  if (qa) qa.style.display = 'none';
  if (qr) qr.style.display = 'block';
}

function resetQuiz() {
  const qs = $('quizStart');
  const qr = $('quizResultArea');
  if (qs) qs.style.display = 'block';
  if (qr) qr.style.display = 'none';
  quizAnswers = [];
  currentQ = 0;
}

// ===== YOGA TIMER =====
let timerInterval = null;
let timerRunning = false;
let activeTimerBtn = null;

function startYogaTimer(btnId, seconds) {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    if (activeTimerBtn) {
      const b = $(activeTimerBtn);
      if (b) { b.textContent = '▶ Start Timer'; b.classList.remove('active'); }
    }
    if (activeTimerBtn === btnId) { activeTimerBtn = null; return; }
  }
  timerRunning = true;
  activeTimerBtn = btnId;
  let remaining = seconds;
  const btn = $(btnId);
  if (btn) { btn.textContent = formatTimer(remaining); btn.classList.add('active'); }
  timerInterval = setInterval(() => {
    remaining--;
    if (btn) btn.textContent = formatTimer(remaining);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      activeTimerBtn = null;
      if (btn) { btn.textContent = '✅ Done!'; btn.classList.remove('active'); }
      showPopup('🧘', 'Timer Done!', 'Great job! Take a deep breath and relax. You did amazing! 🌟');
      setTimeout(() => { if (btn) btn.textContent = '▶ Start Timer'; }, 3000);
    }
  }, 1000);
}

function formatTimer(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ===== MOOD DROPDOWN (period page) =====
function updateMoodFromSelect() {
  const sel = $('moodSelect');
  if (!sel) return;
  const moodMap = {
    happy: { emoji: '😊', label: 'Happy' },
    sad: { emoji: '😢', label: 'Sad' },
    anxious: { emoji: '😰', label: 'Anxious' },
    calm: { emoji: '😌', label: 'Calm' },
    irritable: { emoji: '😤', label: 'Irritable' },
    tired: { emoji: '😴', label: 'Tired' },
    energetic: { emoji: '⚡', label: 'Energetic' }
  };
  const m = moodMap[sel.value];
  if (m) {
    setText('moodEmoji', m.emoji);
    setText('moodLabel', m.label);
    save('mood', m);
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  applyLang();

  const page = document.body.dataset.page;
  if (page === 'dashboard') initDashboard();
  if (page === 'pregnancy') initPregnancy();
  if (page === 'period') initPeriod();
  if (page === 'yoga') { /* yoga page just needs timer */ }
  if (page === 'health') { /* quiz initialized on button click */ }
});


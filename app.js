// ============================================================
// 60-Day SDE Interview Prep Tracker — Application Logic
// ============================================================

(function () {
  "use strict";

  // ── State ──
  let state = {
    checkedSubtopics: {},     // { subtopicId: true }
    notes: {},                // { dayN_covered: "text", dayN_missed: "text" }
    solvedProblems: {},       // { leetcodeSlug: true }
    activity: {},             // { "YYYY-MM-DD": number of items ticked that day } — drives the streak
    profileName: "",          // shown in the dashboard greeting
    seenAchievements: null,   // achievement ids already celebrated (null until first run)
    lastPalette: -1,          // palette used on the previous visit, so the next one differs
    currentView: "home",      // "home" | "grid" | "detail" | "backlog" | "sets"
    returnView: "home",       // where "Back" from a day goes
    selectedSet: null,        // question set id, or null for the sets index
    setFilter: "all",         // "all" | "E" | "M" | "H" | "unsolved"
    selectedDay: null,         // day number
    statusFilter: "all",      // "all" | "completed" | "in-progress" | "pending" | "has-missed"
    categoryFilter: "all",    // "all" | category name
    searchQuery: "",
    theme: "dark",
    detailTab: "checklist",   // "checklist" | "study"
    pendingNoteScroll: null   // subtopic id to scroll to after the study tab renders
  };

  // ── DOM refs ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Persistence ──
  const STORAGE_KEY = "sde_prep_tracker_v2";

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        checkedSubtopics: state.checkedSubtopics,
        notes: state.notes,
        solvedProblems: state.solvedProblems,
        activity: state.activity,
        profileName: state.profileName,
        seenAchievements: state.seenAchievements,
        lastPalette: state.lastPalette,
        theme: state.theme
      }));
    } catch (e) { /* quota exceeded */ }
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        state.checkedSubtopics = saved.checkedSubtopics || {};
        state.notes = saved.notes || {};
        state.solvedProblems = saved.solvedProblems || {};
        state.activity = saved.activity || {};
        state.profileName = saved.profileName || "";
        state.seenAchievements = Array.isArray(saved.seenAchievements) ? saved.seenAchievements : null;
        state.lastPalette = Number.isInteger(saved.lastPalette) ? saved.lastPalette : -1;
        state.theme = saved.theme || "dark";
      }
    } catch (e) { /* corrupted */ }
  }

  // ── Study Notes (Markdown files in notes/day-NN.md) ──
  const MERMAID_SRC = "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js";
  const SUBTOPIC_MARKER = /^<!--\s*subtopic:\s*([\w-]+)\s*-->\s*$/gm;
  const notesCache = {};      // dayNum → { status: "loading" | "ready" | "missing" | "error", html, ids }
  const diagramCache = {};    // theme + source → rendered SVG markup
  let mermaidPromise = null;
  let mermaidTheme = null;
  let diagramSeq = 0;

  function notesPath(dayNum) {
    return `notes/day-${String(dayNum).padStart(2, "0")}.md`;
  }

  function loadDayNotes(dayNum) {
    if (notesCache[dayNum]) return;
    notesCache[dayNum] = { status: "loading" };
    fetch(notesPath(dayNum))
      .then(res => {
        if (res.status === 404) return null;
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(md => {
        notesCache[dayNum] = md === null ? { status: "missing" } : { status: "ready", ...parseNotes(md) };
      })
      .catch(() => { notesCache[dayNum] = { status: "error" }; })
      .finally(() => {
        if (state.currentView === "detail" && state.selectedDay === dayNum) renderDayDetail(dayNum);
      });
  }

  function parseNotes(md) {
    const ids = new Set();
    // Turn each subtopic marker into an anchor (blank line after it so the heading still parses as Markdown)
    const withAnchors = md.replace(SUBTOPIC_MARKER, (_, id) => {
      ids.add(id);
      return `<div class="notes-anchor" id="note-${id}" data-subtopic="${id}"></div>\n`;
    });
    const html = typeof marked !== "undefined"
      ? marked.parse(withAnchors)
      : `<pre>${escapeHTML(md)}</pre>`;
    return { html, ids };
  }

  function ensureMermaid() {
    if (window.mermaid) return Promise.resolve(window.mermaid);
    if (!mermaidPromise) {
      mermaidPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = MERMAID_SRC;
        script.onload = () => resolve(window.mermaid);
        script.onerror = () => { mermaidPromise = null; reject(new Error("Mermaid failed to load")); };
        document.head.appendChild(script);
      });
    }
    return mermaidPromise;
  }

  // Resolves once every diagram has been drawn (or has failed), so callers can fix scroll positions
  function renderDiagrams(root) {
    return Promise.all([...root.querySelectorAll(".mermaid-diagram")].map(el => {
      const source = el.textContent;
      const key = `${state.theme}\n${source}`;
      if (diagramCache[key]) {
        el.innerHTML = diagramCache[key];
        el.classList.add("rendered");
        return null;
      }
      const id = `mmd-${++diagramSeq}`;
      return ensureMermaid()
        .then(mermaid => {
          if (mermaidTheme !== state.theme) {
            mermaid.initialize({
              startOnLoad: false,
              securityLevel: "strict",
              theme: state.theme === "dark" ? "dark" : "default",
              fontFamily: "Inter, sans-serif"
            });
            mermaidTheme = state.theme;
          }
          return mermaid.render(id, source);
        })
        .then(({ svg }) => {
          diagramCache[key] = svg;
          if (!el.isConnected) return;
          el.innerHTML = svg;
          el.classList.add("rendered");
        })
        .catch(() => {
          document.getElementById(`d${id}`)?.remove();   // Mermaid leaves its error container behind
          el.classList.add("failed");
        });
    }));
  }

  // Post-process rendered Markdown: diagrams, code highlighting, heading ids, per-subtopic "done" toggles
  function enhanceStudyNotes(article, toc, dayNum) {
    article.querySelectorAll("pre > code.language-mermaid").forEach(code => {
      const div = document.createElement("div");
      div.className = "mermaid-diagram";
      div.textContent = code.textContent;
      code.parentElement.replaceWith(div);
    });
    const diagramsReady = renderDiagrams(article);

    if (window.Prism) Prism.highlightAllUnder(article);

    // Inline `code` isn't parsed inside raw <details> HTML, so do it here
    article.querySelectorAll("summary").forEach(s => {
      s.innerHTML = s.innerHTML.replace(/`([^`]+)`/g, "<code>$1</code>");
    });

    article.querySelectorAll(".notes-anchor").forEach(anchor => {
      const heading = anchor.nextElementSibling;
      if (!heading || heading.tagName !== "H3") return;
      const id = anchor.dataset.subtopic;
      const label = document.createElement("label");
      label.className = "notes-done-toggle";
      label.innerHTML = `<input type="checkbox" class="subtopic-checkbox" data-id="${id}" ${state.checkedSubtopics[id] ? "checked" : ""}> Done`;
      heading.appendChild(label);
    });

    const headings = [...article.querySelectorAll("h2, h3")];
    headings.forEach((h, i) => { if (!h.id) h.id = `notes-sec-${i}`; });
    toc.innerHTML = `<div class="study-toc-title">On this page</div>` + headings.map(h => {
      const copy = h.cloneNode(true);
      copy.querySelector(".notes-done-toggle")?.remove();
      const text = copy.textContent.trim();
      return `<a href="#${h.id}" class="study-toc-link level-${h.tagName.toLowerCase()}" data-target="${h.id}">${escapeHTML(text)}</a>`;
    }).join("");

    toc.querySelectorAll(".study-toc-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        toc.classList.remove("open");   // the TOC is a collapsible dropdown on phones
        document.getElementById(link.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    toc.querySelector(".study-toc-title").addEventListener("click", () => toc.classList.toggle("open"));

    article.querySelectorAll(".notes-done-toggle .subtopic-checkbox").forEach(cb => {
      cb.addEventListener("change", () => {
        const before = progressSnapshot();
        if (cb.checked) {
          state.checkedSubtopics[cb.dataset.id] = true;
          recordActivity();
        } else {
          delete state.checkedSubtopics[cb.dataset.id];
        }
        saveState();
        const scroller = $(".content-scroll");
        const top = scroller.scrollTop;
        renderDayDetail(dayNum);
        scroller.scrollTop = top;
        renderSidebar();
        if (cb.checked) celebrateProgress(before);
      });
    });

    return diagramsReady;
  }

  function studyNotesMessageHTML(dayNum) {
    const notes = notesCache[dayNum];
    if (!notes || notes.status === "loading") {
      return `<div class="study-notes-message">Loading notes…</div>`;
    }
    if (notes.status === "missing") {
      return `<div class="study-notes-message">
        <strong>No study notes for Day ${dayNum} yet.</strong>
        <p>Add a Markdown file at <code>${notesPath(dayNum)}</code> and it will show up here.</p>
      </div>`;
    }
    const fileHint = location.protocol === "file:"
      ? `<p>Browsers block reading local files when <code>index.html</code> is opened directly. Serve the folder instead, for example:</p>
         <pre><code>npx serve .</code></pre>
         <p>or <code>python -m http.server 8000</code>, then open <code>http://localhost:8000</code>. The VS Code "Live Server" extension or GitHub Pages also work.</p>`
      : `<p>Check that <code>${notesPath(dayNum)}</code> exists and reload the page.</p>`;
    return `<div class="study-notes-message"><strong>Couldn't load the study notes.</strong>${fileHint}</div>`;
  }

  // ── Helpers ──
  function getDayData(dayNum) {
    return CURRICULUM_DATA.find(d => d.day === dayNum);
  }

  function getAllSubtopicsForDay(dayNum) {
    const day = getDayData(dayNum);
    if (!day) return [];
    return day.topics.flatMap(t => t.subtopics);
  }

  function getDayCompletionInfo(dayNum) {
    const subs = getAllSubtopicsForDay(dayNum);
    const total = subs.length;
    const checked = subs.filter(s => state.checkedSubtopics[s.id]).length;
    return { total, checked, percentage: total > 0 ? Math.round((checked / total) * 100) : 0 };
  }

  function isDayCompleted(dayNum) {
    const info = getDayCompletionInfo(dayNum);
    return info.total > 0 && info.checked === info.total;
  }

  function dayHasMissedNotes(dayNum) {
    const key = `day${dayNum}_missed`;
    return !!(state.notes[key] && state.notes[key].trim().length > 0);
  }

  function getDayStatus(dayNum) {
    const info = getDayCompletionInfo(dayNum);
    if (info.checked === info.total && info.total > 0) return "completed";
    if (info.checked > 0) return "in-progress";
    return "pending";
  }

  function getFilteredDays() {
    let days = [...CURRICULUM_DATA];

    // Status filter
    if (state.statusFilter !== "all") {
      days = days.filter(d => {
        if (state.statusFilter === "has-missed") return dayHasMissedNotes(d.day);
        return getDayStatus(d.day) === state.statusFilter;
      });
    }

    // Category filter
    if (state.categoryFilter !== "all") {
      days = days.filter(d => d.categories.includes(state.categoryFilter));
    }

    // Search
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      days = days.filter(d => {
        if (d.title.toLowerCase().includes(q)) return true;
        return d.topics.some(t =>
          t.name.toLowerCase().includes(q) ||
          t.subtopics.some(s => s.label.toLowerCase().includes(q))
        );
      });
    }

    return days;
  }

  function getOverallStats() {
    let totalSubs = 0, checkedSubs = 0, completedDays = 0;
    CURRICULUM_DATA.forEach(d => {
      const info = getDayCompletionInfo(d.day);
      totalSubs += info.total;
      checkedSubs += info.checked;
      if (info.checked === info.total && info.total > 0) completedDays++;
    });
    return {
      totalDays: 60,
      completedDays,
      totalSubs,
      checkedSubs,
      percentage: totalSubs > 0 ? Math.round((checkedSubs / totalSubs) * 100) : 0
    };
  }

  function getCurrentDay() {
    let current = 1;
    for (let i = 1; i <= 60; i++) {
      if (!isDayCompleted(i)) { current = i; break; }
      if (i === 60) current = 60;
    }
    return current;
  }

  function getCategoryStats(categoryName) {
    let total = 0, checked = 0;
    CURRICULUM_DATA.forEach(d => {
      d.topics.forEach(t => {
        if (t.category === categoryName) {
          t.subtopics.forEach(s => {
            total++;
            if (state.checkedSubtopics[s.id]) checked++;
          });
        }
      });
    });
    return { total, checked, percentage: total > 0 ? Math.round((checked / total) * 100) : 0 };
  }

  function getStatusCounts() {
    let completed = 0, inProgress = 0, pending = 0, hasMissed = 0;
    CURRICULUM_DATA.forEach(d => {
      const s = getDayStatus(d.day);
      if (s === "completed") completed++;
      else if (s === "in-progress") inProgress++;
      else pending++;
      if (dayHasMissedNotes(d.day)) hasMissed++;
    });
    return { completed, "in-progress": inProgress, pending, "has-missed": hasMissed };
  }

  function getPhases() {
    const phases = [];
    CURRICULUM_DATA.forEach(d => {
      let phase = phases.find(p => p.name === d.phase);
      if (!phase) {
        phase = { name: d.phase, range: d.phaseRange, days: [] };
        phases.push(phase);
      }
      phase.days.push(d.day);
    });
    return phases.map((p, i) => {
      const done = p.days.filter(isDayCompleted).length;
      const subs = p.days.map(getDayCompletionInfo);
      const total = subs.reduce((a, s) => a + s.total, 0);
      const checked = subs.reduce((a, s) => a + s.checked, 0);
      return {
        ...p,
        index: i + 1,
        shortName: p.name.replace(/^Phase \d+:\s*/, ""),
        doneDays: done,
        percentage: total ? Math.round((checked / total) * 100) : 0,
        started: checked > 0
      };
    });
  }

  // ── Fresh look every visit: palettes + quotes ──
  const PALETTES = [
    { name: "Aurora",  colors: ["#7c5cff", "#22d3ee", "#34d399"] },
    { name: "Sunset",  colors: ["#ff6b6b", "#ff8e3c", "#ffd166"] },
    { name: "Ocean",   colors: ["#3b82f6", "#06b6d4", "#a78bfa"] },
    { name: "Nebula",  colors: ["#c026d3", "#8b5cf6", "#60a5fa"] },
    { name: "Forest",  colors: ["#10b981", "#84cc16", "#22d3ee"] },
    { name: "Candy",   colors: ["#ec4899", "#a855f7", "#38bdf8"] },
    { name: "Ember",   colors: ["#f97316", "#ef4444", "#ec4899"] },
    { name: "Glacier", colors: ["#0ea5e9", "#6366f1", "#2dd4bf"] }
  ];

  function applyPalette(index) {
    const [a1, a2, a3] = PALETTES[index].colors;
    const root = document.documentElement.style;
    root.setProperty("--a1", a1);
    root.setProperty("--a2", a2);
    root.setProperty("--a3", a3);
    state.lastPalette = index;
    saveState();
  }

  function shufflePalette() {
    let next;
    do { next = Math.floor(Math.random() * PALETTES.length); } while (next === state.lastPalette && PALETTES.length > 1);
    applyPalette(next);
    return PALETTES[next];
  }

  const QUOTES = [
    ["The secret of getting ahead is getting started.", "Mark Twain (attributed)"],
    ["It always seems impossible until it's done.", "Nelson Mandela"],
    ["First, solve the problem. Then, write the code.", "John Johnson"],
    ["Simplicity is prerequisite for reliability.", "Edsger W. Dijkstra"],
    ["Talk is cheap. Show me the code.", "Linus Torvalds"],
    ["Make it work, make it right, make it fast.", "Kent Beck"],
    ["Success is the sum of small efforts, repeated day in and day out.", "Robert Collier"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ["The expert in anything was once a beginner.", "Helen Hayes"],
    ["You don't have to be great to start, but you have to start to be great.", "Zig Ziglar"],
    ["Done is better than perfect.", "Sheryl Sandberg"],
    ["Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", "Martin Fowler"],
    ["One more subtopic today is one less question you'll freeze on in the interview.", "Your future self"],
    ["Consistency beats intensity. Show up again tomorrow.", "Your future self"],
    ["The offer letter is built one checkbox at a time.", "Your future self"],
    ["Today's confusion is next month's confident interview answer.", "Your future self"],
    ["Recursion tip: trust the smaller problem. The same goes for you.", "Your future self"],
    ["Every Hard problem is just a few Mediums wearing a trench coat.", "Your future self"],
    ["You won't remember the hours. You'll remember that you didn't quit.", "Your future self"],
    ["Interviewers don't want perfect. They want someone who can reason out loud. Practise that today.", "Your future self"],
    ["Two focused hours beat six distracted ones. Close the other tabs.", "Your future self"],
    ["Big-O of giving up: you lose everything. Big-O of one more day: constant time.", "Your future self"]
  ];
  let quoteIndex = Math.floor(Math.random() * QUOTES.length);

  // ── Activity, streaks, XP and levels ──
  function dateKey(date) {
    const d = date || new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function recordActivity(count = 1) {
    if (count <= 0) return;
    const key = dateKey();
    state.activity[key] = (state.activity[key] || 0) + count;
  }

  // Current streak counts back from today (or from yesterday if nothing is ticked yet today)
  function getStudyStreak() {
    const has = (d) => (state.activity[dateKey(d)] || 0) > 0;
    const day = new Date();
    const studiedToday = has(day);
    if (!studiedToday) day.setDate(day.getDate() - 1);
    let current = 0;
    while (has(day)) {
      current++;
      day.setDate(day.getDate() - 1);
    }

    const keys = Object.keys(state.activity).filter(k => state.activity[k] > 0).sort();
    let best = 0, run = 0, prev = null;
    keys.forEach(k => {
      const d = new Date(k + "T00:00:00");
      run = prev && (d - prev) / 86400000 === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = d;
    });
    return { current, best: Math.max(best, current), studiedToday, activeDays: keys.length };
  }

  const XP_PER = { subtopic: 10, E: 10, M: 20, H: 40 };
  const LEVEL_TITLES = [
    [1, "Curious Coder"], [3, "Bug Squasher"], [5, "Code Apprentice"], [7, "Junior Engineer"],
    [9, "Software Engineer"], [11, "Senior Engineer"], [13, "Tech Lead"], [15, "Staff Engineer"], [17, "Principal Engineer"]
  ];

  function getXP() {
    let xp = Object.keys(state.checkedSubtopics).length * XP_PER.subtopic;
    getUniqueProblems().forEach(u => {
      if (state.solvedProblems[u.problem[2]]) xp += XP_PER[u.problem[3]] || 0;
    });
    return xp;
  }

  // Level n starts at 50·n·(n-1) XP: 0, 100, 300, 600, 1000…
  function getLevelInfo(xp = getXP()) {
    let level = 1;
    while (50 * (level + 1) * level <= xp) level++;
    const floor = 50 * level * (level - 1);
    const next = 50 * (level + 1) * level;
    const title = LEVEL_TITLES.filter(([min]) => level >= min).pop()[1];
    return { xp, level, title, floor, next, percentage: Math.round(((xp - floor) / (next - floor)) * 100) };
  }

  // ── Achievements ──
  function achievementContext() {
    const unique = getUniqueProblems();
    const solved = unique.filter(u => state.solvedProblems[u.problem[2]]);
    const completedDays = CURRICULUM_DATA.filter(d => isDayCompleted(d.day)).length;
    const streak = getStudyStreak();
    const notedDays = CURRICULUM_DATA.filter(d => (state.notes[`day${d.day}_covered`] || "").trim()).length;
    return {
      subs: Object.keys(state.checkedSubtopics).length,
      completedDays,
      firstWeek: [1, 2, 3, 4, 5, 6, 7].filter(isDayCompleted).length,
      phases: getPhases(),
      solved: solved.length,
      hardSolved: solved.filter(u => u.problem[3] === "H").length,
      totalProblems: unique.length,
      bestStreak: streak.best,
      notedDays,
      level: getLevelInfo().level,
      categories: ["Java", "Spring Boot", "DSA", "System Design", "DB/DevOps"].map(getCategoryStats)
    };
  }

  const ACHIEVEMENTS = [
    { id: "first-step", icon: "👣", name: "First Step", desc: "Tick your first subtopic", goal: c => [c.subs, 1] },
    { id: "day-one", icon: "🌅", name: "Day One Done", desc: "Complete Day 1", goal: c => [isDayCompleted(1) ? 1 : 0, 1] },
    { id: "week-one", icon: "📅", name: "Week One Warrior", desc: "Complete Days 1–7", goal: c => [c.firstWeek, 7] },
    { id: "phase-1", icon: "☕", name: "Java Foundations", desc: "Finish Phase 1", goal: c => [c.phases[0]?.doneDays || 0, c.phases[0]?.days.length || 1] },
    { id: "subs-100", icon: "💯", name: "Century", desc: "Tick 100 subtopics", goal: c => [c.subs, 100] },
    { id: "halfway", icon: "⛰️", name: "Halfway There", desc: "Complete 30 days", goal: c => [c.completedDays, 30] },
    { id: "finisher", icon: "🏁", name: "Interview Ready", desc: "Complete all 60 days", goal: c => [c.completedDays, 60] },
    { id: "streak-3", icon: "🔥", name: "Warming Up", desc: "3-day study streak", goal: c => [c.bestStreak, 3] },
    { id: "streak-7", icon: "⚡", name: "On Fire", desc: "7-day study streak", goal: c => [c.bestStreak, 7] },
    { id: "streak-21", icon: "🌋", name: "Unstoppable", desc: "21-day study streak", goal: c => [c.bestStreak, 21] },
    { id: "solve-1", icon: "🧩", name: "Hello LeetCode", desc: "Solve your first problem", goal: c => [c.solved, 1] },
    { id: "solve-50", icon: "🎯", name: "Problem Solver", desc: "Solve 50 problems", goal: c => [c.solved, 50] },
    { id: "solve-150", icon: "🚀", name: "Grinder", desc: "Solve 150 problems", goal: c => [c.solved, 150] },
    { id: "hard-10", icon: "🐉", name: "Dragon Slayer", desc: "Solve 10 Hard problems", goal: c => [c.hardSolved, 10] },
    { id: "notes-5", icon: "📝", name: "Note Taker", desc: "Write takeaways for 5 days", goal: c => [c.notedDays, 5] },
    { id: "level-5", icon: "⭐", name: "Level 5", desc: "Reach level 5", goal: c => [c.level, 5] },
    { id: "level-10", icon: "🌟", name: "Level 10", desc: "Reach level 10", goal: c => [c.level, 10] },
    { id: "master", icon: "👑", name: "Subject Master", desc: "100% in any subject", goal: c => [Math.max(...c.categories.map(s => s.percentage)), 100] }
  ];

  function getAchievements() {
    const ctx = achievementContext();
    return ACHIEVEMENTS.map(a => {
      const [have, need] = a.goal(ctx);
      return { ...a, have: Math.min(have, need), need, unlocked: have >= need };
    });
  }

  function badgeHTML(a, withDesc) {
    return `
      <div class="badge ${a.unlocked ? "unlocked" : ""}" title="${a.name}: ${a.desc}">
        <div class="badge-icon">${a.icon}</div>
        <div class="badge-name">${a.name}</div>
        ${withDesc ? `<div class="badge-desc">${a.desc}</div>` : ""}
        ${a.unlocked ? "" : `<div class="badge-progress">${a.have}/${a.need}</div>`}
      </div>
    `;
  }

  // Take a snapshot before a change, then celebrate whatever the change unlocked
  function progressSnapshot() {
    return {
      level: getLevelInfo().level,
      completed: new Set(CURRICULUM_DATA.filter(d => isDayCompleted(d.day)).map(d => d.day))
    };
  }

  function celebrateProgress(before) {
    const messages = [];
    const level = getLevelInfo();
    const newDays = CURRICULUM_DATA.filter(d => isDayCompleted(d.day) && !before.completed.has(d.day));
    newDays.forEach(d => messages.push(`Day ${d.day} complete! 🎉`));
    if (level.level > before.level) messages.push(`Level up! You're now Level ${level.level} · ${level.title} ⭐`);

    const unlocked = getAchievements().filter(a => a.unlocked);
    const seen = new Set(state.seenAchievements || []);
    const fresh = unlocked.filter(a => !seen.has(a.id));
    fresh.forEach(a => messages.push(`Badge unlocked: ${a.icon} ${a.name}`));
    state.seenAchievements = unlocked.map(a => a.id);
    saveState();

    if (messages.length) {
      showToast(messages.join(" · "), "celebrate");
      launchConfetti(newDays.length || fresh.length || level.level > before.level ? 1 : 0.5);
    }
  }

  // ── Confetti (tiny canvas implementation, no library) ──
  function launchConfetti(strength = 1) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = $("#confetti-canvas");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const colors = ["--a1", "--a2", "--a3"].map(v => styles.getPropertyValue(v).trim()).concat(["#ffffff", "#fbbf24"]);
    const pieces = Array.from({ length: Math.round(160 * strength) }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.3,
      y: innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 4,
      size: Math.random() * 7 + 4,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const start = performance.now();
    (function frame(now) {
      const t = now - start;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      pieces.forEach(p => {
        p.vy += 0.35;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - t / 2600);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      if (t < 2600) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, innerWidth, innerHeight);
    })(start);
  }

  // ── Toast ──
  let toastTimer;
  function showToast(message, type = "success") {
    const toast = $("#toast");
    const iconMap = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
      celebrate: `<span style="font-size:1.2rem">🏆</span>`
    };
    toast.className = `toast ${type}`;
    toast.innerHTML = `${iconMap[type] || iconMap.info}<span>${message}</span>`;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), type === "celebrate" ? 4500 : 3000);
  }

  // ── Lucide-like SVG Icons ──
  const ICONS = {
    rocket: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
    check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    clock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    upload: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    alertCircle: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    fileText: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    bookOpen: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    clipboardList: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
    targetIcon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    shuffle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>`,
    arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
    arrowUp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>`,
    sparkles: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
  };

  // ── Render: Sidebar ──
  function renderSidebar() {
    const stats = getOverallStats();
    const statusCounts = getStatusCounts();

    // Progress ring
    $("#sidebar-ring").style.setProperty("--p", stats.percentage);
    $("#stat-days-done").textContent = `${stats.completedDays}/60`;
    $("#stat-subs-done").textContent = `${stats.checkedSubs}/${stats.totalSubs}`;
    $("#stat-percentage").textContent = `${stats.percentage}%`;

    // Navigation highlight ("detail" keeps the section it was opened from lit)
    const navView = state.currentView === "detail" ? state.returnView : state.currentView;
    $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === navView));

    // Top bar: streak + level
    const streak = getStudyStreak();
    const streakChip = $("#chip-streak");
    streakChip.innerHTML = `🔥 <strong>${streak.current}</strong> day${streak.current === 1 ? "" : "s"}`;
    streakChip.classList.toggle("hot", streak.current >= 3);
    streakChip.title = streak.studiedToday
      ? `Study streak: ${streak.current} day(s) in a row. Best: ${streak.best}.`
      : `Tick something today to ${streak.current ? "keep your streak alive" : "start a streak"}. Best: ${streak.best}.`;
    const lvl = getLevelInfo();
    $("#chip-level").innerHTML = `
      <span class="level-badge">${lvl.level}</span>
      <span class="level-title">${lvl.title}</span>
      <span class="level-bar"><span class="level-bar-fill" style="width:${lvl.percentage}%"></span></span>`;
    $("#chip-level").title = `Level ${lvl.level} · ${lvl.xp} XP · ${lvl.next - lvl.xp} XP to level ${lvl.level + 1}`;

    // Status filter badges
    $('[data-status="completed"] .filter-badge').textContent = statusCounts.completed;
    $('[data-status="in-progress"] .filter-badge').textContent = statusCounts["in-progress"];
    $('[data-status="pending"] .filter-badge').textContent = statusCounts.pending;
    $('[data-status="has-missed"] .filter-badge').textContent = statusCounts["has-missed"];

    // Update active filter
    $$(".filter-btn[data-status]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.status === state.statusFilter);
    });
    $$(".filter-btn[data-category]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === state.categoryFilter);
    });

    // Category badges
    const categories = ["Java", "Spring Boot", "DSA", "System Design", "DB/DevOps"];
    categories.forEach(cat => {
      const stats = getCategoryStats(cat);
      const badge = $(`[data-category="${cat}"] .filter-badge`);
      if (badge) badge.textContent = `${stats.percentage}%`;
    });

    // Heatmap
    renderHeatmap();
  }

  function renderHeatmap() {
    const grid = $("#heatmap-grid");
    grid.innerHTML = "";
    const currentDay = getCurrentDay();
    for (let i = 1; i <= 60; i++) {
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      cell.textContent = i;
      cell.title = `Day ${i}: ${getDayData(i)?.title || ""}`;
      cell.dataset.day = i;

      const status = getDayStatus(i);
      if (status === "completed") cell.classList.add("completed");
      else if (status === "in-progress") cell.classList.add("partial");
      if (dayHasMissedNotes(i)) cell.classList.add("has-missed");
      if (i === currentDay && status !== "completed") cell.classList.add("current");
      if (state.selectedDay === i) cell.classList.add("active");

      cell.addEventListener("click", () => openDayDetail(i));
      grid.appendChild(cell);
    }
  }

  function categoryTagsHTML(categories) {
    return categories.map(cat => {
      const colors = CATEGORY_COLORS[cat] || { text: "#999" };
      return `<span class="category-tag" style="--c:${colors.text}">${cat}</span>`;
    }).join("");
  }

  // ── Render: Day Cards Grid ──
  function renderDaysGrid() {
    const container = $("#days-grid");
    const filteredDays = getFilteredDays();

    if (filteredDays.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1">
          ${ICONS.sparkles}
          <h3>No days match your filters</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      `;
      return;
    }

    const currentDay = getCurrentDay();
    const dayCardHTML = (day) => {
      const info = getDayCompletionInfo(day.day);
      const status = getDayStatus(day.day);
      const hasMissed = dayHasMissedNotes(day.day);
      const isCurrent = day.day === currentDay && status !== "completed";

      const statusIconHTML = status === "completed"
        ? `<div class="day-status-icon">${ICONS.check}</div>`
        : status === "in-progress"
        ? `<div class="day-status-icon">${info.percentage}%</div>`
        : `<div class="day-status-icon"></div>`;

      return `
        <div class="day-card ${status} ${isCurrent ? "current" : ""} ${hasMissed ? "has-missed" : ""}" data-day="${day.day}">
          ${isCurrent ? `<span class="up-next">Up next</span>` : ""}
          <div class="day-card-header">
            <span class="day-number"><small>Day</small>${String(day.day).padStart(2, "0")}</span>
            ${statusIconHTML}
          </div>
          <div class="day-title">${escapeHTML(day.title)}</div>
          ${hasMissed ? `<div class="missed-badge">${ICONS.alertCircle} Missed items</div>` : ""}
          <div class="day-meta">
            <span class="day-time">${ICONS.clock} ${day.estimatedTime}</span>
            <div class="day-categories">${categoryTagsHTML(day.categories)}</div>
          </div>
          <div class="day-progress-row">
            <div class="day-progress-bar">
              <div class="day-progress-fill" style="width:${info.percentage}%"></div>
            </div>
            <span class="day-progress-text">${info.checked}/${info.total}</span>
          </div>
        </div>
      `;
    };

    // Group the (filtered) days under their phase
    container.innerHTML = getPhases()
      .map(phase => ({ phase, days: filteredDays.filter(d => phase.days.includes(d.day)) }))
      .filter(group => group.days.length)
      .map(({ phase, days }) => `
        <section class="phase-section">
          <div class="phase-section-head">
            <span class="phase-section-num">${phase.index}</span>
            <div>
              <div class="phase-section-title">${escapeHTML(phase.shortName)}</div>
              <div class="phase-section-meta">${phase.range} · ${phase.doneDays}/${phase.days.length} days done</div>
            </div>
            <div class="bar"><div class="bar-fill" style="width:${phase.percentage}%"></div></div>
          </div>
          <div class="phase-cards">${days.map(dayCardHTML).join("")}</div>
        </section>
      `).join("");

    // Bind click events
    container.querySelectorAll(".day-card").forEach(card => {
      card.addEventListener("click", () => openDayDetail(parseInt(card.dataset.day)));
    });
  }

  // ── Render: Day Detail ──
  function renderDayDetail(dayNum) {
    const day = getDayData(dayNum);
    if (!day) return;

    const info = getDayCompletionInfo(dayNum);
    const isComplete = isDayCompleted(dayNum);

    const detail = $("#day-detail");
    loadDayNotes(dayNum);
    const notes = notesCache[dayNum];
    const noteIds = notes.status === "ready" ? notes.ids : new Set();

    const categoryTags = categoryTagsHTML(day.categories);

    // Build topic groups
    const topicGroupsHTML = day.topics.map((topic, ti) => {
      const topicChecked = topic.subtopics.filter(s => state.checkedSubtopics[s.id]).length;
      const topicTotal = topic.subtopics.length;

      const subtopicsHTML = topic.subtopics.map(sub => {
        const isChecked = !!state.checkedSubtopics[sub.id];
        const isHighlighted = state.searchQuery && sub.label.toLowerCase().includes(state.searchQuery.toLowerCase());
        return `
          <div class="subtopic-item ${isChecked ? 'checked' : ''} ${isHighlighted ? 'search-highlight' : ''}">
            <input type="checkbox" class="subtopic-checkbox" data-id="${sub.id}" ${isChecked ? 'checked' : ''}>
            <label class="subtopic-label" data-id="${sub.id}">${escapeHTML(sub.label)}</label>
            ${noteIds.has(sub.id) ? `<button class="subtopic-notes-btn" data-id="${sub.id}" title="Read study notes for this subtopic">${ICONS.bookOpen}</button>` : ""}
          </div>
        `;
      }).join("");

      const topicColor = CATEGORY_COLORS[topic.category];
      return `
        <div class="topic-group">
          <div class="topic-group-header">
            <span class="category-dot" style="background:${topicColor?.text || '#888'}"></span>
            <span class="topic-group-name">${escapeHTML(topic.name)}</span>
            <span class="topic-group-progress">${topicChecked}/${topicTotal}</span>
          </div>
          <div class="subtopic-list">${subtopicsHTML}</div>
        </div>
      `;
    }).join("");

    const coveredNote = state.notes[`day${dayNum}_covered`] || "";
    const missedNote = state.notes[`day${dayNum}_missed`] || "";

    const tabsHTML = `
      <div class="detail-tabs">
        <button class="detail-tab ${state.detailTab === "checklist" ? "active" : ""}" data-tab="checklist">
          ${ICONS.clipboardList} Checklist<span class="hide-sm">&nbsp;&amp; My Notes</span>
        </button>
        <button class="detail-tab ${state.detailTab === "study" ? "active" : ""}" data-tab="study">
          ${ICONS.bookOpen} Study Notes
          ${notes.status === "ready" ? `<span class="detail-tab-badge">${noteIds.size}</span>` : ""}
        </button>
      </div>
    `;

    const studyHTML = `
      ${notes.status === "ready" ? `<div class="reading-progress"><span id="reading-progress-fill"></span></div>` : ""}
      <div class="study-notes">
        ${notes.status === "ready"
          ? `<nav class="study-toc" id="study-toc"></nav><article class="md-content" id="study-article">${notes.html}</article>`
          : studyNotesMessageHTML(dayNum)}
      </div>
    `;

    const daySets = getSetsForDay(dayNum);
    const practiceSetsHTML = daySets.length ? `
      <div class="day-sets">
        <div class="day-sets-title">🧩 Practice Question Sets for today's DSA</div>
        <div class="day-sets-list">
          ${daySets.map(s => {
            const stats = getSetStats(s);
            return `<button class="day-set-chip" data-set="${s.id}">
              <span>${s.icon} ${s.name}</span>
              <span class="day-set-count">${stats.solved}/${stats.total}</span>
            </button>`;
          }).join("")}
        </div>
      </div>
    ` : "";

    const checklistHTML = `
      <div class="checklist-panel">
        <div class="checklist-section-header">
          <span class="checklist-section-title">${ICONS.clipboardList} Subtopic Checklist</span>
          <span class="checklist-section-count">${info.checked}/${info.total} done</span>
        </div>
        ${topicGroupsHTML}
        ${practiceSetsHTML}
      </div>
      <div class="notes-panel">
        <div class="note-box">
          <div class="note-box-header covered">
            ${ICONS.bookOpen}
            <span class="note-box-title">What I Covered / Key Takeaways</span>
            <span class="note-box-saved" id="covered-saved">✓ Saved</span>
          </div>
          <textarea class="note-textarea" id="note-covered" placeholder="Log what you studied, code snippets, key insights, or revision notes...">${coveredNote}</textarea>
        </div>
        <div class="note-box">
          <div class="note-box-header missed">
            ${ICONS.alertCircle}
            <span class="note-box-title">What I Missed / Spillover to Review</span>
            <span class="note-box-saved" id="missed-saved">✓ Saved</span>
          </div>
          <textarea class="note-textarea" id="note-missed" placeholder="Track incomplete topics, weak areas, or items to revisit later...">${missedNote}</textarea>
        </div>
      </div>
    `;

    detail.innerHTML = `
      <button class="detail-back-btn" id="back-to-grid">
        ${ICONS.arrowLeft} ${state.returnView === "home" ? "Dashboard" : "Roadmap"}
      </button>
      <div class="detail-header ${isComplete ? 'completed' : ''}">
        <div class="ring" style="--p:${info.percentage}"><span class="ring-value">${info.percentage}%</span></div>
        <div class="detail-main">
          <div class="detail-day-label">Day ${dayNum} of 60 · ${day.phase} (${day.phaseRange})</div>
          <div class="detail-title">${escapeHTML(day.title)}</div>
          <div class="detail-meta">
            <div class="detail-info">${ICONS.clock} ${day.estimatedTime}</div>
            <div class="detail-info">${categoryTags}</div>
            <div class="detail-info">${ICONS.checkCircle} ${info.checked}/${info.total} subtopics</div>
            <button class="mark-complete-btn ${isComplete ? 'completed' : ''}" id="mark-complete-btn">
              ${isComplete ? ICONS.checkCircle + ' Completed!' : ICONS.checkCircle + ' Mark all complete'}
            </button>
          </div>
        </div>
      </div>
      ${tabsHTML}
      ${state.detailTab === "study" ? studyHTML : checklistHTML}
    `;

    // Bind events
    detail.querySelector("#back-to-grid").addEventListener("click", closeDayDetail);

    // Detail tabs
    detail.querySelectorAll(".detail-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        if (state.detailTab === tab.dataset.tab) return;
        state.detailTab = tab.dataset.tab;
        renderDayDetail(dayNum);
      });
    });

    // Mark complete button
    detail.querySelector("#mark-complete-btn").addEventListener("click", () => {
      const subs = getAllSubtopicsForDay(dayNum);
      const allChecked = subs.every(s => state.checkedSubtopics[s.id]);
      const before = progressSnapshot();
      if (!allChecked) recordActivity(subs.filter(s => !state.checkedSubtopics[s.id]).length);
      subs.forEach(s => {
        if (allChecked) {
          delete state.checkedSubtopics[s.id];
        } else {
          state.checkedSubtopics[s.id] = true;
        }
      });
      saveState();
      const scroller = $(".content-scroll");
      const top = scroller.scrollTop;
      renderDayDetail(dayNum);
      scroller.scrollTop = top;
      renderSidebar();
      if (allChecked) showToast("Day unmarked", "info");
      else celebrateProgress(before);
    });

    if (state.detailTab === "study") {
      const article = detail.querySelector("#study-article");
      if (article) {
        const diagramsReady = enhanceStudyNotes(article, detail.querySelector("#study-toc"), dayNum);
        if (state.pendingNoteScroll) {
          const target = detail.querySelector(`#note-${state.pendingNoteScroll}`);
          state.pendingNoteScroll = null;
          target?.scrollIntoView({ block: "start" });
          // Diagrams above the target change height when they finish drawing, so scroll again
          diagramsReady.then(() => { if (target?.isConnected) target.scrollIntoView({ block: "start" }); });
        }
      }
      return;
    }

    // Open study notes at a specific subtopic
    detail.querySelectorAll(".subtopic-notes-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.detailTab = "study";
        state.pendingNoteScroll = btn.dataset.id;
        renderDayDetail(dayNum);
      });
    });

    detail.querySelectorAll(".day-set-chip").forEach(chip => {
      chip.addEventListener("click", () => openSet(chip.dataset.set));
    });

    // Checkbox events
    detail.querySelectorAll(".subtopic-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        const before = progressSnapshot();
        if (e.target.checked) {
          state.checkedSubtopics[id] = true;
          recordActivity();
        } else {
          delete state.checkedSubtopics[id];
        }
        saveState();
        const scroller = $(".content-scroll");
        const top = scroller.scrollTop;
        renderDayDetail(dayNum);
        scroller.scrollTop = top;
        renderSidebar();
        if (e.target.checked) celebrateProgress(before);
      });
    });

    // Label click
    detail.querySelectorAll(".subtopic-label").forEach(lbl => {
      lbl.addEventListener("click", () => {
        const id = lbl.dataset.id;
        const cb = detail.querySelector(`.subtopic-checkbox[data-id="${id}"]`);
        if (cb) {
          cb.checked = !cb.checked;
          cb.dispatchEvent(new Event("change"));
        }
      });
    });

    // Note auto-save
    let coveredTimer, missedTimer;
    const coveredTextarea = detail.querySelector("#note-covered");
    const missedTextarea = detail.querySelector("#note-missed");

    coveredTextarea.addEventListener("input", () => {
      clearTimeout(coveredTimer);
      coveredTimer = setTimeout(() => {
        state.notes[`day${dayNum}_covered`] = coveredTextarea.value;
        saveState();
        const saved = detail.querySelector("#covered-saved");
        saved.classList.add("visible");
        setTimeout(() => saved.classList.remove("visible"), 2000);
      }, 500);
    });

    missedTextarea.addEventListener("input", () => {
      clearTimeout(missedTimer);
      missedTimer = setTimeout(() => {
        state.notes[`day${dayNum}_missed`] = missedTextarea.value;
        saveState();
        renderSidebar();
        const saved = detail.querySelector("#missed-saved");
        saved.classList.add("visible");
        setTimeout(() => saved.classList.remove("visible"), 2000);
      }, 500);
    });
  }

  // ── Render: Backlog View ──
  function renderBacklogView() {
    const container = $("#backlog-content");

    // Collect unchecked subtopics from past/started days
    let uncheckedItems = [];
    let missedNotes = [];

    CURRICULUM_DATA.forEach(d => {
      const info = getDayCompletionInfo(d.day);
      // Only show backlog for days that have been started
      if (info.checked > 0 || dayHasMissedNotes(d.day)) {
        d.topics.forEach(t => {
          t.subtopics.forEach(s => {
            if (!state.checkedSubtopics[s.id]) {
              uncheckedItems.push({ day: d.day, dayTitle: d.title, label: s.label, id: s.id });
            }
          });
        });
      }

      const missedNote = state.notes[`day${d.day}_missed`];
      if (missedNote && missedNote.trim()) {
        missedNotes.push({ day: d.day, dayTitle: d.title, note: missedNote });
      }
    });

    let html = "";

    // Unchecked subtopics
    html += `<div class="backlog-section">`;
    html += `<div class="backlog-section-title">${ICONS.clipboardList} Unchecked Subtopics from Started Days (${uncheckedItems.length})</div>`;
    if (uncheckedItems.length === 0) {
      html += `<div class="backlog-empty">${ICONS.targetIcon}<p>No unchecked subtopics from started days. Great job!</p></div>`;
    } else {
      html += uncheckedItems.map(item => `
        <div class="backlog-item" data-id="${item.id}" data-day="${item.day}">
          <span class="backlog-day-badge">Day ${item.day}</span>
          <span class="backlog-content">${escapeHTML(item.label)}</span>
        </div>
      `).join("");
    }
    html += `</div>`;

    // Missed notes
    html += `<div class="backlog-section">`;
    html += `<div class="backlog-section-title">${ICONS.alertCircle} "What I Missed" Notes (${missedNotes.length})</div>`;
    if (missedNotes.length === 0) {
      html += `<div class="backlog-empty">${ICONS.targetIcon}<p>No missed-item notes recorded yet.</p></div>`;
    } else {
      html += missedNotes.map(item => `
        <div class="backlog-note-item" data-day="${item.day}">
          <div class="backlog-note-day">Day ${item.day} — ${escapeHTML(item.dayTitle)}</div>
          <div class="backlog-note-text">${escapeHTML(item.note)}</div>
        </div>
      `).join("");
    }
    html += `</div>`;

    container.innerHTML = html;

    // Click on backlog items to go to that day
    container.querySelectorAll(".backlog-item, .backlog-note-item").forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => openDayDetail(parseInt(el.dataset.day)));
    });
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Question Sets ──
  const DIFFICULTY = {
    E: { label: "Easy", cls: "easy" },
    M: { label: "Medium", cls: "medium" },
    H: { label: "Hard", cls: "hard" }
  };

  function getSetById(id) {
    return QUESTION_SETS.find(s => s.id === id);
  }

  function getSetsForDay(dayNum) {
    return QUESTION_SETS.filter(s => s.days.includes(dayNum));
  }

  function getSetStats(set) {
    const solved = set.problems.filter(p => state.solvedProblems[p[2]]).length;
    const total = set.problems.length;
    return { solved, total, percentage: total ? Math.round((solved / total) * 100) : 0 };
  }

  // Problems can appear in several sets; dedupe by slug for overall numbers
  function getUniqueProblems() {
    const bySlug = new Map();
    QUESTION_SETS.forEach(set => set.problems.forEach(p => {
      if (!bySlug.has(p[2])) bySlug.set(p[2], { problem: p, sets: [] });
      bySlug.get(p[2]).sets.push(set);
    }));
    return [...bySlug.values()];
  }

  function problemRowHTML(p, sets) {
    const [num, title, slug, diff, premium] = p;
    const solved = !!state.solvedProblems[slug];
    const d = DIFFICULTY[diff];
    const setLinks = sets
      ? `<span class="problem-sets">${sets.map(s => `<button class="problem-set-link" data-set="${s.id}">${s.name}</button>`).join("")}</span>`
      : "";
    return `
      <div class="problem-row ${solved ? "solved" : ""}">
        <input type="checkbox" class="subtopic-checkbox problem-checkbox" data-slug="${slug}" ${solved ? "checked" : ""} title="Mark as solved">
        <span class="problem-num">${num}</span>
        <a class="problem-title" href="https://leetcode.com/problems/${slug}/" target="_blank" rel="noopener noreferrer">${escapeHTML(title)}</a>
        ${premium ? `<span class="problem-premium" title="Needs LeetCode Premium">🔒 Premium</span>` : ""}
        ${setLinks}
        <span class="difficulty-pill ${d.cls}">${d.label}</span>
      </div>
    `;
  }

  function difficultyBreakdownHTML(problems) {
    return ["E", "M", "H"].map(key => {
      const all = problems.filter(p => p[3] === key);
      const solved = all.filter(p => state.solvedProblems[p[2]]).length;
      return `<span class="difficulty-count ${DIFFICULTY[key].cls}">${DIFFICULTY[key].label} ${solved}/${all.length}</span>`;
    }).join("");
  }

  function renderSetsView() {
    const container = $("#sets-view");
    const set = state.selectedSet && getSetById(state.selectedSet);
    container.innerHTML = set ? setDetailHTML(set) : setsIndexHTML();

    container.querySelectorAll(".set-card, .problem-set-link").forEach(el => {
      el.addEventListener("click", () => openSet(el.dataset.set));
    });
    container.querySelector("#sets-back")?.addEventListener("click", () => openSet(null));
    container.querySelectorAll(".set-day-link").forEach(el => {
      el.addEventListener("click", () => openDayDetail(parseInt(el.dataset.day)));
    });
    container.querySelectorAll(".set-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.setFilter = btn.dataset.filter;
        renderSetsView();
      });
    });
    container.querySelectorAll(".problem-checkbox").forEach(cb => {
      cb.addEventListener("change", () => {
        const before = progressSnapshot();
        if (cb.checked) {
          state.solvedProblems[cb.dataset.slug] = true;
          recordActivity();
        } else {
          delete state.solvedProblems[cb.dataset.slug];
        }
        saveState();
        const scroller = $(".content-scroll");
        const top = scroller.scrollTop;
        renderSetsView();
        scroller.scrollTop = top;
        renderSidebar();
        if (cb.checked) celebrateProgress(before);
      });
    });
  }

  function setsIndexHTML() {
    const unique = getUniqueProblems();
    const solvedCount = unique.filter(u => state.solvedProblems[u.problem[2]]).length;
    const query = state.searchQuery.trim().toLowerCase();

    let body;
    if (query) {
      const matches = unique.filter(u =>
        u.problem[1].toLowerCase().includes(query) || String(u.problem[0]) === query
      );
      body = `
        <div class="backlog-section-title">Search results for "${escapeHTML(state.searchQuery.trim())}" (${matches.length})</div>
        <div class="problem-list">
          ${matches.length
            ? matches.map(u => problemRowHTML(u.problem, u.sets)).join("")
            : `<div class="backlog-empty"><p>No problems match. Try a title or a LeetCode number.</p></div>`}
        </div>
      `;
    } else {
      // Show sets in the order the 60-day plan reaches them
      const byFirstDay = [...QUESTION_SETS].sort((a, b) => Math.min(...a.days) - Math.min(...b.days));
      body = `<div class="sets-grid">${byFirstDay.map(s => {
        const stats = getSetStats(s);
        return `
          <button class="set-card ${stats.solved === stats.total ? "complete" : ""}" data-set="${s.id}">
            <div class="set-card-header">
              <span class="set-icon">${s.icon}</span>
              <span class="set-name">${s.name}</span>
              <span class="set-count">${stats.solved}/${stats.total}</span>
            </div>
            <p class="set-description">${s.description}</p>
            <div class="set-progress-bar"><div class="set-progress-fill" style="width:${stats.percentage}%"></div></div>
            <div class="set-days">Days ${s.days.join(" · ")}</div>
          </button>
        `;
      }).join("")}</div>`;
    }

    return `
      <div class="sets-header">
        <div>
          <h2 class="sets-title">🧩 DSA Question Sets</h2>
          <p class="sets-subtitle">${QUESTION_SETS.length} topic sets · ${unique.length} LeetCode problems · tick a problem once and it counts in every set it appears in.</p>
        </div>
        <div class="sets-summary">
          <div class="sets-summary-value">${solvedCount}<span>/${unique.length}</span></div>
          <div class="sets-summary-label">solved</div>
          <div class="difficulty-counts">${difficultyBreakdownHTML(unique.map(u => u.problem))}</div>
        </div>
      </div>
      ${body}
    `;
  }

  function setDetailHTML(set) {
    const stats = getSetStats(set);
    const filters = [["all", "All"], ["E", "Easy"], ["M", "Medium"], ["H", "Hard"], ["unsolved", "Unsolved"]];
    const visible = set.problems.filter(p => {
      if (state.setFilter === "all") return true;
      if (state.setFilter === "unsolved") return !state.solvedProblems[p[2]];
      return p[3] === state.setFilter;
    });

    return `
      <button class="detail-back-btn" id="sets-back">${ICONS.arrowLeft} All Question Sets</button>
      <div class="set-detail-header">
        <div class="set-detail-title"><span class="set-icon">${set.icon}</span> ${set.name}</div>
        <p class="set-description">${set.description}</p>
        <div class="set-detail-meta">
          <span class="set-count">${stats.solved}/${stats.total} solved</span>
          <div class="difficulty-counts">${difficultyBreakdownHTML(set.problems)}</div>
        </div>
        <div class="set-progress-bar"><div class="set-progress-fill" style="width:${stats.percentage}%"></div></div>
        <div class="set-day-links">
          <span>Practised on:</span>
          ${set.days.map(d => `<button class="set-day-link" data-day="${d}">Day ${d}</button>`).join("")}
        </div>
      </div>
      <div class="set-filters">
        ${filters.map(([key, label]) => `<button class="set-filter-btn ${state.setFilter === key ? "active" : ""}" data-filter="${key}">${label}</button>`).join("")}
      </div>
      <div class="problem-list">
        ${visible.length
          ? visible.map(p => problemRowHTML(p)).join("")
          : `<div class="backlog-empty"><p>Nothing here — every problem in this filter is solved. 🎉</p></div>`}
      </div>
    `;
  }

  function openSet(setId) {
    state.selectedSet = setId || null;
    state.setFilter = "all";
    switchView("sets");
    $(".content-scroll").scrollTop = 0;
  }

  // ── Render: Subject Progress ──
  function renderSubjectProgress() {
    const container = $("#subject-progress");
    const categories = [
      { name: "Java", icon: "☕", color: "--accent-blue" },
      { name: "Spring Boot", icon: "🌿", color: "--accent-green" },
      { name: "DSA", icon: "🧮", color: "--accent-purple" },
      { name: "System Design", icon: "🏗️", color: "--accent-orange" },
      { name: "DB/DevOps", icon: "🗄️", color: "--accent-pink" }
    ];

    container.innerHTML = categories.map(cat => {
      const stats = getCategoryStats(cat.name);
      const colors = CATEGORY_COLORS[cat.name] || { bg: "#333", text: "#999" };
      return `
        <div class="subject-card" style="--c:${colors.text}">
          <div class="subject-card-header">
            <div class="subject-icon">${cat.icon}</div>
            <div>
              <div class="subject-name">${cat.name}</div>
              <div class="subject-stat">${stats.checked}/${stats.total} subtopics</div>
            </div>
          </div>
          <div class="subject-progress-bar">
            <div class="subject-progress-fill" style="width:${stats.percentage}%;background:${colors.text}"></div>
          </div>
          <div class="subject-percentage" style="color:${colors.text}">${stats.percentage}%</div>
        </div>
      `;
    }).join("");

    const achievements = getAchievements();
    const unlocked = achievements.filter(a => a.unlocked).length;
    $("#achievements-panel").innerHTML = `
      <div class="backlog-section">
        <div class="backlog-section-title">🏆 Achievements (${unlocked}/${achievements.length})</div>
        <div class="achievements-grid">${achievements.map(a => badgeHTML(a, true)).join("")}</div>
      </div>
    `;
  }

  // ── View switching ──
  const VIEW_SECTIONS = { home: "#home-view", grid: "#roadmap-view", detail: "#day-detail", backlog: "#backlog-view", sets: "#sets-view" };

  function showSection(view) {
    Object.entries(VIEW_SECTIONS).forEach(([name, sel]) => $(sel).classList.toggle("active", name === view));
    $("#to-top")?.classList.remove("visible");
  }

  function openDayDetail(dayNum, tab = "checklist") {
    if (state.currentView === "home" || state.currentView === "grid") state.returnView = state.currentView;
    else if (state.currentView !== "detail") state.returnView = "grid";
    state.selectedDay = dayNum;
    state.currentView = "detail";
    state.detailTab = tab;
    showSection("detail");
    renderDayDetail(dayNum);
    renderSidebar();
    $(".content-scroll").scrollTop = 0;
    closeMobileMenu();
  }

  function closeDayDetail() {
    state.selectedDay = null;
    switchView(state.returnView || "grid");
  }

  function switchView(view) {
    state.currentView = view;
    if (view !== "detail") state.selectedDay = null;
    showSection(view);

    if (view === "home") {
      renderHomeView();
    } else if (view === "grid") {
      renderDaysGrid();
    } else if (view === "backlog") {
      renderBacklogView();
      renderSubjectProgress();
    } else if (view === "sets") {
      renderSetsView();
    }
    renderSidebar();
    $(".content-scroll").scrollTop = 0;
    closeMobileMenu();
  }

  function closeMobileMenu() {
    $(".sidebar").classList.remove("open");
    $("#mobile-overlay").classList.remove("active");
  }

  // ── Render: Dashboard ──
  function greetingFor(hour) {
    if (hour < 5) return "Burning the midnight oil";
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  }

  // A subtopic to explain out loud: something already ticked if possible, else something from today
  function pickRecallItem() {
    const done = [];
    CURRICULUM_DATA.forEach(d => d.topics.forEach(t => t.subtopics.forEach(s => {
      if (state.checkedSubtopics[s.id]) done.push({ day: d, sub: s });
    })));
    if (done.length) return { ...done[Math.floor(Math.random() * done.length)], reviewed: true };
    const today = getDayData(getCurrentDay());
    const subs = today.topics.flatMap(t => t.subtopics);
    return { day: today, sub: subs[Math.floor(Math.random() * subs.length)], reviewed: false };
  }

  function activityCalendarHTML(weeks = 26) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - (weeks - 1) * 7 - ((today.getDay() + 6) % 7));   // Monday, `weeks` weeks ago
    const max = Math.max(1, ...Object.values(state.activity));
    let cells = "";
    const d = new Date(start);
    for (let n = 0; n < weeks * 7; n++, d.setDate(d.getDate() + 1)) {
      const count = state.activity[dateKey(d)] || 0;
      const level = count === 0 ? 0 : Math.min(4, Math.ceil((count / max) * 4));
      const isToday = d.getTime() === today.getTime();
      const label = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
      cells += `<span class="act-cell ${level ? "l" + level : ""} ${isToday ? "today" : ""} ${d > today ? "future" : ""}" title="${label}: ${count} item${count === 1 ? "" : "s"}"></span>`;
    }
    return `
      <div class="activity-wrap">
        <div class="activity-days"><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span><span>Sun</span></div>
        <div class="activity-grid">${cells}</div>
      </div>
    `;
  }

  function renderHomeView() {
    const container = $("#home-view");
    const now = new Date();
    const stats = getOverallStats();
    const streak = getStudyStreak();
    const lvl = getLevelInfo();
    const currentDay = getCurrentDay();
    const day = getDayData(currentDay);
    const info = getDayCompletionInfo(currentDay);
    const allDone = stats.completedDays === 60;
    const unique = getUniqueProblems();
    const solved = unique.filter(u => state.solvedProblems[u.problem[2]]).length;
    const [quote, author] = QUOTES[quoteIndex];
    const recall = pickRecallItem();
    const phases = getPhases();
    const currentPhase = phases.find(p => p.days.includes(currentDay));
    const achievements = getAchievements();
    // Show unlocked badges first, then the closest locked ones
    const badgeStrip = [...achievements].sort((a, b) =>
      (b.unlocked - a.unlocked) || (b.have / b.need - a.have / a.need)).slice(0, 10);
    const name = state.profileName.trim();
    const daysLeft = 60 - stats.completedDays;
    const todayCount = state.activity[dateKey()] || 0;

    const missionTopics = day.topics.map(t => {
      const checked = t.subtopics.filter(s => state.checkedSubtopics[s.id]).length;
      const color = CATEGORY_COLORS[t.category]?.text || "#888";
      return `
        <div class="mission-topic">
          <span class="category-dot" style="background:${color}"></span>
          <span class="mission-topic-name">${escapeHTML(t.name)}</span>
          <span class="mission-topic-count">${checked}/${t.subtopics.length}</span>
        </div>`;
    }).join("");

    const streakNote = streak.studiedToday
      ? `Nice — ${todayCount} item${todayCount === 1 ? "" : "s"} ticked today. Best streak: ${streak.best}.`
      : streak.current
        ? `Tick one item today to keep it alive. Best: ${streak.best}.`
        : `Tick anything today to start a streak.`;

    const categories = [
      { name: "Java", icon: "☕" }, { name: "Spring Boot", icon: "🌿" }, { name: "DSA", icon: "🧮" },
      { name: "System Design", icon: "🏗️" }, { name: "DB/DevOps", icon: "🗄️" }
    ];

    let i = 0;
    const r = () => `reveal" style="--i:${i++}`;

    container.innerHTML = `
      <div class="home-grid">
        <section class="card hero ${r()}">
          <div class="hero-date">${now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</div>
          <h2 class="hero-greeting">${greetingFor(now.getHours())},<br>
            <span class="hero-name" id="hero-name" title="Click to change your name">${name ? escapeHTML(name) : "future engineer"}</span> 👋</h2>
          <p class="hero-sub">${allDone
            ? `You finished all <strong>60 days</strong>. Keep revising and go get that offer. 🏆`
            : `You're on <strong>Day ${currentDay}</strong> of 60 — <strong>${stats.percentage}%</strong> of the whole plan done. ${currentPhase ? `This week: <strong>${escapeHTML(currentPhase.shortName)}</strong>.` : ""}`}</p>
          <div class="quote">
            <span class="quote-mark">“</span>
            <div>
              <div class="quote-text" id="quote-text">${escapeHTML(quote)}</div>
              <div class="quote-author" id="quote-author">— ${escapeHTML(author)}</div>
            </div>
            <button class="quote-shuffle" id="quote-shuffle" title="Another quote">${ICONS.shuffle}</button>
          </div>
          <div class="hero-countdown">
            <div class="countdown-item"><div class="num">${daysLeft}</div><div class="lbl">days to go</div></div>
            <div class="countdown-item"><div class="num">${stats.checkedSubs}</div><div class="lbl">subtopics mastered</div></div>
            <div class="countdown-item"><div class="num">${solved}</div><div class="lbl">problems solved</div></div>
          </div>
        </section>

        <section class="card mission ${r()}">
          <div class="mission-top">
            <div>
              <div class="mission-label"><span class="pulse-dot"></span>${allDone ? "Revision mode" : "Today's mission"}</div>
              <div class="mission-day">Day ${currentDay}<span> / 60</span></div>
            </div>
            <div class="ring" style="--p:${info.percentage}"><span class="ring-value">${info.percentage}%</span></div>
          </div>
          <div class="mission-title">${escapeHTML(day.title)}</div>
          <div class="mission-meta">${ICONS.clock} ${day.estimatedTime} ${categoryTagsHTML(day.categories)}</div>
          <div class="mission-topics">${missionTopics}</div>
          <div class="mission-actions">
            <button class="btn primary" id="mission-start">${info.checked ? "Continue" : "Start"} Day ${currentDay} ${ICONS.arrowRight}</button>
            <button class="btn" id="mission-notes">${ICONS.bookOpen} Study notes</button>
          </div>
        </section>

        <section class="card stat-tile ${r()}">
          <span class="stat-emoji">🔥</span>
          <div class="card-title">Study streak</div>
          <div class="stat-big">${streak.current}<small> day${streak.current === 1 ? "" : "s"}</small></div>
          <div class="stat-note">${streakNote}</div>
        </section>

        <section class="card stat-tile ${r()}">
          <span class="stat-emoji">⚡</span>
          <div class="card-title">Level ${lvl.level} · ${lvl.title}</div>
          <div class="stat-big">${lvl.xp.toLocaleString()}<small> XP</small></div>
          <div class="bar"><div class="bar-fill" style="width:${lvl.percentage}%"></div></div>
          <div class="stat-note">${(lvl.next - lvl.xp).toLocaleString()} XP to Level ${lvl.level + 1}<span class="hide-sm"> · subtopic +10, Easy +10, Medium +20, Hard +40</span></div>
        </section>

        <section class="card stat-tile ${r()}">
          <span class="stat-emoji">✅</span>
          <div class="card-title">Subtopics</div>
          <div class="stat-big">${stats.checkedSubs}<small> / ${stats.totalSubs}</small></div>
          <div class="bar"><div class="bar-fill" style="width:${stats.percentage}%"></div></div>
          <div class="stat-note">${stats.completedDays} of 60 days fully complete</div>
        </section>

        <section class="card stat-tile ${r()}">
          <span class="stat-emoji">🧩</span>
          <div class="card-title">LeetCode problems</div>
          <div class="stat-big">${solved}<small> / ${unique.length}</small></div>
          <div class="mini-pills difficulty-counts">${difficultyBreakdownHTML(unique.map(u => u.problem))}</div>
          <button class="link-btn" id="home-sets" style="align-self:flex-start">Open question sets →</button>
        </section>

        <section class="card activity-card ${r()}">
          <div class="card-head">
            <div class="card-title">📈 Your study activity</div>
            <div class="activity-summary"><strong>${streak.activeDays}</strong> active day${streak.activeDays === 1 ? "" : "s"} · best streak <strong>${streak.best}</strong></div>
          </div>
          ${activityCalendarHTML(innerWidth < 640 ? 15 : 26)}
          <div class="activity-legend">Less <span class="act-cell"></span><span class="act-cell l1"></span><span class="act-cell l2"></span><span class="act-cell l3"></span><span class="act-cell l4"></span> More</div>
        </section>

        <section class="card recall-card ${r()}">
          <div class="card-title">🧠 ${recall.reviewed ? "Quick recall" : "Sneak peek"}</div>
          <div class="recall-q">${recall.reviewed ? "Can you explain this out loud in 60 seconds?" : "Coming up today. What do you already know about it?"}</div>
          <div class="recall-topic" id="recall-topic">${escapeHTML(recall.sub.label)}</div>
          <div class="recall-day">Day ${recall.day.day} · ${escapeHTML(recall.day.title)}</div>
          <div class="recall-actions">
            <button class="btn small primary" id="recall-open" data-day="${recall.day.day}" data-id="${recall.sub.id}">${ICONS.bookOpen} Check the notes</button>
            <button class="btn small" id="recall-next">${ICONS.shuffle} Another</button>
          </div>
        </section>

        <section class="card journey-card ${r()}">
          <div class="card-head">
            <div class="card-title">🗺️ Your journey</div>
            <button class="link-btn" id="home-roadmap">Full roadmap →</button>
          </div>
          <div class="journey">
            ${phases.map(p => `
              <button class="phase ${p.started ? "started" : ""} ${p.doneDays === p.days.length ? "done" : ""} ${p === currentPhase && !allDone ? "current" : ""}" data-day="${p.days[0]}" title="${escapeHTML(p.name)}">
                <span class="phase-node">${p.doneDays === p.days.length ? "✓" : p.index}</span>
                <span class="phase-name">${escapeHTML(p.shortName)}</span>
                <span class="phase-range">${p.range}</span>
                <span class="bar"><span class="bar-fill" style="display:block;width:${p.percentage}%"></span></span>
              </button>`).join("")}
          </div>
        </section>

        <section class="card mastery-card ${r()}">
          <div class="card-title">🎓 Subject mastery</div>
          <div class="mastery">
            ${categories.map(c => {
              const s = getCategoryStats(c.name);
              const color = CATEGORY_COLORS[c.name]?.text || "#888";
              return `
                <div class="mastery-item">
                  <div class="ring" style="--p:${s.percentage};--c:${color}"><span class="ring-value">${c.icon}</span></div>
                  <div class="mastery-name">${c.name}</div>
                  <div class="mastery-count">${s.percentage}% · ${s.checked}/${s.total}</div>
                </div>`;
            }).join("")}
          </div>
        </section>

        <section class="card badges-card ${r()}">
          <div class="card-head">
            <div class="card-title">🏆 Badges ${achievements.filter(a => a.unlocked).length}/${achievements.length}</div>
            <button class="link-btn" id="home-badges">See all →</button>
          </div>
          <div class="badge-row">${badgeStrip.map(a => badgeHTML(a, false)).join("")}</div>
        </section>
      </div>
    `;

    // Interactions
    $("#mission-start").addEventListener("click", () => openDayDetail(currentDay));
    $("#mission-notes").addEventListener("click", () => openDayDetail(currentDay, "study"));
    $("#home-sets").addEventListener("click", () => openSet(null));
    $("#home-roadmap").addEventListener("click", () => switchView("grid"));
    $("#home-badges").addEventListener("click", () => switchView("backlog"));
    container.querySelectorAll(".phase").forEach(btn =>
      btn.addEventListener("click", () => openDayDetail(parseInt(btn.dataset.day))));

    $("#quote-shuffle").addEventListener("click", () => {
      quoteIndex = (quoteIndex + 1 + Math.floor(Math.random() * (QUOTES.length - 1))) % QUOTES.length;
      $("#quote-text").textContent = QUOTES[quoteIndex][0];
      $("#quote-author").textContent = `— ${QUOTES[quoteIndex][1]}`;
    });

    $("#recall-open").addEventListener("click", (e) => {
      state.pendingNoteScroll = e.currentTarget.dataset.id;
      openDayDetail(parseInt(e.currentTarget.dataset.day), "study");
    });
    $("#recall-next").addEventListener("click", () => {
      const next = pickRecallItem();
      $("#recall-topic").textContent = next.sub.label;
      container.querySelector(".recall-day").textContent = `Day ${next.day.day} · ${next.day.title}`;
      $("#recall-open").dataset.day = next.day.day;
      $("#recall-open").dataset.id = next.sub.id;
    });

    // Click the name to personalise the greeting
    $("#hero-name").addEventListener("click", (e) => {
      const span = e.currentTarget;
      const input = document.createElement("input");
      input.className = "hero-name-input";
      input.value = state.profileName;
      input.placeholder = "Your name";
      input.maxLength = 24;
      span.replaceWith(input);
      input.focus();
      const commit = () => {
        state.profileName = input.value.trim();
        saveState();
        renderHomeView();
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") input.blur();
        if (ev.key === "Escape") { input.value = state.profileName; input.blur(); }
      });
    });
  }

  // ── Export / Import ──
  function exportProgress() {
    const data = {
      version: 2,
      exportedAt: new Date().toISOString(),
      checkedSubtopics: state.checkedSubtopics,
      notes: state.notes,
      solvedProblems: state.solvedProblems,
      activity: state.activity,
      profileName: state.profileName
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sde-prep-progress-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Progress exported successfully!", "success");
  }

  function importProgress(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.checkedSubtopics) state.checkedSubtopics = data.checkedSubtopics;
        if (data.notes) state.notes = data.notes;
        if (data.solvedProblems) state.solvedProblems = data.solvedProblems;
        if (data.activity) state.activity = data.activity;
        if (typeof data.profileName === "string") state.profileName = data.profileName;
        state.seenAchievements = getAchievements().filter(a => a.unlocked).map(a => a.id);   // no confetti burst for imported badges
        saveState();
        renderAll();
        showToast("Progress imported successfully!", "success");
      } catch (err) {
        showToast("Invalid file format. Please use a valid export file.", "error");
      }
    };
    reader.readAsText(file);
  }

  function resetProgress() {
    state.checkedSubtopics = {};
    state.notes = {};
    state.solvedProblems = {};
    state.activity = {};
    state.seenAchievements = [];
    saveState();
    switchView("home");
    showToast("All progress has been reset.", "info");
  }

  // ── Theme ──
  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#080a12" : "#f3f4fb");
    const toggle = $("#theme-toggle");
    toggle.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
    saveState();
    // Diagrams are themed, so redraw open study notes
    if (state.currentView === "detail" && state.selectedDay && state.detailTab === "study") {
      const scroller = $(".content-scroll");
      const top = scroller.scrollTop;
      renderDayDetail(state.selectedDay);
      scroller.scrollTop = top;
    }
  }

  // ── Full Render ──
  function renderAll() {
    renderSidebar();
    if (state.currentView === "detail" && state.selectedDay) {
      renderDayDetail(state.selectedDay);
    } else if (state.currentView === "backlog") {
      renderBacklogView();
      renderSubjectProgress();
    } else if (state.currentView === "sets") {
      renderSetsView();
    } else if (state.currentView === "grid") {
      renderDaysGrid();
    } else {
      renderHomeView();
    }
  }

  // ── Init ──
  function init() {
    loadState();
    setTheme(state.theme);
    shufflePalette();   // a new colour mood on every visit

    // Badges earned before this feature existed shouldn't all pop at once
    if (state.seenAchievements === null) {
      state.seenAchievements = getAchievements().filter(a => a.unlocked).map(a => a.id);
      saveState();
    }

    // Theme toggle + palette shuffle
    $("#theme-toggle").addEventListener("click", () => {
      setTheme(state.theme === "dark" ? "light" : "dark");
    });
    $("#palette-shuffle").addEventListener("click", () => {
      const p = shufflePalette();
      showToast(`Palette: ${p.name}`, "info");
    });

    // Sidebar navigation
    $$(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        if (item.dataset.view === "sets") openSet(null);
        else switchView(item.dataset.view);
      });
    });

    // Reading progress + back-to-top for long pages
    const scroller = $(".content-scroll");
    const toTop = document.createElement("button");
    toTop.id = "to-top";
    toTop.className = "to-top";
    toTop.title = "Back to top";
    toTop.innerHTML = ICONS.arrowUp;
    toTop.addEventListener("click", () => scroller.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(toTop);
    scroller.addEventListener("scroll", () => {
      toTop.classList.toggle("visible", scroller.scrollTop > 900);
      const fill = $("#reading-progress-fill");
      if (fill) {
        const max = scroller.scrollHeight - scroller.clientHeight;
        fill.style.width = `${max > 0 ? Math.min(100, (scroller.scrollTop / max) * 100) : 0}%`;
      }
    }, { passive: true });

    // "/" focuses search, Escape clears it
    document.addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        $("#search-input").focus();
      } else if (e.key === "Escape" && document.activeElement === $("#search-input")) {
        $("#search-input").value = "";
        $("#search-input").dispatchEvent(new Event("input"));
        $("#search-input").blur();
      }
    });

    // Search
    let searchTimer;
    $("#search-input").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        if (state.currentView === "home" || state.currentView === "backlog") {
          if (state.searchQuery.trim()) switchView("grid");   // searching means browsing the roadmap
        }
        else if (state.currentView === "grid") renderDaysGrid();
        else if (state.currentView === "detail" && state.selectedDay) renderDayDetail(state.selectedDay);
        else if (state.currentView === "sets") {
          if (state.searchQuery.trim()) state.selectedSet = null;   // search runs across all sets
          renderSetsView();
        }
      }, 300);
    });

    // Status filters
    $$(".filter-btn[data-status]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.statusFilter = btn.dataset.status;
        if (state.currentView !== "grid") switchView("grid");
        else { renderDaysGrid(); renderSidebar(); }
      });
    });

    // Category filters
    $$(".filter-btn[data-category]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.categoryFilter = btn.dataset.category;
        if (state.currentView !== "grid") switchView("grid");
        else { renderDaysGrid(); renderSidebar(); }
      });
    });

    // Export
    $("#btn-export").addEventListener("click", exportProgress);

    // Import
    $("#btn-import").addEventListener("click", () => {
      $("#import-input").click();
    });
    $("#import-input").addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        importProgress(e.target.files[0]);
        e.target.value = "";
      }
    });

    // Reset
    $("#btn-reset").addEventListener("click", () => {
      const modal = $("#reset-modal");
      modal.classList.add("active");
    });
    $("#reset-cancel").addEventListener("click", () => {
      $("#reset-modal").classList.remove("active");
    });
    $("#reset-confirm").addEventListener("click", () => {
      $("#reset-modal").classList.remove("active");
      resetProgress();
    });
    // Close modal on overlay click
    $("#reset-modal").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.classList.remove("active");
      }
    });

    // Mobile menu
    const mobileMenuBtn = $("#mobile-menu-btn");
    const sidebar = $(".sidebar");
    const mobileOverlay = $("#mobile-overlay");

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        mobileOverlay.classList.toggle("active");
      });
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        mobileOverlay.classList.remove("active");
      });
    }

    // Initial render
    renderAll();
  }

  // Boot
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

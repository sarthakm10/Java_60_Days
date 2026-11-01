// ============================================================
// 60-Day SDE Interview Prep Tracker — Application Logic
// ============================================================

(function () {
  "use strict";

  // ── State ──
  let state = {
    checkedSubtopics: {},     // { subtopicId: true }
    notes: {},                // { dayN_covered: "text", dayN_missed: "text" }
    currentView: "grid",      // "grid" | "detail" | "backlog"
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
        document.getElementById(link.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    article.querySelectorAll(".notes-done-toggle .subtopic-checkbox").forEach(cb => {
      cb.addEventListener("change", () => {
        if (cb.checked) state.checkedSubtopics[cb.dataset.id] = true;
        else delete state.checkedSubtopics[cb.dataset.id];
        saveState();
        const scroller = $(".content-scroll");
        const top = scroller.scrollTop;
        renderDayDetail(dayNum);
        scroller.scrollTop = top;
        renderSidebar();
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

  function getStreak() {
    let streak = 0;
    for (let i = 1; i <= 60; i++) {
      if (isDayCompleted(i)) streak++;
      else break;
    }
    return streak;
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

  // ── Toast ──
  let toastTimer;
  function showToast(message, type = "success") {
    const toast = $("#toast");
    const iconMap = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`
    };
    toast.className = `toast ${type}`;
    toast.innerHTML = `${iconMap[type] || iconMap.info}<span>${message}</span>`;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3000);
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
    sparkles: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
  };

  // ── Render: Sidebar ──
  function renderSidebar() {
    const stats = getOverallStats();
    const streak = getStreak();
    const currentDay = getCurrentDay();
    const statusCounts = getStatusCounts();

    // Quick stats
    $("#stat-current-day").textContent = currentDay;
    $("#stat-streak").textContent = streak;
    $("#stat-days-done").textContent = `${stats.completedDays}/60`;
    $("#stat-subs-done").textContent = `${stats.checkedSubs}/${stats.totalSubs}`;
    $("#stat-percentage").textContent = `${stats.percentage}%`;
    $("#progress-fill").style.width = `${stats.percentage}%`;

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
      if (state.selectedDay === i) cell.classList.add("active");

      cell.addEventListener("click", () => openDayDetail(i));
      grid.appendChild(cell);
    }
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

    container.innerHTML = filteredDays.map(day => {
      const info = getDayCompletionInfo(day.day);
      const status = getDayStatus(day.day);
      const hasMissed = dayHasMissedNotes(day.day);

      const categoryTags = day.categories.map(cat => {
        const colors = CATEGORY_COLORS[cat] || { bg: "#333", text: "#999", border: "#666" };
        return `<span class="category-tag" style="background:${colors.bg};color:${colors.text};border:1px solid ${colors.border}">${cat}</span>`;
      }).join("");

      const statusIconHTML = status === "completed"
        ? `<div class="day-status-icon" style="background:var(--accent-green);border-color:var(--accent-green)">${ICONS.check}</div>`
        : status === "in-progress"
        ? `<div class="day-status-icon" style="background:var(--accent-yellow-bg);border-color:var(--accent-yellow);color:var(--accent-yellow)"><span style="font-size:8px;font-weight:700">${info.percentage}%</span></div>`
        : `<div class="day-status-icon"></div>`;

      const missedBadge = hasMissed
        ? `<div class="missed-badge">${ICONS.alertCircle} Missed Items</div>`
        : "";

      return `
        <div class="day-card ${status} ${hasMissed ? 'has-missed' : ''}" data-day="${day.day}">
          ${missedBadge}
          <div class="day-card-header">
            <span class="day-number">Day ${day.day} · ${day.phase.split(':')[0]}</span>
            ${statusIconHTML}
          </div>
          <div class="day-title">${day.title}</div>
          <div class="day-meta">
            <span class="day-time">${ICONS.clock} ${day.estimatedTime}</span>
            <div class="day-categories">${categoryTags}</div>
          </div>
          <div class="day-progress-row">
            <div class="day-progress-bar">
              <div class="day-progress-fill" style="width:${info.percentage}%"></div>
            </div>
            <span class="day-progress-text">${info.checked}/${info.total}</span>
          </div>
        </div>
      `;
    }).join("");

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

    const categoryTags = day.categories.map(cat => {
      const colors = CATEGORY_COLORS[cat] || { bg: "#333", text: "#999", border: "#666" };
      return `<span class="category-tag" style="background:${colors.bg};color:${colors.text};border:1px solid ${colors.border}">${cat}</span>`;
    }).join("");

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
            <label class="subtopic-label" data-id="${sub.id}">${sub.label}</label>
            ${noteIds.has(sub.id) ? `<button class="subtopic-notes-btn" data-id="${sub.id}" title="Read study notes for this subtopic">${ICONS.bookOpen}</button>` : ""}
          </div>
        `;
      }).join("");

      const topicColor = CATEGORY_COLORS[topic.category];
      return `
        <div class="topic-group">
          <div class="topic-group-header">
            <span class="category-dot" style="background:${topicColor?.text || '#888'}"></span>
            <span class="topic-group-name">${topic.name}</span>
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
          ${ICONS.clipboardList} Checklist &amp; My Notes
        </button>
        <button class="detail-tab ${state.detailTab === "study" ? "active" : ""}" data-tab="study">
          ${ICONS.bookOpen} Study Notes
          ${notes.status === "ready" ? `<span class="detail-tab-badge">${noteIds.size}</span>` : ""}
        </button>
      </div>
    `;

    const studyHTML = `
      <div class="study-notes">
        ${notes.status === "ready"
          ? `<nav class="study-toc" id="study-toc"></nav><article class="md-content" id="study-article">${notes.html}</article>`
          : studyNotesMessageHTML(dayNum)}
      </div>
    `;

    const checklistHTML = `
      <div class="checklist-panel">
        <div class="checklist-section-header">
          <span class="checklist-section-title">${ICONS.clipboardList} Subtopic Checklist</span>
          <span class="checklist-section-count">${info.checked}/${info.total} done</span>
        </div>
        ${topicGroupsHTML}
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
        ${ICONS.arrowLeft} Back to All Days
      </button>
      <div class="detail-header ${isComplete ? 'completed' : ''}">
        <div class="detail-day-label">Day ${dayNum} · ${day.phase} (${day.phaseRange})</div>
        <div class="detail-title">${day.title}</div>
        <div class="detail-meta">
          <div class="detail-info">${ICONS.clock} ${day.estimatedTime}</div>
          <div class="detail-info">${categoryTags}</div>
          <div class="detail-info">${ICONS.checkCircle} ${info.checked}/${info.total} subtopics</div>
          <button class="mark-complete-btn ${isComplete ? 'completed' : ''}" id="mark-complete-btn">
            ${isComplete ? ICONS.checkCircle + ' Completed!' : ICONS.checkCircle + ' Mark All Complete'}
          </button>
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
      showToast(allChecked ? "Day unmarked" : `Day ${dayNum} marked complete! 🎉`);
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

    // Checkbox events
    detail.querySelectorAll(".subtopic-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) {
          state.checkedSubtopics[id] = true;
        } else {
          delete state.checkedSubtopics[id];
        }
        saveState();
        renderDayDetail(dayNum);
        renderSidebar();
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
          <span class="backlog-content">${item.label}</span>
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
          <div class="backlog-note-day">Day ${item.day} — ${item.dayTitle}</div>
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
        <div class="subject-card">
          <div class="subject-card-header">
            <div class="subject-icon" style="background:${colors.bg};font-size:1.2rem">${cat.icon}</div>
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
  }

  // ── View switching ──
  function openDayDetail(dayNum) {
    state.selectedDay = dayNum;
    state.currentView = "detail";
    state.detailTab = "checklist";
    $("#days-grid").style.display = "none";
    $("#backlog-view").classList.remove("active");
    const detail = $("#day-detail");
    detail.classList.add("active");
    renderDayDetail(dayNum);
    renderSidebar();
    $(".content-scroll").scrollTop = 0;
  }

  function closeDayDetail() {
    state.selectedDay = null;
    state.currentView = "grid";
    $("#day-detail").classList.remove("active");
    $("#backlog-view").classList.remove("active");
    $("#days-grid").style.display = "grid";
    renderDaysGrid();
    renderSidebar();
  }

  function switchView(view) {
    state.currentView = view;
    $$(".view-tab").forEach(t => t.classList.toggle("active", t.dataset.view === view));

    if (view === "grid") {
      $("#days-grid").style.display = "grid";
      $("#day-detail").classList.remove("active");
      $("#backlog-view").classList.remove("active");
      renderDaysGrid();
    } else if (view === "backlog") {
      $("#days-grid").style.display = "none";
      $("#day-detail").classList.remove("active");
      $("#backlog-view").classList.add("active");
      renderBacklogView();
      renderSubjectProgress();
    }
    renderSidebar();
  }

  // ── Export / Import ──
  function exportProgress() {
    const data = {
      version: 2,
      exportedAt: new Date().toISOString(),
      checkedSubtopics: state.checkedSubtopics,
      notes: state.notes
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
    saveState();
    closeDayDetail();
    renderAll();
    showToast("All progress has been reset.", "info");
  }

  // ── Theme ──
  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
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
    } else {
      renderDaysGrid();
    }
  }

  // ── Init ──
  function init() {
    loadState();
    setTheme(state.theme);

    // Theme toggle
    $("#theme-toggle").addEventListener("click", () => {
      setTheme(state.theme === "dark" ? "light" : "dark");
    });

    // Search
    let searchTimer;
    $("#search-input").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        if (state.currentView === "grid") renderDaysGrid();
        else if (state.currentView === "detail" && state.selectedDay) renderDayDetail(state.selectedDay);
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

    // View tabs
    $$(".view-tab").forEach(tab => {
      tab.addEventListener("click", () => switchView(tab.dataset.view));
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

const courseNumber = new URLSearchParams(window.location.search).get("course") || "0";
if (!/^\d+$/.test(courseNumber)) window.location.replace("./index.html");
const cacheVersion = Date.now();
const { default: course } = await import(`./courses/${courseNumber}.js?version=${cacheVersion}`);
const lessons = course.curriculum.flatMap((week) => week.lessons);
const storageKey = `free-course-index:${course.uuid || course.courseId || course.title}:completed`;
const legacyStorageKey = `course-library:${course.courseId || course.title}:completed`;
const themeKey = "free-course-index:theme";

function getCompleted() {
  try {
    const savedProgress = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey) || "[]";
    const progress = new Set(JSON.parse(savedProgress));
    if (!localStorage.getItem(storageKey) && progress.size) localStorage.setItem(storageKey, JSON.stringify([...progress]));
    return progress;
  }
  catch { return new Set(); }
}

let completed = getCompleted();
const $ = (selector) => document.querySelector(selector);
const icon = (name) => document.getElementById(name).content.cloneNode(true);

function youtubeThumbnail(id) {
  // i.ytimg.com is YouTube's official thumbnail endpoint; it needs no API key.
  return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
}

function renderCourse() {
  document.title = `${course.title} — FreeCourseIndex`;
  $("#courseTitle").textContent = course.title;
  $("#courseDescription").textContent = course.description;
  const courseType = $("#courseType");
  courseType.textContent = course.contentType ? `${course.contentType} course` : "";
  courseType.parentElement.hidden = !course.contentType;

  const metadata = [course.duration, course.level, course.language].filter(Boolean);
  $("#courseMeta").replaceChildren(...metadata.map((text) => {
    const pill = document.createElement("span"); pill.className = "meta-pill"; pill.textContent = text; return pill;
  }));

  const facts = [["Institution", course.institute], ["Instructors", course.instructors?.join(", ")]];
  $("#courseFacts").replaceChildren(...facts.filter(([, value]) => value).map(([label, value]) => {
    const fact = document.createElement("div"); fact.className = "fact";
    fact.innerHTML = `<span>${label}</span><strong></strong>`; fact.querySelector("strong").textContent = value; return fact;
  }));

  const nav = $("#weekNav");
  nav.replaceChildren(...course.curriculum.map((week) => {
    const link = document.createElement("a"); link.href = `#week-${week.week}`;
    link.innerHTML = `<span>Week ${week.week}</span><em>${week.lessons.length} lectures</em>`; return link;
  }));
}

function checkIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.5"/></svg>';
}

function renderWeeks(filter = "") {
  const query = filter.trim().toLowerCase();
  const container = $("#weeks");
  const shownWeeks = course.curriculum.map((week) => ({
    ...week,
    lessons: week.lessons.filter((lesson) => lesson.title.toLowerCase().includes(query)),
  })).filter((week) => week.lessons.length);
  $("#emptyState").hidden = shownWeeks.length > 0;
  const activeWeekIndex = shownWeeks.findIndex((week) => week.lessons.some((lesson) => !completed.has(lesson.id)));
  const defaultWeekIndex = activeWeekIndex === -1 ? shownWeeks.length - 1 : activeWeekIndex;
  container.replaceChildren(...shownWeeks.map((week, index) => createWeek(week, Boolean(query) || index === defaultWeekIndex)));
}

function createWeek(week, shouldOpen) {
  const completeCount = week.lessons.filter((lesson) => completed.has(lesson.id)).length;
  const details = document.createElement("details"); details.className = "week"; details.id = `week-${week.week}`; details.dataset.week = week.week; details.open = shouldOpen;
  const summary = document.createElement("summary");
  summary.innerHTML = `<span class="week-number">WEEK ${String(week.week).padStart(2, "0")}</span><span class="week-title"></span><span class="week-progress"><span>${completeCount}/${week.lessons.length}</span><i class="chevron"></i></span>`;
  summary.querySelector(".week-title").textContent = week.title.replace(/^Week\s+\d+\s*/i, "");
  const list = document.createElement("div"); list.className = "lecture-list";
  list.replaceChildren(...week.lessons.map(createLecture));
  details.append(summary, list); return details;
}

function createLecture(lesson) {
  const isDone = completed.has(lesson.id);
  const row = document.createElement("article"); row.className = `lecture${isDone ? " is-complete" : ""}`; row.dataset.lessonId = lesson.id;
  const videoUrl = youtubeUrl(lesson);
  const videoHref = videoUrl.replace(/&/g, "&amp;");
  row.innerHTML = `
    <a class="thumbnail" href="${videoHref}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${lesson.title} on YouTube"><img src="${youtubeThumbnail(lesson.youtubeId)}" alt="" loading="lazy" /><span class="play"></span></a>
    <div class="lecture-info"><span class="lecture-index">LECTURE ${String(lesson.id).padStart(2, "0")}</span><a class="lecture-title" href="${videoHref}" target="_blank" rel="noopener noreferrer"></a></div>
    <button class="complete-toggle" type="button" aria-label="Mark ${lesson.title} as ${isDone ? "incomplete" : "complete"}" aria-pressed="${isDone}">${checkIcon()}</button>`;
  row.querySelector(".lecture-title").textContent = lesson.title;
  row.querySelector(".complete-toggle").addEventListener("click", () => toggleLesson(lesson.id));
  return row;
}

function youtubeUrl(lesson) {
  const url = new URL("https://www.youtube.com/watch");
  url.searchParams.set("v", lesson.youtubeId);
  const value = lesson.startTime ?? lesson.timestamp;
  const startTime = typeof value === "number" ? value : Number.NaN;
  if (Number.isFinite(startTime) && startTime >= 0) url.searchParams.set("t", String(Math.floor(startTime)));
  return url.toString();
}

function toggleLesson(id) {
  const wasCompleted = completed.has(id);
  wasCompleted ? completed.delete(id) : completed.add(id);
  persist();

  const row = document.querySelector(`[data-lesson-id="${id}"]`);
  row?.classList.toggle("is-complete", !wasCompleted);
  const button = row?.querySelector(".complete-toggle");
  if (button) {
    const lesson = lessons.find((item) => item.id === id);
    button.setAttribute("aria-pressed", String(!wasCompleted));
    button.setAttribute("aria-label", `Mark ${lesson.title} as ${wasCompleted ? "complete" : "incomplete"}`);
  }
  updateVisibleWeekProgress();

  const currentWeek = course.curriculum.find((week) => week.lessons.some((lesson) => lesson.id === id));
  if (!wasCompleted && currentWeek && currentWeek.lessons.every((lesson) => completed.has(lesson.id))) {
    document.getElementById(`week-${currentWeek.week}`)?.removeAttribute("open");
    const nextWeek = course.curriculum.find((week) => week.week > currentWeek.week && week.lessons.some((lesson) => !completed.has(lesson.id)));
    document.getElementById(`week-${nextWeek?.week}`)?.setAttribute("open", "");
  }
  updateProgress();
}

function persist() { localStorage.setItem(storageKey, JSON.stringify([...completed])); }

function updateVisibleWeekProgress() {
  document.querySelectorAll(".week").forEach((week) => {
    const lectureRows = week.querySelectorAll(".lecture");
    const completeCount = week.querySelectorAll(".lecture.is-complete").length;
    week.querySelector(".week-progress span").textContent = `${completeCount}/${lectureRows.length}`;
  });
}

function updateProgress() {
  const count = completed.size;
  const percent = lessons.length ? Math.round((count / lessons.length) * 100) : 0;
  $("#progressPercent").textContent = `${percent}%`;
  $("#progressText").textContent = `${count} of ${lessons.length} lectures complete`;
  $("#progressBar").style.width = `${percent}%`;
  $(".progress-track").setAttribute("aria-valuenow", String(percent));
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  const toggle = $("#themeToggle"); toggle.replaceChildren(icon(theme === "dark" ? "sunIcon" : "moonIcon"));
  toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
}

$("#searchInput").addEventListener("input", (event) => renderWeeks(event.target.value));
$("#resetProgress").addEventListener("click", () => {
  if (!completed.size || confirm("Reset all saved lecture progress for this course?")) { completed = new Set(); persist(); renderWeeks($("#searchInput").value); updateProgress(); }
});
$("#themeToggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

const preferredTheme = localStorage.getItem(themeKey) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(preferredTheme);
renderCourse();
renderWeeks();
updateProgress();

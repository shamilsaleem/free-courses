const themeKey = "free-course-index:theme";
const $ = (selector) => document.querySelector(selector);
const icon = (name) => document.getElementById(name).content.cloneNode(true);

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  const toggle = $("#themeToggle");
  toggle.replaceChildren(icon(theme === "dark" ? "sunIcon" : "moonIcon"));
  toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
}

function courseDetail(course) {
  return [course.instructors?.join(", "), course.institute].filter(Boolean).join(" · ") || course.duration || "";
}

function firstVideoId(course) {
  return course.curriculum?.flatMap((week) => week.lessons || []).find((lesson) => lesson.youtubeId)?.youtubeId;
}

function youtubeThumbnail(videoId) {
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}

async function renderCatalog() {
  const cacheVersion = Date.now();
  let courses = [];
  try {
    const manifest = await import(`./courses/index.js?version=${cacheVersion}`);
    courses = manifest.courses || [];
  } catch (err) {
    console.error("Failed to load course catalog manifest:", err);
  }

  const loadedCourses = await Promise.all(courses.map(async (entry) => {
    try {
      const module = await import(`./courses/${entry.file}?version=${cacheVersion}`);
      return { entry, course: module.default };
    } catch (err) {
      console.error(`Failed to load course ${entry.id} (${entry.file}):`, err);
      return null;
    }
  }));
  const validCourses = loadedCourses.filter(Boolean);
  $("#courseCount").textContent = `${validCourses.length} ${validCourses.length === 1 ? "course" : "courses"}`;
  $("#emptyCatalog").hidden = validCourses.length > 0;
  const grid = $("#courseGrid");
  grid.replaceChildren(...validCourses.map(({ entry, course }, position) => {
    const link = document.createElement("a"); link.className = "course-card"; link.href = `./course.html?course=${encodeURIComponent(entry.id)}`;
    const detail = courseDetail(course);
    link.innerHTML = `<div class="course-card-top"><span class="course-card-index">COURSE ${String(position + 1).padStart(2, "0")}</span><h2></h2></div><div class="course-card-bottom"><span class="course-card-detail"></span><span class="course-card-arrow" aria-hidden="true">↗</span></div>`;
    const videoId = firstVideoId(course);
    if (videoId) {
      const image = document.createElement("img");
      image.className = "course-card-image";
      image.src = youtubeThumbnail(videoId);
      image.alt = "";
      image.loading = "lazy";
      link.prepend(image);
    }
    link.querySelector("h2").textContent = course.title || "Untitled course";
    link.querySelector(".course-card-detail").textContent = detail;
    return link;
  }));
}

$("#themeToggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
setTheme(localStorage.getItem(themeKey) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
renderCatalog();

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    renderCatalog();
  }
});

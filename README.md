# FreeCourseIndex

A modern, responsive index for freely available public YouTube course videos. It provides a distraction-free course view, remembers completed lectures on the current device, and supports light and dark themes.

> Course content remains the property of its respective owners. FreeCourseIndex is only a public index for publicly available YouTube videos.

## Features

- Responsive black-and-white course catalog and learning interface
- Light and dark modes, with the chosen theme saved locally
- Searchable, collapsible weekly course curriculum
- Official YouTube thumbnails based on each course's first available lecture
- Per-lecture completion tracking and course-progress display
- Progress stored in `localStorage`, separately for every course
- Course progress keyed by a stable UUID, so renaming a course file does not reset it

## Run locally

From the project directory, start a static server:

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000` in a browser.

## Add a course

1. Create a numbered JavaScript module in `courses/`, for example `courses/1.js`.
2. Export a course object in the same format as `courses/0.js`.
3. Give the course a unique, permanent `uuid` value.
4. Register it in `courses/index.js`:

```js
export const courses = [
  { id: "0", file: "0.js" },
  { id: "1", file: "1.js" },
];
```

The catalog automatically uses available title, instructor, institution, and first-video data. Missing optional details are simply not shown.

### Optional video start time

To link a lecture to a particular point in its YouTube video, add `startTime` as a number of seconds. The site will automatically append YouTube's `t` parameter to the lecture links. `timestamp` is also accepted as an alias.

```js
{
  id: 1,
  title: "Introduction",
  youtubeId: "DtH4p331VhU",
  startTime: 90, // Opens the video at 1 minute 30 seconds
}
```

## Project structure

```text
.
├── index.html          # Course catalog
├── course.html         # Individual course learning page
├── catalog.js          # Catalog rendering and theme handling
├── app.js              # Course rendering and progress tracking
├── styles.css          # Shared application styles
├── catalog.css         # Catalog-specific styles
└── courses/
    ├── index.js        # Course catalog manifest
    └── 0.js            # Course data module
```

## Built with Codex

This project was made with Codex.

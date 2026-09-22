#!/usr/bin/env python3

import json
import uuid
import subprocess
import sys
from pathlib import Path


def get_playlist_info(url):
    result = subprocess.run(
        [
            "yt-dlp",
            "--flat-playlist",
            "--dump-single-json",
            url,
        ],
        capture_output=True,
        text=True,
        check=True,
    )

    return json.loads(result.stdout)


def format_duration(seconds):
    if not seconds:
        return ""

    hours = seconds // 3600
    minutes = (seconds % 3600) // 60

    parts = []
    if hours:
        parts.append(f"{hours} hours")
    if minutes:
        parts.append(f"{minutes} minutes")

    return " ".join(parts)


def generate_course_data(playlist):
    lessons = []

    total_duration = 0

    for idx, entry in enumerate(playlist.get("entries", []), start=1):
        duration = entry.get("duration")
        if duration:
            total_duration += duration

        lessons.append(
            {
                "id": idx,
                "title": entry["title"],
                "youtubeId": entry["id"],
            }
        )

    course_data = {
        "uuid": str(uuid.uuid4()),
        "title": playlist.get("title", "YouTube Playlist"),
        "contentType": "Video",
        "duration": format_duration(total_duration),
        "description": playlist.get("description") or "",
        "curriculum": [
            {
                "week": 1,
                "title": "Week 1",
                "lessons": lessons,
            }
        ],
    }

    return course_data


def write_js(course_data, output_file):
    js = "const courseData = "
    js += json.dumps(course_data, indent=2, ensure_ascii=False)
    js += ";\n\nexport default courseData;\n"

    Path(output_file).write_text(js, encoding="utf-8")


def main():
    if len(sys.argv) < 2:
        print("Usage: python playlist_to_js.py <playlist_url> [output.js]")
        sys.exit(1)

    playlist_url = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "courseData.js"

    playlist = get_playlist_info(playlist_url)
    course_data = generate_course_data(playlist)

    write_js(course_data, output_file)

    print(f"Saved to {output_file}")
    print(f"UUID: {course_data['uuid']}")
    print(f"Videos: {len(course_data['curriculum'][0]['lessons'])}")


if __name__ == "__main__":
    main()
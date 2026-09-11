# AGENTS.md

## Project

This is the website for the music album «НАРУЖУ» by «Чувство Края».

Project directory:

/Users/remiz/Documents/НАРУЖУ САЙТ

The project is a static, autonomous website intended to be opened locally first and published later.

---

## Critical rules

### Protect the existing website

The existing website is considered working unless explicitly stated otherwise.

Do NOT:
- redesign existing sections without explicit instruction;
- rewrite working components;
- refactor unrelated code;
- remove existing functionality;
- change the player unless explicitly requested;
- change the tracklist unless explicitly requested;
- change song texts unless explicitly requested;
- change album descriptions unless explicitly requested;
- change the hero section unless explicitly requested;
- change existing typography unless explicitly requested;
- change existing layout unless explicitly requested.

When a task concerns one specific section, modify only that section.

### Never overwrite files accidentally

Before modifying an existing file:
1. Read the current file.
2. Understand its structure.
3. Make the smallest possible change.
4. Verify the result afterwards.

NEVER replace an entire existing file when only a small change is required.

NEVER use commands such as `cat > file` or other destructive redirection to modify an existing project file.

Prefer precise edits.

---

## CSS safety

`styles.css` is an important existing project file.

NEVER overwrite `styles.css`.

NEVER recreate `styles.css` from memory.

When adding styles:
- preserve all existing CSS;
- make minimal additions;
- verify the file size and content after editing.

If a task can be implemented with page-local styles without modifying `styles.css`, prefer page-local styles.

---

## File paths

The project directory contains Cyrillic characters.

Always use the exact project path:

/Users/remiz/Documents/НАРУЖУ САЙТ

Be careful with Unicode characters in paths.

Before reporting that files are missing, verify the actual directory with:

pwd
ls -lah

Do not infer missing files from an incorrect path.

---

## Existing important files

Main website:
- index.html
- styles.css
- app.js
- data.js
- waveforms.js

Images:
- Cover.png
- челик.png

Content:
- Тексты/
- Треки/
- Наружу_описания_треков.txt

---

## Design language

The website should remain:
- dark;
- minimalist;
- modern;
- musical;
- restrained;
- authorial;
- typography-driven;
- without unnecessary decoration.

Avoid:
- generic landing-page design;
- excessive rounded cards;
- gradients;
- neon colors;
- unnecessary animations;
- excessive shadows;
- external UI libraries;
- unnecessary dependencies.

New pages must look like they belong to the existing «НАРУЖУ» website.

---

## External dependencies

The project should remain autonomous.

Do NOT add:
- external CSS frameworks;
- external JavaScript libraries;
- Google Fonts;
- CDN dependencies;

unless explicitly requested.

Prefer existing project resources and system fonts.

---

## Download page

The album download page is:

download.html

It should use GitHub Releases only as external file storage.

Current download files:

WAV:
https://github.com/Cabin303/naruzhu-downloads/releases/latest/download/NARUZHU_WAV.zip

FLAC:
https://github.com/Cabin303/naruzhu-downloads/releases/latest/download/NARUZHU_FLAC.zip

MP3:
https://github.com/Cabin303/naruzhu-downloads/releases/latest/download/NARUZHU_MP3.zip

Do not move these files into the website.

Do not implement a backend download system.

Do not use JavaScript for downloading files when a normal HTML link is sufficient.

---

## Git

This project uses Git.

Before substantial modifications:

git status

After modifications:

git status
git diff

Do NOT automatically commit changes unless explicitly instructed.

Never discard existing changes without explicit permission.

Never use destructive Git commands such as:

git reset --hard
git checkout -- .
git clean -fd

unless explicitly instructed.

---

## Verification

After every modification:

1. Verify that the intended file exists.
2. Verify that unrelated files were not modified.
3. Check `git diff`.
4. Check that the existing website still works.
5. If possible, open the affected page locally.

For a page-specific task, verify the page independently before touching other parts of the project.

---

## Reporting

When finished, provide a concise report:

- files changed;
- files created;
- what was changed;
- verification performed;
- any problems encountered.

Do not claim that something was created, changed, restored, or verified unless it was actually checked.

If something fails, report the failure instead of guessing.

---

## Working principle

Make the smallest change that solves the requested task.

Do not improve unrelated things.

Do not invent missing content.

Do not reconstruct lost code from memory when a real copy may exist.

When uncertain, stop and inspect the actual files before making changes.

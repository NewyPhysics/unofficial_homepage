# Editing guide

## Add an academic

Create `_people/surname-firstname.md` using `_people/example-academic.md` as a template. Delete the `published: false` line in your copy, or the profile won't appear. Put the photo path in `photo:`, and the surname in `sort_name:` so the People grid stays in alphabetical order.

## Add HDR or Honours students

Add an entry to `_data/hdr_students.yml` or `_data/honours_students.yml`, following the commented example at the top of each file.

## Add a research area

Create `_research/short-name.md`.

## Add a third-year project

Create `_projects/third-year/project-name.md`.

## Add a news item

Create `_news/YYYY-MM-DD-title.md`.

## Images

Put profile and research images under `assets/img/`. Keep filenames simple and use web-sized images.

## Recommended workflow

For routine content, edit the Markdown files directly on GitHub. For changes to layout, CSS or navigation, use a pull request so another maintainer can check the site before publication.

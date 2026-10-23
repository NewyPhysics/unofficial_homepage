# Editing guide

## Add an academic

Create `_people/surname-firstname.md` using `_people/example-academic.md` as a template. Delete the `published: false` line in your copy, or the profile won't appear. Put the photo path in `photo:`, and the surname in `sort_name:` so the People grid stays in alphabetical order.

## Add postdocs, research students and alumni

Add an entry to `_data/team.yml`, following the instructions at the top of the file. Set `role` to `postdoc`, `phd` or `honours`, and `status` to `current` or `past` (alumni).

## Add a research area

Create `_research/short-name.md`.

## Add an undergraduate research project

Add it to `_data/research_projects.yml` under the supervisor, following the existing entries. The list appears on the Undergraduate research projects page.

## Add a news item

Create `_news/YYYY-MM-DD-title.md`.

## Images

Put profile and research images under `assets/img/` and set `photo: "/assets/img/your-file.jpg"`. A full web address (`https://...`) also works, but a copy in the repo won't break if the other site moves it. Keep filenames simple and use web-sized images.

## Recommended workflow

For routine content, edit the Markdown files directly on GitHub. For changes to layout, CSS or navigation, use a pull request so another maintainer can check the site before publication.

## Update the undergraduate program planner

Edit `_data/program_planner.yml`. Each year has two semesters, and each course has a `code` and a `type` (`core`, `major`, `directed` or `elective`). Leave out the `code` for an empty elective box that students can type into. Change `handbook_year` each year so the course links point to the right Handbook.

# Physics at the University of Newcastle — unofficial website

**This is an unofficial, community-maintained website. It is not an official University of Newcastle website and is not endorsed by, operated by, or speaking on behalf of the University.**

This repository is designed as a shared departmental/community site using the visual language of the BootstrapMade **Squadfree** template.

## Structure

- `_people/` — academic and teaching staff profiles
- `_students/hdr/` — HDR/PhD and research masters profiles
- `_students/honours/` — Honours students and projects
- `_projects/third-year/` — third-year project opportunities
- `_research/` — research areas/groups
- `_teaching/` — teaching information
- `_news/` — news and announcements
- `pages/` — additional standalone pages
- `assets/` — CSS, JavaScript, images and the Squadfree template assets
- `_includes/` — reusable navigation, footer and notices
- `_layouts/` — page templates
- `data/` — optional structured data for future automation

## Editing

Most people should only need to edit a Markdown file in `_people`, `_research`, `_teaching`, `_students`, or `_projects`.

1. Open the relevant file on GitHub.
2. Click the pencil/edit button.
3. Change the text.
4. Commit the change.
5. GitHub Pages rebuilds the site.

For a departmental setup, give academics **Write** access to the repository, while keeping repository administration restricted to one or two maintainers.

## Squadfree assets

The free Squadfree licence permits use in personal projects subject to its terms. The current BootstrapMade licence requires the footer credit to remain for the free version. Replace the contents of `assets/vendor/`, `assets/css/`, and `assets/js/` with the corresponding files from your legitimately downloaded Squadfree package, while retaining the required credit.

Template:
https://bootstrapmade.com/squadfree-free-bootstrap-template-creative/

Licence:
https://bootstrapmade.com/license/

## Important distinction from the University

Use wording such as:

> This is an unofficial, community-maintained website for physics researchers, teachers and students associated with the University of Newcastle. It is not an official University of Newcastle website and is not endorsed by or operated by the University.

Do not use the University's official logo or imply institutional endorsement unless you have permission.

## Suggested GitHub Pages setup

Repository:
`uon-physics/unofficial-physics`

Then enable:
**Settings → Pages → Deploy from a branch → main → /(root)**

Because this scaffold uses Jekyll collections, GitHub Pages will build the collections into the corresponding pages.


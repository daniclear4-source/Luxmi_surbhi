# Laxmi Surbhi NGO Website — Run Doc

## How to Reproduce Artifacts
No build step and no dependencies. This is a static HTML/CSS/JS site served by a small
Node.js server that ships in the repository (`server.js`). `package.json` has no
`dependencies`, so nothing needs installing — a fresh checkout runs as-is.

Only requirement: Node.js (any recent LTS) available on `PATH`.

## How to Run the Server
```bash
node server.js            # serves on http://localhost:3000
PORT=3000 node server.js  # explicit port (defaults to 3000)
```


Start it detached so it outlives the session (Windows / PowerShell):
```powershell
(Start-Process -FilePath 'node.exe' -ArgumentList 'server.js' `
  -WorkingDirectory '<repo root>' `
  -RedirectStandardOutput '<repo root>\.freebuff\preview-<id>.log' `
  -RedirectStandardError  '<repo root>\.freebuff\preview-<id>.log.err' `
  -WindowStyle Hidden -PassThru).Id
```
stdout and stderr must go to different files. Confirm the pid is alive with
`Get-Process -Id <pid>` before registering a preview.

## Site Map
- `index.html` — Home: hero → about → 8 focus areas → mission → how we work → impact → featured projects → stories → get involved → donate → contact → footer
- `about.html` — organisation story, vision, official mission, 8 areas, 8 ethical principles, team philosophy
- `our-work.html` — eight dedicated area sections (`#senior-citizen-care`, `#education`, `#women-empowerment`, `#health-wellness`, `#skill-development`, `#youth-development`, `#environment`, `#community-awareness`) + programme model
- `projects.html` — projects & campaigns filtered by area (`#projects`, `#campaigns`)
- `impact.html` — verified foundations + per-area impact grid + 8 transparency pillars + commitments
- `gallery.html` — photo gallery filtered by area, with lightbox
- `news.html` — news & stories filtered by area
- `get-involved.html` — four pathways (`#volunteer`, `#partner`), volunteer form, code of conduct, partnership form
- `donate.html` — where support goes, transparency policy, donation enquiry form
- `contact.html` — official contact details and enquiry form

## Files
- `server.js` — Node.js static file server with MIME types, `no-cache`, traversal protection and a 404 page
- `css/main.css` — design tokens (deep green / gold / white palette), typography, accessibility modes, utilities
- `css/components.css` — all components, including the multi-area components in section 15 (area cards, mission band, filter bar, area sections, impact cards)
- `js/main.js` — accessibility controls, mobile drawer, tabs, **generic filter system** (`[data-filter-group]` + `[data-category]` + `[data-filter]` buttons + optional `[data-empty-for]` empty states), gallery lightbox
- `js/forms.js` — form handlers (client validation, `mailto:` routing to laxmisurbhi7@gmail.com)
- `images/` — all imagery stored locally (`area-*.jpg` for the focus areas, `hero-mosaic-*.jpg` for the hero, `card-*.jpg` and `img-*.jpg` for existing content)

## Content Accuracy Rules
This project publishes verified information only. Do not add invented projects,
statistics, team members, awards, partnerships, testimonials or beneficiary stories.

Facts currently published (all from the organisation's own material):
- Name: Laxmi Surbhi NGO; Established: 2007; Registration No.: 690
- Locations: Chakradharpur and Jamshedpur, Jharkhand
- Helplines: 7004852450, 9110040074, 9608888690; Email: laxmisurbhi7@gmail.com
- Mission: "To serve, empower and uplift individuals through compassion, support and opportunities for a just, inclusive and progressive society."
- Eight areas of work with their official taglines
- Senior Citizen Care: seven tracks of support and the "A Second Family for Every Senior" thought
- Projects/stories currently listed: the six senior-care initiatives and campaigns on `projects.html`, and the three published stories on `news.html`

Still awaiting verification / content (kept as clearly marked placeholders):
- Objective, activities and impact details for Education, Women Empowerment, Health & Wellness,
  Skill Development, Youth Development, Environment and Community Awareness (on `our-work.html`)
- Per-area impact figures (on `impact.html`)
- Additional projects, campaigns and stories outside Senior Citizen Care
- Whether the locations, helplines and email above should stay published as-is

# Study Confidence Companion

A static study app to support confidence building for Python first, then HTML, CSS, and JavaScript.

## What it does

- Shows one learning track at a time on the homepage.
- Uses lesson-by-lesson verification with a separate test page before marking a lesson done.
- Includes mission pages with quizzes, code tasks, hints, rewards, and progression.
- Awards `$50` for each completed track.
- Stores progress, rewards, and lesson verification in browser `localStorage`.

## Do You Need A Database?

No.

This app is currently fully static and uses browser `localStorage` for:

- lesson progress
- test pass status
- wallet and track rewards
- quiz stats
- study sessions
- reflections

That means:

- no backend is required
- no database is required
- you can deploy it directly as a static website

If you later want accounts, sync across devices, or shared progress between users, then you would add a backend and a database.

## Project Structure

- `index.html` - homepage and tracker
- `challenge.html` - mission hub
- `level.html` - level gameplay page
- `lesson-test.html` - lesson verification test page
- `app.js`, `challenge.js`, `level.js`, `lesson-test.js` - page logic
- `game-data.js` - shared mission data

## Ready To Deploy

This folder is already set up correctly for static hosting. You do not need to move files into another folder.

Added deployment files:

- `netlify.toml` for Netlify
- `vercel.json` for Vercel
- `package.json` for project metadata
- `.gitignore`

## Deploy Options

### Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Keep the project root as the current folder.
4. Deploy with no build command.

### Netlify

1. Push this folder to GitHub.
2. Import the repository in Netlify.
3. Publish directory: `.`
4. Build command: leave empty.

### GitHub Pages

1. Push this folder to a repository.
2. Enable GitHub Pages from the repository settings.
3. Serve from the main branch root.

## Local Run

You can still run it locally by simply opening `index.html` in a browser.

## Notes

- Data stays local to the browser/device unless you later add a backend.
- This is a static frontend app, not a database-backed app.
- If you host it publicly, each browser keeps its own separate local progress.

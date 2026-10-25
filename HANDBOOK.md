# Improv Soundboard – handbook

James's own iPad soundboard for improv shows, built with Claude to replace a €200 paid soundboard app. This file is the reference for any new chat: what exists, where it lives, how it works, and how to change it.

Last updated: 25 October 2026.

## Where everything lives

| What | Where |
| --- | --- |
| **Live app (use this on stage)** | https://jamesaharper1987-max.github.io/improv-soundboard/ |
| Code and sounds (source of truth) | GitHub repo `jamesaharper1987-max/improv-soundboard`, branch `main`, public |
| Hosting | GitHub Pages, deploy from branch `main`, folder `/ (root)`. Free. |
| Original sound files | Mac, iCloud Drive: `Filter Productions/Misc projects/Improv/Improv Sound Effects/` (MP3s at the top level, WAV originals in `Sound effects Files/`) |
| Local copy of the repo used for pushing | `Improv Sound Effects/improv-soundboard/` on the Mac (can be deleted; it can be re-cloned from GitHub) |
| Spec document | Claude doc "Improv Soundboard – App Spec": https://claude.ai/code/artifact/8ea8f3d4-5fdf-401c-9045-9e0ad45ee60d |
| Old test version (superseded, not maintained) | Claude artifact https://claude.ai/artifact/2XG4diYA81CrZVqYZZeJUN. Needs Claude login and internet; keep using the GitHub version instead. **Do not edit this one** — always change the GitHub repo. |

## How James uses it on the iPad

1. Open the live link in Safari once, wait for "50 sounds on the board", then Share → Add to Home Screen.
2. Always open it from the home-screen icon. That app keeps its own storage, separate from Safari, so it downloads the sounds once on its first launch.
3. Tap **GO** before the show. It loads the short sounds into memory and keeps the screen awake.
4. After the first load it works with no internet.
5. **Edit board** (top right) changes names, pictures, volume, looping and order, and adds or deletes sounds. **Back up board** saves a small backup file.

## What the app does (current features)

- A grid of tiles, one per sound, each with a drawn picture and a name. Tiles are grouped into seven colour-coded sections: Weather & water, Nature & night, City & travel, Places, Home & office, Bells & alarms, Stings & hits. Sounds added on the iPad go under "Added sounds".
- Tap a tile to play, tap again to stop (short fade so it doesn't click).
- **Fade out (per sound)**: while a sound plays, a **Fade out** button sits in the top-right corner of its tile. Tapping it fades only that sound away over **6 seconds**; everything else keeps playing. While fading, the tile pulses and the button reads "Fading…". Tapping the tile during a fade starts the sound fresh; Stop all cuts a fading sound at once.
- **Stop all** fades everything out over 1.5 seconds. The top bar with Stop all stays pinned at the top of the screen however far down the board is scrolled.
- Each tile has its own volume slider, which works while the sound plays and is remembered.
- Any number of sounds can play at once (layering).
- **Loop with crossfade**: a looped sound starts a fresh copy 10 seconds before the end and crossfades the two, so clips that start with silence and build up (the vacuum cleaner) still sound continuous. Clips shorter than about 22 seconds get a shorter crossfade.
- **Keyboard voices lookup**: the **Keyboard** button (top bar, left of Edit board) opens a side panel listing all 820 voices of James's Yamaha PSR-EW425. Type a word ("whistle", "door", "siren") or a number and it shows the voice number to dial on the keyboard, its group and how far into the group it sits. Filters: All, Sound effects (the 60 or so noise and effect voices), ★ Starred (tap ☆ on any voice to keep it there; stored on that iPad only), and one per voice group. Drum-kit keys can be listed too: "whistle" also shows the samba whistles in Standard Kit 1 (voice 296, keys B4 and C5). The panel sits beside the board, so tiles and Stop all keep working while it is open. It only looks numbers up; it does not change the keyboard's voice.
- Works offline once installed, through a service worker.
- Pictures, names, loops and volumes can all be changed in Edit board.

## Decisions made so far

- Platform: a web app on the iPad home screen, hosted free on GitHub Pages. No App Store, no yearly fee.
- **Related sounds removed (25 Oct 2026)**: the strip of related sounds covered about a third of the screen and James found it unnecessary. The strip and its Edit board section are gone. The `links` field is still in `board.json` and stored records, but the app ignores it.
- **Fade out is per sound, not "fade all"** (James chose this). Fixed length 6 seconds (`FADE_SECS` in `index.html`), with a curve that drops gently rather than a straight ramp.
- Defaults for the spec's open questions: tap-to-stop uses a short fade; Stop all fades over 1.5 s; crossfade is fixed at 10 s for all loops.
- The six built-in example sounds were removed and replaced with James's 50 sounds.
- Tile pictures are simple drawn icons in one consistent style, not photos from the web.
- `Selection.mp3` was left out because it looked like a duplicate export of `Cicada.mp3`.
- `Car purr.mp3` is shown as **Cat purr** (its original file was a cat purring). `Incadescent light` was corrected to **Incandescent light**. Long names were shortened (e.g. "Busy nightclub" became "Nightclub").
- **Keyboard lookup is read-only (25 Oct 2026)**: James wanted to type a sound name and find the Yamaha voice. Safari on iPad has no Web MIDI, so the web app cannot switch the keyboard's voice; it shows the number to dial instead (the "poor man's version"). Switching the voice automatically over USB needs a native iPad app (Xcode, Apple developer account). The voice list file is kept so that app can reuse it.
- Ambiences loop, short clips play once, Microwave/Printer/Security alarm/Cat purr loop. Starting volume: 60 for loops, 85 for one-shots.

## The 50 sounds

Category, whether it loops, and length.

| Sound | Section | Plays | Length |
| --- | --- | --- | --- |
| Rain | weather | loop | 160 s |
| Close thunder | weather | once | 15 s |
| Distant thunder | weather | once | 16 s |
| Dripping water | weather | loop | 15 s |
| River with frogs | weather | loop | 34 s |
| Shower | weather | loop | 239 s |
| Sprinkler | weather | loop | 167 s |
| Night crickets | nature | loop | 29 s |
| Dogs at night | nature | loop | 146 s |
| Fire crackling | nature | loop | 44 s |
| Cicada | nature | loop | 131 s |
| Bees | nature | loop | 42 s |
| Farm ambience | nature | loop | 261 s |
| Lawn mower | nature | loop | 202 s |
| City street | city | loop | 269 s |
| Traffic | city | loop | 167 s |
| Car passing by | city | once | 7 s |
| Car crash | city | once | 28 s |
| Police siren | city | once | 11 s |
| Jackhammer | city | once | 8 s |
| Subway | city | loop | 164 s |
| Distant train | city | loop | 117 s |
| Airport chime | city | once | 5 s |
| Busy restaurant | places | loop | 147 s |
| Kitchen cooking | places | loop | 106 s |
| Cooking pasta | places | loop | 44 s |
| Nightclub | places | loop | 240 s |
| Bowling alley | places | loop | 225 s |
| Prison | places | loop | 241 s |
| Cell door | places | once | 5 s |
| Vacuum cleaner | home | loop | 25 s |
| Fan | home | loop | 220 s |
| Fridge / air con | home | loop | 178 s |
| Microwave | home | loop | 173 s |
| Printer | home | loop | 75 s |
| Mouse clicks | home | loop | 27 s |
| Fluorescent light | home | loop | 124 s |
| Incandescent light | home | loop | 178 s |
| Electricity | home | loop | 61 s |
| Drill next door | home | once | 5 s |
| Cat meow | home | once | 1 s |
| Cat purr | home | loop | 10 s |
| Doorbell | bells | once | 3 s |
| Shop bell | bells | once | 7 s |
| Security alarm | bells | loop | 10 s |
| Horror chill | stings | once | 5 s |
| Metal chill | stings | once | 2 s |
| Dropped metal | stings | once | 2 s |
| Cocking gun | stings | once | 2 s |
| Sad trombone | stings | once | 5 s |

## How changes get made (workflow for new chats)

Claude cannot push to GitHub from a chat, because James's GitHub account is not linked to Claude. The working pattern is:

1. **Claude gets the current code.** The repo is public, so Claude can clone `https://github.com/jamesaharper1987-max/improv-soundboard` in its workspace. Alternatively the Mac can be linked to the chat and the folder `Improv Sound Effects` connected.
2. **Claude makes the change** to the files (see "Repo layout" below) and tests it in a headless browser.
3. **Claude writes the updated files into a folder on James's Mac** (through the linked computer), normally `Improv Sound Effects/improv-soundboard/`. If that folder was deleted, Claude recreates it by cloning the repo there. If Claude can't get access to the folder, it sends the changed files in the chat and James drops them into that folder (replacing the old ones) before pushing.
4. **James pushes from Terminal on the Mac:**
   ```
   cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Filter\ Productions/Misc\ projects/Improv/Improv\ Sound\ Effects/improv-soundboard
   git add -A && git commit -m "Describe the change" && git push
   ```
   Username `jamesaharper1987-max`; the password is a GitHub fine-grained personal access token (Settings → Developer settings → Personal access tokens → Fine-grained tokens, repository `improv-soundboard`, Contents: Read and write). The Mac keychain normally remembers it. Never paste the token into a chat.
5. GitHub Pages redeploys automatically in about a minute.

### Important: how updates reach the iPad

- **New sounds** added to `board/board.json` (new `id`) are downloaded automatically the next time the app opens online.
- **Changed settings for an existing sound** in `board.json` (name, loop, volume, picture) do **not** overwrite what is already on the iPad, so James's own edits are never lost. For an existing sound, change it in Edit board on the iPad, or delete the tile and reload the app online so the new version is re-added. (A "sync from GitHub" button could be built if this becomes annoying.)
- **A deleted sound** stays deleted on that iPad even if it is still in `board.json`.
- **App code changes** (`index.html`, `sw.js`) reach the iPad on the second launch after the push, because the offline cache serves the old version first and refreshes in the background. Bump `CACHE` in `sw.js` on every code change so the cache refreshes. Current value: `soundboard-2026-10-25c`.

## Repo layout

```
index.html            the whole app (HTML, CSS and JavaScript in one file)
sw.js                 service worker: keeps the app available offline; bump CACHE on every change
manifest.webmanifest  home-screen app name, colours and icons
icons/                app icon (SVG source + 180/192/512 PNGs)
board/board.json      the folder board: one entry per sound
board/audio/*.mp3     the 50 sounds (about 138 MB)
board/img/*.svg       the tile pictures
keyboard/psr-ew425-voices.json   the Yamaha PSR-EW425 voice list for the Keyboard panel
.nojekyll             tells GitHub Pages to serve files as they are
```

`board.json` entry format:

```json
{
  "id": "b-rain",                 // stable id, "b-" + slug of the name
  "name": "Rain",
  "category": "weather",          // weather | nature | city | places | home | bells | stings
  "file": "audio/rain.mp3",
  "image": "img/rain.svg",
  "loop": true,
  "volume": 0.6,                  // 0 to 1
  "links": ["b-close-thunder", "b-distant-thunder", "b-dripping-water"],  // unused since related sounds were removed
  "duration": 159.68,             // seconds; over 40 s the app streams it instead of preloading
  "bytes": 6452544
}
```

## Technical notes for Claude

- **Audio engine**: Web Audio API. Clips of 40 s or less are decoded into memory at GO for instant firing. Longer clips stream from on-device storage through `<audio>` elements routed into Web Audio (`createMediaElementSource`), because decoding all the long ambiences would need about 1.5 GB of memory. A pool of 16 `<audio>` elements is unlocked inside the GO tap, since iPadOS only lets an element play later if it first played during a tap.
- **Per-voice gain chain**: copies → `out` gain (the volume slider; also used for quick stops and Stop all) → `fader` gain (used only by Fade out) → master. Keeping the fade on its own node means the slider and Stop all still work mid-fade without fighting the fade automation. Fading voices move from the `playing` map to a `fading` set until they finish.
- **Loops**: buffered loops schedule overlapping `AudioBufferSourceNode` copies with equal-power fade curves; streamed loops hand over to a fresh element when `currentTime >= duration − X`, checked every 100 ms. X = min(10 s, 45% of the clip).
- A dynamics compressor on the master bus stops layered sounds from clipping.
- **Pinned top bar**: the bar is `position: sticky`. `body` must use `min-height: 100%`, not `height: 100%`; with a fixed body height the bar scrolls away after one screen (this was the Stop all bug fixed on 25 Oct).
- **Storage**: IndexedDB database `improv-soundboard`, stores `sounds` (records hold the audio and image as blobs) and `meta` (`seeded`, `removedBundle` = ids of folder sounds the user deleted).
- **First load**: the app fetches `board/board.json` and imports any sound whose id is not yet stored and not in `removedBundle`, with progress shown on the GO screen.
- **Backup**: a JSON file. Sounds that came from the folder board are saved as references (`bundleFile`, `bundleImage`), so the backup stays small; restoring re-downloads them.
- **Tile pictures**: 160×120 SVGs, a vertical gradient in the section colour, a faint circle, and a line icon at 2.4× scale (stroke 1.9, colour #f4efe4) centred at (80, 50). Icons are from Lucide (`lucide-static@0.460.0`, ISC licence); vacuum, lawn mower, sprinkler, bowling, prison bars, bee and the purr/crash marks were drawn by hand in the same style. Section colours (top → bottom of the gradient): weather #335f8c→#1f3c5c, nature #46703e→#2a4527, city #94562a→#5c3317, places #62458a→#3c2a57, home #2f6b6c→#1b4243, bells #8a6a22→#57420f, stings #86343f→#521d25.
- **Keyboard voice list** (`keyboard/psr-ew425-voices.json`): `voices` is an array of `[number, group, name, MSB, LSB, program]` for voices 1–820, transcribed from Yamaha's *PSR-E473/PSR-EW425 Data List* (Voice List). Program numbers are 1–128 as Yamaha prints them; send one less over MIDI. `null` MIDI values are panel-only voices (layers and arpeggios) that can't be called up over MIDI. `kitSounds` lists drum-kit keys worth finding by name (`kit` = voice number of the kit, `note` = MIDI note; the panel shows Yamaha note names, where middle C = C3). The file is in the service worker's offline list. The panel code is the "keyboard voice lookup" block in `index.html`; starred voices are saved in `localStorage` key `kb-favs`. The list was read out of the PDF by machine, so if a number ever looks wrong on the keyboard, check it against the Data List and fix it in the JSON.
- **Design**: dark stage look. Display font Big Shoulders Display, body font Atkinson Hyperlegible (Google Fonts, cached offline). Amber (#ffb04a) marks a playing one-shot, cyan (#5fc4d8) a playing loop.

## Still to test on the iPad

- That long ambiences (Rain, Traffic, Prison…) play and loop without a gap in the home-screen app. They use the streaming route, which was tested in a desktop browser but not yet on the iPad.
- Tap-to-sound delay on short clips.
- Whether sound still plays with the silent switch on.
- Whether 6 seconds is the right fade length on stage, and whether the Fade out button is easy enough to hit on smaller tiles.

## Ideas and later features (from the spec)

- Background playback when the screen locks or another app is open. Web apps on iPad pause in the background; this likely needs a native app (€99/year Apple developer fee).
- **Native iPad app for the Yamaha**: connect the PSR-EW425 by USB (its USB TO HOST port carries MIDI and audio), type a sound name and have the keyboard switch to it automatically, plus playing samples or the soundboard's sounds from the keys and through the keyboard's speakers. Needs Xcode on the Mac and the Apple developer account; the voice list file can be reused. To check first: whether the EW425 changes its main voice when it receives a program change from outside (otherwise use Local Control off and echo the notes back).
- More drum-kit keys in the lookup (the SFX Kits 1 and 2, voices 309 and 310, have one effect per key).
- Sound visualiser on an external screen. The web version can only mirror the iPad screen; a separate output needs the native app.
- Automations: one sound starting, stopping or fading others.
- Multiple boards (per show or scene).
- Adjustable fade length (e.g. a 2 s / 6 s / 10 s choice).
- Open questions still unanswered: adjustable crossfade per sound; what happens when a one-shot is tapped twice quickly (currently it stops); whether short loops may use a shorter crossfade.

## History

- **27 Sep 2026**: explored options (web app vs native iPad vs Android, costs, storage limits).
- **10 Oct 2026**: wrote the spec; added related sounds (one way) and later features from the paid app's Pro list.
- **18 Oct 2026**: first version published as a Claude artifact with six synthesised example sounds.
- **24 Oct 2026**: imported James's 50 MP3s from the Mac, drew a picture for each, grouped them into sections, and switched long clips to streaming to save memory.
- **25 Oct 2026**: made the offline home-screen version, created the GitHub repo and turned on GitHub Pages. Live at https://jamesaharper1987-max.github.io/improv-soundboard/.
- **25 Oct 2026 (later)**: removed related sounds; fixed Stop all disappearing when scrolling (top bar now stays pinned); added a per-sound **Fade out** button (6 s). Cache bumped to `soundboard-2026-10-25b`. (These changes were first made by mistake on the old test artifact, with a 4 s fade, then applied to the GitHub repo.)
- **25 Oct 2026 (evening)**: added the **Keyboard** voice lookup panel with the PSR-EW425's 820 voices, search, filters and starring. Cache bumped to `soundboard-2026-10-25c`.

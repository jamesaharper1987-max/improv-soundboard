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
- **Keyboard voices lookup**: the **Keyboard** button (top bar, left of Edit board) opens a side panel listing all 820 voices of James's Yamaha PSR-EW425. Type a word ("whistle", "door", "siren") or a number and it shows the voice number to dial on the keyboard, its group and how far into the group it sits. Filters: All, Sound effects (the 60 or so noise and effect voices), ★ Starred (tap ☆ on any voice to keep it there; stored on that iPad only), and one per voice group. Drum-kit keys can be listed too: "whistle" also shows the samba whistles in Standard Kit 1 (voice 296, keys B4 and C5). The panel sits beside the board, so tiles and Stop all keep working while it is open. In Safari (the home-screen app) it only looks numbers up.
- **Send to keyboard (where MIDI is available)**: in a browser that supports Web MIDI (Chrome on the Mac, or the iPad app **MIDIWeb Browser**), the Keyboard panel shows a **Connect keyboard** box. With the PSR-EW425 plugged in by USB (its USB TO HOST port), tapping a voice switches the keyboard to it; the sound still comes from the keyboard. The current voice is highlighted in cyan. The box also has a MIDI channel choice (default 1, remembered), a device picker when more than one MIDI device is present, and **Test note** (plays middle C for under a second). Voices marked "panel only" (layers, arpeggios) can't be sent and must be chosen on the keyboard. Tapping a drum-kit key row switches to that kit. After the first connection the app reconnects by itself each time the panel opens. (Since 25 Oct the box lives in the Keyboard settings window, see below; the footer tip is hidden while linked.)
- **Keys play the voice chosen here** (switch in the Connect box): first real test (25 Oct) showed the PSR-EW425 does **not** change its panel (Main) voice from MIDI; a program change only changes the part that plays incoming MIDI (Test note played in the new voice, the keys didn't). With this switch on, the app turns the keyboard's Local Control off (sends CC 122 = 0) and relays every key press, pedal and pitch bend coming in over USB straight back to the keyboard on the chosen channel, so the keys play the voice tapped in the panel and the sound still comes out of the keyboard. Turning the switch off (or leaving the page) turns Local Control back on. If the keyboard ignores the CC 122 message, notes sound twice and Local Control must be set to Off by hand in the keyboard's Function menu.
- **Keyboard scenes** (Scenes tab in the Keyboard panel, only where MIDI works, i.e. MIDIWeb Browser or Chrome): one tap sets the PSR-EW425 up with up to three voices at once: **Right hand** (keys at or above the split point), **Left hand** (below it) and a **Whole keyboard layer**. Each part has its own octave shift (−2 to +2) and volume; each scene has a split point (− / + or **Set from keyboard**: press the key), a reverb amount and an optional **board sound** that starts with the scene (and fades out when another scene that started a different sound takes over). Ten starter scenes: Mystical forest (pan flute right, Dark Moon pad left, night crickets), Haunted house, Underwater, Outer space, Wild West saloon (saloon piano, busy restaurant), Cathedral, Circus, Paris café, Epic battle, Sad and rainy (rain). **New scene** / **Edit**: choosing a part's voice jumps to the Voices list with an orange "Choose the … voice" bar; the voice is heard straight away. **Save and play** saves and applies. Turning on a scene switches keys-through on automatically. Tapping a single voice, or choosing a voice on the keyboard itself, ends the scene (last choice wins). Scenes are saved on that device (IndexedDB `meta` key `kbScenes`, copy in `localStorage` `kb-scenes`); they are **not** in the board backup file yet.
- **Now playing bar** (bottom of the screen): appears whenever something is playing and lists every playing or fading sound, wrapping into extra rows when there are several. Each item: the sound's name (tap it to scroll to its tile, which flashes), **Fade out** (6 s, as on the tile) and ■ to stop it straight away. Loops have a cyan edge, one-shots amber, fading ones a dashed edge until they disappear. The board gets extra space at the bottom so the bar never hides the last tiles, and pop-up messages sit above it.
- **Keyboard panel beside the board**: on screens 700 px wide or more, opening the Keyboard panel shrinks the board so its tiles reflow into the space on the left instead of being covered. On a phone the panel still covers the board.
- **Keyboard settings moved out of the panel**: the connection box (device, channel, Test note, "Keys play the voice chosen here") now lives in a **Keyboard settings** window, opened from the ⚙ button in the Keyboard panel or from Edit board. The panel itself only shows a one-line "Keyboard not linked · Connect" bar when the keyboard isn't linked; once linked that bar disappears and a small cyan dot on the Keyboard button shows the link.
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
- **Switching voices from the iPad (25 Oct 2026)**: James wants to tap a voice and have the Yamaha change. Safari and every iPad browser use Apple's engine, which has no Web MIDI; Chrome on iPad is the same engine, and no browser with its own engine had shipped on iPad in the EU by mid-2026. Chosen route: build the sending into the web app using the standard Web MIDI API, so it works in Chrome on the Mac and in MIDIWeb Browser on the iPad (a free app, 5of12 LLP, that adds Web MIDI). If MIDIWeb Browser doesn't work with USB or isn't reliable on stage, the fallback is a small native iPad app that wraps the same web app and provides MIDI (Xcode; same code).
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
| Bees | nature | loop | 42 s (new recording 25 Oct, rev 2) |
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
- **A replaced sound file** (same sound, better recording): replace `board/audio/<name>.mp3`, update that entry's `duration` and `bytes`, and **raise its `rev`** (no `rev` means 1). Each device then downloads the new audio the next time the app opens online, keeping its own name, picture, loop and volume settings. Devices where that sound's audio was replaced in the editor are left alone. `board.json` is fetched network-first by the service worker, so this happens on the first launch after the push. First used for Bees (rev 2, 25 Oct 2026).
- **Uploading in the app stays on that device**: a sound added or replaced through Edit board is stored only in that copy's storage (each of: the home-screen app, MIDIWeb online, MIDIWeb's saved copy). It never reaches GitHub or the Mac. To change a sound everywhere, it goes into the repo as above.
- **Changed settings for an existing sound** in `board.json` (name, loop, volume, picture) do **not** overwrite what is already on the iPad, so James's own edits are never lost. For an existing sound, change it in Edit board on the iPad, or delete the tile and reload the app online so the new version is re-added. (A "sync from GitHub" button could be built if this becomes annoying.)
- **A deleted sound** stays deleted on that iPad even if it is still in `board.json`.
- **App code changes** (`index.html`, `sw.js`) reach the iPad on the second launch after the push, because the offline cache serves the old version first and refreshes in the background. Bump `CACHE` in `sw.js` on every code change so the cache refreshes. Current value: `soundboard-2026-10-25k`.

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
- **Volume and order are saved separately** (`meta` key `prefs`: `{id: {volume, order}}`), applied on load over the stored records. Moving a volume slider or reordering never rewrites a sound's record (which holds the audio file). Before 25 Oct (`-25j`) every slider move re-saved the whole record including the audio; on the iPad (MIDIWeb) that failed with "Couldn't save that change on this device" and broke the long sound that was playing ("didn't start"). Full records are still written when a sound is added, edited in the editor or restored. The stream retry also re-reads the audio file from storage before trying again.
- **Saved copies (`appFetch`)**: every fetch of a file beside the page goes through `appFetch(path)`, which tries the relative path and falls back to `LIVE_SITE + path` (`https://jamesaharper1987-max.github.io/improv-soundboard/`). The voice list is also kept in `localStorage` (`kb-voices`) for offline use. GitHub Pages allows these cross-origin requests.
- **Stream start failures**: a refused or failed `play()` on a long (streamed) sound is retried once on a fresh element after 250 ms before the tile is marked "Not loaded" (toast: "… didn't start. Tap it to try again."); tapping the tile again retries, and the mark clears as soon as it plays. An `AbortError` (an element being reused while its previous play was still pending) is ignored, and an error only counts for the copy that owns the element. Before 25 Oct, reusing an element quickly could wrongly mark Cooking pasta / Nightclub as broken. GO now unlocks 24 audio elements (was 16).
- **Scenes, how they play**: part channels are the chosen channel (Right hand), +1 (Left hand) and +2 (layer). Applying a scene sends All Notes Off on those three channels, then per part Bank MSB/LSB + Program Change, CC 7 volume and CC 91 reverb. The relay sends each incoming note to the matching parts (shifted by octave) and remembers where every held note went (`sc.routes`), so a note held while the scene changes still stops correctly. Pedal, pitch bend and other controllers go to every part. A program change coming from the keyboard (James pressing a voice button) ends the scene. The echo guard now compares incoming messages with everything the app sent in the last 40 ms. Starter scenes live in `SC_STARTERS` in `index.html`; they are only used the first time (when no scenes are saved yet).
- **Keyboard voice list** (`keyboard/psr-ew425-voices.json`): `voices` is an array of `[number, group, name, MSB, LSB, program]` for voices 1–820, transcribed from Yamaha's *PSR-E473/PSR-EW425 Data List* (Voice List). Program numbers are 1–128 as Yamaha prints them; send one less over MIDI. `null` MIDI values are panel-only voices (layers and arpeggios) that can't be called up over MIDI. `kitSounds` lists drum-kit keys worth finding by name (`kit` = voice number of the kit, `note` = MIDI note; the panel shows Yamaha note names, where middle C = C3). The file is in the service worker's offline list. The panel code is the "keyboard voice lookup" block in `index.html`; starred voices are saved in `localStorage` key `kb-favs`. Sending a voice = Control Change 0 (bank MSB), Control Change 32 (bank LSB), then Program Change (pc − 1), all on the chosen channel (stored as `kb-ch`, 1–16). The chosen output id is stored as `kb-out`; `kb-midi` = `on` once access was granted, which makes the panel reconnect without a tap. The send code is the "send to keyboard" block in `index.html` and only switches on when `navigator.requestMIDIAccess` exists. Tested with a fake MIDI device (bytes for Whistle: B0 00 00, B0 20 00, C0 4E). Keys-through (`kb-thru` = on/off): all channel messages from the keyboard's MIDI input are re-sent with their channel changed to the chosen one; clock, sysex and active sensing are dropped; a message identical to one sent in the last 40 ms is treated as an echo and dropped, and over 1,500 messages a second switches the mode off, so a keyboard that echoes MIDI can't cause a loop. Leaving the page (`pagehide`) sends Local Control on. The list was read out of the PDF by machine, so if a number ever looks wrong on the keyboard, check it against the Data List and fix it in the JSON.
- **Design**: dark stage look. Display font Big Shoulders Display, body font Atkinson Hyperlegible (Google Fonts, cached offline). Amber (#ffb04a) marks a playing one-shot, cyan (#5fc4d8) a playing loop.

## Recommended stage setup (from 25 Oct 2026)

**MIDIWeb Browser on the iPad**, with the soundboard saved locally inside it. The saved copy runs from a `midiweb://` address and has its **own storage**, separate from the https version in MIDIWeb and from the home-screen app. Since 25 Oct (cache `-25h`) the app fetches `board/` and `keyboard/` files from the live site when they aren't next to the page, so a saved copy downloads the 50 sounds once (needs internet that first time) and then works offline. Before that fix, a saved copy couldn't find `board/board.json` and showed the six old built-in demo sounds; the app no longer adds demo sounds (it shows "The sounds haven't been downloaded yet…" instead) and removes any old ones once the real board loads. Keep only **one** tab of the soundboard open in MIDIWeb: two tabs would both play the board and both pass the keys to the keyboard. James confirmed on 25 Oct: works with no internet, keeps playing when the screen locks, long ambiences (Rain, Traffic…) loop without a gap, and tap-a-voice + keys-through control the PSR-EW425 over USB. The home-screen (Safari) app stays as a backup without keyboard control. After any code change is pushed, open the saved copy in MIDIWeb online, refresh/re-save it, and check the change is there before going offline.

## Still to test on the iPad

- Keyboard link (James, 25 Oct): no noticeable delay through the app. Pressing a voice button on the keyboard takes over from the voice sent by the iPad (last choice wins), which the app now treats as leaving a scene.
- Scenes on the real keyboard: does the PSR-EW425 play all three parts (channels 1–3) with their own voices, volume and reverb; are the starter voices good choices; does the tone generator's 64-note limit matter with layers and the sustain pedal.
- Tap-to-sound delay on short clips.
- Whether sound still plays with the silent switch on.
- Whether 6 seconds is the right fade length on stage, and whether the Fade out button is easy enough to hit on smaller tiles.

## Ideas and later features (from the spec)

- Background playback when the screen locks: solved in MIDIWeb Browser (keeps playing, James 25 Oct). The home-screen Safari app still pauses in the background.
- **Native iPad app for the Yamaha** (fallback if MIDIWeb Browser falls short): a wrapper around this web app that provides MIDI over USB (the PSR-EW425's USB TO HOST port carries MIDI and audio), plus playing samples or the soundboard's sounds from the keys and through the keyboard's speakers. Needs Xcode on the Mac and the Apple developer account; the voice list file can be reused. To check first: whether the EW425 changes its main voice when it receives a program change from outside (otherwise use Local Control off and echo the notes back).
- More drum-kit keys in the lookup (the SFX Kits 1 and 2, voices 309 and 310, have one effect per key).
- Sound visualiser on an external screen. The web version can only mirror the iPad screen; a separate output needs the native app.
- Automations: one sound starting, stopping or fading others.
- Scenes: include them in the board backup; scenes per show; trigger a scene from a soundboard tile or the reverse.
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
- **25 Oct 2026 (evening, later)**: added **send to keyboard**: in a browser with Web MIDI, tapping a voice in the Keyboard panel switches the PSR-EW425 to it. Cache bumped to `soundboard-2026-10-25d`.
- **25 Oct 2026 (evening, later still)**: first test with the real keyboard: voices only change for incoming MIDI. Added **Keys play the voice chosen here** (Local Control off + relay). Cache bumped to `soundboard-2026-10-25e`.
- **25 Oct 2026 (late morning)**: James confirmed tap-a-voice + keys-through works on the iPad in MIDIWeb Browser. The keyboard connection box now folds to one line with a Settings button, so the voice list shows about five results instead of two. Cache bumped to `soundboard-2026-10-25f`.
- **25 Oct 2026 (late morning)**: MIDIWeb Browser confirmed as the stage setup: offline (site saved locally), keeps playing with the screen locked, gapless loops.
- **25 Oct 2026 (late morning)**: added **keyboard scenes** (right/left/layer voices with split, octave, volume, reverb and an optional board sound), ten starter scenes and a scene editor. Cache bumped to `soundboard-2026-10-25g`.
- **25 Oct 2026 (midday)**: fixed long sounds being wrongly marked "Not loaded" ("couldn't be played") and MIDIWeb's saved offline copy showing the six old demo sounds; removed the demo-sound fallback. Cache bumped to `soundboard-2026-10-25h`.
- **25 Oct 2026 (afternoon)**: added the **Now playing** bar; the board now reflows beside the Keyboard panel instead of being covered; moved the keyboard connection controls into a Keyboard settings window (⚙). Cache bumped to `soundboard-2026-10-25i`.
- **25 Oct 2026 (afternoon)**: fixed volume changes on long sounds causing "Couldn't save that change" and stopping the sound (volume/order now saved without touching the audio). Cache bumped to `soundboard-2026-10-25j`.
- **25 Oct 2026 (afternoon)**: James's new Bees recording replaced `board/audio/bees.mp3` (rev 2). Added file updates for folder sounds (`rev` in `board.json`, `bundleRev` in the stored record); `board.json` now network-first in the service worker. Cache bumped to `soundboard-2026-10-25k`.

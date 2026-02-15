# Specification

## Summary
**Goal:** Provide a single-page TikTok-to-YouTube converter that validates a TikTok URL, converts to a YouTube-ready MP4 using simple presets, previews the result, and maintains a lightweight conversion history.

**Planned changes:**
- Build a single-page flow to paste and validate a TikTok video URL, with clear error states and loading/progress indication.
- Implement a conversion/export workflow that produces a downloadable MP4 (no YouTube upload), with presets for YouTube Shorts (9:16) and YouTube Standard (16:9) and a summary of selected output settings prior to export.
- Add a results screen with in-browser preview of the converted video, English step-by-step manual upload guidance, and a “start over” action.
- Persist conversion history (TikTok URL, timestamp, chosen preset, output filename) across reloads, allow deleting entries, and ensure no raw video bytes are stored in backend state.
- Apply a consistent, distinctive visual theme across the app (avoiding a primary blue+purple palette) with prominent Convert/Export/Download actions.
- Add and display generated static assets (logo and hero/empty-state illustration) served from `frontend/public/assets/generated`.

**User-visible outcome:** Users can paste a TikTok URL, pick a YouTube output preset, convert and download an MP4, preview the converted result, follow instructions to upload to YouTube manually, and revisit/delete past conversions from a persistent history.

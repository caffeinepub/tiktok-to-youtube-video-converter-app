# Specification

## Summary
**Goal:** Make the in-app Caffeine App Market listing section faster to use by adding a one-click way to copy all required submission details with clear feedback.

**Planned changes:**
- Add a "Copy submission details" action to the "List on Caffeine App Market" card that copies a single formatted text block containing the app name, app description, and the current live app URL.
- Use the same URL value currently displayed in the listing steps (window.location.origin).
- Provide clear success feedback (e.g., a temporary “Copied!” state) and a visible, non-crashing error state on failure while logging the error to the console.

**User-visible outcome:** Users can click one button in the listing card to copy all app market submission details (including the live URL) to their clipboard, with immediate success or error feedback.

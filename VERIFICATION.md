# Verification record

Verified locally on October 25, 2026. No official rubric or additional project instructions were present in the repository. This is not a certification of full WCAG conformance or competition eligibility.

## Automated results

`node --test tests/*.test.cjs`: **12 passed, 0 failed**.

- Legacy state migration preserves existing claims, saved IDs, and extra fields.
- Unreadable/structurally invalid storage is left untouched rather than overwritten.
- The 45 seed assets have unique IDs, valid campus codes, valid proposed route stops, and quantity-consistent values.
- Search, category, school, condition, handoff, and type filters combine correctly before sorting and pagination.
- Empty results, last-page sizing, and invalid-page clamping behave correctly.
- Request transitions persist, prevent duplicates, and update availability.
- Swap proposals remain pending and are excluded from requested transfer value.
- Bulky resources require self-pickup; invalid destinations/identity are rejected.
- Locally created listings participate in search, saves, and requests after serialization/reload.
- Light/dark token combinations and fixed status/illustration labels meet 4.5:1 normal-text contrast in the tested pairs. Gold is decorative, not ordinary text.

JavaScript syntax checks pass for `dist/app.js` and `dist/model.js`. This static project has no build pipeline or dependency install step.

## Rendered-browser checks

The normal localhost origin was used for visual checks. An isolated 127.0.0.1 origin was used for created listings and submitted test requests, so normal app data was not reset or populated with test records.

- **1440px:** complete homepage introduction/composition; four-column full catalog; consistent navigation and details.
- **768px:** two-column catalog and usable tablet navigation/layout.
- **390px:** single-column catalog, collapsed filter disclosure, wrapped filter chips, readable forms, and full-width drawer.
- No horizontal document overflow at the tested widths, including a very long unbroken search term.
- Combined probe/school/condition/courier/transfer/value-sort filtering returned the expected single Vernier resource and five active filter chips.
- Filter state survived details open/close, refresh, and URL navigation.
- A direct link with `page=99` was clamped to the valid page and its URL normalized.
- Browser Back returned to the correct inventory view and active navigation state.
- Escape closed details and restored focus to the source resource. Tabbing remained inside the open dialog. If an unsaved card disappeared, focus returned to Your Items.
- The skip link focused main content without changing the current functional view.
- A new local listing was created, reloaded, saved, requested, and reviewed. Its generated voucher included the correct DHS → SFH route, random hash, and illustrative barcode.
- The request remained present after reloading Your Items.
- A bulky chair swap disabled courier, required pickup, and produced a pending proposal.
- Saving and unsaving from details updated Saved resources and remained correct after reload.
- Impact kept the $42,850 demonstration baseline separate from $1,172 in isolated test transfer requests; the test swap was excluded.
- Catalog image loading was inspected across all six pages. One vendor photo failed; the labeled local fallback appeared. Some external photos were still pending during rapid page changes.
- The relocated activity feed on Courier showed the isolated browser’s created listing, transfer requests, and pending swap; the normal app has a truthful empty state.
- No JavaScript console errors were reported during the exercised workflows.
- Main directory, financial-transparency, and comparative policy sources were checked. Vendor credit pages are external and were not exhaustively audited.

## Limits

- Browser-local prototype: no backend, shared accounts, educator verification, messages, approvals, reservations, or courier bookings.
- There is no automatic multi-user synchronization. Real transfer permissions and transport must be coordinated outside this prototype.
- External vendor imagery may load slowly or become unavailable; explicit image loading/fallback states are implemented. Optional remote images and fonts require internet access.
- Voucher content and the dedicated print stylesheet were inspected; no physical printer job was sent.
- Reduced-motion rules were reviewed and implemented for all animation. OS-level reduced-motion settings were not toggled during this run.
- Keyboard, focus, contrast pairs, landmarks, and heading structure were checked. This was not a full screen-reader or third-party accessibility audit.
- Reset confirmation remains available but was not executed against the normal app's user data.

## October 26 refinement verification

- 21 automated tests passed, including revision with stable tracking, withdrawal/re-request, edit/archive/restore persistence, stale-tab write rejection, malformed-record recovery, combined filtering, route coverage, and value exclusions.
- All six runtime JavaScript files pass Node syntax checks. No build step exists.
- The contrast test now validates actual separate light/dark selectors; normal-text pairs meet 4.5:1, tested control boundaries and focus tokens meet 3:1 against adjacent surfaces. This is a targeted check, not a full accessibility certification.
- All five views were inspected at 390, 768, and 1440px with no horizontal document overflow. Mobile and desktop screenshots are retained in the project root.
- The isolated 127.0.0.1 origin was used for new test records, preserving the localhost origin's educator records. Existing legacy QA records survived migration. No reset was performed.
- Browser interactions verified three-step listing creation/editing, archive/restore and refresh, request submission/revision with unchanged hash, withdrawal and restored availability, five combined filter chips, image-based details, Escape/focus restoration, route selection, out-of-loop guidance, and itemized value exclusions.
- Browser-local records remain independent per origin; stale snapshots are rejected rather than merged. This is not a multi-user service.
- During source iteration a stale asset mix produced a missing-renderer error; versioned script/style URLs were added, and final reload checks use consistent assets.
- Physical printing and a full screen-reader audit remain unperformed. Reduced-motion CSS is retained; OS settings were not changed.

Final preview measurements: at 1440px the inventory begins at approximately 502px and the first title at 684px; at 390px the first card begins around 546px and its title around 757px. Desktop captures use a 1000px-high viewport so the complete first-row actions are visible. Final neutral-dark canvas is rgb(12, 12, 12). Fresh final homepage inspection reported no console warnings/errors. Request-status filtering, withdrawn-slip warnings, hidden handoff instructions on withdrawn records, browser Back, page=99 normalization, long-query empty states, and field-level invalid/error associations were also exercised.

Screenshots: `clustershare-refinement-home.png`, `clustershare-refinement-desktop.png`, and `clustershare-refinement-mobile.png`. Browser viewport overrides were reset and temporary QA tabs closed.

## Resource-first visual pass — October 26

Before editing, the served homepage and saved-items empty state were inspected. The old shared main min-height measured 650px at a 1000px viewport; it is now 0, with document flex sizing handling footer placement. A before homepage capture is retained. Re.vert was successfully inspected in the browser even though the text-only web fetch was unavailable.

The project now has a limited optional Reveal build: `npm run build`, `npm run typecheck`, and `npm test`. Core vanilla routes and the clustershare-v1 storage scheme are unchanged. The Reveal source uses the requested API with no blur, a 14px lift, 380ms easing, bounded stagger, and visible static/reduced-motion fallbacks. Server-rendered component checks verify that readable content stays visible without animation.

Rendered checks cover Home, Inventory, all three Your Items tabs, Courier, and Impact at 390, 768, and 1440px without horizontal overflow. Live UI checks verified save/unsave, new transfer request and voucher, pending swap proposal, three-step listing creation with the local illustration fallback, readable phone form fields and validation, route selection, and itemized impact. New records were created only at the isolated 127.0.0.1 origin; normal localhost data was not reset.

Final results: build and TypeScript checks passed; 24 tests passed. Formatting checks passed for changed source, CSS, and the Reveal component. Seven served JavaScript files passed syntax checking. Final preview console inspection reported no warnings or errors.

Keyboard checks confirmed Tab entered the native dialog's close control and Escape returned focus to the source resource while preserving six combined inventory filters. The once-only reveal state was inspected after leaving and returning: previously viewed sections were immediately opaque, while unvisited sections remained pending until entering view. Final full-page capture showed all three groups fully visible. Focus-ring contrast on light photo wells was explicitly corrected for dark mode.

Screenshots retained: clustershare-revert-before-home.png, clustershare-visual-home-desktop.png, clustershare-visual-home-full.png, clustershare-visual-home-mobile.png, clustershare-visual-inventory-desktop.png, clustershare-visual-inventory-mobile.png, clustershare-visual-details.png, and clustershare-visual-your-items.png. Full-page composition was visually reviewed after capture. Temporary reference and QA tabs were closed, viewport overrides reset, and the original localhost homepage refreshed.

Limits: no physical print job or full screen-reader audit was performed. OS reduced-motion settings were not forced during browser QA; code/CSS fallbacks and the component's non-animation rendering were checked. Vendor imagery and the optional font still depend on network availability. This remains a browser-local prototype with no real dispatch, messaging, or educator verification.

## October 27 focused refinement

- Original localhost Home rendered before edits; the prior missing-home-script trigger could not be reproduced. Source inspection confirmed eager renderer references could blank every route when a renderer was absent. Core dependencies and renderers now ship in a single vanilla script; route dispatch is lazy and startup/render failures have recovery UI. No claim is made that caching caused the historical error.
- Locally served IBM Plex Sans and slate/ink/cobalt theme replace the warm palette; targeted light/dark normal text, action, error, control and focus contrast checks pass. Gold is used as an accent with readable text.
- Build, TypeScript, and 32 automated tests pass, including atomic startup dependencies, recovery UI, filtered recommendations, safe photo data/persistence, and existing request lifecycle/data migration checks.
- All five views and all Your Items tabs checked at 390, 768 and 1440px: no document overflow. Tablet hero stacks; phone navigation wraps without clipping. Phone search begins around 313px, before recommendations. Mobile recommendations show one compact suggestion; all resources remain below. Explicit filters suppress the shelf.
- Original localhost Home and Inventory render with saved preferences and browse state retained. New QA records were created only on a separate 127.0.0.1:5174 origin. No normal user records were reset, revised, withdrawn or archived.
- Isolated browser QA exercised typo search, three-step request, saved voucher, local Impact total ($1,100 for the test calculator request), optional photo selection, resizing to 1000px, JPEG persistence through refresh, owner-only card actions, and archive/restore.
- Phone filter and notification drawers inspected; the one-row notification panel measured about 256px tall, with scrolling only when needed. Handoff instructions consolidated and sample routes collapsed; illustrative Impact numbers are separately disclosed.
- Limitations: no physical printing or full screen-reader certification; remote vendor photos can still fail and fall back to local illustrations. Photo storage remains browser-local and subject to quota, with existing session-only failure feedback.

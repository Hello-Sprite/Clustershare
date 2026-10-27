# ClusterShare

An independent FBLA student project demonstrating free classroom-resource transfers and equipment swaps for Forsyth County educators. The application keeps its vanilla HTML/CSS/JavaScript architecture and browser-local state. A small React/TypeScript/Motion enhancement handles three optional homepage section reveals. There is no backend or application-framework migration.

## Run and check

```sh
npm install
npm run build
npm run typecheck
npm test
python3 -m http.server 5173 --directory dist
node --check dist/app.js
node --check dist/model.js
node --test tests/*.test.cjs
```

Open http://localhost:5173/#home. Static deployment consists of the existing `dist/` directory. Hosting configuration retains the existing ClusterShare Site ID and audience.

## Experience

The homepage progresses through a resource introduction with immediate search, featured resources, a connected three-stage handoff, reuse, and contribution with useful FAQ answers. Existing product photographs supply the visual composition. The visual identity uses cool slate, white, ink blue, and cobalt, with restrained coral and gold accents. IBM Plex Sans is served locally in four weights; system sans fonts provide fallback. These are product colors, not official county brand values.

Dedicated URL-based views:

- `#home`: introduction and the homepage journey.
- `#inventory`: searchable catalog, five categories, school/condition/handoff/type filters, not-yet-requested filter, active filter chips, sorting, and eight-item pagination.
- `#items?tab=requests`: review transfer requests and pending swap proposals; reopen printable slips.
- `#items?tab=saved`: saved resources and save/unsave actions.
- `#items?tab=listed`: resources created in this browser.
- `#courier`: two illustrative route plans, handoff preparation guidance, and a feed of actual browser-local listing/request records.
- `#ledger`: estimated replacement value and methodology, with local requested value kept separate.

Browse state appears in inventory URLs and is retained while opening/closing details. Refresh and browser Back work across views. Details use native dialogs with Escape, keyboard containment, labeled headings, and focus restoration. One-time section entrances and the connected route animation respect reduced-motion settings.

## Complete local workflows

Create a listing in three steps with quantity, condition, category, school, room, educator, transfer/swap type, handoff method, and optional replacement estimate, notes, and an optional photo selected from the device. Edit listings or archive and restore them in Your Items. Listings persist locally and have a printable listing slip. Selected JPEG/PNG/WebP photos are resized to at most 1000px and saved as a bounded JPEG in existing browser-local storage. Category-specific illustrations are used without a photo. Legacy HTTPS photos remain readable.

Requests keep three steps: identity, destination, and review/handoff. The last step summarizes the entered details before submission. Bulky resources require self-pickup. Transfers stay requested; swap proposals stay pending. Users can revise or withdraw active records. Withdrawal permits a new request while retaining history. Duplicate active requests for the same resource are prevented. A proposed voucher includes a random tracking hash, campus codes, and an illustrative barcode; it is not district authorization or a real tracking service.

The `clustershare-v1` storage key is retained. Legacy claims and saves survive migration, with a listings array and explicit request statuses added. Malformed nested records are retained in an unrecognizedRecords recovery field while valid records remain usable. Writes compare the latest storage snapshot, and other-tab changes refresh idle views or block stale form submission. Unreadable data is left untouched and the interface indicates session-only operation. Failed writes produce an explicit message. Reset requires a deliberate confirmation and is never run automatically. Theme preference is stored separately.

## Truthful data and sources

There are 45 seeded resources and 17 real campus names. Seeded educator identities, availability, condition, rooms, and inventory details are fictional. The $42,850 and 3.2-day figures appear only in a separate illustrative-scenario disclosure. Withdrawn requests and swaps are excluded from local requested transfer value. Impact includes an itemized active-request breakdown. Local requests do not increase the recirculated baseline: a request is not a completed transfer. Pending swaps are excluded from requested transfer value. Complete-lot estimates use quantity × unit estimate and are never selling prices.

Forsyth County Schools' [directory](https://www.forsyth.k12.ga.us/schools/about) and [financial transparency page](https://www.forsyth.k12.ga.us/inside-fcs/financial-transparency) provide public context. Frederick and Fairfax surplus policies in the sources drawer are comparative examples, not Forsyth rules or evidence of the demo metrics. Representative photography credits remain available in the sources drawer. External photographs require network access; local category illustrations handle failed image loads. IBM Plex Sans and its license are included in dist/assets/fonts.

Amphi supplied a reference for section rhythm and progression. Its assets, wording, branding, and exact layouts were not copied. No official FBLA rubric was found in the project; the user's supplied priorities guided this implementation.

## Judging walkthrough

1. Open Home, explain the free-sharing purpose, then choose **Browse free resources**.
2. Search for `probe`, choose South Forsyth High School and courier eligibility, then open the Vernier kit.
3. Save the resource, start its request, enter demo identity/destination details, and review step 3 before submitting.
4. Inspect the generated routing stamp and barcode; use **Print voucher**, then **View your items**. Refresh to demonstrate persistence.
5. Create a local listing and open **Your listings**. Finish in **Impact** to explain why requested value is distinct from recirculated estimates.

See [VERIFICATION.md](VERIFICATION.md) for checks and limitations. Desktop/mobile previews and an example voucher are saved in the project root.

## Source map

- `dist/catalog.js`: seeded resources, campus directory, and illustrative route data.
- `dist/model.js`: pure filtering, pagination, lifecycle, listing, and estimate rules.
- `dist/storage.js`: storage validation and stale-write protection.
- `dist/home.js`: homepage section composition.
- `dist/workspace.js`: Your Items, listing editor, courier, and impact views.
- `dist/app.js`: routing, shared cards/dialogs, request flow, and event binding.
- `dist/style.css`: readable theme tokens, component rules, breakpoints, reduced motion, and print treatment.

`npm run build` packages the vanilla core sources together as `dist/app-runtime.js` and bundles the optional Reveal enhancement into `dist/reveal.js`. Run it after changing core JavaScript; the build refreshes asset revisions in index.html. A separate startup guard displays recovery guidance if initialization fails; its production dependencies are React, React DOM, and Motion. No Tailwind, shadcn, provider, router, or state migration was introduced.

## Refined judging walkthrough

Browse → filter by school and handoff → open a resource image → save → submit a three-step demo request → revise the room → print the illustrative voucher → withdraw and observe availability/value update. Create a three-step listing, edit it, archive and restore it, then explain route coverage and the itemized Impact calculation. No real school is contacted.

## Earlier resource-first visual refinement (historical)

Re.vert was visually reviewed for product scale, serif hierarchy, and warm sectional rhythm. Its branding, copy, images, retail mechanics, and exact layouts were not copied. Original listing photography and credits remain intact. Home now proceeds through a generous resource composition and immediate search, featured resources, connected handoff, reuse, and contribution with concise FAQ answers. Inventory uses 4:3 product wells and a quieter fact hierarchy; drawers, forms, request records, route plans, impact, sources, and empty states share the same forest/cream design tokens.

`dist/design.css` defines this visual layer. The obsolete shared 65vh main minimum was removed; a flexible document shell keeps short-page footers near the viewport bottom without forced blank scrolling.

### Reveal

- Public component: `components/ui/reveal.tsx`, with children, optional className, and optional index.
- Existing infrastructure had no React, TypeScript, alias, or cn utility. The new `lib/utils.ts` supplies only a small class helper; relative imports follow this project's plain structure.
- `components/ui/reveal-runtime.tsx` mounts the three selected semantic section groups before imperative handlers are bound, and disposes roots when changing views. Core forms, navigation, inventory, and state remain outside React.
- The bundle is deferred. Without it, original static section markup remains visible and functional. Initial headline, search, navigation, and actions are never reveal-wrapped.
- 14px lift, 380ms ease-out, 40ms optional stagger capped at 120ms, no blur. Intersection threshold 0.2, once per section; seen section IDs stay visible on hash-route returns. OS reduced motion skips enhancement and has a CSS visibility fallback.

References: [Re.vert](https://www.wix.com/demone2/wh-re-vert), [Reveal pattern](https://21st.dev/@asanshay/components/reveal). The component is an original adaptation of the requested pattern, not a copied account-gated source file.

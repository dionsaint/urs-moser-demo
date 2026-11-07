# Urs Moser concept demo

A browser-only sales demonstration for Urs Moser Allround-Service. All business records, prices, emails, payments and assistant answers are illustrative. This is not a production business system.

## Open the demo

- Demo introduction: `https://dionsaint.github.io/urs-moser-demo/#feat`
- Customer homepage: `https://dionsaint.github.io/urs-moser-demo/#pub`
- Feature overview: `https://dionsaint.github.io/urs-moser-demo/#features`
- Tutorial introduction: `https://dionsaint.github.io/urs-moser-demo/#anleitung`
- AI walkthrough: `https://dionsaint.github.io/urs-moser-demo/#ki`
- Swiss German receptionist: `https://dionsaint.github.io/urs-moser-demo/#empfang`
- Guided example: `https://dionsaint.github.io/urs-moser-demo/#guide`

The guided example creates linked enquiry, quote, job and invoice records in the existing local demo. It keeps progress in browser storage and reuses completed records when replayed. Resetting the demo clears that progress.

## Run locally

Run `python3 -m http.server 8765 --bind 127.0.0.1` in this directory and open `http://127.0.0.1:8765/`. No dependency installation or build is required. GitHub Pages serves the files directly from the repository.

## Files

- `index.html`: existing interactive office, enquiry, customer and staff functionality.
- `experience.js`: refreshed introduction and customer homepage, six-step example, navigation and form improvements.
- `refresh.css`: responsive visual system and accessibility improvements.
- `ai-experience.js`: interactive AI examples, tutorial insight and Swiss German reception conversation with local-demo enquiry handover.
- `ai-learning.css`: AI walkthrough and receptionist layouts.
- `learning.css`: feature overview, tutorial instructions and compact mobile navigation.
- `assets/`: generated illustrative photographs, with 700 px and 1400 px versions.

The visual refresh retains the original green identity. Links without a language parameter always open in Swiss Standard German (`de-CH`), regardless of older saved language preferences. An explicit alternative language uses a URL parameter such as `?lang=en`. Laura Moser is the fictional tutorial customer and appears in a sample enquiry. Visible Funktionen and Anleitung navigation opens the feature overview and a beginner tutorial, with a next-action explanation at every step. The existing language selector remains; the refreshed experience is authored in German and English. French and Italian retain the original partial translation coverage and core navigation translations. They are not complete translations of the new presentation.

## AI and receptionist examples

The AI walkthrough demonstrates enquiry extraction, quote preparation, report drafting and office questions. Responses are prepared examples; office answers read the current local demo records and link to their invoices. Quote preview calculations use the existing totals helper and configurable prices, with the example assumptions shown. There is no live model/API connection.

The tutorial highlights AI in the quote step and explains sources, missing information and review. The home page, Funktionen and Anleitung expose the AI overview and receptionist demo. A separate future section labels real telephony, email handling, voice-note transcription and calendar suggestions as possible integrations, not active services.

The receptionist uses a choice-based Swiss German conversation with cleaning and callback paths. Completed conversations can create one local sample enquiry, with Laura Moser's fictional details and an unconfirmed requested date. Saved conversations survive reload; resetting the demo clears the conversation. Greeting playback uses a fixed AI-generated WAV from Plapperi-V2, voice Alba (Zurich), created for this demo. No device text-to-speech voice is used. It records no microphone audio. There is no real telephone call, notification or booking.

## Validation, 7 November 2026

- JavaScript syntax and `git diff --check` passed.
- Browser walkthrough completed all six steps and produced a linked, unpaid example invoice.
- Conflicting assignment and incomplete checklist prevented progression with a visible explanation.
- Reload and replay retained the same invoice number.
- Seven-step enquiry tested with sample data, invalid email and successful submission. Completion no longer displays “Step 8 of 7 · undefined”.
- Desktop, 390 px and 320 px widths inspected. No page overflow at the inspected phone widths; smaller image variants loaded.
- Menu, German/English switching and service-help response tested. No browser errors observed.
- AI example outputs, calculated quote total, source invoice links and the AI insight within tutorial step 2 checked.
- Reception cleaning and callback paths produced local enquiries; reload retained the saved enquiry and reset cleared the conversation. Incomplete contact requests correctly ask the office to follow up.
- Natural greeting WAV validated (7.16 seconds) and playback control exercised. AI and receptionist pages had no horizontal overflow at 320 px; English AI heading checked.
- Funktionen links, Anleitung entry, per-step instructions and Laura Moser sample records checked. The plain URL returns to German after selecting English.

This validation covers the changed experience and key existing paths. It is not certification of the legacy demo's accounting, security, translations or production readiness.

## Research used for the redesign

Reddit comments were used as qualitative design feedback, not as measured conversion evidence. No post or message was sent to Reddit.

- [Service website feedback](https://www.reddit.com/r/websitefeedback/comments/1w2f4qb/pressure_washing_website_feedback/): clearer first impression, visible quotation action and relevant work imagery.
- [Explaining a product through a demo](https://www.reddit.com/r/microsaas/comments/1n5jw1v): show an understandable outcome quickly instead of a long technical walkthrough.
- [Local-service website critique](https://www.reddit.com/r/website/comments/1nueox7): reduce competing elements and unnecessary entrance animation; make imagery relevant to the service.

## Image provenance and prompts

Created using the built-in Imagegen tool. The images are labelled as generated examples on the site and must not be presented as actual customer projects, team portraits, or proof of completed work. Replace them with approved company photography when available. No generated before/after evidence or customer reviews were added.

`assets/home-1400.jpg` and `assets/home-700.jpg`:

> Use case: photorealistic-natural. Asset type: hero photograph for a Swiss cleaning and property care concept website. Create an editorial architectural photograph of a beautifully clean but lived-in modest modern Swiss apartment living and dining area, warm oak parquet, off-white linen sofa, simple oak table, sage green accent, large windows overlooking leafy residential buildings, morning daylight, real materials with subtle imperfections. Wide horizontal composition, calm premium yet approachable local-service feel, no people, no luxury mansion, no text, no logos, no collage, no watermark. This illustrates the comfort of a freshly cleaned home.

`assets/cleaning-1400.jpg` and `assets/cleaning-700.jpg`:

> Use case: photorealistic-natural. Asset type: supporting service photograph for a Swiss cleaning and property care concept website. Candid editorial photograph, close side view of a professional cleaner's gloved hands using a neatly folded green microfibre cloth to wipe a pale kitchen counter in a bright ordinary European apartment. Dark forest green work shirt, no visible face, authentic practical cleaning process, natural window light, warm white cabinets and oak detail softly out of focus. Wide horizontal image, realistic skin fabric and glove texture, understated premium photography, no text or logos, no watermark, no exaggerated shine or sparkles, no split panels.

## Reception voice provenance

`assets/reception-greeting-alba.wav` (7.16 seconds, mono 24 kHz) was generated for this project on 7 November 2026 using the public [Plapperi demo](https://plapperi.ch/en), model Plapperi-V2, stock voice Alba (ZH). The service translated this original prompt into Swiss German before synthesis:

> Grüezi bei Urs Moser Allround-Service. Ich bin die digitale Empfangshilfe. Wie kann ich Ihnen helfen?

Generated transcript: «Grüezi bim Urs Moser Allround-Service. Ich bin di digitali Empfangshilf. Wie chani ihne hälfe?»

The provider's [terms](https://plapperi.ch/en/terms), sections 7.2–7.5, permit commercial use of generated audio and embedding in products. The stock voice is not a clone of Laura Moser or a company employee. The sample is labelled as AI-generated.

[Suisse Speech](https://suisse-speech.ch/text-to-speech/) is another candidate for a future real-time voice connection; its documentation distinguishes studio greetings from streaming voice synthesis and lists a Bern dialect. No account or API service was connected or purchased.

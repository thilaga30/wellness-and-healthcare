# Implementation Plan: Women's Health Tracker

## Overview

Implement a fully client-side web application using vanilla HTML, CSS, and JavaScript with localStorage for all persistence. The app is structured as multiple HTML pages sharing a single `app.js` file, with a `data-page` attribute on `<body>` acting as a lightweight router.

## Tasks

- [ ] 1. Project scaffold and shared infrastructure
  - Create `index.html` (redirect to `dashboard.html`), `dashboard.html`, `period.html`, `pregnancy.html`, `yoga.html`, and `health.html` with correct `data-page` attributes on `<body>`
  - Create `styles.css` with CSS custom properties for light/dark themes via `data-theme` on `<html>`, base layout, and shared component styles
  - Create `app.js` skeleton with the page router (`DOMContentLoaded` → reads `data-page` → calls the matching `init*()` function)
  - Set up `tests/` directory with `unit/` and `property/` subdirectories and a `package.json` with `vitest` and `fast-check` as dev dependencies
  - _Requirements: 3.1, 14.1_

- [ ] 2. Utility layer
  - [ ] 2.1 Implement utility functions in `app.js`
    - `$(selector, ctx)` — `document.querySelector` alias
    - `save(key, value)` — `JSON.stringify` → `localStorage.setItem` with `QuotaExceededError` catch and toast
    - `load(key, defaultValue)` — `localStorage.getItem` → `JSON.parse` with try/catch returning `defaultValue` on error
    - `formatDate(date)` — returns `'YYYY-MM-DD'` string
    - `daysBetween(a, b)` — signed integer day difference
    - `addDays(date, n)` — returns new `Date`
    - `setText(selector, text)` — sets `textContent` on matched element
    - _Requirements: 14.1, 14.2, 14.3_

  - [ ]* 2.2 Write property test for JSON persistence round-trip (Property 19)
    - **Property 19: JSON Persistence Round-Trip**
    - **Validates: Requirements 14.1, 14.2**

  - [ ]* 2.3 Write property test for malformed JSON fallback (Property 20)
    - **Property 20: Malformed JSON Fallback**
    - **Validates: Requirements 14.3**

  - [ ]* 2.4 Write unit tests for utility functions
    - Test `formatDate`, `daysBetween`, `addDays` with known values
    - Test `load` with missing key returns default
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 3. i18n layer and theme manager
  - [ ] 3.1 Implement `TRANSLATIONS` object and i18n functions in `app.js`
    - Define `TRANSLATIONS` with `en`, `ta`, `tanglish`, `hi` keys covering all UI strings
    - Implement `t(key)` — returns `TRANSLATIONS[currentLang][key]` with English fallback, then key itself as last resort
    - Implement `applyLanguage(lang)` — walks all `[data-i18n]` elements, sets `textContent`, saves `lang` to localStorage
    - Add language selector control wired to `applyLanguage`; restore saved language on page load
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ] 3.2 Implement theme manager in `app.js`
    - Implement `applyTheme(theme)` — sets `data-theme` on `<html>`, saves to localStorage
    - Implement `toggleTheme()` — reads current theme, flips it, calls `applyTheme`
    - Wire theme toggle control; restore saved theme on page load
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ]* 3.3 Write property test for i18n translation completeness and fallback (Property 1)
    - **Property 1: i18n Translation Completeness and Fallback**
    - **Validates: Requirements 1.2, 1.4**

  - [ ]* 3.4 Write property test for theme attribute consistency (Property 2)
    - **Property 2: Theme Attribute Consistency**
    - **Validates: Requirements 2.1, 2.2**

  - [ ]* 3.5 Write unit tests for i18n and theme
    - Test `t()` returns English fallback for missing key
    - Test `applyLanguage` updates `[data-i18n]` elements
    - Test `toggleTheme` flips `data-theme` attribute
    - _Requirements: 1.2, 1.4, 2.1, 2.2_

- [ ] 4. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Notification system
  - [ ] 5.1 Implement notification system in `app.js`
    - Define `Notification` type shape `{ id, type, message, dismissed }`
    - Implement `triggerNotification(notification)` — adds to stored array if not already present
    - Implement `dismissNotification(id)` — sets `dismissed: true` on matching entry, saves to localStorage
    - Implement `restoreNotifications()` — loads from localStorage, calls `renderNotificationBanner` for undismissed entries
    - Implement `renderNotificationBanner()` — renders overlay/banner with dismiss control
    - Call `restoreNotifications()` in every page init
    - _Requirements: 13.1, 13.2, 13.3_

  - [ ]* 5.2 Write property test for notification dismissal round-trip (Property 18)
    - **Property 18: Notification Dismissal Round-Trip**
    - **Validates: Requirements 13.3**

  - [ ]* 5.3 Write unit tests for notification system
    - Test `dismissNotification` sets `dismissed: true`
    - Test `restoreNotifications` skips dismissed entries
    - _Requirements: 13.2, 13.3_

- [ ] 6. Period tracker
  - [ ] 6.1 Implement period tracker module in `app.js` and `period.html`
    - Add form to `period.html` with fields for start date, cycle length, period duration, and a submit button
    - Implement `calculateNextPeriod(data)` — returns `addDays(startDate, cycleLength)`
    - Implement `calculateDaysRemaining(nextPeriod)` — `daysBetween(today, nextPeriod)`
    - Implement `isDelayed(nextPeriod)` — returns `true` when next period is in the past
    - Implement `daysLate(nextPeriod)` — `daysBetween(nextPeriod, today)` when delayed
    - Implement `validateCycleLength(n)` — `valid: false` when `n < 21 || n > 35`
    - Implement `validateDuration(n)` — `valid: false` when `n < 2 || n > 7`
    - Implement `initPeriodTracker()` — restores saved data, wires form submit with inline validation, renders predictions and delay alert
    - Trigger period prediction notification via notification system
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 6.2 Write property test for period next-date calculation (Property 3)
    - **Property 3: Period Next-Date Calculation**
    - **Validates: Requirements 4.2**

  - [ ]* 6.3 Write property test for period delay detection (Property 4)
    - **Property 4: Period Delay Detection**
    - **Validates: Requirements 4.4**

  - [ ]* 6.4 Write property test for cycle length validation range (Property 5)
    - **Property 5: Cycle Length Validation Range**
    - **Validates: Requirements 4.5**

  - [ ]* 6.5 Write property test for period duration validation range (Property 6)
    - **Property 6: Period Duration Validation Range**
    - **Validates: Requirements 4.6**

  - [ ]* 6.6 Write unit tests for period tracker
    - Test `calculateNextPeriod` with known dates
    - Test delay alert renders when period is overdue
    - Test inline warnings appear for out-of-range inputs
    - _Requirements: 4.2, 4.4, 4.5, 4.6_

- [ ] 7. Pregnancy tracker
  - [ ] 7.1 Implement pregnancy tracker module in `app.js` and `pregnancy.html`
    - Add LMP date input and results display to `pregnancy.html`
    - Implement `calculateWeek(lmpDate)` — `Math.floor(daysBetween(lmpDate, today) / 7)`
    - Implement `calculateTrimester(week)` — returns `1`, `2`, or `3` per spec ranges
    - Implement `calculateEDD(lmpDate)` — `addDays(lmpDate, 280)`
    - Define `BABY_SIZE` mapping and implement `getBabySize(week)`
    - Implement `initPregnancyTracker()` — validates LMP not in future, renders week, trimester, EDD, baby size, and over-40-week warning
    - Trigger pregnancy milestone notification via notification system
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 7.2 Write property test for pregnancy week calculation (Property 7)
    - **Property 7: Pregnancy Week Calculation**
    - **Validates: Requirements 5.1, 5.6**

  - [ ]* 7.3 Write property test for trimester determination (Property 8)
    - **Property 8: Trimester Determination**
    - **Validates: Requirements 5.2**

  - [ ]* 7.4 Write property test for estimated delivery date calculation (Property 9)
    - **Property 9: Estimated Delivery Date Calculation**
    - **Validates: Requirements 5.3**

  - [ ]* 7.5 Write unit tests for pregnancy tracker
    - Test `getBabySize` for specific weeks (4, 20, 40)
    - Test future LMP date shows error and blocks save
    - Test week > 40 shows provider warning
    - _Requirements: 5.4, 5.5, 5.6_

- [ ] 8. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Health quiz
  - [ ] 9.1 Implement health quiz module in `app.js` and `health.html`
    - Add sequential question display (one at a time) and result section to `health.html`
    - Define 5 questions array and `QUIZ_RUBRIC` scoring object
    - Implement `evaluateQuiz(answers)` — scores against rubric, returns `{ condition, likelihood }`
    - Implement `initHealthQuiz()` — renders questions one at a time, shows disclaimer, evaluates on completion, saves result to localStorage, wires retake control
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 9.2 Write property test for quiz evaluation determinism (Property 10)
    - **Property 10: Quiz Evaluation Determinism**
    - **Validates: Requirements 6.2**

  - [ ]* 9.3 Write unit tests for health quiz
    - Test known answer sets produce expected conditions
    - Test retake resets to question 1
    - Test disclaimer text is present in rendered output
    - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ] 10. Yoga timer
  - [ ] 10.1 Implement yoga timer module in `app.js` and `yoga.html`
    - Add start/stop controls and elapsed time display to `yoga.html`
    - Implement `startTimer()` — records start timestamp, begins `setInterval` updating display every second
    - Implement `stopTimer()` — clears interval, calculates duration, saves `YogaSession` to localStorage array, returns session
    - Implement `initYogaTimer()` — wires controls, restores last session display
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 10.2 Write unit tests for yoga timer
    - Test `stopTimer` saves session with correct date and duration
    - Test elapsed display updates each second (mock `setInterval`)
    - _Requirements: 7.2, 7.3, 7.4_

- [ ] 11. Mood tracker, symptom tracker, water tracker, sleep tracker
  - [ ] 11.1 Implement mood tracker in `app.js`
    - Define emoji options set
    - Implement `logMood(emoji)` — writes `{ [today]: emoji }` merge into mood map in localStorage (overwrites same-day entry)
    - Implement `getTodayMood()` — returns today's emoji or `null`
    - Wire emoji click handlers; render current mood on dashboard
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 11.2 Write property test for mood one-entry-per-day (Property 11)
    - **Property 11: Mood One-Entry-Per-Day**
    - **Validates: Requirements 8.4**

  - [ ] 11.3 Implement symptom tracker in `app.js`
    - Define predefined symptom tags list
    - Implement `logSymptoms(tags)` — appends `{ date, tags }` entry to symptoms array in localStorage
    - Implement `getHistory()` — returns entries sorted descending by date
    - Render symptom history list on the symptoms section of `health.html`
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ]* 11.4 Write property test for symptom history sort order (Property 12)
    - **Property 12: Symptom History Sort Order**
    - **Validates: Requirements 9.3**

  - [ ] 11.5 Implement water tracker in `app.js`
    - Implement `resetIfNewDay()` — if stored date ≠ today, resets count to 0 and updates date
    - Implement `logGlass()` — calls `resetIfNewDay`, increments count, saves, shows goal message when count reaches 8
    - Implement `isGoalMet()` — returns `count >= 8`
    - Wire log-glass button; render count and progress on dashboard
    - Trigger hydration reminder notification via notification system
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ]* 11.6 Write property test for water count increment (Property 13)
    - **Property 13: Water Count Increment**
    - **Validates: Requirements 11.2**

  - [ ]* 11.7 Write property test for water goal detection (Property 14)
    - **Property 14: Water Goal Detection**
    - **Validates: Requirements 11.3**

  - [ ]* 11.8 Write property test for water count daily reset (Property 15)
    - **Property 15: Water Count Daily Reset**
    - **Validates: Requirements 11.4**

  - [ ] 11.9 Implement sleep tracker in `app.js`
    - Implement `validateSleepHours(hours)` — `valid: false` when `hours < 0 || hours > 24`
    - Implement `logSleep(hours)` — validates, saves `{ date, hours }` to localStorage, updates progress bar
    - Implement `getProgressPercent(hours)` — `Math.min((hours / 8) * 100, 100)`
    - Wire sleep input form; render progress bar on dashboard
    - _Requirements: 12.1, 12.2, 12.3_

  - [ ]* 11.10 Write property test for sleep progress percentage (Property 16)
    - **Property 16: Sleep Progress Percentage**
    - **Validates: Requirements 12.2**

  - [ ]* 11.11 Write property test for sleep duration validation range (Property 17)
    - **Property 17: Sleep Duration Validation Range**
    - **Validates: Requirements 12.3**

  - [ ]* 11.12 Write unit tests for mood, symptom, water, and sleep modules
    - Test mood overwrite on same day
    - Test `getHistory` returns descending order
    - Test `logGlass` increments correctly and shows goal message at 8
    - Test `logSleep` rejects hours outside 0–24
    - _Requirements: 8.4, 9.3, 11.2, 11.3, 12.3_

- [ ] 12. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Voice input module
  - [ ] 13.1 Implement voice input module in `app.js`
    - Implement `isSupported()` — checks `typeof SpeechRecognition !== 'undefined' || typeof webkitSpeechRecognition !== 'undefined'`
    - Implement `attachToField(inputEl)` — inserts mic button adjacent to input; hides button when not supported
    - Wire `SpeechRecognition` `onresult` to update input value in real time
    - Wire `onerror` to restore previous input value and display inline error using `voiceError` i18n key
    - Call `attachToField` on relevant inputs across pages
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [ ]* 13.2 Write unit tests for voice input
    - Test `isSupported()` returns `false` when `SpeechRecognition` is undefined
    - Test mic button is hidden when not supported
    - Test `onerror` restores previous input value
    - _Requirements: 10.3, 10.4_

- [ ] 14. Dashboard module
  - [ ] 14.1 Implement dashboard module in `app.js` and `dashboard.html`
    - Add summary cards to `dashboard.html` for period, pregnancy, water, sleep, mood, mini calendar, daily tip, and notifications
    - Implement `initDashboard()` — reads all relevant localStorage keys and populates each summary card
    - Render period card: next predicted date and days remaining (from `calculateNextPeriod` and `calculateDaysRemaining`)
    - Render pregnancy card: current week and trimester (only when `pregData` is present)
    - Render water widget: glass count out of 8
    - Render sleep widget: logged hours and progress bar
    - Render mini calendar: highlight today and any logged/predicted period dates
    - Render daily tip: pick from predefined tip collection (index by day-of-year mod tip count)
    - Render active notifications banner via `restoreNotifications()`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 14.2 Write unit tests for dashboard
    - Test dashboard renders period card with known localStorage state
    - Test pregnancy card is hidden when no `pregData` in localStorage
    - Test daily tip renders a non-empty string
    - _Requirements: 3.1, 3.2, 3.6_

- [ ] 15. Data reset control
  - [ ] 15.1 Implement data reset in `app.js`
    - Add a reset button (e.g., in settings or dashboard footer)
    - Implement reset handler — removes all app localStorage keys (`lang`, `theme`, `periodData`, `pregData`, `quizData`, `yogaSessions`, `mood`, `symptoms`, `waterCount`, `sleepHours`, `notifications`) and reloads the page to restore default state
    - _Requirements: 14.4_

  - [ ]* 15.2 Write property test for data reset clears all keys (Property 21)
    - **Property 21: Data Reset Clears All Keys**
    - **Validates: Requirements 14.4**

  - [ ]* 15.3 Write unit tests for data reset
    - Test all defined keys are absent from localStorage after reset
    - _Requirements: 14.4_

- [ ] 16. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations each and must include the comment tag `// Feature: women-health-tracker, Property N: <title>`
- Unit tests use `vitest` and should not duplicate coverage already provided by property tests
- All validation errors are surfaced inline using i18n message keys so they render in the selected language

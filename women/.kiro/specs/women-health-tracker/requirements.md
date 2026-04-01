# Requirements Document

## Introduction

A client-side web application for women's health tracking that runs entirely in the browser using localStorage for persistence. The app supports period tracking, pregnancy monitoring, health self-assessment, yoga/wellness timers, mood and symptom logging, hydration and sleep tracking, and multi-language support. All features are accessible without a backend or user account.

## Glossary

- **App**: The Women's Health Tracker web application
- **User**: The person using the App to track their health
- **Dashboard**: The main overview screen showing summaries of all tracked health data
- **Period_Tracker**: The module responsible for logging and predicting menstrual cycles
- **Pregnancy_Tracker**: The module responsible for tracking pregnancy progress and milestones
- **Health_Quiz**: The self-check questionnaire that screens for common health conditions
- **Yoga_Timer**: The component that manages timed yoga and wellness sessions
- **Mood_Tracker**: The component that records the User's daily emotional state
- **Symptom_Tracker**: The component that records physical symptoms reported by the User
- **Water_Tracker**: The component that records daily water intake in glass units
- **Sleep_Tracker**: The component that records nightly sleep duration
- **Notification_System**: The component that surfaces in-app alerts and reminders
- **LocalStorage**: The browser's built-in key-value storage used for all data persistence
- **TRANSLATIONS**: The object containing all UI strings in each supported language
- **Theme**: The visual color scheme (light or dark) applied to the App

---

## Requirements

### Requirement 1: Multi-Language Support

**User Story:** As a User, I want to use the App in my preferred language, so that I can understand and interact with all features comfortably.

#### Acceptance Criteria

1. THE App SHALL support English, Tamil, Tanglish, and Hindi as selectable display languages.
2. WHEN the User selects a language, THE App SHALL re-render all visible UI strings using the corresponding entries in the TRANSLATIONS object without reloading the page.
3. THE App SHALL persist the selected language to LocalStorage so that the chosen language is restored on the next visit.
4. IF a translation key is missing for the selected language, THEN THE App SHALL fall back to the English string for that key.

---

### Requirement 2: Theme Toggle

**User Story:** As a User, I want to switch between dark and light themes, so that I can use the App comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE App SHALL provide a toggle control that switches the Theme between light and dark modes.
2. WHEN the User activates the toggle, THE App SHALL apply the selected Theme to all UI elements immediately.
3. THE App SHALL persist the selected Theme to LocalStorage so that the chosen Theme is restored on the next visit.

---

### Requirement 3: Dashboard Overview

**User Story:** As a User, I want a single dashboard that summarises all my health data, so that I can get a quick overview without navigating to each module.

#### Acceptance Criteria

1. THE Dashboard SHALL display a summary card for period tracking showing the next predicted period date and the number of days remaining.
2. THE Dashboard SHALL display a summary card for pregnancy tracking showing the current week and trimester when pregnancy tracking data is present in LocalStorage.
3. THE Dashboard SHALL display the Water_Tracker widget showing the number of glasses consumed out of a daily target of 8.
4. THE Dashboard SHALL display the Sleep_Tracker widget showing the recorded sleep duration and a progress bar relative to a target of 8 hours.
5. THE Dashboard SHALL display a mini calendar highlighting the current date and any logged period or predicted cycle dates.
6. THE Dashboard SHALL display a daily health tip sourced from a predefined tip collection.
7. THE Dashboard SHALL display active notifications from the Notification_System.

---

### Requirement 4: Period Tracking

**User Story:** As a User, I want to log my menstrual cycle details, so that I can predict future periods and monitor irregularities.

#### Acceptance Criteria

1. WHEN the User submits a period log entry with a start date, cycle length in days, and period duration in days, THE Period_Tracker SHALL store the entry in LocalStorage.
2. THE Period_Tracker SHALL calculate and display the predicted next period start date based on the most recent logged start date plus the cycle length.
3. THE Period_Tracker SHALL calculate and display the number of days remaining until the next predicted period.
4. WHEN the current date exceeds the predicted next period start date by 1 or more days, THE Period_Tracker SHALL display a delay alert indicating the number of days the period is late.
5. IF the User submits a period log entry with a cycle length less than 21 days or greater than 35 days, THEN THE Period_Tracker SHALL display a warning that the cycle length is outside the typical range.
6. IF the User submits a period log entry with a period duration less than 2 days or greater than 7 days, THEN THE Period_Tracker SHALL display a warning that the duration is outside the typical range.

---

### Requirement 5: Pregnancy Tracking

**User Story:** As a User, I want to track my pregnancy progress, so that I can monitor milestones and receive relevant health information.

#### Acceptance Criteria

1. WHEN the User provides a last menstrual period date, THE Pregnancy_Tracker SHALL calculate and display the current pregnancy week as `floor((currentDate - lmpDate) / 7)`.
2. THE Pregnancy_Tracker SHALL determine and display the current trimester: weeks 1–12 as first trimester, weeks 13–26 as second trimester, and weeks 27–40 as third trimester.
3. THE Pregnancy_Tracker SHALL calculate and display the estimated delivery date as the last menstrual period date plus 280 days.
4. THE Pregnancy_Tracker SHALL display a baby size comparison description corresponding to the current pregnancy week from a predefined week-to-size mapping.
5. WHEN the calculated pregnancy week exceeds 40, THE Pregnancy_Tracker SHALL display a warning advising the User to consult a healthcare provider.
6. IF the provided last menstrual period date is in the future, THEN THE Pregnancy_Tracker SHALL display an error indicating the date is invalid.

---

### Requirement 6: Health Self-Check Quiz

**User Story:** As a User, I want to answer a health questionnaire, so that I can receive an indication of potential health conditions to discuss with a doctor.

#### Acceptance Criteria

1. THE Health_Quiz SHALL present exactly 5 questions to the User in a sequential, one-at-a-time format.
2. WHEN the User completes all 5 questions, THE Health_Quiz SHALL evaluate the answers and display a result indicating the likelihood of PCOS, Anemia, Thyroid disorder, or Stress based on a predefined scoring rubric.
3. THE Health_Quiz SHALL display a disclaimer stating that results are informational only and do not constitute medical advice.
4. WHEN the User completes the quiz, THE Health_Quiz SHALL store the result and completion date in LocalStorage.
5. THE Health_Quiz SHALL allow the User to retake the quiz, which SHALL reset all answers and restart from question 1.

---

### Requirement 7: Yoga and Wellness Timer

**User Story:** As a User, I want a timer for yoga sessions, so that I can track the duration of my wellness practice.

#### Acceptance Criteria

1. THE Yoga_Timer SHALL provide start and stop controls for a countdown or elapsed-time session.
2. WHEN the User activates the start control, THE Yoga_Timer SHALL begin incrementing an elapsed time display updated every second.
3. WHEN the User activates the stop control, THE Yoga_Timer SHALL halt the timer and display the total elapsed session duration.
4. THE Yoga_Timer SHALL store the completed session duration and date in LocalStorage.

---

### Requirement 8: Mood Tracking

**User Story:** As a User, I want to log my daily mood using emoji selections, so that I can monitor emotional patterns over time.

#### Acceptance Criteria

1. THE Mood_Tracker SHALL present a set of emoji options each representing a distinct mood state.
2. WHEN the User selects an emoji, THE Mood_Tracker SHALL record the selected mood and the current date in LocalStorage.
3. THE Mood_Tracker SHALL display the most recently logged mood on the Dashboard summary.
4. THE App SHALL store at most one mood entry per calendar day; WHEN the User logs a mood on a day that already has an entry, THE Mood_Tracker SHALL overwrite the existing entry for that day.

---

### Requirement 9: Symptom Tagging

**User Story:** As a User, I want to tag physical symptoms I experience, so that I can keep a record to share with my healthcare provider.

#### Acceptance Criteria

1. THE Symptom_Tracker SHALL present a predefined list of symptom tags the User can select.
2. WHEN the User selects one or more symptom tags and confirms, THE Symptom_Tracker SHALL store the selected tags with the current date in LocalStorage.
3. THE Symptom_Tracker SHALL display a history of logged symptom entries sorted by date in descending order.

---

### Requirement 10: Voice Input

**User Story:** As a User, I want to use voice input to log data, so that I can interact with the App hands-free.

#### Acceptance Criteria

1. WHERE the browser supports the Web Speech API, THE App SHALL provide a microphone activation control on supported input fields.
2. WHEN the User activates the microphone control, THE App SHALL begin capturing speech and transcribe it into the associated input field in real time.
3. IF the browser does not support the Web Speech API, THEN THE App SHALL hide the microphone control and rely solely on text input.
4. WHEN a speech recognition error occurs, THE App SHALL display an inline error message and restore the input field to its previous value.

---

### Requirement 11: Water Intake Tracking

**User Story:** As a User, I want to log each glass of water I drink, so that I can ensure I meet my daily hydration goal.

#### Acceptance Criteria

1. THE Water_Tracker SHALL maintain a daily glass count with a target of 8 glasses.
2. WHEN the User logs a glass of water, THE Water_Tracker SHALL increment the count by 1 and persist the updated count to LocalStorage.
3. WHEN the glass count reaches 8, THE Water_Tracker SHALL display a congratulatory message indicating the daily goal has been met.
4. THE Water_Tracker SHALL reset the glass count to 0 at the start of each new calendar day.

---

### Requirement 12: Sleep Tracking

**User Story:** As a User, I want to log my nightly sleep duration, so that I can monitor whether I am getting adequate rest.

#### Acceptance Criteria

1. WHEN the User submits a sleep duration value in hours, THE Sleep_Tracker SHALL store the value with the current date in LocalStorage.
2. THE Sleep_Tracker SHALL display a progress bar representing the logged duration as a proportion of an 8-hour target.
3. IF the User submits a sleep duration less than 0 or greater than 24, THEN THE Sleep_Tracker SHALL display a validation error and reject the entry.

---

### Requirement 13: In-App Notification System

**User Story:** As a User, I want to receive in-app notifications and reminders, so that I can stay on top of health actions and upcoming events.

#### Acceptance Criteria

1. THE Notification_System SHALL display popup notifications for period predictions, pregnancy milestones, and hydration reminders.
2. WHEN a notification is triggered, THE Notification_System SHALL display it as an overlay or banner with a dismiss control.
3. WHEN the User dismisses a notification, THE Notification_System SHALL remove it from the visible notification list and record the dismissal in LocalStorage so the notification is not shown again.

---

### Requirement 14: Data Persistence

**User Story:** As a User, I want my health data to be saved between sessions, so that I do not lose my history when I close the browser.

#### Acceptance Criteria

1. THE App SHALL persist all user-entered health data exclusively to LocalStorage using structured JSON values.
2. WHEN the App loads, THE App SHALL read all relevant LocalStorage keys and restore the UI state to reflect previously saved data.
3. IF a LocalStorage read returns malformed JSON, THEN THE App SHALL treat that key as empty and initialise the corresponding module with default values.
4. THE App SHALL provide a data reset control that clears all App-related LocalStorage keys and resets all modules to their default state.

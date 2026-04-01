# Client Brief

I have prepared and compiled prayer sessions segmented into categories refer to(@ASK - Everyday Prayer Items.pdf) with highly specific prayer points for the different types of prayers that a believer can offer. Each session has elaborative explanations for each prayer point within that specific session.

In short, the app should:
1. give believers a starting point using a customizable template to plan and structure prayer sessions;
2. have an inbuilt adjustable timer that will remind prayer warriors to move on to the next point and will automatically transition to the next slide or prayer point;
3. incorporate a date-based journaling function that allows users to note and log their reflections, realizations and epiphanies for future referencing and retrospective progress and growth tracking.
4. have social connectivity functionality that integrates seamlessly across all major social media platforms such as Facebook, Tiktok, Twitter, Instagram and LinkedIn to share limited but marketable elements of the app's functionality and centralized convenience;
5. integrate search engine functionality that will facilitate the creation of personal and customized templates using the already defined template structure using already existing bible applications such as BibleHub and BibleGateway to locate and integrate bible verses and supporting commentary without having to leave the app.
6. suggestions receiving functionality and input fields for crowdsourcing new directions and more template creation which can be saved under the personal templates sub-tab;
7. payment gateway for paid subscriptions with three membership tiers as per the already existing wireframe;
8. landing page with subscription details that include verifiable email addresses (reject throw-away email addresses), country, city, age, gender, language; denomination, preferred bible translation (for search engine functionality streamlining and efficiency - you can choose up to three for variety purposes);
9. incorporate a fasting scheduler within the prayer activity that also tracks fasting days which can be illustrated with a different colour on the prayer activity graph; - prayer scheduler should work somewhat like Google Calendar which shows the time and date of specific scheduled prayer sessions and must show who is invited to those sessions (social connectivity);
10. the "Prayer Session & Prayer Schedule" tabs should be consolidated - input via your technical expertise is required with the focus being the UX and efficiency;
11. the "Create Templates" tab should be migrated into the "Personal Templates" as a sub-tab where the "Bible Verse Locator" search functionality tab should be found - input via your technical expertise is required with the focus being the UX and efficiency;
12. the "Community" tab is where the in-app social networking will be housed and facilitated. All personal prayer templates that are created and shared by users will have their user profile stamp and users must be able to access who, within the community, has been accessing their shared personal templates. Personally created and shared templates are shared as uneditable by default but must also have the option of being editable (by permission granted by the creator) with edits being trackable by the creator and those who have been shared with - as in a CRM. Edits can also be approved or rejected;
13. *** three different colour schemes and/or themes which we will discuss the viability of at a later stage;
14. *** would it be possible to integrate a security feature that prevents screenshots and screen recording?

I have attached a .pdf file which will be the first template to be uploaded. I think we should have anywhere between 10 and 15 pre-loaded templates (I will provide single jpeg or ping slides for each prayer point at the time) when the app is published. I have also attached a screenshot of the already existing prayer session templates I've worked on in Canva - please take note of the broad colour scheme spectrum.

# Plan of Action

This plan breaks down the client's brief into actionable steps, taking into account the existing codebase and project structure.

**Note:** All data will be stored locally or in-memory for now.

## 1. Customizable Prayer Session Templates

*   **Goal:** Allow users to create and customize prayer sessions.
*   **Existing Code:** The app already has a `/personal-templates` page.
*   **Action:**
    *   Enhance the `/personal-templates` page to allow users to create new templates from scratch or modify existing ones.
    *   Create a new component for a template editor that will allow users to add, edit, and reorder prayer points.
    *   Use the existing UI components from `shadcn/ui` to build the editor.

## 2. Adjustable Timer

*   **Goal:** Add a timer to the prayer session to guide users through their prayer points.
*   **Existing Code:** There is a `timer.tsx` component, but it's not integrated into the prayer session page.
*   **Action:**
    *   Integrate the `timer.tsx` component into the `/prayer-session` page.
    *   Add controls to the timer to allow users to start, stop, and adjust the time for each prayer point.
    *   Add a feature to automatically transition to the next prayer point when the timer for the current one ends.

## 3. Date-Based Journaling

*   **Goal:** Allow users to log their reflections and track their spiritual growth.
*   **Existing Code:** The app has a `/prayer-journal` page.
*   **Action:**
    *   Enhance the `/prayer-journal` page to include a rich text editor for writing journal entries.
    *   Add a calendar view to the page to allow users to easily navigate between journal entries by date.
    *   Store the journal entries locally.

## 4. Social Media Integration

*   **Goal:** Allow users to share elements of the app on social media.
*   **Existing Code:** There is a `share-buttons.tsx` component.
*   **Action:**
    *   Integrate the `share-buttons.tsx` component into the `/prayer-session` and `/personal-templates` pages.
    *   Add functionality to share a summary of a prayer session or a personal template to social media platforms.

## 5. Bible Verse Integration

*   **Goal:** Allow users to search for and integrate Bible verses into their prayer templates.
*   **Existing Code:** The app has a `/bible-verses` page.
*   **Action:**
    *   Integrate a Bible API (like BibleGateway or a similar free API) into the `/bible-verses` page.
    *   Add a search bar to the page to allow users to search for Bible verses by keyword or reference.
    *   Add a feature to allow users to select a verse and add it to their personal prayer templates.

## 6. Crowdsourcing New Templates

*   **Goal:** Allow users to suggest new templates.
*   **Existing Code:** The app has a `/suggest-template` page.
*   **Action:**
    *   Enhance the `/suggest-template` page to include a form for submitting new template ideas.
    *   Store the suggestions locally.

## 7. Payment Gateway

*   **Goal:** Implement a subscription system with three tiers.
*   **Existing Code:** The app has a `/subscription` page.
*   **Action:**
    *   Integrate a payment gateway (like Stripe or Lemon Squeezy) into the `/subscription` page.
    *   Create three subscription tiers with different features and pricing.
    *   Manage user subscriptions locally.

## 8. Landing Page and User Onboarding

*   **Goal:** Create a landing page with subscription details and a user registration form.
*   **Existing Code:** The app has `/login` and `/signup` pages.
*   **Action:**
    *   Create a new landing page that will serve as the entry point for new users.
    *   Enhance the `/signup` page to include fields for collecting user information like country, city, age, gender, language, denomination, and preferred Bible translation.
    *   Add email verification to the signup process to prevent the use of throw-away email addresses.

## 9. Fasting Scheduler

*   **Goal:** Allow users to schedule and track their fasting days.
*   **Existing Code:** The app has a `/prayer-schedule` page.
*   **Action:**
    *   Enhance the `/prayer-schedule` page to include a fasting scheduler.
    *   Add a feature to mark fasting days with a different color on the calendar.
    *   Integrate the fasting scheduler with the prayer schedule to show fasting days alongside prayer sessions.

## 10. Consolidate "Prayer Session" and "Prayer Schedule"

*   **Goal:** Improve UX by combining the prayer session and schedule tabs.
*   **Action:**
    *   Merge the functionality of the `/prayer-session` and `/prayer-schedule` pages into a single, unified interface.
    *   The new page will allow users to both schedule and start prayer sessions from the same place.

## 11. Migrate "Create Templates"

*   **Goal:** Improve UX by moving the "Create Templates" functionality.
*   **Action:**
    *   Move the functionality of the `/suggest-template` page to the `/personal-templates` page, making it a sub-tab or a button.
    *   The "Bible Verse Locator" will be a key feature within the template creation process.

## 12. Community and Template Sharing

*   **Goal:** Create an in-app community for sharing and collaborating on prayer templates.
*   **Existing Code:** The app has a `/community-templates` page.
*   **Action:**
    *   Enhance the `/community-templates` page to allow users to share their personal templates with the community.
    *   Add user profiles to the community page to show who created each template.
    *   Implement a system for tracking who has accessed and edited shared templates, including a permission system for enabling and disabling editing.

## 13. Themes

*   **Goal:** Add different color schemes.
*   **Existing Code:** The app uses `next-themes`.
*   **Action:**
    *   Add two more themes to the existing light and dark themes.
    *   Create a theme switcher to allow users to choose their preferred theme.

## 14. Security

*   **Goal:** Prevent screenshots and screen recording.
*   **Action:**
    *   Research and implement a solution to prevent screenshots and screen recording. This might involve using a third-party library or implementing a custom solution. I will inform the user about the feasibility and potential limitations of this feature.

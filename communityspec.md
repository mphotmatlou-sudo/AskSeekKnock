# A.S.K. App - Community Section Development Plan

This document outlines the development plan for the Community Section of the A.S.K. application, based on the provided specification documents.

## 1. Core Features

The community section will be a social platform for Christians, integrating features inspired by Reddit and YouVersion.

-   **User Profiles & Social Graph:** Users will have profiles and can connect with friends.
-   **Main Feed:** A central feed will display posts, with options to view a global feed or a personalized feed from friends.
-   **Post Creation & Interaction:** Users can create posts with mandatory categorization. Interaction includes comments, voting, and sharing.
-   **Events Hub:** A dedicated section for promoting and discovering Christian events.
-   **Moderation:** Tools for users to report content and for admins to manage the community.

## 2. Data Models

The following data models will be used:

-   **User:** `userId`, `email`, `hashedPassword`, `profile` (bio, denomination, location), `joinDate`, `friends` (array of `userId`s).
-   **Post:** `postId`, `authorId` (FK to User), `title`, `content` (text), `linkUrl`, `categoryTag`, `createdAt`.
-   **Comment:** `commentId`, `postId` (FK to Post), `authorId` (FK to User), `content` (text), `createdAt`, `parentId` (for nested comments).
-   **Event:** `eventId`, `title`, `description`, `date`, `location`, `link`, `approvedByAdmin`, `mediaUrls`.
-   **Friendship:** `friendshipId`, `requesterId`, `addresseeId`, `status` ('pending', 'accepted').

## 3. Page Structure & Components

### New Pages:

-   `/community`: The main community feed.
-   `/community/post/[id]`: View a single post and its comments.
-   `/community/create`: Create a new post.
-   `/events`: The main events hub.
-   `/events/submit`: Submit a new event.
-   `/profile/[id]`: User profile page.
-   `/admin/moderation`: Admin dashboard for moderation.

### New Components:

-   `PostCard`: To display a post in the feed.
-   `Comment`: To display a single comment.
-   `FriendList`: To display a user's friends.
-   `EventCard`: To display an event.
-   `PostForm`: For creating/editing posts.
-   `EventForm`: For submitting events.

## 4. Development Phases

### Phase 1: Basic Community Page & Post Display

1.  **Create the `/community` page:** This will be the main entry point for the community section.
2.  **Define the `Post` type:** Create the necessary TypeScript types for posts in `src/lib/types.ts`.
3.  **Create a `PostCard` component:** This component will be responsible for rendering a single post.
4.  **Display mock posts:** Populate the `/community` page with a list of mock posts to visualize the layout.

### Phase 2: Post Creation

1.  **Create the `/community/create` page:** This page will contain the form for creating new posts.
2.  **Implement the `PostForm` component:** The form will include fields for title, content, URL, and a mandatory category selector.
3.  **Create the API route for post creation:** An API endpoint will handle the submission of new posts.

### Phase 3: User Profiles & Friends

1.  **Create the `/profile/[id]` page:** A basic user profile page to display user information.
2.  **Implement friend request logic:** Create API routes and UI components for sending, accepting, and declining friend requests.
3.  **Display friends list:** Show a user's friends on their profile page.

### Phase 4: Feed Views (Global vs. Friends)

1.  **Rename 'Global' to 'Feed':** The main feed toggle will be between "Feed" (all posts) and "Friends".
2.  **Implement feed filtering logic:** Filter the posts based on the selected view.

### Phase 5: Post Details & Comments

1.  **Create the `/community/post/[id]` page:** This page will display a single post in detail.
2.  **Implement the comments section:** Allow users to view and add comments to a post. The comment form should be functional on the client-side, adding new comments to the state.

### Phase 6: Hashtags & Mentions

1.  **Parsing Logic:** Implement a utility to parse post and comment content to identify hashtags (`#tag`) and mentions (`@user`).
2.  **Clickable Rendering:** Render these tags as clickable links within the UI. Clicking a hashtag could lead to a search for that tag, and clicking a mention would lead to the user's profile.

### Phase 7: Events Hub

1.  **Create the `/events` page:** Display a list or calendar of upcoming events.
2.  **Create the `/events/submit` page:** Allow users to submit new events for approval.
3.  **Implement admin approval system:** Create a system for admins to review and approve event submissions.

### Phase 8: Moderation

1.  **Implement reporting functionality:** Allow users to report posts and comments that violate community guidelines. Clicking the report button will open a confirmation dialog.
2.  **Create the `/admin/moderation` page:** A dashboard for admins to review reports and take action.

### Phase 9: Notifications System

1.  **Notification Icon:** Add a notification bell icon to the main application shell, complete with a badge for unread notifications.
2.  **Notification Popup:** On click, display a popup/dropdown with a list of recent notifications.
3.  **Notification Format:** Each notification will show context (e.g., the comment text) and a "Reply" button, which will navigate the user to the relevant post or comment thread.
4.  **Data Model:** Add a `Notification` type: `notificationId`, `type` ('comment', 'mention', 'friend_request'), `actorId` (who performed the action), `recipientId`, `postId`, `isRead`, `createdAt`.

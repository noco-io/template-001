## Overview

This project utilizes the following core technologies:

*   **Framework:** Next.js (App Router is assumed unless specified otherwise)
*   **Styling:** Tailwind CSS

This project is primarily focused on frontend development, likely for landing pages or similar UI-centric applications. It does **not** currently include pre-configured backend, database, authentication, or billing integrations. Though it is just nextjs so the user coudl create that. 

## Frontend (Next.js + Tailwind)

*   **Framework:** Next.js. Please adhere to the patterns and conventions of the App Router (e.g., Server Components, Client Components, `app/` directory structure) unless the project explicitly uses the Pages Router.
*   **Styling:** Tailwind CSS. Utilize Tailwind utility classes for styling components. Define custom styles or components in the designated CSS files or component libraries if necessary.
*   **Components:**
    *   Create reusable UI components within the `./components/` directory (or a similar standard location).
    *   Distinguish between Server Components and Client Components (`'use client'`) appropriately based on their needs (interactivity, state, browser APIs vs. server-side rendering, data fetching).
*   **Routing:** Use the file-system based routing provided by the Next.js App Router (or Pages Router if applicable).
*   **Data Fetching:** Use standard Next.js data fetching methods (e.g., `fetch` in Server Components, Route Handlers, or client-side fetching libraries like axios in Client Components if added).
*   **File Size:** Aim to keep individual component and page files concise and focused for better maintainability. Consider breaking down large components.

## General Instructions for AI Assistant

*   **Focus:** Prioritize building frontend components and pages using Next.js and Tailwind CSS according to standard practices.
*   **Assumptions:** Assume a standard Next.js project structure unless otherwise specified.
*   **Code Generation:**
    *   Generate React components following project conventions.
    *   Apply Tailwind CSS classes directly for styling.
    *   Clearly indicate whether generated components should be Server or Client Components.
*   **Integration Points:** If integrating with external APIs or services, clearly define how and where this should occur (e.g., Route Handlers, Server Components, Client Components).
*   **State Management:** For client-side state, use standard React hooks (`useState`, `useEffect`, `useContext`). If a dedicated state management library is introduced, follow its specific patterns.
*   **No Backend Assumptions:** Do not assume the presence of a specific backend, database, or authentication system unless explicitly instructed or configured within the project. Build UI components to be adaptable if these are added later.

**AI Note: Component Structure**

When creating new components:

1.  Place them in the appropriate directory (e.g., `./components/ui/`, `./components/feature/`).
2.  Use clear and descriptive naming conventions.
3.  Default to Server Components unless client-side interactivity or hooks are required, in which case use the `'use client'` directive.
4.  Apply Tailwind CSS classes for styling.

**Example Component Request:**

"Create a reusable Button component in `./components/ui/Button.jsx`. It should accept `variant` (primary, secondary) and standard button props. Use Tailwind for styling."
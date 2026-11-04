# Community Events

A social development events platform for local community service.

Live URL: pending deployment.

## Setup-stage features

- Email/password registration and login interface using BetterAuth.
- Password validation with uppercase, lowercase, and minimum-length rules.
- Google sign-in integration, enabled after OAuth credentials are configured.
- Session-aware protected account page that waits for session loading.
- Toast success/error feedback.
- JWT-authenticated API connection check.

## Run locally

1. Run `npm install` if dependencies are not installed.
2. Copy `.env.example` to `.env.local` if it does not already exist.
3. Configure and start the sibling Express server using its README.
4. Run `npm run dev` and visit http://localhost:3000.

Checks: `npm run lint` and `npm run build`.

## Client pages and features

- Community home page with banner, features, recent events, gallery and newsletter design.
- Upcoming events with title/location search and category filters.
- Public event details and authenticated joining controls.
- Create/update event forms with future-date validation.
- Manage events with edit links and delete confirmation.
- Joined events ordered by date.
- Editable profile, account dropdown and logout.
- Saved light/dark theme, loading skeletons, empty states and error recovery.

The client screens and API calls are implemented. Event operations still need the server endpoints described in `API-CONTRACT.md`. Live registration, session persistence, profile updates, Google login and event CRUD/joining need end-to-end testing after database and server setup. The newsletter is a visual section only, as permitted by the assignment. Static illustrative photographs use Unsplash image URLs; event thumbnails come from the database. Deployment and the live URL are still pending.

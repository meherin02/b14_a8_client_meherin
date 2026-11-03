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

This is the setup/authentication stage. Event features, profile editing, theme switching, and deployment remain to be implemented. Live registration, session persistence, and Google login require MongoDB/OAuth configuration and end-to-end testing.

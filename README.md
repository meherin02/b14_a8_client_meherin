# Community Events

Community Events brings local volunteering opportunities into one place. Find a cause you care about, join an upcoming event, or organize something for your neighborhood—from a park cleanup to a clothing donation drive.

**[Live website](https://communityevents-mauve.vercel.app/)** · **[Server repository](https://github.com/meherin02/b14_a8_server_meherin)**

## Features

- Browse upcoming events, search by title or location, and filter by category.
- Read event details before signing in, then log in to join.
- Create events with a description, photo, location, category, and future date.
- Edit or delete events you organize from Manage Events.
- Keep track of your joined events in date order.
- Register with email and password or sign in with Google. Existing users can connect Google from their profile.
- Update your profile name and picture.
- Switch between light and dark themes, with your preference saved for your next visit.

The home page includes up to six upcoming events, a community gallery, and a newsletter section. The newsletter is a visual preview and does not collect subscriptions. Loading skeletons, toast messages, and empty states explain what is happening throughout the app. The layout adapts to phones, tablets, and desktops, with subtle scroll effects that respect reduced-motion preferences.

## Built with

| Part | Tools |
| --- | --- |
| Frontend | Next.js App Router, React, JavaScript |
| Styling | Tailwind CSS, DaisyUI |
| Authentication | BetterAuth |
| Notifications | Sonner |
| Backend | Express, MongoDB, JWT |
| Hosting | Vercel and Render |

## Run locally

You will need Node.js 24 and the separate API running on port 5000. Follow the [server setup guide](https://github.com/meherin02/b14_a8_server_meherin#readme) first.

1. Clone this repository and install dependencies:

   ```sh
   git clone https://github.com/meherin02/b14_a8_client_meherin.git
   cd b14_a8_client_meherin
   npm ci
   ```

2. Copy `.env.example` to `.env.local` and use these local settings:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   BACKEND_URL=http://localhost:5000
   ```

3. Start the client:

   ```sh
   npm run dev
   ```

4. Open [localhost:3000](http://localhost:3000). Keep the API running while using the app.

Database credentials and authentication secrets belong in the server environment, never in this client repository.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check the source with ESLint |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |

## Deployment

On Vercel, set `BACKEND_URL=https://community-events-api-r0ne.onrender.com` before building. Production requests go through the website's `/api` routes to the Express server, so authentication cookies stay on the website domain.

On Render, both `CLIENT_URL` and `BETTER_AUTH_URL` should be `https://communityevents-mauve.vercel.app`. Servers sharing an authentication database must use the same `BETTER_AUTH_SECRET` so existing signing keys remain readable.

Configure these production entries in the Google OAuth client:

- Authorized JavaScript origin: `https://communityevents-mauve.vercel.app`
- Authorized redirect URI: `https://communityevents-mauve.vercel.app/api/auth/callback/google`

Keep local OAuth entries if you also develop locally. Redeploy after changing environment variables, then check login, private-page refresh, event management, and joining on the live site.

## More details

- [API contract](API-CONTRACT.md)
- [Live API health](https://community-events-api-r0ne.onrender.com/api/health)

The gallery uses Unsplash photos. Event photos come from the image URLs supplied by organizers.

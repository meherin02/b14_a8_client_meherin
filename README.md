# Community Events

A community service platform for discovering, organizing, and joining social development events.

**Live website:** [communityevents-mauve.vercel.app](https://communityevents-mauve.vercel.app/)

**API health:** [community-events-api-r0ne.onrender.com/api/health](https://community-events-api-r0ne.onrender.com/api/health)

## Features

- Browse upcoming community events, search by title or location, and filter by event type.
- View public event details, including the date, location, description, and thumbnail.
- Register and log in with email/password or Google. Existing users can connect Google from their profile.
- Create events with required fields and future-date validation.
- Manage your own events with editing and a delete confirmation dialog; the API enforces organizer ownership.
- Join events and view your joined events in date order. The API rejects duplicate registrations.
- Update your profile name and picture.
- Switch between light and dark themes, with your choice saved in the browser.
- View loading skeletons, empty states, toast feedback, and error recovery controls.
- Explore a home page with a banner, application features, six upcoming events, an illustrative gallery, and a newsletter design.

The newsletter is a design section only. Gallery images use Unsplash image URLs; event thumbnails use the organizer's submitted image URL.

## Stack

Next.js App Router, JavaScript, Tailwind CSS, DaisyUI, BetterAuth, and Sonner. The separate backend uses Express, MongoDB, the BetterAuth MongoDB adapter, and JWT validation.

## Run locally

1. Install Node.js 24 and run `npm ci` inside this client repository.
2. Copy `.env.example` to `.env.local` if that file does not already exist.
3. Keep `NEXT_PUBLIC_API_URL=http://localhost:5000` for local development.
4. Configure and start the separate Express server using that repository's README.
5. Run `npm run dev` and open `http://localhost:3000`.

Never put MongoDB credentials, the Google client secret, or `BETTER_AUTH_SECRET` in the client environment.

## Production configuration

The client is hosted on Vercel and the API on Render. Production requests use the website's `/api` paths, which Next.js proxies to the API so authentication cookies belong to the website domain.

Set this variable on the client host **before building**:

```env
BACKEND_URL=https://community-events-api-r0ne.onrender.com
```

On the server host, set both `CLIENT_URL` and `BETTER_AUTH_URL` to `https://communityevents-mauve.vercel.app`. Servers sharing the same authentication database must use the same `BETTER_AUTH_SECRET`, including the secret used to encrypt its existing JWT keys.

Google OAuth configuration:

- Authorized JavaScript origin: `https://communityevents-mauve.vercel.app`
- Authorized redirect URI: `https://communityevents-mauve.vercel.app/api/auth/callback/google`

Keep local OAuth entries if you also use local development. Rebuild/redeploy after changing production environment variables.

## Checks

```sh
npm run lint
npm run build
```

After deployment, check login, private-page refresh, Google login, profile editing, event creation/update/deletion, joining, and ownership restrictions on the live website.

See [API-CONTRACT.md](API-CONTRACT.md) for the routes and data format used by the client.

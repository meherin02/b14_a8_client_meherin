# API expected by the client

Base URL: `NEXT_PUBLIC_API_URL`, default `http://localhost:5000`.
The client sends cookies. Protected requests also send a JWT obtained through BetterAuth's `/api/auth/token` endpoint.

## Event fields

```json
{
  "_id": "MongoDB object ID as a string",
  "title": "Neighborhood cleanup",
  "description": "Meeting point, tasks and what volunteers should bring.",
  "type": "Cleanup",
  "image": "https://example.com/event.jpg",
  "location": "Mirpur 10, Dhaka",
  "date": "2026-12-20T00:00:00.000Z",
  "creatorEmail": "organizer@example.com"
}
```

Types: Cleanup, Plantation, Donation, Education, Other.

| Method | Route | Response / purpose |
| --- | --- | --- |
| GET | `/api/events` | `{ "events": [...] }`; future events sorted by date |
| GET | `/api/events?limit=6` | Same shape, future events sorted by date with MongoDB `.limit(6)` |
| GET | `/api/events/:id` | `{ "event": {...} }`; public details |
| GET | `/api/events/mine` | `{ "events": [...] }`; authenticated creator's events |
| POST | `/api/events` | Create from form fields; protected |
| PATCH | `/api/events/:id` | Update form fields; authenticated owner only |
| DELETE | `/api/events/:id` | Delete; authenticated owner only |
| POST | `/api/registrations` | Body `{ "eventId": "..." }`; protected, reject duplicate/past joins |
| GET | `/api/registrations/me` | `{ "events": [...] }`; joined events including event details, sorted by date |
| GET | `/api/config` | `{ "googleEnabled": true/false }` |

Create/update body fields: title, description, type, image, location, date (`YYYY-MM-DD`). Derive creator identity from the verified session on the server, never from an email in request JSON. Validate future dates, fields, ownership, IDs, and registration permissions on the server. Register `/mine` before `/:id` in Express.

Mutation success responses must use JSON. Return a non-2xx status with `{ "message": "Helpful error text" }` on failure. Return 404 for missing events and 409 for duplicate joins. Deleting an event should remove associated registrations.

These event endpoints are not implemented in the setup-stage server yet. Until connected, event areas show loading/error states and cannot save or join real events. BetterAuth handles profile updates through its own API.

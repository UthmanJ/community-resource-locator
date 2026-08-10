# Community Resource Locator

A full-stack, map-based web app for discovering and sharing local community resources — clinics, ICT centers, libraries, NGOs, schools, and more. Built to make it easy for anyone to find (or contribute) essential services in their area.

## Overview

Many communities lack a simple, centralized way to discover local services. This app lets anyone browse an interactive map of submitted resources, filter by category, and contribute new ones — turning it into a living, community-maintained directory.

## Features

- **Interactive map** — all resources plotted as clickable markers (powered by Leaflet + OpenStreetMap, no API key required)
- **Category filtering** — browse by Clinic, ICT Center, Library, NGO, School, and more
- **Add a resource** — full submission form with click-to-set-location on the map
- **Resource detail pages** — full info including contact details and who submitted it
- **Delete resources** — basic moderation support
- **Fully responsive** — works on mobile and desktop

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Leaflet + React-Leaflet
- React Router

**Backend**
- Node.js + Express
- MongoDB + Mongoose

## Project Structure
community-resource-locator/
├── client/
│ └── src/
│ ├── components/ # LocationPicker, ResourceMap, AddResourceForm,
│ │ # ResourceListItem, CategoryFilter
│ ├── pages/ # ResourceDetail
│ ├── services/ # API layer
│ └── App.jsx
│
├── server/
│ └── src/
│ ├── models/ # Resource
│ ├── controllers/ # resourceController
│ ├── routes/ # resourceRoutes
│ ├── config/ # Database connection
│ └── server.js

## Getting Started

### Prerequisites
- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### 1. Clone the repository
```bash
git clone https://github.com/UthmanJ/community-resource-locator.git
cd community-resource-locator
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server`:
MONGODB_URI=your_mongodb_connection_string
PORT=5000

```bash
npm run dev
```
Server runs at `http://localhost:5000`.

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources` | Get all resources (optional `?category=` filter) |
| GET | `/api/resources/:id` | Get a single resource |
| POST | `/api/resources` | Create a new resource |
| DELETE | `/api/resources/:id` | Delete a resource |

## Author

**Usman Ja'afar Shehu**
[BeeWave Tech Solutions](https://github.com/UthmanJ)
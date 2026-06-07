# WorldWise 🌍

> 📚 Built while following Jonas Schmedtmann's "The Ultimate React Course" on Udemy.
> The app concept and design are his — every line of implementation, the GitHub
> workflow around it, and any extensions are mine.

A world travel tracker where you can log every city you've visited, add personal
notes about your experience, and see your entire journey plotted on an interactive map.
Built to learn and practice React's core patterns in a real-world scenario.

---

## 🧠 What I Actually Learned Building This

This isn't just a course project I copied — it's where these concepts finally clicked for me:

- **React Router v6** — nested routes, dynamic segments, protected routes, and the
  `<Outlet>` pattern for shared layouts
- **Context API** — lifting state globally without prop drilling across deeply nested components
- **useReducer** — managing complex city state (add, delete, loading, error) in one
  place instead of scattered `useState` calls
- **Side effects** — fetching city data from an API on route change using `useEffect`
  with proper cleanup and AbortController
- **Performance** — `memo`, `useMemo`, `useCallback` to prevent unnecessary re-renders
  on the map component

---

## ✨ Features

- 🗺️ Interactive world map — click anywhere to log a new city visit
- 🏙️ City list with date visited and personal notes
- 📍 Auto reverse-geocoding — click the map and it fills in the city and country for you
- 🔐 Fake authentication with protected routes — redirects you if you're not logged in
- 🌐 Persistent city data via JSON server (local) or static import (deployed)

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css3&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/mohammed-abdelwhab/worldwise-spa.git
cd worldwise-spa

# Install dependencies
npm install

# Run the fake API (cities data)
npm run server

# In a separate terminal, run the app
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> **Demo login:** email: `jack@example.com` · password: `qwerty`

---

## 📁 Project Structure

```
src/
├── pages/              # Route-level components (one per page)
│   ├── Homepage.jsx
│   ├── Login.jsx
│   ├── AppLayout.jsx
│   ├── CityList.jsx
│   ├── City.jsx
│   └── NotFound.jsx
├── components/         # Reusable UI components
│   ├── Map/
│   ├── CityItem/
│   ├── CountryList/
│   ├── Navbar/
│   └── ...
├── contexts/
│   └── CitiesContext.jsx   # Global state with useReducer
├── hooks/
│   └── useGeolocation.js   # Custom hook for user position
├── App.jsx                 # Router config and route protection
└── main.jsx
```

---

## 🗺️ Route Structure

```
/                         → Homepage (public)
/login                    → Login page (public)
/app                      → AppLayout (protected)
  /app/cities             → City list (default)
  /app/cities/:id         → Single city detail
  /app/countries          → Countries visited
  /app/form               → Add new city form
*                         → 404 Not Found
```

---

## 📈 GitHub Stats

<div align="center">

![Mohammed's GitHub Stats](https://github-readme-stats.vercel.app/api?username=mohammed-abdelwhab&show_icons=true&theme=tokyonight&hide_border=true)

</div>

---

## 📝 Course Credit

**Course:** [The Ultimate React Course 2024](https://www.udemy.com/course/the-ultimate-react-course/) by Jonas Schmedtmann
**What's mine:** The implementation, the GitHub workflow, any extensions beyond the course, and all the documentation.

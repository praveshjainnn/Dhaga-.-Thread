# <p align="center"><img align="center" width="90" src="screenshots/logo.png"/><br>Dhaga.Thread</p>
<h2 align="center">A Premium Digital Ecosystem for India's Wool Shepherds, Artisans, and Buyers</h2>
<hr>

<p align="center">
  <b>Dhaga.Thread</b> is a comprehensive, role-based mobile web application designed to streamline, track, and digitize the wool supply chain in India — from shearing and sorting to quality testing, trading, and final fabric creation. Supported by the <b>Ministry of Textiles, Government of India</b>, the platform empowers shepherds, weavers, logistics managers, and veterinary service providers through a unified visual interface.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-SIH%20Winner-gold?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Platform-Web%20%7C%20Mobile-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Multilingual-8+%20Languages-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge"/>
</p>

---

## 🛠️ System Architecture

**Dhaga.Thread** is built on a robust Model-View-Controller (MVC) architecture, designed for lightweight mobile performance and seamless integration with cloud database and authentication services.

```mermaid
graph TD
    %% Styling
    classDef client fill:#FAFAF8,stroke:#C5A880,stroke-width:2px,color:#2B2B2A;
    classDef server fill:#FAFAF8,stroke:#4E5D4C,stroke-width:2px,color:#2B2B2A;
    classDef db fill:#FAFAF8,stroke:#9C3D37,stroke-width:2px,color:#2B2B2A;

    subgraph Client ["Client Interface (Mobile-First EJS)"]
        A["Mobile Viewport (Bootstrap 5 + Splide.js)"]:::client
        B["Ivory & Gold Serif Design System (serif.css)"]:::client
        C["Dynamic Elements (Interactive Roadmap Stepper, Filters)"]:::client
    end

    subgraph Server ["Express.js App Engine (Node.js)"]
        D["Router Controller (routes/index.js)"]:::server
        E["Dynamic Page Renderer (EJS View Engine)"]:::server
        F["Supabase Client Wrapper (src/db/supabase.js)"]:::server
        G["Mock Auth Middleware (Local Demo Mode Fallback)"]:::server
    end

    subgraph Cloud ["Supabase Backend-as-a-Service"]
        H["Go/SQL Auth Services"]:::db
        I["PostgreSQL Database (tables: profiles, meetings)"]:::db
    end

    %% Interactions
    A -->|1. Route Navigation| D
    D -->|2. Check Env / Init| F
    F -->|3a. Credentials Found (Prod)| Cloud
    F -->|3b. Credentials Missing (Local)| G
    G -->|4a. Set Mock Session Cookies| A
    Cloud -->|4b. Return JWT Session & User Metadata| F
    F -->|5. Pass DB context| E
    E -->|6. Render Styled HTML + Ivory Loader| A
```

---

## ✨ Key Features

### 1. 🛒 WoolKart Marketplace & Checkout
- **Premium Showcase**: High-resolution generated images showcasing premium raw wools (Alpaca, Vicuna) and finished garments.
- **Client-Side Filters**: Instant, modern filter chips (All, Raw Wool, Finished Goods) in the brand's Ivory and Gold theme.
- **Dynamic Checkout**: Interactive quantity calculator, unit cost multiplication, and instant total price estimation.
- **Wallet PIN Verification**: Simulates secure escrow account payments (demo PIN code: `1111`) with custom success and error modals.

### 2. 🗺️ Responsive Learning Roadmap
- **Stepped Timeline Progress**: Replaces fragile point maps with a clean, fully responsive vertical roadmap timeline showing modular breeding, shearing, grading, and marketing modules.
- **Status Indicators**: Tracks completed modules with checkmarks, highlights active lessons with pulsing gold rings, and locks upcoming lessons with elegant icons using browser `localStorage` persistence.
- **Video Modals & Meeting Booking**: Launch inline video playback modals directly from timeline checkpoints, book expert classes, and join video consultations integrated with Jitsi Meet.

### 3. 🛡️ Professional Services Portal
- **Sleek Veterinary Scheduling**: Request urgent or routine animal checkups, complete with modern banner assets and clear cost estimates.
- **Support Modules**: Register for government insurance schemes, check nearby sorting centers, schedule transport logistics, or hire shearing teams.
- **Ivory Loading Screen**: A customized screen loader that provides feedback for network requests without blocking the interface.

---

## ⚡ Supabase Authentication & Database Integration

**Dhaga.Thread** is production-ready. By setting up environment variables, the system automatically transitions from local demo fallback into an active Supabase cloud instance.

### 1. Environment Variable Configuration
To activate the cloud integration, create a `.env` file in the root directory:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

### 2. Supabase PostgreSQL Tables Schema
Create the following tables in the Supabase SQL Editor:

#### `profiles` Table (User profiles and roles)
```sql
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text not null,
  role text not null default 'farmer',
  progress int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id);
```

#### `meetings` Table (Expert Consultations and Schedules)
```sql
create table public.meetings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  expert_name text not null,
  topic text not null,
  scheduled_time timestamp with time zone not null,
  meet_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.meetings enable row level security;

create policy "Users can view and manage their own meetings." on public.meetings
  for all using (auth.uid() = user_id);
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | EJS, CSS3, SASS, Bootstrap 5, Splide.js |
| **Backend** | Node.js, Express.js |
| **Database** | Supabase (PostgreSQL) / MongoDB (Fallback) |
| **Deployment** | Vercel / Render / Heroku |

---

## 🚀 How to Run Locally

### Prerequisites
- Install **NodeJS** (v18+) from the [Official NodeJS Website](https://nodejs.org/).
- Ensure **git** is installed on your local machine.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/praveshjainnn/Dhaga-.-Thread.git
   cd Dhaga-.-Thread
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Express Server**
   ```bash
   npm start
   ```

4. **Explore the App**
   Open your browser and navigate to **`http://localhost:4000`**. 
   
   > 📱 *Note: Since Dhaga.Thread is designed as a premium mobile web portal, enable the device emulator (Ctrl+Shift+M or Cmd+Shift+M in Chrome DevTools) and select a mobile viewport (e.g. iPhone 12/14 Pro) for the best experience.*

---

## 🔑 Demo Logins

Try the live platform without registering (in local demo mode):

| Role | Email | Password |
|---|---|---|
| 🐑 Farmer | `farmer@admin.com` | `1234@` |
| 🎓 Teacher | `teacher@admin.com` | `1234@` |
| 🚛 Transport | `transport@admin.com` | `1234@` |

---

## 🌐 Project Structure

```
dhaga-thread/
├── views/           # EJS templates & layouts
├── public/          # Static assets (custom CSS, JS, images)
├── routes/          # Express route handlers (MVC Controllers)
├── models/          # Schema definitions
├── src/             # Source logic (DB connections & Supabase service)
└── app.js           # Express Application entry point
```

---

<p align="center">
  <i>"Most shepherds in India rear sheep not by choice, but due to lack of alternatives.<br/>
  Dhaga.Thread is built to change that — one thread at a time."</i>
</p>

<p align="center">🧶 Dhaga.Thread — Spinning India's Wool Future 🧶</p>

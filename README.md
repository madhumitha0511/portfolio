# Ram & Madhumitha – 3D Portfolio

A modern 3D, animation‑driven portfolio website built with a full‑stack JavaScript stack, designed to showcase projects, skills, and experience for recruiters and business owners.

## 🚀 Tech Stack

- **Frontend**: React, Three.js / React Three Fiber, Framer Motion (or GSAP) for subtle 3D and motion effects  
- **Backend**: Node.js, Express  
- **Database**: Neon PostgreSQL  
- **Deployment**: Render (web service + database)  
- **Other**: REST APIs, Git & GitHub for version control, CI/CD ready

_Update this section with the exact libraries you end up using for 3D, UI, and state management._

## 🎯 Project Goals

- Present a **premium** and **clean** personal brand for both profiles in a single dynamic site.  
- Make it easy for recruiters and business owners to:
  - Understand who you are in under 10 seconds.
  - Scan skills, projects, and experience quickly.
  - Contact or schedule a call with minimum friction.

## 🧩 Core Features

- Dual‑profile layout: separate sections/pages for each of us with consistent design.
- 3D hero section with interactive but subtle animations (no heavy or distracting effects).
- Responsive design for desktop, tablet, and mobile.
- Projects section with:
  - Short problem → solution → impact breakdown.
  - Tech stack badges and quick links (GitHub, live demo, case studies).
- Experience & leadership section tailored for:
  - Hiring managers (skills, responsibilities, outcomes).
  - Clients (what we can build for them, proof of work).
- Contact section with:
  - Email, LinkedIn, and a simple contact form.
  - Clear CTA (e.g., “Hire for internship”, “Book a project discussion”, etc.)

_Add / remove bullets as your actual implementation evolves._

## 📂 Project Structure

```bash
root/
├─ client/              # React frontend
│  ├─ src/
│  │  ├─ components/    # Reusable UI & 3D components
│  │  ├─ pages/         # Main pages (Home, About, Projects, Contact)
│  │  ├─ hooks/         # Custom hooks (e.g., animations, viewport)
│  │  ├─ styles/        # Global and modular styles
│  │  └─ utils/         # Helpers (constants, formatters)
│  └─ public/           # Static assets (icons, models, images)
├─ server/              # Node + Express backend
│  ├─ src/
│  │  ├─ routes/        # API routes (contact form, etc.)
│  │  ├─ controllers/   # Route handlers / business logic
│  │  ├─ models/        # DB models / queries (PostgreSQL)
│  │  └─ config/        # DB + env config
├─ README.md
└─ package.json

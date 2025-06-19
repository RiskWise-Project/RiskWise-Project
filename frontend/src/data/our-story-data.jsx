import { UserRound, Landmark } from "lucide-react";

export const teamMembers = [
  {
    name: "John Mark Flameño",
    role: "Lead Developer & BSED Student",
    icon: UserRound,
  },
  {
    name: "Tita Marcia Adriano",
    role: "Project Mentor & Adviser",
    icon: UserRound,
  },
  {
    name: "DHVSU Safety Office",
    role: "Field Partner & Pilot Implementer",
    icon: Landmark,
  },
];

export const projectTimeline = [
  {
    title: "Planning & Setup",
    date: "May 2025",
    items: [
      "Finalize project scope and MVP",
      "Define key features (must-haves vs. nice-to-haves)",
      "Choose stack (React + Firebase)",
      "Setup GitHub, Firebase backend, PWA boilerplate",
      "Deliverables: Prototype, Tech stack ready",
    ],
  },
  {
    title: "Authentication & PWA Base",
    date: "June 2025",
    items: [
      "User roles: reporter, admin",
      "Firebase Auth + installable PWA setup",
      "Deliverables: Working auth + installable app",
    ],
  },
  {
    title: "Risk Reporting (Frontend + Backend)",
    date: "July 2025",
    items: [
      "Form: photo, geolocation, category, description",
      "Offline persistence via IndexedDB",
      "Deliverables: Offline-capable report submission",
    ],
  },
  {
    title: "Admin Dashboard & Notifications",
    date: "August 2025",
    items: [
      "Admin report view with filters",
      "Push alerts using Firebase Cloud Messaging",
      "Deliverables: Dashboard + real-time alerts",
    ],
  },
  {
    title: "AI Categorization & Severity Scoring",
    date: "September 2025",
    items: [
      "ML model for category prediction",
      "Severity scoring based on likelihood × impact",
      "Deliverables: Smart categorization + scoring engine",
    ],
  },
  {
    title: "Analytics & Final QA",
    date: "October 2025",
    items: [
      "Charts and timeline for admin insights",
      "Manual testing + deployment",
      "Deliverables: Analytics + Production-ready build",
    ],
  },
];

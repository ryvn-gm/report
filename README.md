# GoMore Progress Report Portal

An interactive web-based progress reporting system for tracking and presenting project updates at GoMore. Each page in this application represents a progress report session, featuring rich interactive visualizations and data presentations.

## Purpose

This repository serves as a centralized platform for:

- **Progress Tracking**: Document and visualize project milestones, achievements, and ongoing work
- **Interactive Presentations**: Create engaging, web-based reports with charts, demos, and live data
- **Historical Archive**: Maintain a chronological record of all progress reports for reference
- **Team Collaboration**: Share progress updates with stakeholders through accessible web pages

## Project Structure

```
├── src/app/                    # Next.js App Router pages
│   ├── page.tsx               # Home page with report index
│   └── [report-name]/         # Individual report pages
├── docs/                       # Documentation and report templates
│   ├── templates/             # Reusable report templates
│   └── guides/                # Guidelines for creating reports
└── public/                     # Static assets
```

## Report Naming Convention

Reports follow the format: `MM-DD-[topic]-progress-report`

Example: `01-30-slm-progress-report`

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the report portal.

## Creating New Reports

1. Create a new folder in `src/app/` with the report name
2. Add a `page.tsx` file with your report content
3. Reference templates from `docs/templates/` for consistent styling
4. Add any supporting materials to `docs/`

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: TypeScript

## Deployment

This project is designed to be deployed on [Vercel](https://vercel.com) for easy access and sharing.

# Pomodoro Timer with Daily History

A modern, premium Pomodoro Timer web application built with vanilla web technologies. Designed to help you maintain focus with customizable work and break intervals, complete with daily history tracking.

## Features

- **Customizable Timers**: Set your preferred focus and break durations (default 25/5).
- **Auto-Transitions**: Seamlessly flows from focus to break mode and vice versa.
- **Visual Feedback**: Distinct glassmorphism UI styles for focus and break states.
- **Audio Notifications**: Plays a sound when a session completes.
- **Daily History Tracking**: Automatically logs completed focus sessions to `localStorage`.
- **Smart Reset**: History automatically clears when a new calendar day begins.
- **Responsive & Accessible**: Optimized for mobile and desktop, with full keyboard navigation and screen reader support.

## Project Structure

```
pomodoro-timer/
├── index.html     # Semantic HTML structure
├── style.css      # Premium glassmorphism UI & responsive design
├── script.js      # Timer logic, state management, and localStorage
├── ding.mp3       # Audio notification sound
├── README.md      # Project documentation
└── ANSWERS.md     # Engineering decisions and Q&A
```

## Tech Stack

- **HTML5**: Semantic tags, accessibility (ARIA) attributes.
- **CSS3**: Custom properties (variables), Flexbox, CSS transitions, Glassmorphism.
- **Vanilla JavaScript (ES6+)**: DOM manipulation, Intervals, LocalStorage, Web Audio API fallback.

## How to Run Locally

1. Clone or download this repository.
2. Open the folder in your terminal or file explorer.
3. Open `index.html` directly in your browser. (Alternatively, you can run a local server using `npx serve` or VS Code Live Server for the best experience).

## Deployment Instructions

This project is entirely static and requires no build step.

### Deploying on Vercel

1. Create a GitHub repository and push this code.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Leave the Framework Preset as `Other` and click **Deploy**.

### Deploying on Netlify

1. Log in to [Netlify](https://netlify.com/) and go to your dashboard.
2. Click **Add new site** -> **Import an existing project**.
3. Connect your GitHub account and select the repository.
4. Leave the build command and publish directory empty.
5. Click **Deploy site**.

## Deployed URL

*Placeholder: [https://your-pomodoro-demo.vercel.app](https://your-pomodoro-demo.vercel.app)*

## Accessibility Notes

- **Keyboard Navigation**: All interactive elements (buttons, inputs) are fully keyboard accessible with clear `:focus-visible` outlines.
- **ARIA Labels**: Used to provide context for icon buttons and screen readers.
- **Color Contrast**: Backgrounds and text meet WCAG contrast guidelines.
- **Semantic HTML**: Proper heading hierarchy and semantic tags (`<header>`, `<main>`, `<section>`).

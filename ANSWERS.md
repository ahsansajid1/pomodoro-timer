# Engineering Questions & Answers

### 1. How to run
To run the project locally, you don't need any complex build tools. Simply clone the repository and open `index.html` in your favorite web browser. For an optimal development experience, especially regarding CORS with audio files, I recommend using a local development server like VS Code's "Live Server" extension or running `npx serve` in the project directory.

### 2. Stack & design choices
**Tech Stack**: I deliberately chose purely Vanilla HTML, CSS, and JavaScript. While frameworks like React are powerful, they introduce unnecessary overhead for a single-screen application with relatively simple state. Vanilla JS keeps the bundle size negligible, ensures lightning-fast load times, and demonstrates a deep understanding of core web APIs.

**Design Choices**: I went with a modern "glassmorphism" aesthetic. The dark, frosted glass card against a deep, subtly gradient background gives the app a premium, portfolio-quality feel. I used color psychology to differentiate states: a soft red glow for "Focus" to signal importance, and a calming green glow for "Break". The timer text is rendered with a tabular-nums font setting to prevent annoying layout shifts as the seconds tick down.

### 3. Responsive & accessibility
**Responsiveness**: The layout utilizes CSS Flexbox and responsive max-widths. On mobile devices, the typography scales down proportionally, and the padding adjusts to maximize screen real estate while maintaining the card's integrity.

**Accessibility**: Web accessibility was treated as a first-class citizen. I implemented robust semantic HTML (`<main>`, `<header>`). All buttons have explicit `aria-label` attributes to aid screen readers. I also added high-contrast `:focus-visible` states to ensure the application is completely navigable via keyboard without relying solely on hover states. 

### 4. AI usage
I utilized AI tools in a targeted manner to accelerate development without compromising my architectural control. Specifically, I used AI to brainstorm robust timer interval logic, get a refresher on the cleanest way to handle date-based expiration with `localStorage`, and gather ideas for the glassmorphism CSS layout.

**Manual Improvement**: The AI-generated code for the timer audio simply relied on playing a `ding.mp3` file. I noticed that if the file failed to load (or was missing), the app would silently fail at a critical UX moment. I manually implemented a Web Audio API fallback—an oscillator that generates a pleasant sine-wave "ding"—ensuring the user always gets notified when their session ends, regardless of network or file issues.

### 5. Honest gap
One realistic area for improvement is handling browser throttling. Modern browsers heavily throttle `setInterval` when the tab is inactive (in the background) to save battery. This can cause the timer to drift or delay slightly over a 25-minute period. If I had more time, I would refactor the timer logic to calculate the remaining time based on absolute timestamps (`Date.now()`) rather than relying purely on a 1000ms tick count, ensuring pinpoint accuracy even when the app is backgrounded.

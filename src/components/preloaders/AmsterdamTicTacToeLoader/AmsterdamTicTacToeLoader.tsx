import { Paragraph } from '@amsterdam/design-system-react';
import { useId } from 'react';

/**
 * Props for the AmsterdamTicTacToeLoader component.
 */
interface AmsterdamTicTacToeLoaderProps {
  /** CSS duration string (e.g., '8s', '5000ms'). Default is '8s'. */
  duration?: string;
  /** Whether to show the Tic-Tac-Toe grid lines. Default is true. */
  showGrid?: boolean;
  /** Theme of the spinner. 'auto' follows system preferences. Default is 'light'. */
  theme?: 'light' | 'dark' | 'auto';
  /** Optional class name for the wrapper. */
  className?: string;
  /** Size of the spinner. Number (px) or CSS string. Default is 140. */
  size?: number | string;
}

/**
 * AmsterdamTicTacToeLoader: A reusable TypeScript React component.
 * * Implements a Tic-Tac-Toe victory sequence (Amsterdam crosses)
 * with gravity-defying 'O' markers and celebratory pulses.
 */
const AmsterdamTicTacToeLoader = ({
  duration = '8s',
  showGrid = true,
  theme = 'light',
  className = '',
  size = 140,
}: AmsterdamTicTacToeLoaderProps) => {
  const id = useId().replace(/:/g, ''); // Generate unique ID for scoped keyframes

  const formattedSize = typeof size === 'number' ? `${size}px` : size;

  // Scoped CSS styles to mimic a CSS Module with dynamic variables
  const styles = `
    .ams-spinner-${id} {
      --ams-red: #EC1C24;
      --text-color: #333;
      --grid-color: rgba(0, 0, 0, 0.08);
      --duration: ${duration};
      --size: ${formattedSize};
      
      align-items: center;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      gap: var(--ams-space-m);
    }

    /* Accessibility: Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      .ams-spinner-${id} {
        --duration: 0s !important;
      }
      .ams-spinner-${id} * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }
    }

    /* Theme Logic */
    .ams-spinner-theme-dark-${id} {
      --text-color: #e0e0e0;
      --grid-color: rgba(255, 255, 255, 0.1);
    }

    /* Auto: System Preference OR Class-based */
    @media (prefers-color-scheme: dark) {
      .ams-spinner-theme-auto-${id} {
        --text-color: #e0e0e0;
        --grid-color: rgba(255, 255, 255, 0.1);
      }
    }
    
    :where(.dark) .ams-spinner-theme-auto-${id} {
      --text-color: #e0e0e0;
      --grid-color: rgba(255, 255, 255, 0.1);
    }

    .ams-spinner-theme-light-${id} {
      --text-color: #333;
      --grid-color: rgba(0, 0, 0, 0.08);
    }

    .spinner-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      user-select: none;
    }

    .board-container {
      position: relative;
      width: var(--size);
      height: var(--size);
      overflow: hidden;
      border-radius: 8px;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 10%; /* Relative gap */
      width: 100%;
      height: 100%;
      position: relative;
    }

    /* Grid Lines */
    .has-grid::before,
    .has-grid::after {
      content: '';
      position: absolute;
      background: var(--grid-color);
      z-index: 0;
      opacity: 0;
      animation: gridFade-${id} var(--duration) infinite;
    }

    .has-grid::before {
      width: 2px;
      height: 100%;
      left: calc(33.33% - 1px);
      box-shadow: calc(var(--size) / 3 + 1px) 0 0 var(--grid-color);
    }

    .has-grid::after {
      height: 2px;
      width: 100%;
      top: calc(33.33% - 1px);
      box-shadow: 0 calc(var(--size) / 3 + 1px) 0 var(--grid-color);
    }

    .cell {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    /* Marks scale relative to size */
    .mark-x {
      width: calc(var(--size) / 6);
      height: calc(var(--size) / 6);
      position: relative;
      opacity: 0;
      transform-origin: center;
    }
    .mark-x::before, .mark-x::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: calc(var(--size) / 28); /* Match O border thickness */
      background-color: var(--ams-red);
      border-radius: 2px;
    }
    .mark-x::before { transform: translateY(-50%) rotate(45deg); }
    .mark-x::after { transform: translateY(-50%) rotate(-45deg); }

    .mark-o {
      width: calc(var(--size) / 6.5);
      height: calc(var(--size) / 6.5);
      border: calc(var(--size) / 28) solid var(--text-color);
      border-radius: 50%;
      box-sizing: border-box;
      opacity: 0;
    }

    /* Animation assignments */
    .x1 { animation: cheerX1-${id} var(--duration) infinite; }
    .x2 { animation: cheerX2-${id} var(--duration) infinite; }
    .x3 { animation: cheerX3-${id} var(--duration) infinite; }
    .o1 { animation: fallO1-${id} var(--duration) infinite; }
    .o2 { animation: fallO2-${id} var(--duration) infinite; }

    @keyframes cheerX1-${id} {
      0%, 10% { opacity: 0; transform: scale(0.5); }
      11%, 66% { opacity: 1; transform: scale(1); }
      70%, 78%, 86% { opacity: 1; transform: scale(1.3); }
      74%, 82%, 90% { opacity: 1; transform: scale(1); }
      93%, 100% { opacity: 0; transform: scale(1); }
    }

    @keyframes cheerX2-${id} {
      0%, 27% { opacity: 0; transform: scale(0.5); }
      28%, 66% { opacity: 1; transform: scale(1); }
      70%, 78%, 86% { opacity: 1; transform: scale(1.3); }
      74%, 82%, 90% { opacity: 1; transform: scale(1); }
      93%, 100% { opacity: 0; transform: scale(1); }
    }

    @keyframes cheerX3-${id} {
      0%, 45% { opacity: 0; transform: scale(0.5); }
      46%, 66% { opacity: 1; transform: scale(1); }
      70%, 78%, 86% { opacity: 1; transform: scale(1.3); }
      74%, 82%, 90% { opacity: 1; transform: scale(1); }
      93%, 100% { opacity: 0; transform: scale(1); }
    }

    @keyframes fallO1-${id} {
      0%, 18% { opacity: 0; transform: scale(0.5); }
      19%, 62% { opacity: 1; transform: scale(1) translateY(0); }
      70%, 100% { opacity: 0; transform: scale(1) translateY(calc(var(--size) * 1.07)) rotate(45deg); }
    }

    @keyframes fallO2-${id} {
      0%, 36% { opacity: 0; transform: scale(0.5); }
      37%, 62% { opacity: 1; transform: scale(1) translateY(0); }
      70%, 100% { opacity: 0; transform: scale(1) translateY(calc(var(--size) * 1.07)) rotate(-45deg); }
    }

    @keyframes gridFade-${id} {
      0%, 1% { opacity: 0; }
      4%, 90% { opacity: 1; }
      94%, 100% { opacity: 0; }
    }
  `;

  // Combine theme classes
  const themeClass = `ams-spinner-theme-${theme}-${id}`;
  const wrapperClass = ['ams-spinner-' + id, themeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      {/* <Column alignHorizontal="center"> */}
      <style>{styles}</style>
      <div className="spinner-wrap">
        <div className="board-container">
          <div className={`board ${showGrid ? 'has-grid' : ''}`}>
            {/* Row 1 */}
            <div className="cell">
              <div className="mark-o o1" />
            </div>
            <div className="cell">
              <div className="mark-x x2" />
            </div>
            <div className="cell" />

            {/* Row 2 */}
            <div className="cell" />
            <div className="cell">
              <div className="mark-x x1" />
            </div>
            <div className="cell" />

            {/* Row 3 */}
            <div className="cell" />
            <div className="cell">
              <div className="mark-x x3" />
            </div>
            <div className="cell">
              <div className="mark-o o2" />
            </div>
          </div>
        </div>
      </div>

      <Paragraph>Even geduld...</Paragraph>
      {/* </Column> */}
    </div>
  );
};

export default AmsterdamTicTacToeLoader;

/**
 * Application-wide constants and configuration
 */

/**
 * Breakpoint values for responsive design
 * TODO: Consider moving to a theme configuration when implementing a design system
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/**
 * Default animation durations
 */
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Common z-index values
 */
export const Z_INDEX = {
  base: 1,
  dropdown: 1000,
  modal: 2000,
  tooltip: 3000,
} as const; 
import React from 'react';

/**
 * Section primitive — vertical rhythm wrapper for top-level page
 * sections. Standardizes padding scale + tone across the site so that
 * every landing page follows the same vertical rhythm (inspired by
 * Material 3 "large body surface" and Carbon "section" patterns).
 *
 * Uses React.createElement instead of JSX-as for the polymorphic `as`
 * prop to stay compatible with the project's lean ESLint setup (which
 * does not include eslint-plugin-react/jsx-uses-vars).
 */

const TONE = {
  white:  'bg-white text-gray-900',
  muted:  'bg-gray-50 text-gray-900',
  dark:   'bg-gray-900 text-white',
  brand:  'bg-brand-600 text-white',
};

const SPACING = {
  sm: 'py-12 px-4',
  md: 'py-20 px-4',
  lg: 'py-32 px-4',
  xl: 'py-40 px-4',
};

const Section = React.forwardRef(function Section(
  {
    as = 'section',
    tone = 'white',
    spacing = 'lg',
    className = '',
    children,
    ...rest
  },
  ref
) {
  const classes = [
    TONE[tone] || TONE.white,
    SPACING[spacing] || SPACING.lg,
    'relative overflow-hidden',
    className,
  ].join(' ');

  return React.createElement(
    as,
    { ref, className: classes, ...rest },
    children
  );
});

export default Section;

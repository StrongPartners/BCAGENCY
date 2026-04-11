import React from 'react';

/**
 * Badge primitive — small, pill-shaped label used for tags, categories,
 * and status indicators. Semantic variants borrowed from Polaris.
 */

const VARIANT = {
  neutral: 'bg-gray-100 text-gray-700',
  brand:   'bg-brand-100 text-brand-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger:  'bg-red-100 text-red-700',
  info:    'bg-blue-100 text-blue-700',
};

const SIZE = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-3 py-1',
  lg: 'text-sm px-4 py-1.5',
};

const Badge = React.forwardRef(function Badge(
  { variant = 'neutral', size = 'md', className = '', children, ...rest },
  ref
) {
  const classes = [
    'inline-flex items-center gap-1 font-bold rounded-full',
    VARIANT[variant] || VARIANT.neutral,
    SIZE[size] || SIZE.md,
    className,
  ].join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
    </span>
  );
});

export default Badge;

import React from 'react';

/**
 * Container primitive — centered, width-constrained wrapper used inside
 * a <Section>. Provides consistent horizontal gutters across the site.
 */

const MAX_WIDTH = {
  sm:  'max-w-2xl',
  md:  'max-w-4xl',
  lg:  'max-w-6xl',
  xl:  'max-w-7xl',
  full:'max-w-full',
};

const Container = React.forwardRef(function Container(
  { size = 'lg', className = '', children, ...rest },
  ref
) {
  const classes = `container mx-auto ${MAX_WIDTH[size] || MAX_WIDTH.lg} ${className}`;
  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

export default Container;

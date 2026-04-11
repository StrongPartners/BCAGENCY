import React from 'react';
import { motion } from 'framer-motion';

/**
 * Card primitive — soft-elevation surface used for feature tiles,
 * service highlights, blog previews, etc.
 *
 * Pattern borrowed from Carbon's "tile" and Polaris' "Card" components:
 * one generic surface + variants for tone and elevation.
 */

const MotionDiv = motion.div; // hoisted so ESLint sees `motion` used at module scope

const TONE = {
  default: 'bg-white border border-gray-100',
  muted:   'bg-gray-50 border border-gray-100',
  brand:   'bg-brand-50 border border-brand-100',
  dark:    'bg-gray-900 text-white border border-gray-800',
};

const RADIUS = {
  md:   'rounded-2xl',
  lg:   'rounded-3xl',
  xl:   'rounded-[2.5rem]',
  '2xl':'rounded-[3rem]',
};

const PADDING = {
  sm: 'p-6',
  md: 'p-8',
  lg: 'p-10',
  xl: 'p-12',
};

const ELEVATION = {
  0: '',
  1: 'shadow-sm',
  2: 'shadow-md',
  3: 'shadow-lg',
  4: 'shadow-xl',
  5: 'shadow-2xl',
};

const Card = React.forwardRef(function Card(
  {
    tone = 'default',
    radius = 'lg',
    padding = 'md',
    elevation = 1,
    hoverLift = false,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const classes = [
    TONE[tone] || TONE.default,
    RADIUS[radius] || RADIUS.lg,
    PADDING[padding] || PADDING.md,
    ELEVATION[elevation] ?? ELEVATION[1],
    'transition-shadow',
    className,
  ].join(' ');

  if (!hoverLift) {
    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <MotionDiv
      ref={ref}
      whileHover={{ y: -8 }}
      className={`${classes} hover:shadow-xl`}
      {...rest}
    >
      {children}
    </MotionDiv>
  );
});

export default Card;

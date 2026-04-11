import React from 'react';
import { motion } from 'framer-motion';

/**
 * Button primitive.
 *
 * Follows the semantic variant pattern used by Polaris / Primer where
 * the consumer declares *intent* (primary / secondary / ghost / danger)
 * instead of raw Tailwind classes. Sizes follow the Material 3 scale.
 *
 * Supported underlying elements via the `as` prop: 'button' | 'a'.
 * Motion components are pre-created at module scope so React does not
 * warn about creating components during render.
 */

const BASE =
  'inline-flex items-center justify-center gap-2 font-bold rounded-full ' +
  'transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
  'focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed';

const VARIANT = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700 shadow-lg hover:shadow-xl',
  secondary: 'bg-white text-brand-600 border border-brand-600 hover:bg-brand-50',
  ghost:     'bg-transparent text-brand-600 hover:bg-brand-50',
  dark:      'bg-gray-900 text-white hover:bg-gray-800 shadow-lg',
  danger:    'bg-red-600 text-white hover:bg-red-700 shadow-lg',
};

const SIZE = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const MotionButton = motion.button;
const MotionAnchor = motion.a;

const Button = React.forwardRef(function Button(
  {
    as = 'button',
    variant = 'primary',
    size = 'md',
    leadingIcon,
    trailingIcon,
    className = '',
    animate = true,
    children,
    ...rest
  },
  ref
) {
  const classes = `${BASE} ${VARIANT[variant] || VARIANT.primary} ${SIZE[size] || SIZE.md} ${className}`;

  const inner = (
    <>
      {leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
    </>
  );

  // Static (non-animated) paths — one JSX element per supported tag.
  if (!animate) {
    if (as === 'a') {
      return (
        <a ref={ref} className={classes} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <button ref={ref} className={classes} {...rest}>
        {inner}
      </button>
    );
  }

  // Animated paths — motion components are module-level constants.
  if (as === 'a') {
    return (
      <MotionAnchor
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...rest}
      >
        {inner}
      </MotionAnchor>
    );
  }

  return (
    <MotionButton
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...rest}
    >
      {inner}
    </MotionButton>
  );
});

export default Button;

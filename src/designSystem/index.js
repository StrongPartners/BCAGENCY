/**
 * BC Creative Agency — Design System entry point.
 *
 * Inspired by the design systems catalogued in
 * alexpate/awesome-design-systems (Material, Carbon, Polaris, Primer,
 * Atlassian). This barrel re-exports design tokens + UI primitives so
 * consumers can do:
 *
 *   import { Button, Card, Section, Container, Badge, tokens } from '@/designSystem';
 */

export { default as tokens } from './tokens';
export * from './tokens';

export { default as Button }    from './primitives/Button';
export { default as Card }      from './primitives/Card';
export { default as Section }   from './primitives/Section';
export { default as Container } from './primitives/Container';
export { default as Badge }     from './primitives/Badge';

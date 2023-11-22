import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

/**
 * This function works exactly like the classnames function from the classnames
 * library, except that it allows you to override tailwind css classes.
 * See the tailwind-merge readme for more info https://www.npmjs.com/package/tailwind-merge
 */
export const twClassNames: typeof classnames = function (...args) {
  return twMerge(classnames(...args));
};

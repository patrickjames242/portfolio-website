/**
 * This tailwind configuration is the root configuration and is inherited by all
 * the other tailwind configurations in this repo.
 *
 * Add configurations in here that you want to apply to all projects in this repo
 */

const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    // we want to extend tailwind's default colors and not replace it
    extend: {
      colors: {
        current: 'currentColor',
        ['dh-burgundy-light']: colors['red']['700'],
        ['dh-burgundy']: colors['red']['800'],
        ['dh-burgundy-dark']: colors['red']['900'],
        'lr-blue': '#5c3ae5',
        'lr-yellow': '#f0edfa',
        'native-separator-line': '#f0f0f0',
      },
    },
  },
};

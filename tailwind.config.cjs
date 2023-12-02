module.exports = {
  content: ['./(src|public)/**/*.{html,js,jsx,ts,tsx,css,scss}'],
  theme: {
    // we want to extend tailwind's default colors and not replace it
    extend: {
      screens: {
        'project-wide-layout': '650px',
        // => @media (min-width: 650px) { ... }
      },
      colors: {
        current: 'currentColor',
        background: 'rgb(0, 20, 58)',
        'lighter-background': 'rgb(1, 30, 82)',
        accent: 'rgb(227, 99, 39)',
        'light-text': 'rgb(218, 212, 248)',
        'lighter-text': 'rgb(145, 140, 173)',
      },
    },
  },
};

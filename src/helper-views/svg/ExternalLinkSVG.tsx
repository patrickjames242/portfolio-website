import { extend } from 'react-extend-components';

const ExternalLink = extend('svg')((Svg) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
      <path d="M15 3L21 3 21 9"></path>
      <path d="M10 14L21 3"></path>
    </Svg>
  );
});

export default ExternalLink;

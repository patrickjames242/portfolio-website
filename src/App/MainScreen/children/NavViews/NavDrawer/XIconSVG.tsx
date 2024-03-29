import React from 'react';

function XIconSVG(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
      <path
        fillRule="evenodd"
        d="M350 244L242.02 136.02a25.406 25.406 0 00-36.012-.016c-10.012 10.008-9.934 26.062.016 36.012l107.98 107.98-107.98 107.98a25.406 25.406 0 00-.016 36.012c10.008 10.012 26.062 9.934 36.012-.015L350 315.993l107.98 107.98a25.406 25.406 0 0036.012.015c10.012-10.008 9.934-26.062-.016-36.012l-107.98-107.98 107.98-107.98a25.406 25.406 0 00.016-36.012c-10.008-10.012-26.062-9.933-36.012.016z"
      ></path>
    </svg>
  );
}

export default XIconSVG;

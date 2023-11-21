import React from 'react';

function MenuSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="29"
      viewBox="0 0 33 29"
    >
      <rect width="25" height="5" x="8" y="0" rx="2.5"></rect>
      <rect width="33" height="5" x="0" y="12" rx="2.5"></rect>
      <rect width="16" height="5" x="17" y="24" rx="2.5"></rect>
    </svg>
  );
}

export default MenuSVG;

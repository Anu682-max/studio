import type { SVGProps } from 'react';

export const Icons = {
  Logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
      {...props}
    >
      <rect width="100" height="100" rx="12" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Alegreya, serif"
        fontSize="40"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
      >
        ABS
      </text>
    </svg>
  ),
};

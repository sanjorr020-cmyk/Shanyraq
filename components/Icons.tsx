import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = (p: Props) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...p,
});

export const IconWhatsApp = (p: Props) => (
  <svg {...base(p)}>
    <path d="M3 21l1.3-4.1A9 9 0 1 1 7.2 19.8L3 21z" />
    <path d="M8.5 9.5c.2 2 2.2 4.6 4.8 5.2l1.2-1.2 2 .8-.8 1.8c-.4.5-1.2.7-2 .5-3-.8-5.4-3.4-6-6.1-.2-.8 0-1.5.5-1.9l1.1-.9" />
  </svg>
);

export const IconPhone = (p: Props) => (
  <svg {...base(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const IconPin = (p: Props) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const IconClock = (p: Props) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconSearch = (p: Props) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const IconList = (p: Props) => (
  <svg {...base(p)}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
);

export const IconMenu = (p: Props) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: Props) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconArrow = (p: Props) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCamera = (p: Props) => (
  <svg {...base(p)}>
    <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const IconRoute = (p: Props) => (
  <svg {...base(p)}>
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7" />
  </svg>
);

export const IconTruck = (p: Props) => (
  <svg {...base(p)}>
    <path d="M3 6h11v9H3zM14 10h4l3 3v2h-7z" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const IconCheck = (p: Props) => (
  <svg {...base(p)}>
    <path d="M5 12.5l4.2 4.2L19 7" />
  </svg>
);

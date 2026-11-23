/**
 * Декоративный узор из знака шанырака для первого экрана.
 * Инлайн-SVG, а не CSS-фон: фоновые картинки считаются LCP-кандидатами, SVG-графика — нет.
 * Прозрачность 5%, за текстом, aria-hidden.
 */
export default function HeroPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.05]"
    >
      <defs>
        <pattern id="shanyraq-pattern" width="220" height="220" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#1F5FCB" strokeWidth="7" transform="translate(20 20)">
            <g transform="scale(0.9)">
              <path d="M8 40 Q52 22 98 27" />
              <path d="M8 51 Q52 33 98 39" />
              <path d="M10 62 Q52 46 96 52" />
              <path d="M26 96 Q50 56 86 4" />
              <path d="M40 100 Q62 64 98 22" />
              <path d="M56 102 Q76 72 102 42" />
            </g>
          </g>
          <g fill="none" stroke="#1F5FCB" strokeWidth="7" transform="translate(130 130) scale(0.9)">
            <path d="M8 40 Q52 22 98 27" />
            <path d="M8 51 Q52 33 98 39" />
            <path d="M10 62 Q52 46 96 52" />
            <path d="M26 96 Q50 56 86 4" />
            <path d="M40 100 Q62 64 98 22" />
            <path d="M56 102 Q76 72 102 42" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#shanyraq-pattern)" />
    </svg>
  );
}

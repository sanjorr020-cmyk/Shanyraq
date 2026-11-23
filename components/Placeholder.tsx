import { IconCamera } from "@/components/Icons";

/**
 * Заглушка вместо фото: плоская поверхность и текст, какое фото нужно снять.
 * Когда фото будут, заменить на <img> с тем же соотношением сторон.
 */
export default function Placeholder({ label, ratio = "4/3", className = "" }: { label: string; ratio?: string; className?: string }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl bg-surface p-6 text-center text-muted ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <IconCamera width={32} height={32} />
      <span className="max-w-xs text-sm">{label}</span>
    </div>
  );
}

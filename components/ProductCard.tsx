import AddToListButton from "@/components/AddToListButton";
import { IconWhatsApp } from "@/components/Icons";
import { productQuestion, waLink } from "@/lib/whatsapp";

export default function ProductCard({ id, name, categoryTitle }: { id: string; name: string; categoryTitle: string }) {
  return (
    <article className="lift flex flex-col gap-4 rounded-2xl border border-line bg-white p-5">
      <div>
        <p className="text-sm text-muted">{categoryTitle}</p>
        <h3 className="mt-1 text-[17px] font-semibold leading-snug">{name}</h3>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <a
          href={waLink(productQuestion(name))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-dark"
        >
          <IconWhatsApp />
          Узнать цену и наличие
        </a>
        <AddToListButton id={id} name={name} />
      </div>
    </article>
  );
}

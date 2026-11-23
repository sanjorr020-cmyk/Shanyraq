import Script from "next/script";
import { siteData } from "@/lib/content";

/**
 * Места под аналитику. ID берутся из content/site.json (analytics.*).
 * Пока пустые — ничего не подключается.
 */
export default function Analytics() {
  const ym = siteData.analytics.yandexMetrikaId;
  const ga = siteData.analytics.ga4Id;

  return (
    <>
      {ym && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
        </Script>
      )}
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}
    </>
  );
}

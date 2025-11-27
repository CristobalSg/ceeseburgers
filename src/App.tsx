export default function App() {
  const CTA_LINK = "https://wa.me/56945568889";
  const INSTAGRAM_LINK = "https://www.instagram.com/ceeseburgers";

  const slides = [
    {
      badge: "Qué hacemos",
      title: "¿Cansado de cocinar o comer siempre lo mismo? Aquí empieza tu nueva burger favorita.",
      description:
        "Elaboramos hamburguesas artesanales con recetas propias, ingredientes seleccionados y porciones contundentes. Transformamos un antojo en una experiencia real, sin filas ni esperas innecesarias.",
      ctaHref: CTA_LINK,
      imageSrc: csBaconImage,
      imageAlt: "Hamburguesa Cs-Bacon de Ceeseburgers",
    },
    {
      badge: "Por qué lo hacemos",
      title: "Creemos que una buena hamburguesa puede mejorar tu día.",
      description:
        "Ceeseburgers nace para ofrecer comida honesta, rica y accesible. Después de una jornada agotadora o un fin de semana de descanso, queremos que disfrutes sin complicaciones, lejos de lo genérico.",
      ctaHref: CTA_LINK,
      imageSrc: csBaconImage,
      imageAlt: "Hamburguesa artesanal de Ceeseburgers",
    },
    {
      badge: "Cómo lo hacemos",
      title: "Pedido fácil, entrega rápida y sabor incomparable.",
      description: "Haz tu pedido online, paga seguro y recibe tu burger recién preparada en 14–17 minutos promedio. Elige, paga y disfruta sin fricciones.",
      ctaHref: CTA_LINK,
      imageSrc: pedidoImage,
      imageAlt: "Pedido de Ceeseburgers empacado listo para entrega",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <Header logoSrc={logoImage} brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />

        <Hero ctaHref={CTA_LINK} />

        <Carousel slides={slides} />

        <ValueProps ctaHref={CTA_LINK} />

        <CTABanner
          title="Elige, paga online y recibe en 14–17 minutos"
          subtitle="Segmento 20–30 años · Exploradores y Luchadores · Zona Labranza"
          ctaHref={CTA_LINK}
        />

        <Products ctaHref={CTA_LINK} />

        <BlogTeaser />

        <StorySection />

        <SocialLinks instagramUrl={INSTAGRAM_LINK} />

        <CTABanner
          title="Listo para tu próxima Ceeseburger?"
          subtitle="Pedidos online seguros, horarios jue–sáb 16:00–22:30, entrega promedio 14–17 minutos."
          ctaHref={CTA_LINK}
          variant="dark"
        />
      </div>
    </div>
  );
}
import { BlogTeaser } from "./components/BlogTeaser";
import { Carousel } from "./components/Carousel";
import { CTABanner } from "./components/CTABanner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { SocialLinks } from "./components/SocialLinks";
import { StorySection } from "./components/StorySection";
import { ValueProps } from "./components/ValueProps";

import csBaconImage from "../img/cs-bacon.PNG";
import pedidoImage from "../img/pedido.png";
import logoImage from "../img/logo.PNG";

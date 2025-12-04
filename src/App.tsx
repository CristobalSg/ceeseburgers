import { AnnouncementBar } from "./components/AnnouncementBar";
import { AboutSection } from "./components/AboutSection";
import { BlogTeaser } from "./components/BlogTeaser";
import { CTABanner } from "./components/CTABanner";
import { Header } from "./components/Header";
import { HeroCarousel } from "./components/HeroCarousel";
import { Layout } from "./components/Layout";
import { ProductDetail } from "./components/ProductDetail";
import { Products, products } from "./components/Products";
import { ReviewsSection } from "./components/ReviewsSection";
import { SiteFooter } from "./components/SiteFooter";
import { BackToTop } from "./components/BackToTop";
import { SocialLinks } from "./components/SocialLinks";
import { BlogList } from "./components/BlogList";
import { BlogPostPage } from "./components/BlogPostPage";
import { getBlogPostBySlug } from "./data/blogPosts";
import { StorySection } from "./components/StorySection";
import { ValueProps } from "./components/ValueProps";

import carouselOne from "../img/carrucel_1.png";
import carouselTwo from "../img/carrucel_2.png";
import logoImage from "../img/logo.PNG";

export default function App() {
  const CTA_LINK = "https://wa.me/56945568889";
  const INSTAGRAM_LINK = "https://www.instagram.com/ceeseburgers";
  const path = window.location.pathname;
  const productMatch = path.match(/^\/producto\/([^/]+)$/);
  const blogDetailMatch = path.match(/^\/blog\/([^/]+)$/);
  const matchedProduct = productMatch ? products.find((item) => item.slug === productMatch[1]) ?? null : null;
  const matchedPost = blogDetailMatch ? getBlogPostBySlug(blogDetailMatch[1]) ?? null : null;

  const slides = [
    {
      badge: "Qué hacemos",
      title: "¿Cansado de cocinar o comer siempre lo mismo?.",
      description:
        "Elaboramos hamburguesas artesanales con recetas propias, ingredientes seleccionados y porciones contundentes. Transformamos un antojo en una experiencia real, sin filas ni esperas innecesarias.",
      ctaHref: CTA_LINK,
      imageSrc: carouselOne,
      imageAlt: "Hamburguesa artesana de Ceeseburgers",
    },
    {
      badge: "Cómo lo hacemos",
      title: "Pedido fácil, entrega rápida y sabor incomparable.",
      description: "Haz tu pedido online, paga seguro y recibe tu burger recién preparada en 14–17 minutos promedio. Elige, paga y disfruta sin fricciones.",
      ctaHref: CTA_LINK,
      imageSrc: carouselTwo,
      imageAlt: "Pedido de Ceeseburgers empacado listo para entrega",
      align: "right" as const,
    },
    {
      badge: "Por qué lo hacemos",
      title: "Creemos que una buena hamburguesa puede mejorar tu día.",
      description:
        "Ceeseburgers nace para ofrecer comida honesta, rica y accesible. Después de una jornada agotadora o un fin de semana de descanso, queremos que disfrutes sin complicaciones, lejos de lo genérico.",
      ctaHref: CTA_LINK,
      imageSrc: carouselOne,
      imageAlt: "Hamburguesa artesanal de Ceeseburgers",
    },
  ];

  if (productMatch) {
    return (
      <Layout
        header={
          <div className="space-y-3">
            <AnnouncementBar
              message="Cada 15 de cada mes: ofertas imperdibles y nuevas."
              ctaHref={CTA_LINK}
              ctaLabel="Aprovechar"
            />
            <Header logoSrc={logoImage} brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
          </div>
        }
        footer={<SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />}
      >
        <ProductDetail product={matchedProduct} ctaHref={CTA_LINK} />
      </Layout>
    );
  }

  if (path === "/blog") {
    return (
      <Layout
        header={
          <div className="space-y-3">
            <AnnouncementBar
              message="Cada 15 de cada mes: ofertas imperdibles y nuevas."
              ctaHref={CTA_LINK}
              ctaLabel="Aprovechar"
            />
            <Header logoSrc={logoImage} brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
          </div>
        }
        footer={<SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />}
      >
        <BlogList />
      </Layout>
    );
  }

  if (blogDetailMatch) {
    return (
      <Layout
        header={
          <div className="space-y-3">
            <AnnouncementBar
              message="Cada 15 de cada mes: ofertas imperdibles y nuevas."
              ctaHref={CTA_LINK}
              ctaLabel="Aprovechar"
            />
            <Header logoSrc={logoImage} brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
          </div>
        }
        footer={<SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />}
      >
        <BlogPostPage post={matchedPost} />
      </Layout>
    );
  }

  return (
    <Layout
      header={
        <div className="space-y-3">
          <AnnouncementBar
            message="Cada 15 de cada mes: ofertas imperdibles y nuevas."
            ctaHref={CTA_LINK}
            ctaLabel="Aprovechar"
          />
          <Header logoSrc={logoImage} brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
        </div>
      }
      footer={<SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />}
    >
      <HeroCarousel slides={slides} />

      <ValueProps />

      <Products />

      <CTABanner
        title="Listo para tu próxima Ceeseburger?"
        subtitle="Pedidos online seguros, horarios jue-sáb 16:00-22:30, entrega promedio 14-17 minutos."
        ctaHref={CTA_LINK}
        variant="dark"
      />
      
      <BlogTeaser />

      <ReviewsSection />

      <AboutSection />

      <StorySection />

      <SocialLinks instagramUrl={INSTAGRAM_LINK} />

      <BackToTop />
    </Layout>
  );
}

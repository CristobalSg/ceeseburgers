import type { ReactNode } from "react";

import { AnnouncementBar } from "./components/AnnouncementBar";
import { AboutSection } from "./components/AboutSection";
import { BlogTeaser } from "./components/BlogTeaser";
import { CeesepuntosPage } from "./components/CeesepuntosPage";
import { CeesepuntosRankingPage } from "./components/CeesepuntosRankingPage";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Layout } from "./components/Layout";
import { MenuPreview } from "./components/MenuPreview";
import { MenuPage } from "./components/MenuPage";
import { ReviewsSection } from "./components/ReviewsSection";
import { SiteFooter } from "./components/SiteFooter";
import { BackToTop } from "./components/BackToTop";
import { SocialLinks } from "./components/SocialLinks";
import { BlogList } from "./components/BlogList";
import { BlogPostPage } from "./components/BlogPostPage";
import { ClosedNoticeModal } from "./components/ClosedNoticeModal";
import { getBlogPostBySlug } from "./data/blogPosts";
import { StorySection } from "./components/StorySection";
import { ValueProps } from "./components/ValueProps";
import { AdminPage } from "./components/admin/AdminPage";

import logoImage from "../img/logo.webp";

export default function App() {
  const CTA_LINK = "https://wa.me/56956270428";
  const INSTAGRAM_LINK = "https://www.instagram.com/ceeseburgers";
  const ANNOUNCEMENT_MESSAGE = "Hecho al momento. Hecho en Ceeseburgers.";
  const ANNOUNCEMENT_CTA = "Pedir ahora";
  const path = window.location.pathname;
  const blogDetailMatch = path.match(/^\/blog\/([^/]+)$/);
  const matchedPost = blogDetailMatch ? getBlogPostBySlug(blogDetailMatch[1]) ?? null : null;
  const withClosedNotice = (page: ReactNode) => (
    <>
      {page}
      <ClosedNoticeModal />
    </>
  );

  if (path.startsWith("/admin")) {
    return <AdminPage />;
  }

  if (path === "/blog") {
    return withClosedNotice(
      <Layout
        header={
          <div className="space-y-3">
            <AnnouncementBar
              message={ANNOUNCEMENT_MESSAGE}
              ctaHref={CTA_LINK}
              ctaLabel={ANNOUNCEMENT_CTA}
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

  if (path === "/menu") {
    return withClosedNotice(
      <Layout
        header={
          <div className="space-y-3">
            <AnnouncementBar
              message={ANNOUNCEMENT_MESSAGE}
              ctaHref={CTA_LINK}
              ctaLabel={ANNOUNCEMENT_CTA}
            />
            <Header logoSrc={logoImage} brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
          </div>
        }
        footer={<SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />}
      >
        <MenuPage />
      </Layout>
    );
  }

  if (path === "/ceesepuntos") {
    return withClosedNotice(
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="fixed inset-x-0 top-4 z-40 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <Header
              logoSrc={logoImage}
              brandName="Ceeseburgers"
              instagramHref={INSTAGRAM_LINK}
              whatsappHref={CTA_LINK}
              transparentOnTop
            />
          </div>
        </div>

        <main>
          <CeesepuntosPage />
        </main>

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-10">
          <SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
        </div>
      </div>
    );
  }

  if (path === "/ceesepuntos/ranking") {
    return withClosedNotice(
      <Layout
        header={
          <div className="space-y-3">
            <AnnouncementBar
              message={ANNOUNCEMENT_MESSAGE}
              ctaHref={CTA_LINK}
              ctaLabel={ANNOUNCEMENT_CTA}
            />
            <Header logoSrc={logoImage} brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
          </div>
        }
        footer={<SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />}
      >
        <CeesepuntosRankingPage />
      </Layout>
    );
  }

  if (blogDetailMatch) {
    return withClosedNotice(
      <Layout
        header={
          <div className="space-y-3">
            <AnnouncementBar
              message={ANNOUNCEMENT_MESSAGE}
              ctaHref={CTA_LINK}
              ctaLabel={ANNOUNCEMENT_CTA}
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

  return withClosedNotice(
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="fixed inset-x-0 top-4 z-40 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <Header
            logoSrc={logoImage}
            brandName="Ceeseburgers"
            instagramHref={INSTAGRAM_LINK}
            whatsappHref={CTA_LINK}
            transparentOnTop
          />
        </div>
      </div>

      <main>
        <Hero ctaHref="/menu" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-10">
          <ValueProps />

          <MenuPreview menuHref="/menu" />
          
          <BlogTeaser />

          <ReviewsSection />

          <AboutSection />

          <StorySection />

          <SocialLinks instagramUrl={INSTAGRAM_LINK} />
        </div>
      </main>

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-10">
        <SiteFooter brandName="Ceeseburgers" instagramHref={INSTAGRAM_LINK} whatsappHref={CTA_LINK} />
      </div>

      <BackToTop />
    </div>
  );
}

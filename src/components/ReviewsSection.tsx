import storyPoster from "../../img/historias_destacadas/572119725_17872084167464139_4581888357417690889_n..jpg";
import storyOne from "../../img/historias_destacadas/AQNj1YjXQocI9w2dFhTi1HVBJy-Lzcr2RfjCArfiJ1RK_MkE-MEOlHP2vhUGUnDlUx5ONC6ow-GwETOpVUft7WTMVFNes3zv.jpg";
import storyTwo from "../../img/historias_destacadas/AQNmxWX692Y6yakv3K0TfcmCholWl6048J4h8zQFE-eWEIctMEynY4hiH931Z7jRdEOAOFPfLB4MEpjscW87iOZlBcr8Vfa4.jpg";
import storyThree from "../../img/historias_destacadas/AQO8D1PGYY1HGRKkI8Fz91c2W5VXcIt-gI8RnejovzhW0NyDAChhUGLuzVDw4IRdMOsdgGBGIh26RcR12T_NIH1-b_2pOqPC.jpg";
import storyFour from "../../img/historias_destacadas/AQMnyHl5GAjgc225OIm2wTEEyZvzj3zqObxnG66aMRJqswCnLvN8Qj3QbTWFe7ehQLBIzDtOF6qsn4_n0Cl52CaK7txdkN0I.jpg";
import storyFive from "../../img/historias_destacadas/AQNcMSqOamJbKxpKLEX5kx8zqvhK3S5g4xHN9_N09d7FZLIMn5_7NRUkSjvGEMPgwtdb_fkkXtawElMtLNwbCIG2QByQFAly.jpg";
import storySix from "../../img/historias_destacadas/AQPrBY-5KwxAwIoEqgQOrW1s4yK347_HHiZ84AFvjhBI5-Y2jgktJrhr2E2Hzrry6V_NsyATjDg7uZwHQIOil33CCQJIOcOS.jpg";
import storySeven from "../../img/historias_destacadas/AQPw_xEZIVZUQnmkGcezZB9jEjr75Urnq3TKHMXidTk9_CaBjRB-t_Id-WLHCxLkhktAAbKHoKUkCQOvjhS50qTjZ_9qrl4K.jpg";

const stories = [
  { src: storyOne, caption: "Historias reales · Clientes felices" },
  { src: storyTwo, caption: "Entrega rápida · Sabor consistente" },
  { src: storyThree, caption: "Repetidores · Labranza confía" },
  { src: storyFour, caption: "Pedidos frecuentes · Volvieron por más" },
  { src: storyFive, caption: "Presentación que abre el apetito" },
  { src: storySix, caption: "Entrega cuidada · Caliente y fresca" },
  { src: storySeven, caption: "Feedback directo desde Instagram" },
];

export function ReviewsSection() {
  const storyThumbs = stories.map((story) => ({ ...story, thumb: story.src || storyPoster }));

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Reseñas en vivo</p>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Lo que comparten en Instagram</h2>
        <p className="text-sm text-slate-600 sm:text-base">
          Historias destacadas reales con feedback de clientes. Cada clip está grabado directo desde nuestro Instagram.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0">
        {storyThumbs.map((story, idx) => (
          <article
            key={story.src}
            className="min-w-[200px] max-w-[220px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[9/16] overflow-hidden">
              <img src={story.thumb} alt={`Historia ${idx + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-3 text-sm font-semibold text-slate-800">{story.caption}</div>
          </article>
        ))}
      </div>

      <div className="flex justify-center">
        <a
          href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MzU0OTY5OTQ5MTU2ODMz?igsh=dmlxenVlZHNnbm00"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600"
        >
          Ver historias destacadas en Instagram
        </a>
      </div>
    </section>
  );
}

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  tags?: string[];
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "hamburguesas-artesanales",
    title: "Guía definitiva: qué hace que una hamburguesa sea verdaderamente artesanal",
    subtitle:
      "Si estudias, trabajas y llegas tarde a casa, elegir una hamburguesa artesanal puede ser la diferencia entre “llenar la guata” y darte un momento real de descanso.",
    date: "2025-01-15",
    category: "Hamburguesas artesanales",
    tags: ["hamburguesas artesanales", "comida honesta", "ingredientes", "jóvenes ocupados"],
    content: `
<div class="blog-callout">
  <p class="blog-callout-title">Para quién es este artículo</p>
  <p>
    Si estudias, trabajas o terminas el día con la cabeza a mil, esta guía es para ti. No vamos a hablar de tecnicismos de chef,
    sino de cómo reconocer una hamburguesa <strong>realmente artesanal</strong> cuando solo quieres comer algo rico sin perder tiempo.
  </p>
</div>

<div class="blog-highlight">
  <p>
    La idea es simple: que puedas diferenciar, incluso desde el celu, cuándo una burger está hecha con cuidado y cuándo es solo otra opción genérica
    más en la lista de delivery.
  </p>
</div>

<h2>1. La carne: selección y molienda pensadas en el sabor (no solo en el volumen)</h2>

<p>
  En un formato industrial, la carne suele priorizar precio y rendimiento por sobre el sabor. Se usan mezclas muy magras, recortes de poca calidad
  o combinaciones estándar que “funcionan para todo el mundo”, pero no sorprenden a nadie.
</p>

<p>En una hamburguesa artesanal, la historia es distinta:</p>

<ul>
  <li><strong>Cortes elegidos a propósito</strong>: se combinan partes con más sabor y algo de grasa natural (como sobrecostilla, punta picana o similares) para lograr una mezcla jugosa.</li>
  <li><strong>Proporción de grasa consciente</strong>: por lo general se busca un equilibrio cercano al 20% de grasa, suficiente para aportar sabor sin dejarte pesado.</li>
  <li><strong>Molienda fresca</strong>: la carne se muele en el momento o en tandas pequeñas. Eso reduce la oxidación y mantiene mejor textura y sabor.</li>
</ul>

<p>
  ¿Cómo lo notas tú, que llegas cansado a casa? En que el primer bocado no sabe a “carne genérica”, sino que tiene jugosidad real, textura agradable
  y un sabor que no necesita esconderse detrás de litros de salsa.
</p>

<h2>2. El pan: más que un soporte, parte del sabor</h2>

<p>
  Seguro te ha pasado: hamburguesa que se ve gigante en la foto, pero cuando la muerdes el pan se desarma, se humedece demasiado o domina todo el sabor.
  Eso suele pasar cuando se usan panes industriales pensados para durar semanas en una bolsa.
</p>

<p>En una propuesta artesanal, el pan se trata casi como un ingrediente estrella:</p>

<ul>
  <li><strong>Frescura</strong>: el pan se hornea en el día o se trabaja con proveedores pequeños que entregan por tandas.</li>
  <li><strong>Textura equilibrada</strong>: la miga es suave, pero la corteza mantiene estructura. Soporta la jugosidad sin romperse.</li>
  <li><strong>Sabor real</strong>: mantequilla, huevos, semillas o leche entera aportan carácter. No se siente como “aire dulce”, sino como parte del conjunto.</li>
</ul>

<p>
  Cuando llegas tarde y solo quieres comer algo rico sin discutir con el pan, una hamburguesa artesanal se nota porque la última mordida
  sigue teniendo buena textura, no un pan deshecho e imposible de agarrar.
</p>

<h2>3. Recetas propias: combinar ingredientes con intención</h2>

<p>
  Otra gran diferencia entre lo industrial y lo artesanal está en la creatividad. En una línea de producción masiva, las recetas son
  prácticamente inamovibles: deben funcionar en miles de locales, con ingredientes ultra estandarizados y procesos rígidos.
</p>

<p>En una cocina artesanal, en cambio:</p>

<ul>
  <li>Se prueban <strong>combinaciones nuevas</strong> hasta encontrar sabores que de verdad valen la pena.</li>
  <li>Se equilibran <strong>texturas</strong> (crocante, cremoso, jugoso) para que cada bocado tenga algo interesante.</li>
  <li>Se incorporan <strong>ingredientes pensados para el contexto local</strong>: lo que a la gente realmente le gusta comer en ese barrio o ciudad.</li>
</ul>

<p>
  Para alguien que estudia y trabaja, esto significa que, cuando decide darse el gusto de una hamburguesa, no recibe “más de lo mismo”,
  sino una receta armada con cariño y prueba-error. Una experiencia que te saca del piloto automático del día.
</p>

<h2>4. El proceso de cocción: tiempos, temperatura y atención al detalle</h2>

<p>
  La cocción es donde una buena mezcla de carne puede convertirse en algo increíble… o arruinarse en segundos. En contextos industriales,
  la prioridad suele ser la velocidad y la uniformidad, aunque eso implique hamburguesas recocidas, secas o sin carácter.
</p>

<p>En la cocina artesanal se cuidan aspectos como:</p>

<ul>
  <li><strong>Control de temperatura</strong>: planchas o parrillas bien pre calentadas para lograr sellos intensos y jugos internos.</li>
  <li><strong>Puntos de cocción definidos</strong>: no todas las burgers necesitan estar “hechas como suela”; se respeta el punto ideal según el grosor.</li>
  <li><strong>Atención en el servicio</strong>: la hamburguesa no se deja “esperando” minutos eternos armada; se coordina bien con el pan, las salsas y los acompañamientos.</li>
</ul>

<p>
  El resultado para ti: una burger que llega caliente, jugosa y viva, incluso si la estás comiendo después de un día de clases, trabajo, micro llena y cero energía.
</p>

<h2>5. Ingredientes que cuentan una historia (y que se notan en tu día a día)</h2>

<p>Hablar de “artesanal” no es solo una etiqueta bonita; tiene que verse en los ingredientes. No se trata de que todo sea “gourmet”, pero sí de:</p>

<ul>
  <li><strong>Verduras frescas</strong>, crujientes y bien lavadas.</li>
  <li><strong>Quesos con sabor real</strong>, no laminas plásticas que se derriten pero no aportan nada.</li>
  <li><strong>Salsas caseras</strong> o al menos bien pensadas, que acompañan en vez de tapar.</li>
</ul>

<p>
  Cuando llegas agotado y decides pedir una hamburguesa, estos detalles hacen que el momento sea algo más que “un delivery más”. Se siente como una pequeña
  pausa que te cuida, no como una solución rápida que te deja pesado e igual de cansado.
</p>

<h2>6. ¿Cómo reconocer una hamburguesa artesanal cuando estás scrolleando en el celu?</h2>

<div class="blog-callout">
  <p class="blog-callout-title">Checklist rápida</p>
  <p>Mientras revisas apps de delivery o redes sociales, puedes fijarte en estas pistas para detectar hamburguesas realmente artesanales:</p>
  <ul>
    <li>Descripciones que hablan de los <strong>cortes de carne</strong> o de la mezcla usada.</li>
    <li>Mención al <strong>pan fresco</strong>, brioche o de receta propia.</li>
    <li>Recetas con identidad, no solo “clásica/italiana/americana” sin más contexto.</li>
    <li>Fotos donde se note la textura real de la carne y del pan (no solo montaña de salsa).</li>
  </ul>
</div>

<p>
  A la larga, entender qué hace que una hamburguesa sea verdaderamente artesanal te ayuda a elegir mejor dónde invertir tu dinero y tu energía.
  Especialmente si tu tiempo libre es limitado, vale la pena que ese momento de “me voy a dar un gusto” se sienta a la altura.
</p>
    `,
  },
  {
    id: "2",
    slug: "cebolla-caramelizada-hamburguesas",
    title: "Paso a paso: conviértete en maestro de la cebolla caramelizada y eleva tus hamburguesas caseras",
    subtitle:
      "No necesitas ser chef ni tener una cocina enorme. Con una sartén, paciencia y buena música de fondo puedes preparar cebolla caramelizada que cambia por completo cualquier hamburguesa casera.",
    date: "2025-01-22",
    category: "Técnicas de cocina",
    tags: ["cebolla caramelizada", "recetas fáciles", "hamburguesas caseras", "para estudiantes y trabajadores"],
    content: `
<div class="blog-callout">
  <p class="blog-callout-title">Lo que vas a lograr</p>
  <p>
    En menos de una hora y sin equipo raro, vas a aprender a preparar cebolla caramelizada que cambia por completo el sabor de tus hamburguesas caseras,
    panes con queso o sándwiches de “última hora”.
  </p>
</div>

<div class="blog-highlight">
  <p>
    Si estudias, trabajas o estás siempre corriendo, piensa en esta técnica como una inversión pequeña de tiempo que después te ahorra esfuerzo
    y te regala comidas mucho más ricas.
  </p>
</div>

<h2>1. Qué es realmente la cebolla caramelizada (y qué no)</h2>

<p>
  Primero, una aclaración importante: <strong>caramelizar cebolla no es simplemente tirarle azúcar encima</strong>. La cebolla tiene azúcares naturales
  que, con el tiempo y el calor correcto, se van concentrando hasta lograr ese sabor dulce, profundo y casi adictivo.
</p>

<p>
  Puedes agregar una pizca de azúcar para ayudar, pero si todo el sabor depende de eso, lo que tienes es cebolla salteada dulce, no una caramelización de verdad.
</p>

<h2>2. Ingredientes y utensilios que necesitas</h2>
<div class="blog-callout">
  <p class="blog-callout-title">Ficha rápida</p>
  <p><strong>Rinde:</strong> 3 a 4 hamburguesas generosas</p>
  <p><strong>Tiempo estimado:</strong> 25 a 40 minutos</p>
  <p><strong>Dificultad:</strong> baja (requiere más paciencia que técnica)</p>
</div>

<p>Para una tanda básica necesitas:</p>

<ul>
  <li>2 a 3 cebollas grandes (amarillas o moradas funcionan muy bien).</li>
  <li>1 a 2 cucharadas de aceite (puede ser vegetal, de maravilla o de oliva suave).</li>
  <li>1 cucharada de mantequilla (opcional, pero suma mucho sabor).</li>
  <li>Sal fina.</li>
  <li>Opcional: una pizca de azúcar, unas gotas de vinagre balsámico o de vino, o un chorrito de agua si se seca demasiado.</li>
</ul>

<p>En cuanto a utensilios:</p>

<ul>
  <li>Una sartén amplia, idealmente de fondo grueso.</li>
  <li>Una tabla y un buen cuchillo para cortar cómodo, incluso si ya estás medio cansado.</li>
  <li>Una espátula o cuchara de madera.</li>
</ul>

<h2>3. Paso a paso: de cebolla cruda a cebolla caramelizada</h2>

<h3>Paso 1: cortar con calma</h3>

<p>
  Pela las cebollas y córtalas en pluma o en medias lunas finas. No hace falta que queden milimétricas, pero mientras más parecidas en grosor,
  más pareja será la cocción.
</p>

<h3>Paso 2: fuego medio-bajo, no apuro</h3>

<p>
  Calienta la sartén a fuego medio-bajo y agrega el aceite. Si vas a usar mantequilla, añádela cuando el aceite ya esté tibio, así evitas que se queme.
</p>

<p>
  Incorpora la cebolla y una pizca de sal. Revuelve bien para que toda la superficie tome contacto con la grasa.
</p>

<h3>Paso 3: dejar que el tiempo haga su trabajo</h3>

<p>
  Aquí viene la parte clave: la paciencia. La cebolla caramelizada no se hace en cinco minutos. Según la cantidad y la intensidad de tu cocina,
  puede tomar entre 25 y 40 minutos.
</p>

<p>
  Durante ese tiempo:
</p>

<ul>
  <li>Revuelve cada pocos minutos para que no se pegue.</li>
  <li>Si ves que la base de la sartén se oscurece demasiado, baja un poco el fuego.</li>
  <li>Si empieza a resecarse, agrega una o dos cucharadas de agua y raspa el fondo: eso rescata sabor.</li>
</ul>

<p>
  Verás que la cebolla pasa por varias etapas: primero se ablanda, luego se vuelve translúcida, después empieza a dorarse y finalmente toma un color
  café ámbar intenso. Ese es el punto ideal.
</p>

<h3>Paso 4: ajustar sabor al final</h3>

<p>
  Cuando la cebolla ya esté profundamente dorada y suave, prueba un poco. Si quieres potenciar el lado dulce, puedes añadir una pizca de azúcar.
  Si prefieres un contraste más complejo, unas gotas de vinagre balsámico o de vino le dan un toque increíble.
</p>

<p>
  Ajusta la sal y listo. Ya tienes una base de sabor brutal para tus hamburguesas caseras.
</p>

<h2>4. Cómo usar la cebolla caramelizada en tus hamburguesas caseras</h2>

<p>
  Aquí van algunas ideas fáciles para cuando llegas tarde, pero igual quieres comer algo que se sienta especial:
</p>

<ul>
  <li><strong>Clásica con queso</strong>: carne a la plancha, queso que se derrita bien y una buena cucharada de cebolla caramelizada encima.</li>
  <li><strong>Versión “limpia el refri”</strong>: usa lo que tengas (queso rallado, restos de pollo, verduras) y súmale cebolla caramelizada para unir sabores.</li>
  <li><strong>Sandwich exprés</strong>: pan tostado, queso, alguna proteína y una capa de cebolla caramelizada. Ideal para noches de estudio.</li>
</ul>

<p>
  Lo importante es que la cebolla no quede perdida: agrégala al final, cuando la hamburguesa ya está lista, para que mantenga su textura suave
  y su sabor concentrado.
</p>

<h2>5. Cómo organizarte para no cocinar todo desde cero cada vez</h2>

<p>
  Si tienes poco tiempo entre universidad, trabajo y otras responsabilidades, lo mejor es pensar en la cebolla caramelizada como un <strong>“ingrediente base”</strong>
  que puedes dejar listo con anticipación.
</p>

<ul>
  <li>Prepárala una vez a la semana y guárdala en un frasco hermético en el refrigerador.</li>
  <li>Dura varios días en buenas condiciones, siempre que esté refrigerada.</li>
  <li>Para usarla, solo caliéntala unos segundos en la sartén o en el microondas.</li>
</ul>

<p>
  Así, cuando llegas a casa después de un día largo, solo necesitas armar la hamburguesa, calentar pan, sumar queso y terminar con una cucharada
  de esa cebolla caramelizada que ya hiciste con calma el fin de semana.
</p>

<h2>6. Un pequeño truco mental para motivarte a cocinar</h2>

<p>
  Cocinar después de un día intenso puede sentirse imposible. Pero a veces, saber que tienes un ingrediente que eleva todo (como la cebolla caramelizada)
  cambia la ecuación: ya no estás “partiendo desde cero”, solo estás armando algo con piezas que tú mismo dejaste listas.
</p>

<p>
  No necesitas producir una cena perfecta todas las noches. Con un par de técnicas simples como esta, puedes transformar una hamburguesa casera rápida
  en un momento que realmente se sienta como una recompensa después de todo el esfuerzo del día.
</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

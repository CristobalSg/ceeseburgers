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
    slug: "como-guardar-hamburguesas-en-el-refrigerador",
    title: "Guía definitiva: cómo conservar tus hamburguesas artesanales en el refri sin perder sabor ni calidad",
    subtitle:
      "Aprende a guardar correctamente tus hamburguesas caseras o artesanales en el refrigerador para aprovechar cada porción, evitar desperdicios y mantener el sabor lo más parecido posible a recién hechas.",
    date: "2025-01-15",
    category: "Conservación y almacenamiento",
    tags: ["cómo guardar hamburguesas en el refrigerador", "conservación de alimentos", "batch cooking", "jóvenes ocupados"],
    content: `
<div class="blog-callout">
  <p class="blog-callout-title">Para quién es este artículo</p>
  <p>
    Este contenido está pensado para personas que estudian, trabajan, hacen mil cosas al día
    y quieren sacar el máximo provecho a cada compra sin desperdiciar comida ni perder calidad.
  </p>
</div>

<div class="blog-highlight">
  <p>
    La idea es simple: que puedas abrir el refri después de una jornada larga y encontrar hamburguesas bien guardadas, seguras y ricas,
    en vez de envases tristes que ya perdieron sabor o terminarán en la basura.
  </p>
</div>

<h2>1. Antes de guardar: qué tipo de hamburguesa tienes</h2>

<p>
  No todas las hamburguesas se guardan igual. Antes de meter nada al refri, identifica en qué estado están:
</p>

<ul>
  <li><strong>Hamburguesas crudas ya formadas</strong>: discos de carne listos para cocinar, sin haber tocado sartén ni horno.</li>
  <li><strong>Hamburguesas ya cocidas</strong>: carne que pasó por plancha, parrilla o sartén, con o sin queso encima.</li>
  <li><strong>Hamburguesas armadas completas</strong>: pan, carne, queso, salsas y vegetales ya montados.</li>
  <li><strong>Sobras de un pedido</strong>: lo que no alcanzaste a comer, que viene con envase y salsas mezcladas.</li>
</ul>

<ul>
  <li>Las <strong>crudas</strong> y las <strong>cocidas sin armar</strong> son las que mejor se conservan.</li>
  <li>Las <strong>armadas completas</strong> y <strong>sobras de delivery</strong> duran menos y son más delicadas.</li>
</ul>

<p>
  Entender esto es clave para definir cuánto tiempo puedes guardarlas sin sacrificar sabor ni seguridad.
</p>

<h2>2. Temperatura ideal y dónde guardarlas en el refri</h2>

<p>
  Para conservar bien las hamburguesas, el refrigerador debería estar entre <strong>0 ºC y 4 ºC</strong>. Más caliente que eso es terreno
  perfecto para bacterias; más frío puede resecar en exceso o congelar parcialmente la carne.
</p>

<p>Además de la temperatura, importa el lugar dentro del refri:</p>

<ul>
  <li><strong>Nunca en la puerta</strong>: es la zona con más variaciones de temperatura cada vez que abres el refri.</li>
  <li><strong>Mejor en la parte media o baja</strong>: más estable y fría.</li>
  <li><strong>Separadas de alimentos crudos</strong> como pollo o pescados, para evitar contaminación cruzada.</li>
</ul>

<p>
  Si llegas tarde, guardas rápido y cierras el refri sin pensar, todo bien. Pero si dejas los envases abiertos en cualquier parte, al día siguiente
  se nota: la carne se reseca, el pan se humedece de más y el olor cambia.
</p>

<h2>3. Los mejores recipientes y envoltorios</h2>

<p>
  Guardar “como sea” suele terminar mal. Un buen recipiente marca la diferencia entre una hamburguesa que todavía se disfruta y una que termina
  siendo un sacrificio.
</p>

<p>Opciones recomendadas:</p>

<ul>
  <li><strong>Envases herméticos bajos</strong>: ideales para hamburguesas ya cocidas o armadas sin demasiada altura.</li>
  <li><strong>Film plástico o papel aluminio</strong>: útil para envolver cada disco de carne por separado y luego guardar todo en un envase.</li>
  <li><strong>Papel mantequilla + bolsa hermética</strong>: muy práctico para hamburguesas crudas apiladas.</li>
</ul>

<p>
  Mientras menos aire quede dentro del recipiente, mejor. El oxígeno reseca y oxida la superficie de la carne, cambiando color y sabor.
</p>

<h2>4. ¿Separar o no los ingredientes?</h2>

<p>
  Esta es una de las grandes dudas: ¿se guarda todo junto o se desarma la hamburguesa antes de refrigerar?
</p>

<p>Regla general: mientras más separados estén los elementos, mejor se conserva la experiencia completa.</p>

<ul>
  <li><strong>Pan por un lado</strong>: envuelto en bolsa o recipiente aparte para evitar que se empape con jugos de la carne.</li>
  <li><strong>Carne por otro</strong>: idealmente sola, con queso o sin queso, en un envase hermético.</li>
  <li><strong>Vegetales frescos</strong> (lechuga, tomate, pepinillos): mejor guardarlos aparte o cortarlos frescos cuando vayas a recalentar.</li>
  <li><strong>Salsas</strong>: en potes pequeños, para agregar al final. Así evitas que se corten o cambien de textura al recalentarlas.</li>
</ul>

<p>
  Si estás agotado y no quieres complicarte, al menos separa pan de carne. Son pocos segundos que marcan una diferencia enorme cuando toque recalentar.
</p>

<h2>5. Cuánto duran realmente en el refrigerador</h2>

<p>
  Más allá de los “2 a 3 días” genéricos, vale la pena diferenciar por tipo de hamburguesa:
</p>

<div class="blog-callout">
  <p class="blog-callout-title">Tiempos orientativos en refri (0 ºC a 4 ºC)</p>
  <ul>
    <li><strong>Hamburguesas crudas formadas</strong>: 1 a 2 días.</li>
    <li><strong>Hamburguesas cocidas (solo carne)</strong>: 2 a 3 días.</li>
    <li><strong>Hamburguesas armadas completas</strong>: idealmente consumir en 24 horas.</li>
    <li><strong>Sobras de un pedido</strong>: 1 día máximo, siempre que hayan estado poco tiempo a temperatura ambiente.</li>
  </ul>
</div>

<p>
  Si notas olor extraño, cambio de color muy marcado o textura pegajosa, no arriesgues: es mejor descartar.
</p>

<h2>6. Errores comunes que arruinan el sabor</h2>

<p>
  Incluso con buena intención, hay errores típicos que hacen que una hamburguesa guardada sea muy distinta a lo que podría ser:
</p>

<ul>
  <li><strong>Dejar la hamburguesa caliente muchas horas afuera</strong> antes de refrigerar.</li>
  <li><strong>Guardar en envases abiertos</strong>, sin tapa o mal cerrados.</li>
  <li><strong>Recalentar varias veces la misma porción</strong> en lugar de servir solo lo que vas a comer.</li>
  <li><strong>Guardar pan húmedo con carne caliente</strong>, lo que termina en una masa sin textura.</li>
</ul>

<p>
  Si evitas estos errores, la diferencia en sabor y textura es grande, sobre todo cuando comes tarde, con hambre real y cero paciencia.
</p>

<h2>7. Mini checklist antes de irte a dormir</h2>

<div class="blog-callout">
  <p class="blog-callout-title">Checklist para guardar sin estrés</p>
  <ul>
    <li>¿Separaste pan y carne antes de guardar?</li>
    <li>¿Usaste un envase hermético o envolviste bien cada porción?</li>
    <li>¿Dejaste las hamburguesas en la zona fría del refri (no en la puerta)?</li>
    <li>¿Te acuerdas de cuándo las guardaste?</li>
  </ul>
</div>

<p>
  Con estas ideas, guardar hamburguesas en el refrigerador deja de ser un “a ver qué sale mañana” y pasa a ser parte de tu estrategia para
  ahorrar tiempo, evitar desperdicios y seguir comiendo rico incluso en días caóticos.
</p>
    `,
  },
  {
    id: "2",
    slug: "selladitos-perfectos-en-3-minutos",
    title: "Receta express: prepara los selladitos perfectos en solo 3 minutos (truco de chef)",
    subtitle:
      "Selladitos crujientes por fuera, suaves por dentro y listos en pocos minutos para acompañar tus comidas o salvarte una noche de estudio sin tiempo para cocinar.",
    date: "2025-01-22",
    category: "Recetas express",
    tags: ["cómo hacer selladitos en 3 minutos", "recetas rápidas", "técnicas de sellado", "snacks para estudiar"],
    content: `
<div class="blog-callout">
  <p class="blog-callout-title">Lo que vas a lograr</p>
  <p>
    Una técnica rápida y clara para preparar <strong>selladitos crujientes</strong>, con el interior suave y bien derretido, usando lo que ya tienes en la cocina.
    Ideal para acompañar hamburguesas caseras, ensaladas o para sobrevivir a una sesión larga de estudio.
  </p>
</div>

<div class="blog-highlight">
  <p>
    Este contenido está pensado para quienes aman probar cosas nuevas, pero también necesitan resultados rápidos y eficientes. No necesitas ser chef,
    solo seguir el orden y respetar tiempos.
  </p>
</div>

<h2>1. Qué es exactamente un selladito perfecto</h2>

<p>
  Cuando hablamos de selladitos nos referimos a pequeñas piezas de pan, masa o tortilla <strong>cerradas y doradas por fuera</strong>,
  con un relleno sabroso y caliente por dentro. Pueden ser cuadrados, triángulos o medias lunas, según el pan que uses.
</p>

<p>
  Lo importante no es la forma, sino el contraste:
</p>

<ul>
  <li><strong>Exterior</strong>: dorado, levemente crocante, sin partes crudas.</li>
  <li><strong>Interior</strong>: queso derretido y relleno caliente, pero aún jugoso.</li>
  <li><strong>Bordes</strong>: bien sellados para que no se escape el relleno al dar vuelta.</li>
</ul>

<h2>2. Ingredientes básicos (adaptables a lo que tengas)</h2>

<p>La gracia de esta receta express es que se adapta al refri de cualquier estudiante o trabajador:</p>

<ul>
  <li><strong>Base</strong>: pan de molde, tortillas de trigo pequeñas o pan pita.</li>
  <li><strong>Queso</strong>: laminado, rallado o en trozos (idealmente que funda bien).</li>
  <li><strong>Relleno</strong>: jamón, pollo desmenuzado, restos de carne, verduras salteadas, etc.</li>
  <li><strong>Grasa para sellar</strong>: un poco de aceite, mantequilla o mezcla de ambos.</li>
</ul>

<p>Utensilios recomendados:</p>

<ul>
  <li>Una sartén antiadherente pequeña o mediana.</li>
  <li>Una espátula para dar vuelta sin romper.</li>
  <li>Un cuchillo o cortador para dar forma (opcional).</li>
</ul>

<h2>3. Preparación previa en 60 segundos</h2>

<p>
  Antes de encender la cocina, organiza todo. Esto marca la diferencia para que el proceso completo dure realmente 3 minutos activos.
</p>

<div class="blog-callout">
  <p class="blog-callout-title">Mise en place exprés</p>
  <ul>
    <li>Corta el queso y el relleno en trozos pequeños (se derriten y calientan más rápido).</li>
    <li>Deja el pan o tortilla listo sobre una tabla.</li>
    <li>Ten la sartén, la espátula y la grasa para cocinar a mano.</li>
  </ul>
</div>

<h2>4. Técnica de sellado en sartén (3 minutos)</h2>

<h3>Paso 1: calentar la sartén (30 segundos)</h3>

<p>
  Lleva la sartén a fuego medio y agrega una fina capa de aceite o un poco de mantequilla. No busques una piscina de grasa, solo lo justo para dorar.
</p>

<h3>Paso 2: armar los selladitos (60 segundos)</h3>

<p>
  Mientras la sartén toma temperatura, arma las piezas:
</p>

<p>
  Coloca el pan o tortilla sobre la tabla, agrega una capa fina de queso, un poco de relleno y cierra doblando o colocando otra tapa encima.
  Presiona los bordes con los dedos o con un tenedor para que queden sellados.
</p>

<h3>Paso 3: sellar el primer lado (60 a 90 segundos)</h3>

<p>
  Lleva los selladitos a la sartén caliente. No los muevas de inmediato. Deja que se forme una capa dorada. Cuando veas que los bordes se ven
  firmes y el pan gana color, es momento de dar vuelta.
</p>

<p>
  La clave aquí es el fuego medio: si está muy alto, se queman por fuera y quedan fríos por dentro.
</p>

<h3>Paso 4: dorar el otro lado y terminar (45 a 60 segundos)</h3>

<p>
  Da vuelta con cuidado y deja que el otro lado se dore. En este punto, el queso ya debería estar fundiéndose. Puedes presionar ligeramente
  con la espátula para asegurar contacto con la sartén.
</p>

<p>
  En total, no deberías estar más de 3 minutos por tanda. Si el relleno está precocido, solo necesitas calentar y derretir.
</p>

<p>
  Al sacarlos, déjalos reposar 30 segundos en un plato o rejilla para que no quemen al primer bocado y el interior se asiente.
</p>

<h2>5. Versión en airfryer u horno eléctrico</h2>

<p>
  Si prefieres evitar la sartén o quieres hacer varias unidades a la vez, puedes usar airfryer u horno pequeño:
</p>

<ul>
  <li>Arma los selladitos como en la versión de sartén.</li>
  <li>Unta ligeramente con aceite por fuera o pincela con mantequilla derretida.</li>
  <li>Llévalos a <strong>180 ºC por 5 a 7 minutos</strong>, hasta que estén dorados.</li>
</ul>

<p>
  No será exactamente 3 minutos, pero ganas en comodidad y puedes preparar más por tanda sin estar parado frente a la cocina.
</p>

<h2>6. Ideas de rellenos para distintas situaciones</h2>

<p>
  Aquí van algunas combinaciones pensadas para noches largas, fines de semana relajados o “necesito algo rico ya”:
</p>

<ul>
  <li><strong>Modo estudio</strong>: queso, jamón y un poco de orégano.</li>
  <li><strong>Modo limpia el refri</strong>: restos de pollo desmenuzado, queso y algún vegetal cocido que te haya sobrado.</li>
  <li><strong>Modo snack de tarde</strong>: queso crema, espinaca salteada y un toque de ajo.</li>
  <li><strong>Modo antojo</strong>: mezcla de quesos distintos para jugar con la textura.</li>
</ul>

<p>
  No se trata de tener ingredientes perfectos, sino de aprovechar lo que ya tienes y darle una vuelta rápida.
</p>

<h2>7. Cómo incorporar los selladitos a tu rutina</h2>

<div class="blog-callout">
  <p class="blog-callout-title">Consejos para el día a día</p>
  <ul>
    <li>Deja quesos y rellenos ya picados en contenedores pequeños en el refri.</li>
    <li>Reserva un paquete de pan de molde o tortillas solo para este tipo de preparaciones rápidas.</li>
    <li>Cuando te sobre algo rico de otra comida, piensa inmediatamente si puede convertirse en relleno.</li>
  </ul>
</div>

<p>
  Así, cada vez que te sientes a estudiar, trabajar o ver algo en la noche, no tienes que empezar de cero. Solo armas, sellas y en cuestión de minutos
  tienes un snack caliente que se siente mucho más pensado que un paquete de galletas abierto a la rápida.
</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Descripciones específicas para cada producto organizadas por ID
const productDescriptions = {
  // Productos de Farmacia - Antimicrobianos
  "0001": {
    id: "0001",
    title: "Albendazol",
    subcategory: "Antimicrobianos",
    description:
      "Antiparasitario de amplio espectro eficaz contra nematodos intestinales y cestodos. Cada tableta contiene 400mg de principio activo que actúa inhibiendo la captación de glucosa en los parásitos sensibles. Indicado para el tratamiento de infecciones por áscaris, oxiuros, anquilostomas y tenias. Tratamiento de una sola dosis en la mayoría de las infecciones.",
  },
  9: {
    id: "9",
    title: "Azitromicina",
    subcategory: "Antimicrobianos",
    description:
      "Antibiótico macrólido de amplio espectro con presentación de 500mg por tableta. Actúa inhibiendo la síntesis proteica bacteriana. Eficaz contra infecciones respiratorias, de piel y tejidos blandos, otitis media y enfermedades de transmisión sexual. Su régimen de dosificación corto (3 días) mejora la adherencia al tratamiento.",
  },
  2: {
    id: "2",
    title: "Amoxicilina",
    subcategory: "Antimicrobianos",
    description:
      "Antibiótico betalactámico de amplio espectro con cápsulas de 500mg. Actúa inhibiendo la síntesis de la pared celular bacteriana. Indicado para infecciones del tracto respiratorio, genitourinario, piel y tejidos blandos. Su absorción no se ve afectada por los alimentos, permitiendo su administración con las comidas para reducir molestias gástricas.",
  },
  77: {
    id: "77",
    title: "Amoxicilina en Suspensión",
    subcategory: "Antimicrobianos",
    description:
      "Formulación pediátrica de amoxicilina en suspensión oral con 250mg/5ml. Especialmente diseñada para facilitar la administración en niños y pacientes con dificultad para tragar cápsulas. Sabor agradable que mejora la aceptación en pacientes pediátricos. Incluye dosificador para una medición precisa de la dosis.",
  },
  3: {
    id: "3",
    title: "Ciprofloxacino 500mg",
    subcategory: "Antimicrobianos",
    description:
      "Antibiótico fluoroquinolona de amplio espectro con 500mg por tableta. Actúa inhibiendo la ADN girasa bacteriana. Eficaz contra infecciones urinarias complicadas, respiratorias, gastrointestinales, óseas y articulares. Alta biodisponibilidad oral y buena penetración tisular, incluso en próstata y pulmón.",
  },
  4: {
    id: "4",
    title: "Cefalexina",
    subcategory: "Antimicrobianos",
    description:
      "Antibiótico cefalosporina de primera generación con 500mg por cápsula. Actúa inhibiendo la síntesis de la pared celular bacteriana. Indicado para infecciones de vías respiratorias, piel, tejidos blandos y tracto urinario. Buena tolerancia gastrointestinal y patrón de seguridad establecido en pacientes de todas las edades.",
  },
  888: {
    id: "888",
    title: "Cefalexina Suspensión",
    subcategory: "Antimicrobianos",
    description:
      "Suspensión oral de cefalexina con 250mg/5ml, formulada especialmente para uso pediátrico. Sabor agradable que facilita la administración en niños. Incluye dosificador calibrado para una dosificación precisa. Eficaz en infecciones respiratorias, otitis media, faringitis estreptocócica e infecciones cutáneas en pacientes pediátricos.",
  },
  7: {
    id: "7",
    title: "Doxiciclina",
    subcategory: "Antimicrobianos",
    description:
      "Antibiótico tetraciclina de amplio espectro con 100mg por cápsula. Actúa inhibiendo la síntesis proteica bacteriana. Eficaz contra infecciones respiratorias, urinarias, enfermedades de transmisión sexual y acné. Alta liposolubilidad que permite buena penetración tisular. Administrar preferentemente con el estómago vacío para mejor absorción.",
  },
  "00012": {
    id: "00012",
    title: "Fluconazol",
    subcategory: "Antimicrobianos",
    description:
      "Antifúngico triazólico con 150mg por cápsula. Inhibe la síntesis de ergosterol en la membrana celular fúngica. Indicado para candidiasis vaginal, orofaríngea, esofágica y sistémica. Tratamiento de dosis única para candidiasis vaginal no complicada. Buena biodisponibilidad oral y penetración en líquido cefalorraquídeo.",
  },
  "000222": {
    id: "000222",
    title: "Mebendazol",
    subcategory: "Antimicrobianos",
    description:
      "Antiparasitario de amplio espectro con 100mg por tableta. Actúa inhibiendo la captación de glucosa en los helmintos. Eficaz contra oxiuros, áscaris, tricocéfalos y anquilostomas. Tratamiento de elección para infecciones mixtas por su eficacia contra múltiples especies de parásitos. Baja absorción sistémica que minimiza efectos adversos.",
  },
  6698: {
    id: "6698",
    title: "Metronidazol 500mg",
    subcategory: "Antimicrobianos",
    description:
      "Antimicrobiano y antiparasitario con 500mg por tableta. Actúa dañando el ADN de microorganismos anaerobios y protozoos. Indicado para infecciones por bacterias anaerobias, amebiasis, giardiasis y tricomoniasis. Alta penetración en tejidos, incluyendo sistema nervioso central y hueso. Evitar el consumo de alcohol durante el tratamiento.",
  },
  87665: {
    id: "87665",
    title: "Sulfaprim",
    subcategory: "Antimicrobianos",
    description:
      "Combinación de sulfametoxazol y trimetoprima que actúa sinérgicamente inhibiendo la síntesis de ácido fólico bacteriano. Indicado para infecciones urinarias, respiratorias, gastrointestinales y otitis media. Eficaz contra un amplio espectro de patógenos incluyendo Pneumocystis jirovecii. Administrar con abundante agua para prevenir cristaluria.",
  },
  8: {
    id: "8",
    title: "Sulfaprim (Jarabe)",
    subcategory: "Antimicrobianos",
    description:
      "Formulación pediátrica de sulfametoxazol y trimetoprima en suspensión oral. Especialmente diseñada para facilitar la dosificación en niños. Sabor mejorado para aumentar la aceptabilidad. Indicado para infecciones respiratorias, urinarias y otitis media en pacientes pediátricos. Incluye dosificador para administración precisa.",
  },

  // Productos de Farmacia - Antiinflamatorios y Analgésicos
  789: {
    id: "789",
    title: "Diclofenaco + Paracetamol",
    subcategory: "Antiinflamatorios",
    description:
      "Combinación sinérgica de diclofenaco sódico 50mg y paracetamol 500mg que proporciona potente efecto antiinflamatorio, analgésico y antipirético. Indicado para dolor moderado a severo, especialmente con componente inflamatorio. Eficaz en dolor postoperatorio, traumatismos, dolor dental y dismenorrea. La combinación permite menor dosis de cada componente, reduciendo efectos adversos.",
  },
  "000": {
    id: "000",
    title: "Ibuprofeno",
    subcategory: "Antiinflamatorios",
    description:
      "Antiinflamatorio no esteroideo (AINE) con 400mg por tableta. Actúa inhibiendo la síntesis de prostaglandinas. Eficaz como analgésico, antiinflamatorio y antipirético. Indicado para dolor leve a moderado, fiebre, dismenorrea y procesos inflamatorios. Mejor perfil de seguridad gastrointestinal que otros AINEs. Administrar preferentemente con alimentos para reducir irritación gástrica.",
  },
  66: {
    id: "66",
    title: "Paracetamol",
    subcategory: "Analgésicos",
    description:
      "Analgésico y antipirético con 500mg por tableta. Actúa inhibiendo la síntesis de prostaglandinas a nivel central. Indicado para dolor leve a moderado y estados febriles. Excelente perfil de seguridad cuando se usa en dosis adecuadas. No posee actividad antiinflamatoria significativa ni efectos sobre la agregación plaquetaria, siendo seguro en pacientes con trastornos de coagulación.",
  },

  // Productos de Electrodomésticos - Cocina
  1: {
    id: "1",
    title: "Apples x lb",
    subcategory: "Cocina",
    description:
      "Manzanas frescas seleccionadas por libra, ideales para consumo directo o preparaciones culinarias. Cultivadas siguiendo prácticas sostenibles que garantizan su sabor y calidad nutricional. Ricas en fibra, vitamina C y antioxidantes. Perfectas para ensaladas, postres, compotas o como snack saludable. Conservar en refrigeración para mantener su frescura por más tiempo.",
  },
  44: {
    id: "44",
    title: "clemen feugiat dui",
    subcategory: "Cocina",
    description:
      "Clementinas dulces y jugosas, fáciles de pelar y sin semillas. Cultivadas en condiciones óptimas para garantizar su dulzura característica. Excelente fuente de vitamina C, fibra y antioxidantes. Ideales como snack saludable, en ensaladas o postres. Su tamaño compacto las hace perfectas para loncheras escolares o meriendas en la oficina.",
  },
  88: {
    id: "88",
    title: "dates feugiat non duilis",
    subcategory: "Cocina",
    description:
      "Dátiles premium seleccionados por su textura suave y sabor intensamente dulce. Naturalmente ricos en fibra, potasio y antioxidantes. Perfectos como endulzante natural en batidos, postres y preparaciones sin azúcar refinada. Excelente fuente de energía rápida para deportistas. Conservar en lugar fresco y seco para mantener su textura óptima.",
  },
  222: {
    id: "222",
    title: "lemon non mollis",
    subcategory: "Cocina",
    description:
      "Limones frescos de piel fina y abundante jugo ácido. Cultivados sin tratamientos post-cosecha para preservar la pureza de su sabor y aroma. Indispensables en la cocina para aderezos, marinados, postres y bebidas. Ricos en vitamina C y antioxidantes. Su versatilidad los convierte en un básico de la despensa para realzar el sabor de numerosos platos.",
  },
  333: {
    id: "333",
    title: "Aliquam lime dui non mollis",
    subcategory: "Cocina",
    description:
      "Limas frescas de intenso aroma y sabor cítrico. Piel fina y pulpa jugosa ideal para extraer zumo. Perfectas para cócteles, ceviches, guacamole y platos de cocina asiática y mexicana. Su acidez característica realza el sabor de pescados y mariscos. Conservar a temperatura ambiente para mayor jugosidad y refrigerar solo si no se consumirán en pocos días.",
  },
  444: {
    id: "444",
    title: "Aliquam mango dui non",
    subcategory: "Cocina",
    description:
      "Mangos maduros seleccionados por su pulpa dulce y aromática sin fibras. Variedad premium conocida por su sabor intenso y equilibrio perfecto entre dulzor y acidez. Ricos en vitaminas A y C, potasio y antioxidantes. Ideales para consumo directo, batidos, salsas, ensaladas y postres. Dejar madurar a temperatura ambiente hasta que cedan ligeramente a la presión.",
  },

  // Productos de Electrodomésticos - Refrigeración
  5: {
    id: "5",
    title: "Berry es feugiat mollis",
    subcategory: "Refrigeración",
    description:
      "Selección de bayas mixtas frescas cultivadas en condiciones óptimas. Incluye arándanos, frambuesas y moras en su punto perfecto de maduración. Extraordinariamente ricas en antioxidantes, vitamina C y fibra. Ideales para consumo directo, yogures, batidos, postres y repostería. Conservar refrigeradas y lavar justo antes de consumir para mantener su frescura y propiedades nutricionales.",
  },
  6: {
    id: "6",
    title: "berry feugiat dui non mollis",
    subcategory: "Refrigeración",
    description:
      "Bayas seleccionadas de cultivo ecológico, recolectadas en su punto óptimo de maduración. Sabor intenso con perfecto equilibrio entre dulzor y acidez. Superalimento rico en antioxidantes, vitaminas y minerales esenciales. Versátiles en cocina: desde postres hasta salsas para platos salados. Conservar refrigeradas en su envase original con ventilación para prolongar su frescura.",
  },
  999: {
    id: "999",
    title: "pears feugiat dui non mollis",
    subcategory: "Refrigeración",
    description:
      "Peras jugosas y aromáticas seleccionadas por su textura firme pero suave. Cultivadas siguiendo métodos tradicionales que respetan su ciclo natural de maduración. Excelente fuente de fibra, vitamina C y antioxidantes. Perfectas para consumo directo, ensaladas, postres y compotas. Madurar a temperatura ambiente y refrigerar una vez alcanzado el punto óptimo de consumo.",
  },

  // Productos de Meat - Poultry
  22: {
    id: "22",
    title: "chicken feugiat dui non mollis",
    subcategory: "Poultry",
    description:
      "Pollo entero fresco de granja, alimentado con dieta natural sin hormonas añadidas. Carne tierna y jugosa con sabor auténtico. Criado en condiciones que respetan el bienestar animal. Versátil en cocina: asado, a la parrilla, guisado o al horno. Conservar refrigerado y consumir preferentemente en 2-3 días para disfrutar de su máxima frescura.",
  },
  33: {
    id: "33",
    title: "Arroz Blanco RAINHA de 1 kg",
    subcategory: "Arroz",
    description:
      "Arroz con granos de excelente calidad en paquetes de 1kg.",
  },

  // Productos de Meat - Fish
  55: {
    id: "55",
    title: "cod feugiat dui non",
    subcategory: "Fish",
    description:
      "Filetes de bacalao fresco del Atlántico Norte, capturado mediante métodos sostenibles. Carne blanca firme con sabor suave y delicado. Rico en proteínas de alta calidad, vitamina D y ácidos grasos omega-3. Ideal para preparaciones al horno, en papillote, rebozado o en guisos tradicionales. Conservar refrigerado y consumir preferentemente en 1-2 días para disfrutar de su frescura óptima.",
  },
  99: {
    id: "99",
    title: "fresh fish feugiat dui",
    subcategory: "Fish",
    description:
      "Pescado fresco del día, seleccionado por su calidad superior y frescura excepcional. Capturado siguiendo prácticas de pesca sostenible que respetan el ecosistema marino. Rico en proteínas de alta calidad y ácidos grasos omega-3 beneficiosos para la salud cardiovascular. Ideal para preparaciones a la parrilla, al horno o en ceviche. Conservar refrigerado y consumir el mismo día de compra para disfrutar de su sabor óptimo.",
  },
  "00": {
    id: "00",
    title: "fish lorem ipsum",
    subcategory: "Fish",
    description:
      "Selección de pescado blanco de aguas profundas, caracterizado por su carne firme y sabor delicado. Fileteado a mano para garantizar la ausencia de espinas. Bajo en grasas y calorías, pero rico en proteínas y minerales esenciales. Versátil en cocina: perfecto para frituras, al vapor, horneado o en guisos. Envasado individualmente para preservar su frescura y facilitar su conservación.",
  },
  111: {
    id: "111",
    title: "fish non mollis feugiat dui",
    subcategory: "Fish",
    description:
      "Filetes de pescado premium seleccionados por su textura firme y sabor excepcional. Procesados el mismo día de captura para garantizar máxima frescura. Fuente excelente de proteínas magras, vitamina D y ácidos grasos omega-3. Ideal para preparaciones sofisticadas como en papillote, a la meunière o en ceviche. Conservar en la parte más fría del refrigerador y consumir preferentemente en 24 horas.",
  },
  1111: {
    id: "1111",
    title: "Aliquam salmon dui non mollis",
    subcategory: "Fish",
    description:
      "Salmón atlántico de crianza sostenible certificada, rico en ácidos grasos omega-3, proteínas y vitamina D. Filetes cuidadosamente cortados con piel para mantener su jugosidad durante la cocción. Color rosado intenso y textura firme característica. Versátil en cocina: perfecto a la parrilla, al horno, en tataki o ahumado. Conservar refrigerado y consumir preferentemente en 1-2 días.",
  },

  // Productos de Meat - Beef
  555: {
    id: "555",
    title: "Aliquam meat dui non mollis",
    subcategory: "Beef",
    description:
      "Corte premium de carne de res madurada en seco durante 21 días para intensificar su sabor y terneza. Procedente de ganado alimentado con pasto, lo que aporta un perfil de sabor más complejo y mejor balance nutricional. Marmoleado óptimo que garantiza jugosidad y sabor. Ideal para preparaciones a la parrilla o sartén que resalten su calidad excepcional. Conservar refrigerado y llevar a temperatura ambiente 30 minutos antes de cocinar.",
  },
  666: {
    id: "666",
    title: "meat feugiat dui non mollis",
    subcategory: "Beef",
    description:
      "Corte selecto de carne de res con marmoleado perfecto que garantiza sabor y jugosidad excepcionales. Madurada naturalmente para desarrollar máxima terneza y complejidad de sabor. Rica en proteínas de alta calidad, hierro y vitaminas del complejo B. Ideal para asado, parrilla o preparaciones que requieran cocción rápida a alta temperatura. Conservar refrigerado y consumir preferentemente en 3-4 días.",
  },
  777: {
    id: "777",
    title: "Aliquam feugiat dui non meat",
    subcategory: "Beef",
    description:
      "Carne de res premium procedente de ganado criado en libertad y alimentado con pasto. Corte magro con infiltración de grasa justa para garantizar sabor sin exceso de calorías. Textura tierna y sabor intenso característico de la carne de calidad superior. Versátil en cocina: desde guisos lentos hasta preparaciones rápidas a la plancha. Envasada al vacío para preservar frescura y extender vida útil.",
  },

  // Productos de Bakery - Bread
  bread1: {
    id: "bread1",
    title: "Sprouts Classic Seedsational Bread 14 oz",
    subcategory: "Bread",
    description:
      "Pan artesanal elaborado con masa madre y una mezcla especial de semillas nutritivas (chía, lino, girasol y calabaza). Fermentación lenta de 24 horas que desarrolla sabores complejos y mejora la digestibilidad. Rico en fibra, proteínas vegetales y ácidos grasos esenciales. Cortado en rebanadas de grosor óptimo para tostadas y sándwiches. Sin conservantes artificiales, con 3-4 días de frescura natural.",
  },
  bread2: {
    id: "bread2",
    title: "Traditional Corn Special Bread",
    subcategory: "Bread",
    description:
      "Pan tradicional elaborado con harina de maíz de molienda artesanal que aporta su característico sabor y textura. Receta transmitida por generaciones, con fermentación natural que potencia sabores y aromas. Corteza crujiente y miga tierna con ligero sabor dulce natural del maíz. Ideal para acompañar guisos, sopas o disfrutar con aceite de oliva. Elaborado diariamente sin conservantes artificiales.",
  },
  bread3: {
    id: "bread3",
    title: "Sprouts Classic Seedsational Bread",
    subcategory: "Bread",
    description:
      "Pan integral multicereales enriquecido con semillas seleccionadas por sus propiedades nutricionales. Elaborado con masa madre y fermentación lenta que aporta sabor complejo y mejora la asimilación de nutrientes. Alto contenido en fibra y proteína vegetal. Perfecto para tostadas con aguacate, hummus o quesos artesanales. Conservar en lugar fresco o congelar en rebanadas para mantener su frescura.",
  },

  // Productos de Bakery - Toast
  toast: {
    id: "toast",
    title: "Oven Baked Garlic & Cheese Toast",
    subcategory: "Toast",
    description:
      "Pan tostado artesanal con ajo fresco macerado y queso madurado gratinado. Elaborado con masa de fermentación lenta que aporta textura ligera y sabor desarrollado. Prehorneado para facilitar su preparación final en casa en solo 5 minutos. Ideal como entrante, acompañamiento de sopas o para picoteo informal. Conservar en congelador y hornear directamente sin descongelar para obtener máxima crujencia.",
  },
  toast2: {
    id: "toast2",
    title: "Oven Baked Italian Herb with Olive Oil Toast",
    subcategory: "Toast",
    description:
      "Pan tostado mediterráneo elaborado con aceite de oliva virgen extra y hierbas aromáticas italianas (romero, tomillo, orégano y albahaca). Textura crujiente por fuera y ligeramente tierna en el interior. Prehorneado artesanalmente en horno de piedra que aporta notas ahumadas características. Perfecto para acompañar ensaladas, antipasti o como base de bruschetta. Conservar en lugar seco y consumir preferentemente en 7 días.",
  },

  // Productos de Bakery - Cookies
  cookies: {
    id: "cookies",
    title: "Raspberry Crumble Cookies",
    subcategory: "Cookies",
    description:
      "Galletas artesanales con base de mantequilla francesa y cobertura crujiente de streusel con frambuesas naturales liofilizadas. Elaboradas siguiendo métodos tradicionales sin aditivos artificiales. Equilibrio perfecto entre dulzor y acidez frutal. Textura que combina el crumble exterior con interior tierno y mantecoso. Envasadas individualmente para preservar su frescura y facilitar su consumo fuera de casa.",
  },
  cookies2: {
    id: "cookies2",
    title: "Chocolate Chip Cookies",
    subcategory: "Cookies",
    description:
      "Galletas clásicas americanas elaboradas con trozos generosos de chocolate negro 70% cacao y mantequilla de primera calidad. Receta tradicional mejorada con toque de sal marina que realza los sabores. Textura característica: crujientes en el borde y tiernas en el centro. Horneadas diariamente en pequeños lotes para garantizar frescura y calidad. Conservar en recipiente hermético para mantener su textura óptima.",
  },
  cookies3: {
    id: "cookies3",
    title: "Freshly Baked Chocolate Chip Cookie",
    subcategory: "Cookies",
    description:
      "Galleta individual de gran formato (80g) recién horneada con chocolate en trozos irregulares y nueces tostadas. Elaborada con ingredientes premium: mantequilla francesa, azúcar moreno de caña y extracto natural de vainilla. Textura única con exterior ligeramente crujiente e interior tierno y fundente. El chocolate se mantiene parcialmente derretido durante horas tras el horneado. Consumir preferentemente el mismo día para disfrutar de la experiencia óptima.",
  },

  // Productos de Bakery - Muffin
  muffin: {
    id: "muffin",
    title: "Cake",
    subcategory: "Muffin",
    description:
      "Cake de 20cm, masa suave mojada en almíbar, doble relleno de crema de chocolate con leche, o fresa con leche maní y granjas.",
  },
  muffin2: {
    id: "muffin2",
    title: "Cake",
    subcategory: "Muffin",
    description:
      "Cake de 20cm, masa suave mojada en almíbar, doble relleno de crema de chocolate con leche, o fresa con leche maní y granjas.",
  },

  // Productos de Bakery - Muffin
  muffin0: {
    id: "muffin0",
    title: "Cake",
    subcategory: "Muffin",
    description:
      "Cake de bandeja. Decorado a su gusto, la temática de su preferencia. Exquisito relleno y sabor especial.",
  },

  muffin3: {
    id: "muffin3",
    title: "MiniCake ",
    subcategory: "Muffin",
    description: "MiniCake de 15cm Masa suave y relleno con crema de chocolate y leche. Incluye cobertura 2M y grajeas",
  },

  // Productos de Drink - Tea
  tea: {
    id: "tea",
    title: "Freshly Brewed Organic Green Tea",
    subcategory: "Tea",
    description:
      "Té verde orgánico certificado, cultivado en plantaciones sostenibles de altura. Hojas jóvenes procesadas tradicionalmente para preservar antioxidantes y compuestos bioactivos. Sabor fresco con notas vegetales y un sutil toque dulce natural. Rico en catequinas y L-teanina que proporcionan beneficios para la salud y un estado de alerta relajado. Preparar con agua a 80°C y dejar infusionar 2-3 minutos para obtener el equilibrio perfecto de sabor.",
  },

  // Productos de Drink - Coffee
  coffe: {
    id: "coffe",
    title: "Fresh Grinded Frappé coffee",
    subcategory: "Coffee",
    description:
      "Café frappé preparado con granos recién molidos de tueste medio, originarios de fincas sostenibles de altura. Textura cremosa con espuma característica y sabor intenso que equilibra notas achocolatadas y frutales. Servido frío con hielo triturado, perfecto para días calurosos. Opción de personalizar con leche, siropes o especias. Estimulante refrescante que proporciona energía duradera sin picos de cafeína.",
  },
  coffe2: {
    id: "coffe2",
    title: "Caffee Nero Mocha Late",
    subcategory: "Coffee",
    description:
      "Especialidad de café elaborada con espresso doble de blend italiano, chocolate negro premium fundido y leche texturizada al vapor. Coronado con crema batida y polvo de cacao puro. Equilibrio perfecto entre la intensidad del café, la cremosidad de la leche y las notas profundas del chocolate. Servido en temperatura óptima para resaltar aromas y sabores. Experiencia indulgente que combina el placer del café y el chocolate.",
  },
  coffe3: {
    id: "coffe3",
    title: "Nescafe Clasico Instant Coffee",
    subcategory: "Coffee",
    description:
      "Café instantáneo elaborado mediante proceso de liofilización que preserva aromas y sabores esenciales. Mezcla de granos arábica y robusta seleccionados por su equilibrio y cuerpo. Solubilidad perfecta tanto en agua caliente como fría. Práctico para preparaciones rápidas sin comprometer calidad. Aroma intenso y sabor consistente en cada taza. Versátil para recetas que requieren café como ingrediente en postres y salsas.",
  },
  coffe4: {
    id: "coffe4",
    title: "Peet Coffee Decaf Major Dickason Blend",
    subcategory: "Coffee",
    description:
      "Café descafeinado premium mediante proceso suizo con agua y filtrado de carbón activado, sin utilizar químicos. Conserva el perfil aromático completo del blend original con notas de chocolate negro, frutos secos tostados y un sutil toque especiado. Tueste oscuro que desarrolla cuerpo completo sin amargor excesivo. Ideal para disfrutar del placer del café en cualquier momento del día sin efectos estimulantes. Molienda optimizada para métodos de filtro.",
  },

  // Productos de Ropa_calzado_accesorios - Calzado
  coffe444: {
    id: "coffe444",
    title: "Zapato de mujer (Fashion)",
    subcategory: "Calzado",
    description:
      "Zapato de diseño contemporáneo para mujer con tacón de 7cm ergonómicamente diseñado para máximo confort. Elaborado en piel genuina con acabado premium y forro interior de microfibra transpirable. Plantilla acolchada extraíble con tecnología de absorción de impactos. Suela antideslizante de caucho natural que proporciona agarre y durabilidad. Versátil para ocasiones formales e informales, combinable con diversos estilos.",
  },

  // Productos de Components - Placas base
  "comp-mb-1": {
    id: "comp-mb-1",
    title: "ASUS ROG Strix B550-F Gaming Motherboard",
    subcategory: "Placas base",
    description:
      "Placa base gaming de gama alta con socket AMD AM4 compatible con procesadores Ryzen 3000 y 5000. Chipset B550 con soporte para PCIe 4.0, ofreciendo mayor ancho de banda para GPU y almacenamiento NVMe. Sistema de alimentación de 12+2 fases con componentes de grado militar para overclocking estable. Conectividad completa: WiFi 6, Bluetooth 5.1, USB 3.2 Gen 2 y audio SupremeFX. Iluminación RGB Aura Sync personalizable y refrigeración optimizada para máximo rendimiento.",
  },

  // Productos de Components - Tarjetas gráficas
  "comp-gpu-1": {
    id: "comp-gpu-1",
    title: "NVIDIA GeForce RTX 3060 Ti Graphics Card",
    subcategory: "Tarjetas gráficas",
    description:
      "Tarjeta gráfica de alto rendimiento basada en arquitectura Ampere con 8GB GDDR6 y bus de 256 bits. Núcleos RT de segunda generación para ray tracing en tiempo real y núcleos Tensor para DLSS y funciones de IA. Rendimiento ideal para gaming en 1440p con altas tasas de FPS en títulos AAA. Sistema de refrigeración dual con ventiladores axiales y cámara de vapor para funcionamiento silencioso bajo carga. Compatible con HDMI 2.1 para salida 8K y tecnología NVIDIA Reflex para menor latencia en juegos competitivos.",
  },

  // Productos de Components - Procesadores
  "comp-cpu-1": {
    id: "comp-cpu-1",
    title: "AMD Ryzen 7 5800X Processor",
    subcategory: "Procesadores",
    description:
      "Procesador de alto rendimiento con 8 núcleos y 16 hilos basado en arquitectura Zen 3 a 3.8GHz (hasta 4.7GHz en boost). Caché L3 de 32MB que reduce significativamente la latencia en aplicaciones y juegos. TDP de 105W con excelente eficiencia energética para su clase de rendimiento. Soporte para PCIe 4.0 y memoria DDR4 de alta velocidad. Ideal para gaming de alta tasa de FPS, creación de contenido, streaming y multitarea exigente. Desbloqueado para overclocking con las herramientas adecuadas de refrigeración.",
  },

  // Productos de Components - Discos duros
  "comp-hdd-1": {
    id: "comp-hdd-1",
    title: "Samsung 970 EVO Plus 1TB NVMe SSD",
    subcategory: "Discos duros",
    description:
      "Unidad SSD NVMe de alto rendimiento con interfaz PCIe Gen 3.0 x4 y protocolo NVMe 1.3. Velocidades secuenciales de hasta 3,500 MB/s en lectura y 3,300 MB/s en escritura. Controlador Phoenix optimizado y memoria V-NAND de 3 bits MLC para máxima durabilidad y rendimiento. Tecnología Dynamic Thermal Guard que previene sobrecalentamiento bajo cargas intensas. Factor de forma M.2 2280 compatible con la mayoría de placas base y portátiles modernos. Ideal para profesionales, creadores de contenido y gamers exigentes.",
  },

  // Productos de Components - Refrigeración
  "comp-fan-1": {
    id: "comp-fan-1",
    title: "Tempest Fan 120mm PWM Ventilador",
    subcategory: "Refrigeración",
    description:
      "Ventilador de 120mm con control PWM para ajuste dinámico de velocidad según temperatura. Diseño de aspas optimizado para maximizar flujo de aire (65 CFM) manteniendo bajo nivel sonoro (18-26 dB). Rodamientos hidráulicos de larga duración con MTBF superior a 50,000 horas. Marco anti-vibración con esquinas amortiguadas que reducen la transmisión de vibraciones al chasis. Conector de 4 pines compatible con control automático desde BIOS. Ideal para refrigeración de radiadores, como intake o exhaust en cajas de PC.",
  },

  // Productos de Components - RAM
  "comp-ram-1": {
    id: "comp-ram-1",
    title: "Corsair Vengeance RGB Pro 16GB RAM",
    subcategory: "RAM",
    description:
      "Kit de memoria RAM DDR4 de 16GB (2x8GB) optimizada para placas base Intel y AMD. Frecuencia de 3200MHz con timings ajustados 16-18-18-36 para excelente rendimiento en gaming y aplicaciones exigentes. Iluminación RGB personalizable por módulo con 10 LEDs por stick controlables mediante software iCUE. Disipador de aluminio de perfil medio compatible con la mayoría de disipadores CPU. Soporte para XMP 2.0 para overclocking automático a especificaciones óptimas. Testada individualmente para estabilidad y compatibilidad.",
  },

  // Productos de Components - Fuentes de alimentación
  "comp-psu-1": {
    id: "comp-psu-1",
    title: "EVGA SuperNOVA 750 G5 Power Supply",
    subcategory: "Fuentes de alimentación",
    description:
      "Fuente de alimentación de 750W con certificación 80 PLUS Gold que garantiza eficiencia superior al 90% bajo carga típica. Diseño totalmente modular que permite conectar solo los cables necesarios, mejorando flujo de aire y estética. Condensadores 100% japoneses clasificados para 105°C que aseguran estabilidad y longevidad. Ventilador Fluid Dynamic Bearing de 135mm con curva de funcionamiento silencioso bajo cargas medias. Protecciones completas: OVP, UVP, OCP, OPP, SCP y OTP. Rieles múltiples +12V para distribución óptima de energía a componentes exigentes.",
  },

  // Productos de Components - Otros componentes
  "comp-other-1": {
    id: "comp-other-1",
    title: "Noctua NH-D15 CPU Cooler",
    subcategory: "Otros componentes",
    description:
      "Disipador CPU premium de doble torre con 6 heatpipes de cobre y dos ventiladores NF-A15 PWM de 140mm. Capacidad de disipación excepcional de hasta 220W TDP, ideal para procesadores de gama alta y overclocking. Tecnología SecuFirm2 que garantiza presión de montaje óptima y compatibilidad con múltiples sockets (Intel y AMD). Pasta térmica NT-H1 de alto rendimiento incluida. Funcionamiento extremadamente silencioso incluso a plena carga (24.6 dB). Garantía de 6 años que refleja la calidad de construcción y materiales empleados.",
  },

// Productos de Fotografía y Accesorios 
  "photography-other-1": {
    id: "photography-other-1",
    title: "OM SYSTEM OLYMPUS VG-120",
    subcategory: "Cámaras de fotos",
    description:
      "Cámara digital de 14 MP, zoom óptico gran angular 5X (1.024 in), LCD de 3 pulgadas",
  },

  // Productos de Fotografía y Accesorios 
  "photography-other-2": {
    id: "photography-other-2",
    title: "Sony DCR-SX40 Handycam®",
    subcategory: "Cámaras de fotos",
    description:
      "La videocámara DCR-SX40 de Sony es una excelente compañera para cualquier principiante que quiera aprender los conceptos básicos con una...",
  },


}

export default productDescriptions

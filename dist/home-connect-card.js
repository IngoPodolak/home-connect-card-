/*
 * Home Connect Card – Home-Assistant-Dashboard-Karte für Home-Connect-Geräte im Bubble-Card-Stil.
 * Kombiniert Home Connect (offiziell), Home Connect Alt, Home Connect Local (homeconnect_ws)
 * und Home Connect Oven Private. Lokale Daten haben Vorrang.
 * https://github.com/IngoPodolak/home-connect-card-
 */
const HC_VERSION = "1.1.3";

/* ------------------------------------------------------------------ */
/* Quellen                                                             */
/* ------------------------------------------------------------------ */
const SOURCES = {
  homeconnect_ws: { rank: 0, local: true },
  homeconnect_oven_private: { rank: 1, local: false },
  home_connect_alt: { rank: 2, local: false },
  home_connect: { rank: 3, local: false },
};
const NAME_PRIORITY = ["home_connect", "home_connect_alt", "homeconnect_ws", "homeconnect_oven_private"];

/* ------------------------------------------------------------------ */
/* Texte                                                               */
/* ------------------------------------------------------------------ */
const I18N = {
  de: {
    run: "Läuft", pause: "Pausiert", finished: "Fertig", ready: "Bereit", inactive: "Aus", off: "Aus",
    delayedstart: "Startet später", actionrequired: "Aktion nötig", error: "Fehler", aborting: "Bricht ab",
    offline: "Nicht verbunden", standby: "Standby",
    remaining: "Restzeit", ends: "Fertig um", progress: "Fortschritt", starts_in: "Start in",
    program: "Programm", programs: "Programme", search: "Suchen …", results: "Treffer", no_results: "Keine Treffer",
    tab_fav: "Favoriten", tab_dish: "Gerichte", tab_heat: "Heizarten", tab_micro: "Mikrowelle", tab_steam: "Dampf",
    tab_clean: "Pflege", tab_drink: "Getränke", tab_world: "Kaffeewelt", tab_prog: "Programme",
    options: "Optionen", settings: "Einstellungen", consumables: "Status & Pflege", more: "Weitere Einstellungen",
    start: "Starten", pause_btn: "Pausieren", resume: "Fortsetzen", stop: "Stopp", power: "Ein/Aus", light: "Licht",
    camera: "Kamera", live: "LIVE", recognized: "Gericht erkannt / vorgeschlagen", apply_start: "Starten",
    other_dish: "Anderes Gericht", target: "Ziel", temperature: "Temperatur", duration: "Dauer", start_in: "Startzeit",
    now: "Sofort", local: "LOKAL", cloud: "CLOUD", both: "LOKAL + CLOUD", door_open: "Tür offen", door_closed: "Tür zu",
    beans: "Bohnenmenge", fill: "Füllmenge", ratio: "Kaffee / Milch", coffee: "Kaffee", milk: "Milch",
    water_temp: "Wassertemperatur", size: "Größe", aroma: "Aroma", cups: "Tassen", double: "2 Tassen",
    wash_temp: "Temperatur", spin: "Schleudern (U/min)", level: "Stufe", meat_probe: "Kerntemperatur",
    energy: "Energie", water: "Wasser", phase: "Phase", turn_food: "Jetzt wenden",
    show_all: "Alle {n} anzeigen", show_less: "Weniger anzeigen", ago: "vor {t}", refresh: "Aktualisieren",
    cam_old: "Kamerabild ist älter als {m} min", idos: "i-DOS Dosierung", detergent: "Waschmittel", softener: "Weichspüler",
    left: "noch {n}", m_idos: "i-DOS", days: "Tagen", e_camage: "Kamerabild max. Alter (Minuten)",
    no_device: "Kein Gerät gewählt", choose_device: "Bitte im Karten-Editor ein Home-Connect-Gerät oder einen Demo-Typ wählen.",
    not_found: "Gerät nicht gefunden", demo: "DEMO", demo_note: "Demo – keine echte Steuerung",
    ok: "OK", low: "Bald leer", empty: "Leer", full: "Voll", not_inserted: "Fehlt", needed: "Fällig",
    in_cups: "in {n} Bezügen", water_tank: "Wassertank", drip_tray: "Auffangschale", bean_container: "Bohnenbehälter",
    salt: "Salz", rinse_aid: "Klarspüler", descale: "Entkalken", clean: "Reinigen", calcnclean: "calc'nClean",
    water_filter: "Wasserfilter", idos1: "i-DOS 1", idos2: "i-DOS 2", counters: "Zähler",
    unavailable: "nicht verfügbar", min: "min", h: "h",
    e_device: "Gerät", e_demo: "Demo-Gerät (ohne echtes Gerät)", e_layout: "Darstellung", e_name: "Name (optional)",
    e_nav: "Navigation beim Antippen (z. B. #backofen für Bubble-Popup)", e_hide: "Module ausblenden", e_color: "Akzentfarbe (leer = Standardfarbe des Gerätetyps)",
    l_full: "Vollständig (für Popup)", l_compact: "Kompakt (Bubble-Button)", none: "– keins –",
    m_camera: "Kamera", m_banner: "Hinweise", m_hero: "Status", m_programs: "Programme", m_controls: "Einstellungen",
    m_options: "Optionen", m_consumables: "Status & Pflege", m_actions: "Aktionen", m_more: "Weitere Einstellungen",
    t_oven: "Backofen", t_dishwasher: "Geschirrspüler", t_washer: "Waschmaschine", t_dryer: "Trockner",
    t_washerdryer: "Waschtrockner", t_coffee: "Kaffeevollautomat", t_fridge: "Kühlschrank", t_freezer: "Gefrierschrank",
    t_hob: "Kochfeld", t_hood: "Dunstabzug", t_warmingdrawer: "Wärmeschublade", t_generic: "Hausgerät",
    t_winecooler: "Weinklimaschrank", t_cleaningrobot: "Saugroboter", t_cookprocessor: "Küchenmaschine", t_microwave: "Mikrowelle",
    cheapest: "Günstigster Start", preselected: "vorausgewählt – wird beim Start gesetzt", cheap_in: "+{h} h · Ø {p}", save: "spart ca. {p} %", e_type: "Gerätetyp (nur falls falsch erkannt)",
    e_price: "Strompreis-Prognose (für günstigsten Start)", e_cheapdef: "Günstigste Startzeit vorauswählen", e_subbtn: "Schnellwahl-Knöpfe in der Kompakt-Ansicht", e_valtopic: "Valetudo MQTT-Topic (nur falls abweichend, z. B. valetudo/MeinRoboter)", auto: "automatisch", no_price: "keine Preisprognose gefunden",
    battery: "Akku", cleaning: "Reinigen", docked: "In der Station", rooms: "Räume", bottles: "Zonen", speed: "Geschwindigkeit",
    ph_prerinse: "Vorspülen", ph_mainwash: "Reinigen", ph_finalrinse: "Klarspülen", ph_drying: "Trocknen",
    ph_wash: "Waschen", ph_rinse: "Spülen", ph_spin: "Schleudern", ph_dry: "Trocknen", ph_done: "Fertig",
    ph_grinding: "Mahlen", ph_coffeebrewing: "Brühen", ph_milkfroth: "Milchschaum", ph_hotwaterdispensing: "Heißwasser",
    ph_rinsephase: "Spülen", ph_startphase: "Start", ph_preliminary: "Vorbereitung", ph_warmmilk: "Warme Milch",
    fridge: "Kühlen", freezer: "Gefrieren", zones: "Kochzonen", fan: "Lüfter",
  },
  en: {
    run: "Running", pause: "Paused", finished: "Finished", ready: "Ready", inactive: "Off", off: "Off",
    delayedstart: "Delayed start", actionrequired: "Action required", error: "Error", aborting: "Aborting",
    offline: "Not connected", standby: "Standby",
    remaining: "Remaining", ends: "Ends at", progress: "Progress", starts_in: "Starts in",
    program: "Program", programs: "Programs", search: "Search …", results: "results", no_results: "No results",
    tab_fav: "Favorites", tab_dish: "Dishes", tab_heat: "Heating", tab_micro: "Microwave", tab_steam: "Steam",
    tab_clean: "Care", tab_drink: "Drinks", tab_world: "Coffee world", tab_prog: "Programs",
    options: "Options", settings: "Settings", consumables: "Status & care", more: "More settings",
    start: "Start", pause_btn: "Pause", resume: "Resume", stop: "Stop", power: "Power", light: "Light",
    camera: "Camera", live: "LIVE", recognized: "Dish detected / suggested", apply_start: "Start",
    other_dish: "Other dish", target: "Target", temperature: "Temperature", duration: "Duration", start_in: "Start time",
    now: "Now", local: "LOCAL", cloud: "CLOUD", both: "LOCAL + CLOUD", door_open: "Door open", door_closed: "Door closed",
    beans: "Bean amount", fill: "Fill quantity", ratio: "Coffee / milk", coffee: "Coffee", milk: "Milk",
    water_temp: "Water temperature", size: "Size", aroma: "Aroma", cups: "Cups", double: "2 cups",
    wash_temp: "Temperature", spin: "Spin (rpm)", level: "Level", meat_probe: "Core temperature",
    energy: "Energy", water: "Water", phase: "Phase", turn_food: "Turn food now",
    show_all: "Show all {n}", show_less: "Show less", ago: "{t} ago", refresh: "Refresh",
    cam_old: "Camera image is older than {m} min", idos: "i-DOS dosing", detergent: "Detergent", softener: "Softener",
    left: "{n} left", m_idos: "i-DOS", days: "days", e_camage: "Camera image max. age (minutes)",
    no_device: "No device selected", choose_device: "Choose a Home Connect device or a demo type in the card editor.",
    not_found: "Device not found", demo: "DEMO", demo_note: "Demo – no real control",
    ok: "OK", low: "Low", empty: "Empty", full: "Full", not_inserted: "Missing", needed: "Due",
    in_cups: "in {n} drinks", water_tank: "Water tank", drip_tray: "Drip tray", bean_container: "Bean container",
    salt: "Salt", rinse_aid: "Rinse aid", descale: "Descale", clean: "Clean", calcnclean: "calc'nClean",
    water_filter: "Water filter", idos1: "i-DOS 1", idos2: "i-DOS 2", counters: "Counters",
    unavailable: "unavailable", min: "min", h: "h",
    e_device: "Device", e_demo: "Demo device (no real appliance)", e_layout: "Layout", e_name: "Name (optional)",
    e_nav: "Navigation on tap (e.g. #oven for a Bubble pop-up)", e_hide: "Hide modules", e_color: "Accent color (empty = default color of the appliance type)",
    l_full: "Full (for pop-up)", l_compact: "Compact (bubble button)", none: "– none –",
    m_camera: "Camera", m_banner: "Hints", m_hero: "Status", m_programs: "Programs", m_controls: "Settings",
    m_options: "Options", m_consumables: "Status & care", m_actions: "Actions", m_more: "More settings",
    t_oven: "Oven", t_dishwasher: "Dishwasher", t_washer: "Washing machine", t_dryer: "Dryer",
    t_washerdryer: "Washer dryer", t_coffee: "Coffee machine", t_fridge: "Fridge", t_freezer: "Freezer",
    t_hob: "Hob", t_hood: "Hood", t_warmingdrawer: "Warming drawer", t_generic: "Appliance",
    t_winecooler: "Wine cooler", t_cleaningrobot: "Robot vacuum", t_cookprocessor: "Cook processor", t_microwave: "Microwave",
    cheapest: "Cheapest start", preselected: "preselected – applied on start", cheap_in: "+{h} h · avg {p}", save: "saves approx. {p} %", e_type: "Appliance type (only if misdetected)",
    e_price: "Electricity price forecast (for cheapest start)", e_cheapdef: "Preselect cheapest start time", e_subbtn: "Quick buttons in compact view", e_valtopic: "Valetudo MQTT topic (only if different, e.g. valetudo/MyRobot)", auto: "automatic", no_price: "no price forecast found",
    battery: "Battery", cleaning: "Cleaning", docked: "Docked", rooms: "Rooms", bottles: "Zones", speed: "Speed",
    ph_prerinse: "Pre-rinse", ph_mainwash: "Main wash", ph_finalrinse: "Final rinse", ph_drying: "Drying",
    ph_wash: "Washing", ph_rinse: "Rinsing", ph_spin: "Spinning", ph_dry: "Drying", ph_done: "Done",
    ph_grinding: "Grinding", ph_coffeebrewing: "Brewing", ph_milkfroth: "Milk froth", ph_hotwaterdispensing: "Hot water",
    ph_rinsephase: "Rinsing", ph_startphase: "Start", ph_preliminary: "Preparing", ph_warmmilk: "Warm milk",
    fridge: "Fridge", freezer: "Freezer", zones: "Cooking zones", fan: "Fan",
  },
};

/* Programmnamen (Endstück des Programmschlüssels, nur a-z0-9) */
const PROG_NAMES = {
  // Backofen – Heizarten
  hotair: ["Heißluft", "Hot air"], hotair3d: ["Heißluft 3D", "3D hot air"], hotairgentle: ["Heißluft sanft", "Gentle hot air"],
  hotaireco: ["Heißluft Eco", "Hot air eco"], hotairgrilling: ["Umluftgrillen", "Hot air grilling"],
  topbottomheating: ["Ober-/Unterhitze", "Top/bottom heating"], topbottomheatingeco: ["Ober-/Unterhitze Eco", "Top/bottom eco"],
  bottomheating: ["Unterhitze", "Bottom heating"], pizzasetting: ["Pizzastufe", "Pizza setting"], intensiveheat: ["Intensivhitze", "Intensive heat"],
  slowcook: ["Niedertemperaturgaren", "Slow cook"], defrost: ["Auftauen", "Defrost"], desiccation: ["Dörren", "Dehydrate"],
  keepwarm: ["Warmhalten", "Keep warm"], preheatovenware: ["Geschirr vorwärmen", "Preheat ovenware"], preheating: ["Vorheizen", "Preheating"],
  grilllargearea: ["Grill, groß", "Grill, large"], grillsmallarea: ["Grill, klein", "Grill, small"], airfry: ["Air Fry", "Air fry"],
  letrest: ["Ruhen lassen", "Let rest"], doughproving: ["Teig gehen lassen", "Dough proving"], reheat: ["Regenerieren", "Reheat"],
  microwavemax: ["Mikrowelle max", "Microwave max"], pyrolysis: ["Pyrolyse", "Pyrolysis"], easyclean: ["EasyClean", "EasyClean"],
  descale: ["Entkalken", "Descale"], drying: ["Trocknen", "Drying"], draining: ["Entleeren", "Draining"], flushing: ["Spülen", "Flushing"],
  // Geschirrspüler
  auto1: ["Auto 35–45 °C", "Auto 35–45 °C"], auto2: ["Auto 45–65 °C", "Auto 45–65 °C"], auto3: ["Auto 65–75 °C", "Auto 65–75 °C"],
  eco50: ["Eco 50 °C", "Eco 50 °C"], intensiv70: ["Intensiv 70 °C", "Intensive 70 °C"], intensiv45: ["Intensiv 45 °C", "Intensive 45 °C"],
  glas40: ["Glas 40 °C", "Glass 40 °C"], quick45: ["Speed 45 °C", "Quick 45 °C"], quick65: ["Schnell 65 °C", "Quick 65 °C"],
  prerinse: ["Vorspülen", "Pre-rinse"], nightwash: ["Silence", "Night wash"], machinecare: ["Maschinenpflege", "Machine care"],
  kurz60: ["Kurz 60 °C", "Short 60 °C"], express: ["Express", "Express"], hygieneplus: ["Hygiene+", "Hygiene+"],
  // Kaffee
  espresso: ["Espresso", "Espresso"], espressodoppio: ["Espresso doppio", "Espresso doppio"], coffee: ["Caffè Crema", "Caffè crema"],
  caffegrande: ["Caffè Grande", "Caffè grande"], xlcoffee: ["XL Kaffee", "XL coffee"], cappuccino: ["Cappuccino", "Cappuccino"],
  lattemacchiato: ["Latte Macchiato", "Latte macchiato"], caffelatte: ["Milchkaffee", "Caffè latte"], milkfroth: ["Milchschaum", "Milk froth"],
  warmmilk: ["Warme Milch", "Warm milk"], hotwater: ["Heißes Wasser", "Hot water"], ristretto: ["Ristretto", "Ristretto"],
  espressomacchiato: ["Espresso Macchiato", "Espresso macchiato"], americano: ["Americano", "Americano"], flatwhite: ["Flat White", "Flat white"],
  cortado: ["Cortado", "Cortado"], doppio: ["Doppio", "Doppio"], wienermelange: ["Wiener Melange", "Wiener Melange"],
  verlaengerter: ["Verlängerter", "Verlängerter"], verlaengerterbraun: ["Verlängerter Braun", "Verlängerter braun"],
  kleinerbrauner: ["Kleiner Brauner", "Kleiner Brauner"], grosserbrauner: ["Großer Brauner", "Großer Brauner"],
  cafeaulait: ["Café au Lait", "Café au lait"], cafeconleche: ["Café con Leche", "Café con leche"], koffieverkeerd: ["Koffie Verkeerd", "Koffie verkeerd"],
  cafecortado: ["Café Cortado", "Café cortado"], galao: ["Galão", "Galão"], garoto: ["Garoto", "Garoto"], kaapi: ["Kaapi", "Kaapi"],
  redeye: ["Red Eye", "Red eye"], blackeye: ["Black Eye", "Black eye"], deadeye: ["Dead Eye", "Dead eye"], coldbrew: ["Cold Brew", "Cold brew"],
  coldbrewmacchiato: ["Cold Brew Macchiato", "Cold brew macchiato"], slowbrew: ["Slow Brew", "Slow brew"],
  calcnclean: ["calc'nClean", "calc'nClean"], clean: ["Reinigen", "Clean"], rinsemilksystem: ["Milchsystem spülen", "Rinse milk system"],
  applianceonrinsing: ["Einschaltspülen", "Rinse on power-up"], applianceoffrinsing: ["Ausschaltspülen", "Rinse on power-off"],
  // Waschen / Trocknen
  cotton: ["Baumwolle", "Cotton"], cottoneco: ["Baumwolle Eco", "Cotton eco"], eco4060: ["Eco 40-60", "Eco 40-60"], easycare: ["Pflegeleicht", "Easy care"],
  mix: ["Mix", "Mix"], delicatessilk: ["Fein/Seide", "Delicates/silk"], wool: ["Wolle", "Wool"], sensitive: ["Sensitiv", "Sensitive"],
  synthetic: ["Pflegeleicht", "Synthetics"], super153045: ["Super 15/30", "Super 15/30"], super1530: ["Super 15/30", "Super 15/30"],
  shirtsblouses: ["Hemden/Blusen", "Shirts/blouses"], darkwash: ["Dunkle Wäsche", "Dark wash"], sportfitness: ["Sport/Fitness", "Sport/fitness"],
  towels: ["Handtücher", "Towels"], outdoor: ["Outdoor", "Outdoor"], downduvet: ["Daunen", "Down duvet"], rinse: ["Spülen", "Rinse"],
  spin: ["Schleudern", "Spin"], drainspin: ["Abpumpen/Schleudern", "Drain/spin"], drumclean: ["Trommelreinigung", "Drum clean"],
  hygiene: ["Hygiene", "Hygiene"], blankets: ["Decken", "Blankets"], businessshirts: ["Businesshemden", "Business shirts"],
  downfeathers: ["Daunen", "Down/feathers"], jeans: ["Jeans", "Jeans"], pillow: ["Kissen", "Pillow"], super40: ["Super 40", "Super 40"],
  timecold: ["Zeit kalt", "Time cold"], timewarm: ["Zeit warm", "Time warm"], refresh: ["Auffrischen", "Refresh"], delicates: ["Fein", "Delicates"],
};

/* Wörter für Gerichte (EN -> DE) – zum Zerlegen der Programmnamen */
const DISH_WORDS = {
  pizza: "Pizza", pizzas: "Pizzen", minipizzas: "Mini-Pizzen", frozen: "tiefgekühlt", fresh: "frisch", chilled: "gekühlt",
  bread: "Brot", breads: "Brote", rolls: "Brötchen", breadrolls: "Brötchen", baguette: "Baguette", flatbread: "Fladenbrot",
  chicken: "Hähnchen", breast: "Brust", fillet: "Filet", drumsticks: "Unterschenkel", legs: "Keulen", whole: "ganz",
  lasagne: "Lasagne", flat: "flach", high: "hoch", chips: "Pommes", potato: "Kartoffel", potatoes: "Kartoffeln",
  wedges: "Spalten", baked: "gebacken", roast: "Braten", roasted: "geröstet", pork: "Schwein", beef: "Rind", veal: "Kalb",
  lamb: "Lamm", duck: "Ente", goose: "Gans", turkey: "Pute", fish: "Fisch", salmon: "Lachs", vegetables: "Gemüse",
  grilled: "gegrillt", cake: "Kuchen", cakes: "Kuchen", muffins: "Muffins", biscuits: "Kekse", cookies: "Plätzchen",
  tart: "Tarte", tarts: "Törtchen", quiche: "Quiche", strudel: "Strudel", sweet: "süß", savoury: "herzhaft",
  sponge: "Biskuit", spongecake: "Biskuitkuchen", yeast: "Hefe", dough: "Teig", puff: "Blätter", pastry: "teig",
  rice: "Reis", pasta: "Pasta", reheat: "Aufwärmen", stew: "Schmorgericht", goulash: "Gulasch", meat: "Fleisch",
  meatballs: "Fleischbällchen", meatloaf: "Hackbraten", minced: "Hack", joint: "Braten", knuckle: "Haxe", loin: "Lende",
  ribs: "Rippchen", tenderloin: "Filet", sirloin: "Roastbeef", medium: "medium", rare: "englisch", welldone: "durch",
  stuffed: "gefüllt", unstuffed: "ungefüllt", halved: "halbiert", partcooked: "vorgebacken", bone: "Knochen",
  boneless: "ohne Knochen", with: "mit", tray: "Blech", tin: "Form", tins: "Formen", loaf: "Laib", levels: "Ebenen",
  multigrain: "Mehrkorn", wholemeal: "Vollkorn", white: "Weiß", rye: "Roggen", wheat: "Weizen", ciabatta: "Ciabatta",
  croissants: "Croissants", pretzels: "Brezeln", scones: "Scones", macaroons: "Makronen", meringue: "Baiser",
  souffles: "Soufflés", cheese: "Käse", breaded: "paniert", escalopes: "Schnitzel", fingers: "Stäbchen", squid: "Tintenfisch",
  rings: "Ringe", nuggets: "Nuggets", croquettes: "Kroketten", gratin: "Gratin", augratin: "überbacken", popcorn: "Popcorn",
  cup: "Tasse", small: "klein", amounts: "Mengen", plated: "Teller", meal: "Gericht", oven: "Ofen", hashbrowns: "Rösti",
  french: "", fries: "Pommes", frenchfries: "Pommes", sweetpotatoes: "Süßkartoffeln", boiled: "gekocht", skin: "Schale",
  basmati: "Basmati", brown: "Natur", longgrain: "Langkorn", parboiled: "Parboiled", couscous: "Couscous", millet: "Hirse",
  polenta: "Polenta", risotto: "Risotto", barley: "Graupen", pearl: "Perl", spinach: "Spinat", poultry: "Geflügel",
  portions: "Portionen", moist: "saftig", dry: "trocken", deep: "tief", shallow: "flach", topping: "Belag", base: "Boden",
  crumble: "Crumble", fruit: "Obst", cheesecake: "Käsekuchen", muffin: "Muffin", gammon: "Kochschinken", ham: "Schinken",
  belly: "Bauch", roulade: "Roulade", christmas: "Weihnachts", stollen: "Stollen", bundtcake: "Gugelhupf", leavened: "Hefe",
  danish: "Plunder", choux: "Brand", sausages: "Würstchen", skewers: "Spieße", oyster: "Auster", vealossobuco: "Ossobuco",
  ossobuco: "Ossobuco", pavlova: "Pavlova", mooncake: "Mondkuchen", empanada: "Empanada", boerek: "Börek", pierogi: "Piroggen",
  tarteflambee: "Flammkuchen", yorkshirepudding: "Yorkshire Pudding", victoriaspongecake: "Victoria Sponge", swissroll: "Biskuitrolle",
  quichetart: "Quiche", volauvents: "Pasteten", eggplant: "Aubergine", pumpkin: "Kürbis", slices: "Scheiben",
  pepper: "Paprika", rabbit: "Kaninchen", venison: "Hirsch", roevenison: "Reh", wildboar: "Wildschwein", shoulder: "Schulter",
  neck: "Nacken", crackling: "Kruste", saddle: "Rücken", rump: "Hüfte", topside: "Oberschale", rolled: "Roll",
  smoked: "geräuchert", poulard: "Poularde", fry: "Kotelett", chop: "Kotelett", leg: "Keule", thigh: "Oberkeule",
  crown: "Krone", plaited: "Zopf", savarin: "Savarin", baklava: "Baklava", odourfilter: "Geruchsfilter",
  cannelloni: "Cannelloni", goujons: "Streifen", pockets: "Taschen", filled: "gefüllt", thin: "dünn", thick: "dick",
  crust: "Boden", slice: "Stück", bakeditems: "Backwaren", reheatvegetables: "Gemüse aufwärmen", onepizza: "1 Pizza",
  wholefish: "ganzer Fisch", stuffedpepper: "gefüllte Paprika", soft: "weich", spelt: "Dinkel", grain: "Getreide",
  coarse: "grob", ground: "gemahlen", unripe: "Grün", softwheat: "Weichweizen", mushroom: "Pilz", bacon: "Speck", roll: "Rolle",
  jam: "Marmeladen", piped: "Spritz", individual: "einzeln", molds: "Förmchen", rich: "reich", blindbake: "blind backen",
  victoria: "Victoria", british: "britisch", style: "", gbstyle: "", egs: "", fatless: "fettfrei", cooked: "gegart", ingredients: "Zutaten", raw: "roh",
  onbakingtray: "auf dem Blech", onabakingtray: "auf dem Blech", inaloaftin: "in Kastenform", onthebone: "mit Knochen",
  on2levels: "auf 2 Ebenen", inpizzatray: "im Pizzablech", inindividualmolds: "in Förmchen", indeeptins: "in hohen Formen",
  inshallowtins: "in flachen Formen", intins: "in Formen", withskin: "mit Schale", wskin: "mit Schale", withvegetables: "mit Gemüse",
  withcracklingegshoulder: "mit Kruste", withcrackling: "mit Kruste", withpastrybase: "mit Mürbeteigboden", withdrytopping: "mit trockenem Belag",
  withmoisttopping: "mit saftigem Belag", withyeastinaloaftin: "mit Hefe in Kastenform", madefromfreshmincedmeat: "aus frischem Hack",
  roastjoint: "Braten", slowroastjoint: "Niedertemperaturbraten", porkroast: "Schweinebraten", wholechicken: "Hähnchen, ganz",
  freshbreadrolls: "Frische Brötchen", freshsweetbreadrolls: "Süße Brötchen", bakingtray: "Blech", baking: "Back",
  partcookedbreadrolls: "Aufbackbrötchen", partcookedbreadrollsorbaguette: "Aufbackbrötchen/Baguette", partcookedrollsorbaguettefrozen: "Aufbackbrötchen, tiefgekühlt",
  potatogratin: "Kartoffelgratin", vegetablesaugratin: "Gemüse überbacken", fishfingers: "Fischstäbchen", fishfillet: "Fischfilet",
  chickenbreastfillet: "Hähnchenbrustfilet", chickendrumsticks: "Hähnchenunterschenkel", chickenlegs: "Hähnchenkeulen", chickenparts: "Hähnchenteile",
  duckbreast: "Entenbrust", goosebreast: "Gänsebrust", gooselegs: "Gänsekeulen", turkeybreast: "Putenbrust", turkeythigh: "Putenoberkeule",
  filletofbeef: "Rinderfilet", filletofpork: "Schweinefilet", knuckleofpork: "Schweinshaxe", knuckleofveal: "Kalbshaxe", legoflamb: "Lammkeule",
  saddleofveal: "Kalbsrücken", jointofveal: "Kalbsbraten", jointofpork: "Schweinebraten", breastofveal: "Kalbsbrust", roastporkloin: "Schweinelende",
  porkneckjoint: "Schweinenacken", rolledporkjoint: "Rollbraten", rolledturkeyjoint: "Putenrollbraten", roastbeef: "Roastbeef",
  potatowedges: "Kartoffelspalten", bakedpotatoes: "Ofenkartoffeln", lasagneflat: "Lasagne, flach", lasagnehigh: "Lasagne, hoch",
  chipsfrozen: "Pommes, tiefgekühlt", pizzafrozen: "Pizza, tiefgekühlt", pizzachilled: "Pizza, gekühlt", pizzabaguettefrozen: "Pizzabaguette, tiefgekühlt",
  breadrollsfrozen: "Brötchen, tiefgekühlt", strudelfrozen: "Strudel, tiefgekühlt", lasagnefrozen: "Lasagne, tiefgekühlt",
  sweetstrudel: "Süßer Strudel", spongecakewithdrytopping: "Rührkuchen mit trockenem Belag", whitebread: "Weißbrot", wholemealbread: "Vollkornbrot",
  drying: "Trocknen", fruits: "Früchte", herbs: "Kräuter", melting: "Schmelzen", butter: "Butter", chocolate: "Schokolade",
  oil: "Öl", flavouring: "aromatisieren", large: "groß", slowcook: "Niedertemperatur", yoghurt: "Joghurt", warming: "Wärmen",
  plates: "Teller", cups: "Tassen", proving: "gehen lassen", eggs: "Eier", defrosting: "Auftauen", keepwarm: "Warmhalten",
  reheatplatedmeal: "Tellergericht aufwärmen", reheatsmallamounts: "Kleine Mengen aufwärmen", cup: "Tasse",
};
const DISH_MOD = {
  steam: ["Dampf", "steam"], microwave: ["Mikrowelle", "microwave"], meatprobe: ["Bratenthermometer", "meat probe"],
  bakingsensor: ["Backsensor", "baking sensor"], browningdetection: ["Bräunungserkennung", "browning detection"],
};

/* ------------------------------------------------------------------ */
/* Hilfsfunktionen                                                     */
/* ------------------------------------------------------------------ */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const canon = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
const norm = (s) => String(s ?? "").toLowerCase()
  .replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
const BAD = new Set(["unavailable", "unknown", "", "none", undefined, null]);
const okState = (st) => st && !BAD.has(st.state);
const lastSeg = (v) => String(v ?? "").split(".").pop();
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function fmtDur(sec, lang) {
  if (sec == null || isNaN(sec)) return "–";
  sec = Math.max(0, Math.round(sec));
  if (sec >= 3600) {
    const h = Math.floor(sec / 3600), m = Math.round((sec % 3600) / 60);
    return `${h}:${String(m).padStart(2, "0")} h`;
  }
  return `${Math.max(sec > 0 ? 1 : 0, Math.round(sec / 60))} min`;
}
function fmtClock(date) {
  if (!date) return "–";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function toSeconds(st) {
  if (!okState(st)) return null;
  const v = parseFloat(st.state);
  if (isNaN(v)) return null;
  const u = (st.attributes.unit_of_measurement || "s").toLowerCase();
  if (u === "h") return v * 3600;
  if (u === "min") return v * 60;
  if (u === "d") return v * 86400;
  return v;
}

/* Programmschlüssel analysieren */
const PROG_PREFIXES = [
  "cookingovenprogram", "dishcaredishwasherprogram", "consumerproductscoffeemakerprogram", "laundrycarewasherdryerprogram",
  "laundrycarewasherprogram", "laundrycaredryerprogram", "cookinghoodprogram", "cookinghobprogram", "consumerproductscleaningrobotprogram",
  "refrigerationprogram", "cookingcommonprogram",
];
function progInfo(raw) {
  const c = canon(raw);
  let rest = c;
  for (const p of PROG_PREFIXES) if (rest.startsWith(p)) { rest = rest.slice(p.length); break; }
  let cat = "prog";
  if (/^favorite/.test(rest)) cat = "fav";
  else if (/^(dish|individualizer)/.test(rest)) cat = "dish";
  else if (/^heatingmode/.test(rest)) cat = "heat";
  else if (/^microwave/.test(rest)) cat = "micro";
  else if (/^steammodes/.test(rest)) cat = "steam";
  else if (/^(cleaning|cleaningmodes)/.test(rest)) cat = "clean";
  else if (/^subsequentmode/.test(rest)) cat = "hidden";
  else if (/^beverage/.test(rest)) cat = "drink";
  else if (/^coffeeworld/.test(rest)) cat = "world";
  const tail = rest.replace(/^(heatingmode|steammodes|cleaningmodes|cleaning|beverage|coffeeworld|subsequentmode)/, "");
  return { canon: c, rest, tail, cat };
}

/* Gerichtename aus Rohschlüssel bauen (z. B. cooking_oven_program_dish_recommendation_conv_bakingsensor_pizza) */
const DISH_KEYS = Object.keys(DISH_WORDS).sort((a, b) => b.length - a.length);
function segmentWords(str) {
  const out = [];
  let i = 0, unknown = "";
  while (i < str.length) {
    if (/\d/.test(str[i])) {
      let j = i; while (j < str.length && /\d/.test(str[j])) j++;
      if (unknown) { out.push({ raw: unknown }); unknown = ""; }
      out.push({ num: str.slice(i, j) }); i = j; continue;
    }
    const w = DISH_KEYS.find((k) => k && str.startsWith(k, i));
    if (w) {
      if (unknown) { out.push({ raw: unknown }); unknown = ""; }
      out.push({ word: w }); i += w.length;
    } else { unknown += str[i]; i++; }
  }
  if (unknown) out.push({ raw: unknown });
  return out;
}
function dishLabel(raw, lang) {
  const parts = String(raw).toLowerCase().split(/[_.]/).filter(Boolean);
  const idx = parts.findIndex((p) => p === "dish" || p === "individualizer");
  let tail = idx >= 0 ? parts.slice(idx + 1) : parts.slice(-1);
  tail = tail.filter((p) => !["automatic", "recommendation", "conv"].includes(p));
  const mods = [];
  const names = [];
  for (const p of tail) {
    if (DISH_MOD[p]) mods.push(DISH_MOD[p][lang === "de" ? 0 : 1]);
    else names.push(p);
  }
  const name = names.join("");
  if (!name) return null;
  let label;
  if (lang === "de") {
    const seg = segmentWords(name);
    const unknownLen = seg.filter((s) => s.raw).reduce((a, s) => a + s.raw.length, 0);
    if (unknownLen > 2) label = cap(name);
    else {
      const words = seg.map((s) => (s.num ? (s.num === "2" ? "2" : s.num) : s.word ? DISH_WORDS[s.word] : s.raw)).filter((w) => w !== "" && w != null);
      label = words.join(" ").replace(/ teig/g, "teig").replace(/Blätter teig/g, "Blätterteig").replace(/\s+/g, " ").trim();
      label = cap(label);
    }
  } else {
    const seg = segmentWords(name);
    const unknownLen = seg.filter((s) => s.raw).reduce((a, s) => a + s.raw.length, 0);
    label = unknownLen > 2 ? cap(name) : cap(seg.map((s) => s.num || s.word || s.raw).join(" "));
  }
  return { label, mods };
}

/* ------------------------------------------------------------------ */
/* Geräteerkennung                                                     */
/* ------------------------------------------------------------------ */
const TYPE_RULES = [
  ["washerdryer", /washerdryer|waschtrockner/],
  ["dishwasher", /dishwasher|dishcare|geschirrspul|spulmaschine/],
  ["washer", /laundrycarewasher|(^|[^a-z])washer|waschmaschine/],
  ["dryer", /dryer|trockner/],
  ["coffee", /coffee|kaffee/],
  ["winecooler", /winecooler|weinkuhl|weinklima|wine/],
  ["cleaningrobot", /cleaningrobot|roxxter|saugrobot|robotvacuum/],
  ["cookprocessor", /cookprocessor|cookit|kuchenmaschine|kochmaschine/],
  ["warmingdrawer", /warmingdrawer|warmeschublade|warming/],
  ["oven", /oven|backofen|herd|cookingoven|dampfgarer|steamer/],
  ["microwave", /^microwave$|mikrowelle/],
  ["fridge", /fridgefreezer|refrigerator|fridge|kuhlschrank|kuhl-gefrier|refrigeration/],
  ["freezer", /freezer|gefrier/],
  ["hob", /(^|[^a-z])hob|kochfeld|cookinghob/],
  ["hood", /hood|dunstabzug|abzugshaube/],
];
const TYPE_META = {
  oven: { color: "#ff8a3d", icon: "oven" }, dishwasher: { color: "#5aa9ff", icon: "dishwasher" },
  washer: { color: "#36cfc4", icon: "washer" }, dryer: { color: "#f2a65a", icon: "dryer" }, washerdryer: { color: "#36cfc4", icon: "washer" },
  coffee: { color: "#e0a96d", icon: "coffee" }, fridge: { color: "#8fb8ff", icon: "fridge" }, freezer: { color: "#9ad7ff", icon: "fridge" },
  hob: { color: "#ff6a4d", icon: "hob" }, hood: { color: "#a0b4c8", icon: "hood" }, warmingdrawer: { color: "#ffb26b", icon: "drawer" },
  winecooler: { color: "#d46a8c", icon: "fridge" }, cleaningrobot: { color: "#5fd08a", icon: "robot" },
  cookprocessor: { color: "#f2c14e", icon: "cookit" }, microwave: { color: "#b3a6ff", icon: "micro" },
  generic: { color: "#9d8cff", icon: "generic" },
};
function detectType(text) {
  const t = norm(text).replace(/\s+/g, "");
  for (const [type, re] of TYPE_RULES) if (re.test(t)) return type;
  return "generic";
}

let _discCache = null;
function discover(hass) {
  if (_discCache && _discCache.d === hass.devices && _discCache.e === hass.entities) return _discCache.r;
  const r = _discover(hass);
  _discCache = { d: hass.devices, e: hass.entities, r };
  return r;
}
function _discover(hass) {
  const groups = new Map();
  const byDevice = new Map();
  const devices = hass.devices || {};
  for (const [id, dev] of Object.entries(devices)) {
    const ids = dev.identifiers || [];
    const ident = ids.find((i) => SOURCES[i[0]]);
    if (!ident) continue;
    const platform = ident[0];
    if (canon(ident[1]) === "homeconnect") continue; // Dienst-Gerät von Home Connect Alt
    const m = String(ident[1]).match(/\d{9,}/);
    const key = m ? m[0] : canon(ident[1]) || id;
    if (!groups.has(key)) groups.set(key, { key, devices: [], entities: [] });
    const g = groups.get(key);
    g.devices.push({ id, platform, dev });
    byDevice.set(id, { g, platform });
  }
  for (const ent of Object.values(hass.entities || {})) {
    const hit = byDevice.get(ent.device_id);
    if (!hit) continue;
    const platform = SOURCES[ent.platform] ? ent.platform : hit.platform;
    hit.g.entities.push({ eid: ent.entity_id, platform, rank: SOURCES[platform].rank, reg: ent, devName: (hit.g.devices.find((d) => d.id === ent.device_id)?.dev) });
  }
  for (const g of groups.values()) {
    const named = [...g.devices].sort((a, b) => NAME_PRIORITY.indexOf(a.platform) - NAME_PRIORITY.indexOf(b.platform))[0];
    g.name = named.dev.name_by_user || named.dev.name;
    const txt = g.devices.map((d) => `${d.dev.model || ""} ${d.dev.name || ""} ${d.dev.name_by_user || ""}`).join(" ")
      + " " + g.entities.slice(0, 40).map((e) => e.eid).join(" ");
    // ws-Modell (z. B. "Oven", "CoffeeMaker") zuerst prüfen
    const ws = g.devices.find((d) => d.platform === "homeconnect_ws");
    g.type = ws ? detectType(ws.dev.model || "") : "generic";
    if (g.type === "generic") g.type = detectType(txt);
    g.platforms = [...new Set(g.devices.map((d) => d.platform))];
    g.entities.sort((a, b) => a.rank - b.rank);
  }
  return [...groups.values()];
}

/* ------------------------------------------------------------------ */
/* Begriffe -> Entitäten                                               */
/* ------------------------------------------------------------------ */
function entName(hass, e) {
  const st = hass.states[e.eid];
  let n = st?.attributes?.friendly_name || e.eid;
  const dn = e.devName ? (e.devName.name_by_user || e.devName.name) : "";
  if (dn && n.startsWith(dn)) n = n.slice(dn.length).trim();
  if (n.includes(" - ")) n = n.split(" - ").pop();
  return n.trim() || e.eid;
}
function enrich(hass, g) {
  for (const e of g.entities) {
    e.domain = e.eid.split(".")[0];
    e.st = hass.states[e.eid];
    e.name = entName(hass, e);
    e.k = norm(`${e.eid} ${e.reg.translation_key || ""} ${e.name}`);
    e.key = canon(norm(e.name));
    e.cat = e.reg.entity_category || null;
    e.avail = okState(e.st);
  }
}
const isOpState = (e) => e.domain === "sensor" && e.st && (
  (Array.isArray(e.st.attributes.options) && e.st.attributes.options.some((o) => ["run", "finished", "delayedstart", "delayed_start"].includes(o)))
  || /OperationState/.test(e.st.state) || /operation_?state/.test(e.k));
const CONCEPTS = {
  op: { test: isOpState },
  power: { d: ["switch"], re: /einschalter|power|netzschalter/ },
  remaining: { d: ["sensor"], re: /remaining|verbleibende|restzeit/, not: /estimation_?state|autocount/ },
  endtime: { d: ["sensor"], re: /endzeit|end_?time|finish_?time|programmende(?!_)/, test2: (e) => e.st?.attributes?.device_class === "timestamp" },
  progress: { d: ["sensor"], re: /progress|fortschritt/ },
  activeProg: { d: ["sensor", "select"], re: /active_?program|aktives_?programm/ },
  selectedProg: { d: ["select"], re: /selected_?program|ausgewahltes_?programm|_programs( |$)|\.programs/ },
  selectedSensor: { d: ["sensor"], re: /selected_?program/ },
  programName: { d: ["sensor"], re: /program_?name|programname/ },
  baseProgram: { d: ["sensor"], re: /base_?program|baseprogram/ },
  phase: { d: ["sensor"], re: /programmphase|programphase|prozessphase|process_?phase|program_?phase/ },
  door: { d: ["sensor", "binary_sensor"], re: /(^|[._ ])(tur|door|doorstate)([._ 0-9]|$)|doorstate/, not: /alarm|camera_door/ },
  cavity: { d: ["sensor"], re: /cavity|garraum|aktuelle_temperatur|current_?temp/, not: /camera/ },
  setpoint: { d: ["number"], re: /setpoint|solltemperatur|sollwert_?temp|target_?temp/ },
  duration: { d: ["number"], re: /(^|[._ ])(duration|dauer)([._ ]|$)|option_duration/ },
  startIn: { d: ["number", "select"], re: /start_?in|starten_?in|startinrelative|fertig_?in|finish_?in/ },
  light: { d: ["light"], re: /./ },
  lightSwitch: { d: ["switch"], re: /beleuchtung|light/ },
  lightStatus: { d: ["binary_sensor"], re: /innenbeleuchtung|illumination/ },
  camera: { d: ["camera"], re: /./ },
  start: { d: ["button"], re: /(^|[._ ])start([._ ]|$)/, not: /pause|starten_?in|start_?in|timelapse/ },
  startPause: { d: ["button"], re: /start_?pause/ },
  pause: { d: ["button"], re: /pause|pausieren/, not: /start_?pause/ },
  resume: { d: ["button"], re: /fortsetzen|resume/ },
  stop: { d: ["button"], re: /(^|[._ ])stop|abbrechen|stoppen/, not: /timelapse/ },
  childlock: { d: ["switch"], re: /kindersicherung|childlock|child_?lock/ },
  fastpreheat: { d: ["switch"], re: /vorheizen|fastpreheat|fast_?pre_?heat/ },
  alarm: { d: ["number"], re: /wecker|alarm/ },
  waterTank: { d: ["sensor"], re: /wassertank|water_?tank/ },
  meatprobe: { d: ["sensor"], re: /meatprobe|meat_?probe|kerntemp/ },
  level: { d: ["select"], re: /(^|[._ ])stufe|steamassistlevel|microwave_?power/, not: /pyrolys/ },
  notification: { d: ["sensor"], re: /latest_notification_title/ },
  turnFood: { d: ["binary_sensor"], re: /turn_food_now/ },
  snapTime: { d: ["sensor"], re: /image_acquisition_time|last_snapshot_time|snapshot_time|image_time/ },
  snapAge: { d: ["sensor"], re: /snapshot_age|image_age/ },
  camRefresh: { d: ["button"], re: /refresh_snapshot|refresh_image|snapshot_refresh|refresh_camera/ },
  idosLevel: { d: ["sensor"], re: /i_?dos|dosier/, not: /active|aktiv/ },
  idosSwitch: { d: ["switch", "select"], re: /i_?dos|auto_?dos|dosier|stain|flecken/ },
  turnFoodMsg: { d: ["sensor"], re: /turn_food_message/ },
  salt: { d: ["sensor"], re: /(^|[._ ])(salz|salt)/ },
  rinseAid: { d: ["sensor"], re: /klarspuler|rinse_?aid|rinseaid/ },
  energyF: { d: ["sensor"], re: /energ/, test2: (e) => e.st?.attributes?.unit_of_measurement === "%" },
  waterF: { d: ["sensor"], re: /wasserverbrauch|water_?forecast|waterforecast|wasser/, not: /tank|temperatur|filter|harte/, test2: (e) => e.st?.attributes?.unit_of_measurement === "%" },
  beans: { d: ["select"], re: /bohnenmenge|bean_?amount|beanamount/ },
  fill: { d: ["number"], re: /fullmenge|fill_?quantity|fillquantity/ },
  ratio: { d: ["select"], re: /kaffee_?milch|milk_?ratio|milkratio|coffeemilkratio/ },
  size: { d: ["select"], re: /getrankegrosse|beverage_?size|drink_?size/ },
  waterTemp: { d: ["select"], re: /wassertemperatur|water_?temp|hotwatertemp|coffeetemperature|coffee_temperature/ },
  aroma: { d: ["select"], re: /aroma/ },
  cups: { d: ["select"], re: /(^|[._ ])(tassen|cups)([._ ]|$)/ },
  multi: { d: ["switch"], re: /mehrere|multiple_?bev|multiplebev|doppelbezug/ },
  dripTray: { d: ["sensor"], re: /auffangschale|drip_?tray|driptray/ },
  beanEmpty: { d: ["binary_sensor"], re: /bohnenbehalter|bean_?container/ },
  descaleIn: { d: ["sensor"], re: /entkalkung|descal/ },
  cleanIn: { d: ["sensor"], re: /reinigung_notwendig|clean(ing)?_?(in|count|required)/ },
  calcInfo: { d: ["sensor"], re: /calc_?n_?clean/ },
  filterIn: { d: ["sensor"], re: /wasserfilter|water_?filter/ },
  washTemp: { d: ["select"], re: /temperatur|temperature/, not: /wasser|water|kuhl|gefrier|fridge|freez/ },
  spin: { d: ["select"], re: /schleuder|spin/ },
  idos1: { d: ["sensor"], re: /idos_?1|i_dos_?1|dosier.*1/ },
  idos2: { d: ["sensor"], re: /idos_?2|i_dos_?2|dosier.*2/ },
  counterDrinks: { d: ["sensor"], re: /anzahl|counter/ },
  fridgeSet: { d: ["number"], re: /(kuhl|fridge|refrigerator|chiller).*(temp|soll|setpoint)|setpoint_?temperature_?refrigerator/ },
  freezerSet: { d: ["number"], re: /(gefrier|freezer).*(temp|soll|setpoint)|setpoint_?temperature_?freezer/ },
};
function pick(g, name, opts = {}) {
  const c = CONCEPTS[name];
  const list = g.entities.filter((e) => {
    if (c.test) { if (!c.test(e)) return false; }
    else {
      if (c.d && !c.d.includes(e.domain)) return false;
      if (c.re && !c.re.test(e.k)) return false;
      if (c.not && c.not.test(e.k)) return false;
    }
    if (c.test2 && !c.test2(e)) return false;
    return !!e.st;
  });
  if (opts.all) return list;
  return list.find((e) => e.avail) || list[0] || null;
}

/* ------------------------------------------------------------------ */
/* Modell aus HA-Daten                                                 */
/* ------------------------------------------------------------------ */
function optionLabel(hass, st, opt, lang) {
  try {
    if (hass.formatEntityState && st) {
      const f = hass.formatEntityState(st, opt);
      if (f && f !== opt) return f;
    }
  } catch (e) { /* ignorieren */ }
  const o = String(opt);
  let m;
  if ((m = o.match(/^(\d+)percent$/))) return `${m[1]} %`;
  if ((m = o.match(/^(\d+)c$/))) return `${m[1]} °C`;
  if ((m = o.match(/^level0?(\d+)$/))) return `${lang === "de" ? "Stufe" : "Level"} ${m[1]}`;
  if ((m = o.match(/^rpm(\d+)$/i))) return `${m[1]}`;
  const map = {
    de: { mild: "Mild", normal: "Normal", strong: "Stark", verystrong: "Sehr stark", doubleshot: "Doppio", doubleshotplus: "Doppio+",
      small: "Klein", medium: "Mittel", large: "Groß", verylarge: "Sehr groß", fine: "Fein", balanced: "Ausgewogen", distinctive: "Kräftig",
      two: "2", four: "4", six: "6", on: "An", off: "Aus", cold: "Kalt", gc20: "20 °C", gc30: "30 °C", gc40: "40 °C", gc60: "60 °C", gc90: "90 °C" },
    en: { verystrong: "Very strong", doubleshot: "Double shot", verylarge: "Very large", two: "2", four: "4", six: "6" },
  };
  const k = lastSeg(o).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (map[lang]?.[k]) return map[lang][k];
  if ((m = k.match(/^(?:gc|ul)?(\d+)$/))) return m[1];
  const seg = lastSeg(o).replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
  return cap(seg);
}

function programLabel(hass, raw, lang, ctx) {
  const info = progInfo(raw);
  if (info.cat === "fav") {
    const n = (ctx.favNames || {})[canon(raw)];
    const num = (raw.match(/(\d+)$/) || [])[1];
    return n || `${lang === "de" ? "Favorit" : "Favorite"} ${num ? parseInt(num, 10) : ""}`.trim();
  }
  let m;
  if ((m = info.rest.match(/^microwave(\d+)watt$/))) return `${lang === "de" ? "Mikrowelle" : "Microwave"} ${m[1]} W`;
  const dict = PROG_NAMES[info.tail] || PROG_NAMES[info.rest];
  if (dict) return dict[lang === "de" ? 0 : 1];
  if (info.cat === "dish") {
    const d = dishLabel(raw, lang);
    if (d) return d.label + (d.mods.length ? ` · ${d.mods.join(", ")}` : "");
  }
  // Übersetzung der offiziellen Integration nutzen
  if (ctx.officialSelect && hass.formatEntityState) {
    const opt = (ctx.officialSelect.attributes.options || []).find((o) => canon(o) === info.canon);
    if (opt) {
      try { const f = hass.formatEntityState(ctx.officialSelect, opt); if (f && f !== opt) return f; } catch (e) { /* */ }
    }
  }
  const camel = lastSeg(raw);
  if (/[A-Z]/.test(camel)) return camel.replace(/([a-z])([A-Z0-9])/g, "$1 $2");
  const parts = String(raw).split("_");
  return cap(parts.slice(-1)[0]);
}

function opCanon(st) {
  if (!okState(st)) return null;
  return lastSeg(st.state).toLowerCase().replace(/[^a-z]/g, "");
}

function buildModel(hass, g, cfg, lang) {
  enrich(hass, g);
  const T = I18N[lang];
  const used = new Set();
  const mark = (e) => { if (e) used.add(e.eid); return e; };
  const ov = cfg.entities || {};
  const P = (name, o) => {
    if (ov[name]) { const st = hass.states[ov[name]]; if (st) return mark({ eid: ov[name], st, avail: okState(st), domain: ov[name].split(".")[0], platform: "override", name: st.attributes.friendly_name, k: norm(ov[name]) }); }
    const list = pick(g, name, { all: true });
    list.forEach(mark);
    if (o && o.all) return list;
    return list.find((e) => e.avail) || list[0] || null;
  };
  const srcUsed = new Set();
  const src = (e) => { if (e && e.avail && e.platform !== "override") srcUsed.add(e.platform); return e; };

  const model = {
    type: cfg.device_type || g.type, name: cfg.name || g.name, key: g.key, demo: false,
    programs: [], options: [], consumables: [], controls: {}, actions: {}, more: [], counters: [],
  };

  // Betriebszustand
  const ops = pick(g, "op", { all: true }).filter((e) => e.avail);
  ops.forEach(mark);
  const op = ops[0];
  src(op);
  let status = opCanon(op?.st);
  const power = src(P("power"));
  const connected = g.entities.filter((e) => e.domain === "binary_sensor" && /verbindung|connected|konnektivitat/.test(e.k));
  const anyAvail = g.entities.some((e) => e.avail);
  if (!status) status = power && power.st.state === "off" ? "off" : (anyAvail ? "inactive" : "offline");
  if (status === "inactive" && power && power.st.state === "on") status = "ready";
  if (!anyAvail || (connected.length && connected.every((e) => e.st?.state === "off"))) status = "offline";
  model.status = status;
  model.running = ["run", "pause", "actionrequired", "delayedstart"].includes(status);
  model.power = power ? { entity: power.eid, on: power.st.state === "on" } : null;

  // Zeiten
  const rem = src(P("remaining"));
  const prog = src(P("progress"));
  const endt = P("endtime");
  let remaining = rem && rem.avail ? toSeconds(rem.st) : null;
  if ((remaining == null) && endt && endt.avail) {
    const d = new Date(endt.st.state);
    if (!isNaN(d)) remaining = Math.max(0, (d - Date.now()) / 1000);
    src(endt);
  }
  model.remaining = model.running ? remaining : null;
  model.estDuration = !model.running && remaining ? remaining : null;
  const pv = prog && prog.avail ? parseFloat(prog.st.state) : NaN;
  model.progress = model.running && !isNaN(pv) ? Math.max(0, Math.min(100, pv)) : (status === "finished" ? 100 : null);
  model.end = model.remaining != null ? new Date(Date.now() + model.remaining * 1000) : null;
  const si = P("startIn");
  if (si && si.avail && status === "delayedstart") model.startsIn = toSeconds(si.st);

  // Programme
  const selList = pick(g, "selectedProg", { all: true });
  selList.forEach(mark);
  const selAvail = selList.filter((e) => e.avail || (e.st && e.st.attributes.options));
  const officialSelect = selList.find((e) => e.platform === "home_connect")?.st || null;
  const favNames = Object.assign({}, cfg.favorites ? Object.fromEntries(Object.entries(cfg.favorites).map(([k, v]) => [canon(k), v])) : {}, loadFavNames(g.key));
  const ctx = { officialSelect, favNames };
  // Programmliste: die Quelle mit den meisten Optionen gewinnt (meist lokal), Reihenfolge nach Rang
  const optSources = selList.filter((e) => Array.isArray(e.st?.attributes?.options));
  optSources.sort((a, b) => (b.st.attributes.options.length - a.st.attributes.options.length) || (a.rank - b.rank));
  const progSource = optSources[0] || null;
  const writable = selList.filter((e) => e.avail).sort((a, b) => a.rank - b.rank);
  model.programSelects = writable.map((e) => ({ entity: e.eid, options: e.st.attributes.options || [] }));
  if (progSource) {
    const seen = new Set();
    for (const raw of progSource.st.attributes.options) {
      const info = progInfo(raw);
      if (info.cat === "hidden" || seen.has(info.canon)) continue;
      if (info.cat === "fav" && !favNames[info.canon]) continue; // unbenannte Favoriten ausblenden
      seen.add(info.canon);
      model.programs.push({ raw, canon: info.canon, cat: info.cat, tail: info.tail, label: programLabel(hass, raw, lang, ctx) });
    }
  }
  const actives = pick(g, "activeProg", { all: true }).filter((e) => e.avail);
  actives.forEach(mark);
  const sels = selList.filter((e) => e.avail);
  const selSensor = pick(g, "selectedSensor");
  if (selSensor) mark(selSensor);
  const progNameS = P("programName");
  const pickRaw = (arr) => arr.map((e) => e.st.state).find((v) => v && !BAD.has(v));
  const rawActive = pickRaw(actives);
  const rawSelected = pickRaw(sels) || (selSensor?.avail ? selSensor.st.state : null);
  const rawProg = model.running ? (rawActive || rawSelected) : (rawSelected || rawActive);
  if (rawProg) {
    const info = progInfo(rawProg);
    let label = programLabel(hass, rawProg, lang, ctx);
    const base = pick(g, "baseProgram");
    const baseMatch = base?.avail && canon(lastSeg(base.st.state)) === canon(lastSeg(info.tail ? info.tail : rawProg)) ;
    if (progNameS?.avail && (info.cat === "fav" || baseMatch || (base?.avail && canon(base.st.state) === info.canon))) {
      label = progNameS.st.state;
      if (info.cat === "fav") saveFavName(g.key, info.canon, label);
    }
    model.program = { raw: rawProg, canon: info.canon, cat: info.cat, tail: info.tail, label };
  } else if (progNameS?.avail) {
    model.program = { raw: progNameS.st.state, canon: canon(progNameS.st.state), cat: "prog", tail: "", label: progNameS.st.state };
  }
  model.selectedCanon = rawSelected ? canon(rawSelected) : null;

  // Phase
  const ph = P("phase");
  if (ph && ph.avail) {
    const k = lastSeg(ph.st.state).toLowerCase();
    if (k !== "none") { model.phaseKey = k; model.phase = T[`ph_${k}`] || optionLabel(hass, ph.st, ph.st.state, lang); }
  }

  // Temperaturen
  const cav = src(P("cavity"));
  const setp = src(P("setpoint"));
  model.temp = {
    current: cav?.avail ? Math.round(parseFloat(cav.st.state)) : null,
    target: setp?.avail ? Math.round(parseFloat(setp.st.state)) : null,
    unit: cav?.st?.attributes?.unit_of_measurement || "°C",
  };
  const mp = P("meatprobe");
  if (mp?.avail && parseFloat(mp.st.state) > 0) model.temp.probe = Math.round(parseFloat(mp.st.state));

  // Tür, Licht, Kamera
  const door = P("door");
  if (door?.avail) {
    const v = door.st.state;
    model.door = ["on", "open"].includes(v) || /open/i.test(v) ? "open" : "closed";
  }
  const light = P("light") || P("lightSwitch");
  const lightStatus = P("lightStatus");
  if (light) model.light = { entity: light.eid, domain: light.domain, on: light.st.state === "on", control: true };
  else if (lightStatus?.avail) model.light = { entity: lightStatus.eid, on: lightStatus.st.state === "on", control: false };
  const cams = pick(g, "camera", { all: true });
  cams.forEach(mark);
  if (cams.length) {
    model.camera = cams[0].eid;
    const sT = P("snapTime"), sA = P("snapAge");
    if (sT?.avail && !isNaN(Date.parse(sT.st.state))) model.camTime = Date.parse(sT.st.state);
    else if (sA?.avail && !isNaN(parseFloat(sA.st.state))) model.camTime = Date.now() - toSeconds(sA.st) * 1000;
    const rb = P("camRefresh");
    if (rb) model.camRefresh = rb.eid;
    model.camMax = (parseFloat(cfg.camera_max_age) || 5) * 60;
    model.camStale = model.camTime != null && (Date.now() - model.camTime) / 1000 > model.camMax;
  }

  // Hinweise (Oven Private)
  const turn = P("turnFood"), turnMsg = P("turnFoodMsg"), notif = P("notification");
  if (turn?.st?.state === "on") model.banner = { kind: "turn", title: T.turn_food, text: turnMsg?.avail ? turnMsg.st.state : "" };
  else if (model.type === "oven" && !model.running && model.program && model.program.cat === "dish" && ["ready", "inactive"].includes(status) && status !== "offline" && model.power?.on !== false) {
    model.banner = { kind: "dish", title: T.recognized, text: model.program.label, program: model.program };
  }
  if (notif) mark(notif);

  // Einstellungen
  const ctl = (name, label, kind) => {
    const e = P(name);
    if (!e || !e.st) return;
    const a = e.st.attributes;
    model.controls[name] = {
      entity: e.eid, domain: e.domain, kind, label, avail: e.avail,
      value: e.st.state, options: a.options || null, min: a.min, max: a.max, step: a.step, unit: a.unit_of_measurement,
      device_class: a.device_class,
      optionLabels: (a.options || []).map((o) => optionLabel(hass, e.st, o, lang)),
    };
  };
  ctl("setpoint", T.temperature, "stepper");
  ctl("duration", T.duration, "stepper");
  ctl("startIn", T.start_in, "startin");
  ctl("level", T.level, "segment");
  if (model.type === "coffee") {
    ctl("beans", T.beans, "beans");
    ctl("fill", T.fill, "stepper");
    ctl("ratio", T.ratio, "ratio");
    ctl("size", T.size, "segment");
    ctl("waterTemp", T.water_temp, "segment");
    ctl("aroma", T.aroma, "segment");
    ctl("multi", T.double, "toggle");
  }
  if (["washer", "dryer", "washerdryer"].includes(model.type)) {
    ctl("washTemp", T.wash_temp, "segment");
    ctl("spin", T.spin, "segment");
  }
  if (["fridge", "freezer", "winecooler"].includes(model.type)) {
    ctl("fridgeSet", T.fridge, "stepper");
    ctl("freezerSet", T.freezer, "stepper");
  }
  P("alarm"); // nicht prominent zeigen
  // Günstigster Start nach Strompreis
  const sic = model.controls.startIn;
  if (sic && !sic.options && cfg.price_entity !== "none" && ["dishwasher", "washer", "dryer", "washerdryer"].includes(model.type)) {
    const pid = cfg.price_entity || findPriceEntity(hass);
    const prices = pid ? parsePrices(hass.states[pid]) : null;
    const u = sic.unit || "h";
    const toH = (v) => (u === "s" ? v / 3600 : u === "min" ? v / 60 : v);
    const maxH = Math.min(24, toH(parseFloat(sic.max ?? 24)));
    const stepH = Math.max(0.25, toH(parseFloat(sic.step) || 1));
    const dur = model.estDuration || { dishwasher: 3 * 3600, washer: 2 * 3600, dryer: 2 * 3600, washerdryer: 3.5 * 3600 }[model.type];
    const c = cheapestStart(prices, dur, maxH, stepH);
    if (c) { c.value = u === "s" ? c.h * 3600 : u === "min" ? c.h * 60 : c.h; sic.cheap = c; }
  }

  // i-DOS (Waschmaschine)
  if (["washer", "washerdryer"].includes(model.type)) {
    const lv = P("idosLevel", { all: true }).filter((e) => e.domain === "sensor" && e.avail);
    const sw = P("idosSwitch", { all: true }).filter((e) => e.domain === "switch");
    const tanks = []; const tSeen = new Set();
    for (const e of lv) {
      const n = parseFloat(e.st.state);
      const two = /2|weich|soft/.test(e.k);
      const key = two ? 2 : 1;
      if (tSeen.has(key)) continue; tSeen.add(key);
      let pct = isNaN(n) ? null : n; let text = isNaN(n) ? optionLabel(hass, e.st, e.st.state, lang) : `${Math.round(n)} %`;
      const lvl = String(e.st.state).toLowerCase();
      if (pct == null) pct = /empty|leer/.test(lvl) ? 6 : /low|nearly|niedrig/.test(lvl) ? 25 : 80;
      tanks.push({ label: two ? T.softener : T.detergent, pct, text, level: pct < 15 ? "bad" : pct < 30 ? "warn" : "ok" });
    }
    const sws = []; const sSeen = new Set();
    for (const e of sw) { const k = canon(norm(e.name)); if (sSeen.has(k)) continue; sSeen.add(k); sws.push({ entity: e.eid, label: e.name, on: e.st?.state === "on", avail: e.avail }); }
    if (tanks.length || sws.length) model.idos = { tanks, switches: sws };
  }
  // Optionen (Schalter)
  const childlock = P("childlock");
  const fast = P("fastpreheat");
  const optCand = [];
  if (fast) optCand.push(fast);
  // Optionsschalter nur aus der besten Quelle – andere Quellen benennen dieselben Optionen anders
  const swAll = g.entities.filter((e) => e.domain === "switch" && !used.has(e.eid) && !e.cat
    && !/kamera|camera|tastenton|signal|einschalter|power/.test(e.k));
  const bestPlat = (swAll.find((e) => e.avail) || swAll[0])?.platform;
  swAll.forEach((e) => { if (e.platform === bestPlat) optCand.push(e); else used.add(e.eid); });
  if (childlock) optCand.push(childlock);
  const optSeen = new Set();
  for (const e of optCand) {
    const key = canon(norm(e.name)).replace(/(active|aktiv)$/, "");
    const alias = { fastpreheat: "schnellesvorheizen", childlock: "kindersicherung" }[key] || key;
    used.add(e.eid);
    if (optSeen.has(alias) || !e.st) continue;
    optSeen.add(alias);
    model.options.push({ entity: e.eid, label: e.name, on: e.st.state === "on", avail: e.avail });
  }
  // Duplikate aus anderen Quellen als "benutzt" markieren
  g.entities.filter((e) => e.domain === "switch").forEach((e) => {
    const key = canon(norm(e.name)); if (optSeen.has(key)) used.add(e.eid);
  });

  // Status & Pflege
  const cons = (name, label, kind) => {
    const e = P(name);
    if (!e || !e.avail) return;
    const v = e.st.state;
    let level = "ok", text = optionLabel(hass, e.st, v, lang), pct = null;
    const lv = String(v).toLowerCase();
    if (kind === "enum") {
      if (/nearly|low|almost|bald/.test(lv)) { level = "warn"; text = T.low; }
      else if (/notinserted|not_inserted|unplugged|missing/.test(lv)) { level = "bad"; text = T.not_inserted; }
      else if (/empty|leer/.test(lv)) { level = "bad"; text = T.empty; }
      pct = level === "bad" ? 6 : level === "warn" ? 25 : 90;
      if (/^(full|ok)$/.test(lv)) text = T.ok;
    } else if (kind === "tray") {
      if (/full|voll/.test(lv)) { level = "bad"; text = T.full; pct = 95; } else if (/nearly|almost|bald/.test(lv)) { level = "warn"; text = T.low; pct = 70; } else if (/notinserted|not_inserted/.test(lv)) { level = "bad"; text = T.not_inserted; pct = 0; } else { text = T.ok; pct = 15; }
    } else if (kind === "binEmpty") {
      level = v === "on" ? "bad" : "ok"; text = v === "on" ? T.empty : T.ok; pct = v === "on" ? 6 : 80;
    } else if (kind === "count") {
      const n = parseFloat(v);
      if (isNaN(n)) return;
      text = n <= 0 ? T.needed : T.left.replace("{n}", Math.round(n));
      level = n <= 0 ? "bad" : n <= 20 ? "warn" : "ok";
      pct = n <= 0 ? 4 : Math.max(8, Math.min(100, n <= 20 ? n * 1.5 : 30 + n / 5));
    } else if (kind === "pct") {
      const n = parseFloat(v); if (isNaN(n)) return;
      pct = n; text = `${Math.round(n)} %`; level = n < 15 ? "bad" : n < 30 ? "warn" : "ok";
    }
    model.consumables.push({ entity: e.eid, label, level, text, pct });
  };
  cons("waterTank", T.water_tank, "enum");
  cons("salt", T.salt, "enum");
  cons("rinseAid", T.rinse_aid, "enum");
  cons("dripTray", T.drip_tray, "tray");
  cons("beanEmpty", T.bean_container, "binEmpty");
  cons("descaleIn", T.descale, "count");
  cons("cleanIn", T.clean, "count");
  cons("calcInfo", T.calcnclean, "count");
  cons("filterIn", T.water_filter, "count");
  const ef = P("energyF"), wf = P("waterF");
  if (ef?.avail) model.forecast = Object.assign(model.forecast || {}, { energy: parseFloat(ef.st.state) });
  if (wf?.avail) model.forecast = Object.assign(model.forecast || {}, { water: parseFloat(wf.st.state) });
  const cSeen = new Set();
  g.entities.filter((e) => e.domain === "sensor" && /anzahl|counter|startanzahl/.test(e.k) && !/image|frame|snapshot|timelapse/.test(e.k) && e.avail)
    .forEach((e) => { used.add(e.eid); const k = canon(norm(e.name)); if (cSeen.has(k) || cSeen.size >= 4) return; cSeen.add(k); model.counters.push({ label: e.name, value: e.st.state }); });

  // Aktionen
  const btn = (name) => { const e = P(name); return e && e.st && e.st.state !== "unavailable" ? e.eid : null; };
  model.actions = { start: btn("start"), startPause: btn("startPause"), pause: btn("pause"), resume: btn("resume"), stop: btn("stop") };
  // offizielle Integration: Start über "Aktives Programm"
  const activeSelect = actives.find((e) => e.domain === "select") || pick(g, "activeProg", { all: true }).find((e) => e.domain === "select");
  model.activeSelect = activeSelect ? activeSelect.eid : null;

  // Weitere Einstellungen: übrige steuerbare Entitäten der besten Quelle, ohne Dubletten
  const moreSeen = new Set([...model.options.map((o) => canon(norm(o.label)))]);
  for (const e of g.entities) {
    if (used.has(e.eid) || !e.st || !["select", "number", "switch"].includes(e.domain)) continue;
    if (/einschalter|power|betriebszustand|operation|programs?$|programm$/.test(e.k) && e.domain !== "number") continue;
    const k = canon(norm(e.name));
    if (moreSeen.has(k)) continue;
    moreSeen.add(k);
    model.more.push({ entity: e.eid, domain: e.domain, label: e.name, avail: e.avail, st: e.st,
      optionLabels: (e.st.attributes.options || []).map((o) => optionLabel(hass, e.st, o, lang)) });
  }

  // Quellen
  g.entities.forEach((e) => { if (used.has(e.eid) && e.avail && e.platform !== "override") srcUsed.add(e.platform); });
  const local = [...srcUsed].some((p) => SOURCES[p]?.local);
  const cloud = [...srcUsed].some((p) => !SOURCES[p]?.local);
  model.source = status === "offline" ? "offline" : local && cloud ? "both" : local ? "local" : cloud ? "cloud" : "offline";
  return model;
}

/* ------------------------------------------------------------------ */
/* Strompreis-Prognose & günstigster Start                             */
/* ------------------------------------------------------------------ */
function parsePrices(st) {
  if (!st) return null;
  const a = st.attributes || {};
  const out = [];
  const add = (start, end, p) => {
    const t = new Date(start).getTime(); const e = end ? new Date(end).getTime() : NaN; const v = parseFloat(p);
    if (!isNaN(t) && !isNaN(v)) out.push({ t, e, p: v });
  };
  if (a.outlook_quarters && Array.isArray(a.outlook_quarters.prices)) {
    const t0 = new Date(a.outlook_quarters.start).getTime(); const mins = a.outlook_quarters.minutes || 15;
    a.outlook_quarters.prices.forEach((p, i) => add(t0 + i * mins * 60000, t0 + (i + 1) * mins * 60000, p));
  }
  if (!out.length && Array.isArray(a.outlook_hours)) a.outlook_hours.forEach((x) => add(x.start, x.end, x.price_mean ?? x.price ?? x.price_median));
  const lists = [a.data, a.prices, a.forecast, a.raw_today, a.raw_tomorrow, a.today_prices, a.tomorrow_prices, a.rates];
  if (!out.length) for (const l of lists) {
    if (!Array.isArray(l)) continue;
    for (const x of l) {
      if (!x || typeof x !== "object") continue;
      const start = x.start_time ?? x.start ?? x.startsAt ?? x.from ?? x.time;
      const end = x.end_time ?? x.end ?? x.endsAt ?? x.till ?? x.to;
      const price = x.price_ct_per_kwh ?? x.price_per_kwh ?? x.total ?? x.price ?? x.value ?? x.price_mean;
      add(start, end, price);
    }
  }
  if (!out.length) return null;
  out.sort((x, y) => x.t - y.t);
  out.forEach((x, i) => { if (isNaN(x.e)) x.e = out[i + 1] ? out[i + 1].t : x.t + 3600000; });
  const unit = a.unit_of_measurement || "";
  return { slots: out, unit };
}
let _priceCache = { t: 0, id: null };
function findPriceEntity(hass) {
  if (Date.now() - _priceCache.t < 120000 && _priceCache.states === hass.states) return _priceCache.id;
  let best = null, score = 0;
  for (const [id, st] of Object.entries(hass.states)) {
    if (!id.startsWith("sensor.")) continue;
    const a = st.attributes || {};
    let sc = 0;
    if (a.outlook_quarters?.prices) sc = 5; else if (Array.isArray(a.outlook_hours)) sc = 4;
    else if (Array.isArray(a.data) && a.data[0] && ("price_per_kwh" in a.data[0] || "price_ct_per_kwh" in a.data[0])) sc = 3;
    else if (Array.isArray(a.raw_today)) sc = 2;
    if (sc > score) { score = sc; best = id; }
  }
  _priceCache = { t: Date.now(), id: best, states: hass.states };
  return best;
}
function cheapestStart(prices, durSec, maxH, stepH) {
  if (!prices || !durSec) return null;
  const now = Date.now();
  const slots = prices.slots.filter((x) => x.e > now);
  if (!slots.length) return null;
  const dataEnd = slots[slots.length - 1].e;
  const avgAt = (s) => {
    const e = s + durSec * 1000; if (e > dataEnd) return null;
    let sum = 0;
    for (const x of slots) { const o = Math.min(e, x.e) - Math.max(s, x.t); if (o > 0) sum += o * x.p; }
    return sum / (durSec * 1000);
  };
  const nowAvg = avgAt(now);
  let best = null;
  for (let h = 0; h <= maxH + 1e-9; h += stepH) {
    const v = avgAt(now + h * 3600000);
    if (v == null) break;
    if (!best || v < best.avg - 1e-9) best = { h, avg: v };
  }
  if (!best) return null;
  return { h: best.h, avg: best.avg, now: nowAvg, unit: prices.unit };
}
function fmtPrice(v, unit) {
  if (v == null) return "–";
  const ct = /ct|cent/i.test(unit) ? v : v * 100;
  return `${ct.toFixed(1).replace(".", ",")} ct`;
}

/* Favoriten-Namen merken (aus "Program Name" von Home Connect Alt) */
function loadFavNames(key) {
  try { return JSON.parse(localStorage.getItem(`hc-card-fav-${key}`) || "{}"); } catch (e) { return {}; }
}
function saveFavName(key, canonKey, name) {
  try {
    const m = loadFavNames(key);
    if (m[canonKey] !== name) { m[canonKey] = name; localStorage.setItem(`hc-card-fav-${key}`, JSON.stringify(m)); }
  } catch (e) { /* */ }
}

/* ------------------------------------------------------------------ */
/* Andere Geräte (nicht Home Connect): Gruppen & automatische Profile  */
/* ------------------------------------------------------------------ */
const MAIN_DOMAINS = ["vacuum", "lawn_mower", "climate"];
const PROFILE_I18N = {
  de: {
    v_cleaning: "Reinigt", v_docked: "In der Station", v_returning: "Fährt zurück", v_idle: "Bereit", v_paused: "Pausiert", v_error: "Fehler",
    mw_mowing: "Mäht", mw_docked: "In der Ladestation", mw_returning: "Fährt zur Station", mw_paused: "Pausiert", mw_error: "Fehler", mw_off: "Aus",
    hv_off: "Aus", hv_heat: "Heizen", hv_cool: "Kühlen", hv_auto: "Auto", hv_dry: "Entfeuchten", hv_fan_only: "Lüften", hv_heat_cool: "Heizen/Kühlen",
    ha_heating: "heizt", ha_cooling: "kühlt", ha_drying: "entfeuchtet", ha_fan: "lüftet", ha_idle: "im Leerlauf", ha_off: "aus",
    battery: "Akku", area: "Fläche", time: "Dauer", room: "Raum", next_start: "Nächster Start", humidity: "Luftfeuchte",
    current_t: "Ist", target_t: "Soll", mode: "Modus", fan_mode: "Lüfter", swing: "Lamellen", swing_h: "Lamellen horizontal", preset: "Profil",
    start_clean: "Starten", resume_clean: "Fortsetzen", go_home: "Zur Station", locate: "Orten", start_mow: "Mähen starten",
    rooms: "Räume", clean_rooms: "{n} Räume reinigen", clean_room1: "1 Raum reinigen", map_hint: "Räume auf der Karte antippen", sel_clear: "Auswahl löschen", hours_left: "noch {n} h", error_t: "Fehler", modes: "Betriebsart",
    t_lawnmower: "Mähroboter", t_aircon: "Klimaanlage", e_entity: "Andere Integration: Hauptentität (Sauger, Mäher, Klima …)",
    e_hadevice: "Andere Integration: beliebiges Gerät", e_extra: "Zusätzliche Entitäten", e_roles: "Entitäten selbst zuordnen",
  },
  en: {
    v_cleaning: "Cleaning", v_docked: "Docked", v_returning: "Returning", v_idle: "Ready", v_paused: "Paused", v_error: "Error",
    mw_mowing: "Mowing", mw_docked: "Docked", mw_returning: "Returning", mw_paused: "Paused", mw_error: "Error", mw_off: "Off",
    hv_off: "Off", hv_heat: "Heat", hv_cool: "Cool", hv_auto: "Auto", hv_dry: "Dry", hv_fan_only: "Fan", hv_heat_cool: "Heat/Cool",
    ha_heating: "heating", ha_cooling: "cooling", ha_drying: "drying", ha_fan: "fan", ha_idle: "idle", ha_off: "off",
    battery: "Battery", area: "Area", time: "Time", room: "Room", next_start: "Next start", humidity: "Humidity",
    current_t: "Current", target_t: "Target", mode: "Mode", fan_mode: "Fan", swing: "Swing", swing_h: "Horizontal swing", preset: "Preset",
    start_clean: "Start", resume_clean: "Resume", go_home: "Return to dock", locate: "Locate", start_mow: "Start mowing",
    rooms: "Rooms", clean_rooms: "Clean {n} rooms", clean_room1: "Clean 1 room", map_hint: "Tap rooms on the map", sel_clear: "Clear selection", hours_left: "{n} h left", error_t: "Error", modes: "Mode",
    t_lawnmower: "Robot mower", t_aircon: "Air conditioner", e_entity: "Other integration: main entity (vacuum, mower, climate …)",
    e_hadevice: "Other integration: any device", e_extra: "Additional entities", e_roles: "Assign entities manually",
  },
};
Object.assign(I18N.de, PROFILE_I18N.de);
Object.assign(I18N.en, PROFILE_I18N.en);
Object.assign(TYPE_META, { lawnmower: { color: "#7cc35a", icon: "mower" }, aircon: { color: "#4fb7ff", icon: "aircon" } });

let _gfdCache = new Map();
function groupFromDevice(hass, deviceId, extra = []) {
  const ck = `${deviceId}|${extra.join(",")}`;
  const c = _gfdCache.get(ck);
  if (c && c.e === hass.entities && c.d === hass.devices) return c.g;
  const dev = deviceId ? hass.devices?.[deviceId] : null;
  const ents = [];
  if (deviceId) for (const e of Object.values(hass.entities || {})) if (e.device_id === deviceId && !e.hidden) ents.push({ eid: e.entity_id, platform: e.platform, rank: 0, reg: e, devName: dev });
  for (const id of extra) if (id && !ents.some((x) => x.eid === id)) ents.push({ eid: id, platform: hass.entities?.[id]?.platform || "extra", rank: 0, reg: hass.entities?.[id] || { entity_id: id }, devName: dev });
  const first = ents[0];
  const g = {
    key: deviceId || extra[0], name: dev ? (dev.name_by_user || dev.name) : (hass.states[extra[0]]?.attributes?.friendly_name || extra[0]),
    devices: dev ? [{ id: deviceId, platform: first?.platform, dev }] : [], entities: ents, platforms: [...new Set(ents.map((e) => e.platform))], generic: true,
  };
  g.type = detectType(`${dev?.model || ""} ${dev?.name || ""} ${ents.slice(0, 30).map((e) => e.eid).join(" ")}`);
  _gfdCache.set(ck, { e: hass.entities, d: hass.devices, g });
  return g;
}
function attrLabel(hass, st, attr, v, lang) {
  try { if (hass.formatEntityAttributeValue) { const f = hass.formatEntityAttributeValue(st, attr, v); if (f && f !== v) return f; } } catch (e) { /* */ }
  const T = I18N[lang];
  if (attr === "hvac_mode" || attr === "hvac_modes") return T[`hv_${v}`] || cap(String(v).replace(/_/g, " "));
  const de = { off: "Aus", on: "An", low: "Niedrig", medium: "Mittel", middle: "Mittel", high: "Hoch", auto: "Auto", eco: "Eco", comfort: "Komfort",
    boost: "Boost", sleep: "Schlafen", away: "Abwesend", home: "Zuhause", silent: "Leise", quiet: "Leise", standard: "Standard", strong: "Stark",
    turbo: "Turbo", max: "Max", min: "Min", both: "Beide", vertical: "Vertikal", horizontal: "Horizontal", none: "Keine" };
  const k = String(v).toLowerCase();
  if (lang === "de" && de[k]) return de[k];
  return cap(String(v).replace(/_/g, " "));
}
// Lamellen: swing_mode / swing_horizontal_mode -> {v, h}
function swingInfo(sw, swh) {
  const s = String(sw ?? "").toLowerCase().replace(/[\s-]/g, "_");
  const h2 = String(swh ?? "").toLowerCase();
  const off = (x) => !x || /^(off|stop|stopped|fixed|none|aus|false|0)$/.test(x) || /^(position|pos)_?\d|^(top|middle|bottom|left|right|center|centre)$/.test(x);
  let v = false, h = false;
  if (!off(s)) {
    if (/both|3d|all|swing_all|full/.test(s)) { v = true; h = true; }
    else if (/horiz|left_?right|leftright/.test(s)) h = true;
    else v = true; // on, swing, vertical, up_down, auto …
  }
  if (h2 && !off(h2)) h = true;
  return { v, h };
}
// Affine Abbildung Roboter-Koordinaten -> Bildpixel aus 3 Kalibrierpunkten
function affineFromCalibration(cp) {
  if (!Array.isArray(cp) || cp.length < 3) return null;
  const P = cp.slice(0, 3).map((p) => [+p.vacuum?.x, +p.vacuum?.y, +p.map?.x, +p.map?.y]);
  if (P.some((p) => p.some((v) => isNaN(v)))) return null;
  const [[x0, y0, u0, v0], [x1, y1, u1, v1], [x2, y2, u2, v2]] = P;
  const det = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
  if (!det) return null;
  const a = ((u1 - u0) * (y2 - y0) - (u2 - u0) * (y1 - y0)) / det;
  const b = ((u2 - u0) * (x1 - x0) - (u1 - u0) * (x2 - x0)) / det;
  const d = ((v1 - v0) * (y2 - y0) - (v2 - v0) * (y1 - y0)) / det;
  const e = ((v2 - v0) * (x1 - x0) - (v1 - v0) * (x2 - x0)) / det;
  return (x, y) => [u0 + a * (x - x0) + b * (y - y0), v0 + d * (x - x0) + e * (y - y0)];
}
const OK_ERR = /^(none|no_?error|no error|ok|0|fehler 0|kein fehler|normal|unknown|unavailable|)$/i;

function buildProfileModel(hass, g, cfg, lang, main) {
  enrich(hass, g);
  const T = I18N[lang];
  const st = main.st;
  const a = st?.attributes || {};
  const used = new Set([main.eid]);
  const ov = cfg.entities || {};
  const ovSt = (k) => (ov[k] && hass.states[ov[k]] ? { eid: ov[k], st: hass.states[ov[k]], avail: okState(hass.states[ov[k]]) } : null);
  const find = (fn) => g.entities.find((e) => !used.has(e.eid) && e.st && fn(e));
  const findAll = (fn) => g.entities.filter((e) => !used.has(e.eid) && e.st && fn(e));
  const type = cfg.device_type || (main.domain === "vacuum" ? "cleaningrobot" : main.domain === "lawn_mower" ? "lawnmower" : "aircon");
  const model = {
    type, name: cfg.name || g.name, key: g.key, demo: false, profile: main.domain,
    programs: [], options: [], consumables: [], controls: {}, actions: {}, more: [], counters: [], svcActions: [], info: [],
    temp: {}, source: "ext", platformLabel: (main.platform || "").replace(/_/g, " ").toUpperCase(),
  };
  const s = st?.state;
  if (!okState(st)) { model.status = "offline"; }

  // Akku
  let bat = ovSt("battery");
  if (!bat) bat = find((e) => e.domain === "sensor" && (e.st.attributes.device_class === "battery" || /battery|akku/.test(e.k)) && !/voltage|spannung|temp|_0$/.test(e.k) && !isNaN(parseFloat(e.st.state)));
  let battery = bat?.avail ? parseFloat(bat.st.state) : NaN;
  if (bat) used.add(bat.eid);
  if (isNaN(battery)) battery = parseFloat(a.battery_level ?? a.battery);
  if (!isNaN(battery)) model.battery = Math.round(battery);

  // Kamera / Karte
  const camOv = ovSt("camera");
  const cams = camOv ? [camOv] : findAll((e) => e.domain === "camera" && !(e.platform === "mqtt" && /map_?data/.test(e.k)));
  cams.forEach((e) => used.add(e.eid));
  const cam = cams.find((e) => /map|karte/.test(e.k) && !/_\d+$/.test(e.eid)) || cams[0];
  if (cam) model.camera = cam.eid;

  // Fehler
  const errE = ovSt("error") || find((e) => e.domain === "sensor" && /(^|[._ ])(error|fehler)([._ ]|$)|error_message|errormessage/.test(e.k) && !/code|reset/.test(e.k));
  if (errE) used.add(errE.eid);
  const errTxt = errE?.avail && !OK_ERR.test(String(errE.st.state).trim()) ? errE.st.state : (a.error && !OK_ERR.test(String(a.error)) ? a.error : null);
  if (errTxt && s !== "unavailable") model.banner = { kind: "error", title: T.error_t, text: String(errTxt) };

  // Schalter -> Optionen (Chips)
  const sws = findAll((e) => (e.domain === "switch" || e.domain === "light") && !e.cat);
  sws.forEach((e) => { used.add(e.eid); model.options.push({ entity: e.eid, label: e.name, on: e.st.state === "on", avail: e.avail }); });

  // Verbrauchsmaterial
  const consRe = /brush|bürste|burste|filter|mop|pad|blade|messer|sensor_?(dirty|clean)|dust|bag|beutel|detergent|reinigungsmittel|water_?tank|wassertank|consumable|verschleiss/;
  const pctSensors = findAll((e) => e.domain === "sensor" && consRe.test(e.k) && e.st.attributes.unit_of_measurement === "%");
  const covered = new Set();
  for (const e of pctSensors) {
    used.add(e.eid);
    const n = parseFloat(e.st.state); if (isNaN(n)) continue;
    const base = e.eid.replace(/_left$|_life$|_percent$/, "");
    covered.add(base);
    model.consumables.push({ entity: e.eid, label: e.name, pct: n, text: `${Math.round(n)} %`, level: n < 10 ? "bad" : n < 25 ? "warn" : "ok" });
  }
  for (const e of findAll((e) => e.domain === "sensor" && consRe.test(e.k) && ["h", "min", "s", "d"].includes(e.st.attributes.unit_of_measurement))) {
    used.add(e.eid);
    const base = e.eid.replace(/_time_left$|_left$|_remaining$/, "");
    if (covered.has(base) || [...covered].some((c) => e.eid.startsWith(c))) continue;
    const sec = toSeconds(e.st); if (sec == null) continue;
    const h = Math.round(sec / 3600);
    model.consumables.push({ entity: e.eid, label: e.name, pct: Math.max(4, Math.min(100, h / 3)), text: T.hours_left.replace("{n}", h), level: h <= 0 ? "bad" : h < 10 ? "warn" : "ok" });
  }
  for (const e of findAll((e) => e.domain === "sensor" && /tank|bag|beutel|detergent|dust_bag|mop_pad|wassertank/.test(e.k) && e.st.attributes.unit_of_measurement == null && isNaN(parseFloat(e.st.state)))) {
    used.add(e.eid);
    const v = String(e.st.state).toLowerCase();
    const bad = /not_?installed|missing|empty|full|error|leer|voll/.test(v) && !/not_?full/.test(v);
    const warn = /low|nearly|warning/.test(v);
    model.consumables.push({ entity: e.eid, label: e.name, pct: bad ? 6 : warn ? 25 : 85, text: bad || warn ? optionLabel(hass, e.st, e.st.state, lang) : T.ok, level: bad ? "bad" : warn ? "warn" : "ok" });
  }
  if (model.consumables.length > 9) model.consumables = model.consumables.slice(0, 9);

  // Einstellungen (Auswahllisten) und weitere Entitäten
  const ctlSel = (e, label) => {
    used.add(e.eid);
    if (!e.avail || !(e.st.attributes.options || []).length) return;
    const opts = e.st.attributes.options || [];
    model.controls[`sel_${e.eid}`] = { entity: e.eid, domain: "select", kind: "segment", label: label || e.name, avail: e.avail, value: e.st.state, options: opts, optionLabels: opts.map((o) => optionLabel(hass, e.st, o, lang)) };
  };

  if (main.domain === "vacuum") {
    const map = { cleaning: "run", returning: "run", paused: "pause", docked: "docked", idle: "ready", error: "error" };
    model.status = okState(st) ? (map[s] || "ready") : "offline";
    model.running = ["cleaning", "returning", "paused"].includes(s);
    model.statusText = okState(st) ? [T[`v_${s}`] || cap(s), model.battery != null ? `${model.battery} %` : null].filter(Boolean).join(" · ") : T.offline;
    model.phase = s === "returning" ? T.v_returning : null;
    model.program = { canon: s === "cleaning" ? "cleaning" : "idle", cat: "prog", label: T[`v_${s}`] || s };
    model.ringPct = model.battery; model.ringLabel = T.battery;
    // Saugstufe
    const fanSel = find((e) => e.domain === "select" && /suction|fan|saug/.test(e.k) && !/room|raum/.test(e.k));
    if (fanSel) ctlSel(fanSel);
    else if (Array.isArray(a.fan_speed_list) && a.fan_speed_list.length) {
      model.controls.fan = { entity: main.eid, kind: "segment", label: lang === "de" ? "Saugstufe" : "Suction", avail: okState(st), value: a.fan_speed, options: a.fan_speed_list,
        optionLabels: a.fan_speed_list.map((o) => attrLabel(hass, st, "fan_speed", o, lang)), svc: ["vacuum", "set_fan_speed"], svcKey: "fan_speed" };
    }
    for (const e of findAll((e) => e.domain === "select" && /clean.*mode|reinigungsmodus|mop|wisch|water|wasser|humid|feucht|route|wetness/.test(e.k) && !/room_?\d|raum_?\d|language|sprache|map|karte|rotation|frequency|history/.test(e.k)).slice(0, 4)) ctlSel(e);
    // Statistik
    const area = find((e) => e.domain === "sensor" && (/cleaned_area|current_statistics_area|clean_area/.test(e.k) || e.st.attributes.device_class === "area") && !/total/.test(e.k));
    const time = find((e) => e.domain === "sensor" && /cleaning_time|current_statistics_time|clean_time/.test(e.k) && !/total/.test(e.k));
    const room = find((e) => e.domain === "sensor" && /current_room|aktueller_raum/.test(e.k));
    [area, time, room].forEach((e) => e && used.add(e.eid));
    if (area?.avail) { let v = parseFloat(area.st.state); const u = area.st.attributes.unit_of_measurement || "m²"; if (/cm/.test(u) || (!area.st.attributes.unit_of_measurement && v > 5000)) v = v / 10000; model.info.push({ label: T.area, value: `${Math.round(v * 10) / 10} m²` }); }
    if (time?.avail) { const sec = toSeconds(time.st.attributes.unit_of_measurement ? time.st : { state: time.st.state, attributes: { unit_of_measurement: "s" } }); if (sec != null) model.info.push({ label: T.time, value: fmtDur(sec, lang) }); }
    if (room?.avail) model.info.push({ label: T.room, value: room.st.state });
    // Räume (Dreame / Xiaomi Miio / Roborock: Attribut "rooms")
    let rooms = [];
    if (a.rooms && typeof a.rooms === "object") {
      const lists = Array.isArray(a.rooms) ? [a.rooms] : Object.values(a.rooms);
      const cur = a.selected_map && a.rooms[a.selected_map] ? [a.rooms[a.selected_map]] : lists;
      for (const l of cur) if (Array.isArray(l)) for (const r of l) if (r && r.id != null) rooms.push({ id: r.id, name: r.name || `#${r.id}`, icon: r.icon });
    }
    // Räume mit Koordinaten aus der Karten-Kamera (Dreame, Xiaomi Cloud Map Extractor …)
    const camA = cam ? hass.states[cam.eid]?.attributes || {} : {};
    const aff = affineFromCalibration(camA.calibration_points);
    if (aff && camA.rooms && typeof camA.rooms === "object") {
      const mr = [];
      for (const [k, r] of Object.entries(camA.rooms)) {
        if (!r || r.x0 == null || r.y0 == null || r.x1 == null || r.y1 == null) continue;
        if (r.visibility && !/visible/i.test(r.visibility)) continue;
        const id = r.room_id ?? r.id ?? (isNaN(+k) ? k : +k);
        const pts = [[r.x0, r.y0], [r.x1, r.y0], [r.x1, r.y1], [r.x0, r.y1]].map(([x, y]) => aff(x, y));
        const c = r.x != null && r.y != null ? aff(r.x, r.y) : aff((r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2);
        mr.push({ id, name: r.name || `#${id}`, pts, c, area: Math.abs((r.x1 - r.x0) * (r.y1 - r.y0)) });
        if (!rooms.some((x) => String(x.id) === String(id))) rooms.push({ id, name: r.name || `#${id}`, icon: r.icon });
      }
      if (mr.length) model.mapRooms = mr.sort((x, y) => y.area - x.area);
    }
    // Valetudo (MQTT): Sensor "Map segments" mit {id: Name}
    const dev0 = g.devices?.[0]?.dev;
    const segSens = find((e) => e.domain === "sensor" && /map_segments|mapsegments/.test(e.k));
    if (segSens) used.add(segSens.eid);
    const isValetudo = /valetudo/i.test(`${dev0?.manufacturer || ""} ${main.eid}`);
    if (segSens && !rooms.length) {
      for (const [k, v] of Object.entries(segSens.st.attributes || {})) {
        if (["friendly_name", "icon", "unit_of_measurement", "device_class", "state_class"].includes(k) || typeof v !== "string") continue;
        rooms.push({ id: isNaN(+k) ? k : +k, name: v });
      }
    }
    if (rooms.length) {
      model.rooms = rooms;
      const pf = main.platform;
      let vTopic = null;
      if (isValetudo || (pf === "mqtt" && segSens)) {
        const ident = (dev0?.identifiers || []).find((x) => Array.isArray(x) && x[0] === "mqtt")?.[1];
        if (cfg.valetudo_topic) vTopic = cfg.valetudo_topic.replace(/\/+$/, "");
        else if (ident) vTopic = `valetudo/${ident}`;
      }
      model.roomSvc = pf === "dreame_vacuum" ? ["dreame_vacuum", "vacuum_clean_segment", "segments"]
        : pf === "xiaomi_miio" ? ["xiaomi_miio", "vacuum_clean_segment", "segments"]
        : pf === "roborock" ? ["vacuum", "send_command", "app_segment_clean"]
        : vTopic ? ["mqtt", "publish", `${vTopic}/MapSegmentationCapability/clean/set`] : null;
    }
    // Aktionen
    const A = (id, label, icon, svc, primary) => ({ id, label, icon, svc, primary });
    if (s === "cleaning") model.svcActions = [A("pause", T.pause_btn, "pause", ["vacuum", "pause"], true), A("home", T.go_home, "home2", ["vacuum", "return_to_base"])];
    else if (s === "paused") model.svcActions = [A("start", T.resume_clean, "play", ["vacuum", "start"], true), A("home", T.go_home, "home2", ["vacuum", "return_to_base"])];
    else if (s === "returning") model.svcActions = [A("pause", T.pause_btn, "pause", ["vacuum", "pause"], true), A("stop", T.stop, "stop", ["vacuum", "stop"])];
    else if (okState(st)) model.svcActions = [A("start", T.start_clean, "play", ["vacuum", "start"], true), A("locate", T.locate, "target", ["vacuum", "locate"])];
  } else if (main.domain === "lawn_mower") {
    const map = { mowing: "run", returning: "run", paused: "pause", docked: "docked", error: "error" };
    model.status = okState(st) ? (map[s] || "ready") : "offline";
    model.running = ["mowing", "returning", "paused"].includes(s);
    const plain = find((e) => e.domain === "sensor" && /status_plain|status_text|activity|aktivitat/.test(e.k));
    if (plain) used.add(plain.eid);
    model.statusText = okState(st) ? [plain?.avail ? plain.st.state : (T[`mw_${s}`] || cap(s)), model.battery != null ? `${model.battery} %` : null].filter(Boolean).join(" · ") : T.offline;
    model.program = { canon: s === "mowing" ? "mowing" : "idle", cat: "prog", label: T[`mw_${s}`] || s };
    model.ringPct = model.battery; model.ringLabel = T.battery;
    const next = find((e) => e.domain === "sensor" && (/next_?start|timer_next|next_schedule|nachster_start|next_mow/.test(e.k)));
    if (next) used.add(next.eid);
    const nd = next?.avail ? new Date(next.st.state) : (a.timer_next_unix ? new Date(a.timer_next_unix) : null);
    if (nd && !isNaN(nd)) model.info.push({ label: T.next_start, value: `${nd.toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { weekday: "short" })} ${fmtClock(nd)}` });
    const hours = find((e) => e.domain === "sensor" && /statistic_hours|total_?hours|mowing_time|betriebsstunden/.test(e.k));
    if (hours?.avail) { used.add(hours.eid); model.counters.push({ label: hours.name, value: `${hours.st.state} ${hours.st.attributes.unit_of_measurement || "h"}` }); }
    const height = find((e) => e.domain === "number" && /height|schnitt|cutting/.test(e.k));
    if (height) { used.add(height.eid); const ha = height.st.attributes; model.controls.cut = { entity: height.eid, domain: "number", kind: "stepper", label: height.name, avail: height.avail, value: height.st.state, min: ha.min, max: ha.max, step: ha.step, unit: ha.unit_of_measurement }; }
    for (const e of findAll((e) => e.domain === "select" && !e.cat).slice(0, 3)) ctlSel(e);
    // Betriebsarten über Tasten (z. B. Robonect: Auto, Manuell, Home, Feierabend)
    const modeBtns = findAll((e) => e.domain === "button" && /(^|_)(auto|man|manual|home|eod|end_of_day|feierabend|job)$/.test(e.eid));
    modeBtns.forEach((e) => used.add(e.eid));
    if (modeBtns.length) model.modeButtons = modeBtns.map((e) => ({ entity: e.eid, label: { auto: "Auto", man: lang === "de" ? "Manuell" : "Manual", manual: lang === "de" ? "Manuell" : "Manual", home: "Home", eod: lang === "de" ? "Feierabend" : "End of day" }[e.eid.split("_").pop()] || e.name }));
    const A = (id, label, icon, svc, primary) => ({ id, label, icon, svc, primary });
    if (s === "mowing") model.svcActions = [A("pause", T.pause_btn, "pause", ["lawn_mower", "pause"], true), A("dock", T.go_home, "home2", ["lawn_mower", "dock"])];
    else if (s === "paused") model.svcActions = [A("start", T.resume_clean, "play", ["lawn_mower", "start_mowing"], true), A("dock", T.go_home, "home2", ["lawn_mower", "dock"])];
    else if (s === "returning") model.svcActions = [A("pause", T.pause_btn, "pause", ["lawn_mower", "pause"], true)];
    else if (okState(st)) model.svcActions = [A("start", T.start_mow, "play", ["lawn_mower", "start_mowing"], true), A("dock", T.go_home, "home2", ["lawn_mower", "dock"])];
  } else if (main.domain === "climate") {
    const mode = s;
    model.status = !okState(st) ? "offline" : mode === "off" ? "off" : "run";
    model.running = false;
    const action = a.hvac_action;
    const modeColor = { cool: "#4fb7ff", heat: "#ff8a3d", dry: "#36cfc4", fan_only: "#a0b4c8", heat_cool: "#9d8cff", auto: "#9d8cff" }[mode];
    if (modeColor) model.color = modeColor;
    model.climateMode = action === "heating" ? "heat" : action === "cooling" ? "cool" : action === "drying" ? "dry" : action === "fan" ? "fan_only" : action === "idle" ? "idle" : mode;
    const cur = parseFloat(a.current_temperature), tgt = parseFloat(a.temperature);
    const min = parseFloat(a.min_temp ?? 16), max = parseFloat(a.max_temp ?? 30);
    model.temp = { current: isNaN(cur) ? null : cur, target: isNaN(tgt) ? null : tgt, unit: a.temperature_unit || "°C" };
    model.ringPct = isNaN(tgt) ? null : Math.max(2, Math.min(100, ((tgt - min) / (max - min)) * 100));
    model.ringLabel = T.target_t;
    const parts = [T[`hv_${mode}`] || cap(mode)];
    if (!isNaN(cur)) parts.push(!isNaN(tgt) && mode !== "off" ? `${cur} → ${tgt} °C` : `${cur} °C`);
    model.statusText = okState(st) ? parts.join(" · ") : T.offline;
    if (!isNaN(cur)) model.info.push({ label: T.current_t, value: `${cur} °C`, big: true });
    if (!isNaN(tgt)) model.info.push({ label: T.target_t, value: `${tgt} °C` });
    if (a.current_humidity != null) model.info.push({ label: T.humidity, value: `${a.current_humidity} %` });
    if (action) model.info.push({ label: T.modes, value: T[`ha_${action}`] || action });
    model.power = { entity: main.eid, on: mode !== "off", svcDomain: "climate" };
    if (!isNaN(tgt)) model.controls.setpoint = { entity: main.eid, kind: "stepper", label: T.temperature, avail: okState(st), value: String(tgt), min, max, step: parseFloat(a.target_temp_step) || 0.5, unit: "°C", svc: ["climate", "set_temperature"], svcKey: "temperature", fine: true };
    const segA = (key, attrList, attr, label, svc) => {
      const list = a[attrList];
      if (!Array.isArray(list) || !list.length) return;
      model.controls[key] = { entity: main.eid, kind: "segment", label, avail: okState(st), value: attr === "hvac_mode" ? mode : a[attr], options: list,
        optionLabels: list.map((o) => attrLabel(hass, st, attr, o, lang)), svc: ["climate", svc], svcKey: attr };
    };
    segA("hvac", "hvac_modes", "hvac_mode", T.mode, "set_hvac_mode");
    segA("fanm", "fan_modes", "fan_mode", T.fan_mode, "set_fan_mode");
    segA("swing", "swing_modes", "swing_mode", T.swing, "set_swing_mode");
    segA("swingh", "swing_horizontal_modes", "swing_horizontal_mode", T.swing_h, "set_swing_horizontal_mode");
    segA("preset", "preset_modes", "preset_mode", T.preset, "set_preset_mode");
    model.swing = swingInfo(a.swing_mode, a.swing_horizontal_mode);
    const dispE = (ov.display && hass.states[ov.display] ? { eid: ov.display, st: hass.states[ov.display] } : null)
      || g.entities.find((e) => e.st && ["light", "switch"].includes(e.domain) && /display|anzeige|hintergrund|backlight|beleuchtung|screen|led|panel_?light/.test(e.k));
    if (dispE) model.display = { entity: dispE.eid, on: dispE.st.state === "on", avail: okState(dispE.st) };
  }
  // Übrige Entitäten -> "Weitere Einstellungen"
  const moreSeen = new Set();
  for (const e of g.entities) {
    if (used.has(e.eid) || !e.st || !["select", "number", "switch", "button"].includes(e.domain)) continue;
    if (/room_?\d|raum_?\d/.test(e.k) && e.domain !== "button") continue;
    const k = canon(norm(e.name)); if (moreSeen.has(k)) continue; moreSeen.add(k);
    model.more.push({ entity: e.eid, domain: e.domain, label: e.name, avail: e.avail, st: e.st, optionLabels: (e.st.attributes.options || []).map((o) => optionLabel(hass, e.st, o, lang)) });
  }
  if (model.consumables.length === 0 && model.battery != null && main.domain !== "climate") {
    model.consumables.push({ label: T.battery, pct: model.battery, text: `${model.battery} %`, level: model.battery < 15 ? "bad" : model.battery < 30 ? "warn" : "ok" });
  }
  return model;
}

/* ------------------------------------------------------------------ */
/* Demo-Modelle                                                        */
/* ------------------------------------------------------------------ */
const DEMO_TYPES = ["oven", "microwave", "dishwasher", "washer", "dryer", "washerdryer", "coffee", "fridge", "freezer", "winecooler", "hob", "hood", "warmingdrawer", "cookprocessor", "cleaningrobot", "lawnmower", "aircon"];
function demoModel(type, lang, cfg, state) {
  const T = I18N[lang];
  const cycle = 240; // Sekunden
  const t = (Date.now() / 1000) % cycle;
  const pct = (t / cycle) * 100;
  const total = { oven: 2700, dishwasher: 12600, washer: 7200, dryer: 6000, washerdryer: 9600, coffee: 60, warmingdrawer: 3600 }[type] || 3600;
  const remaining = total * (1 - pct / 100);
  const pl = (k) => PROG_NAMES[k]?.[lang === "de" ? 0 : 1] || k;
  const m = {
    type, name: cfg.name || T[`t_${type}`], key: `demo-${type}`, demo: true, source: "local",
    status: "run", running: true, progress: pct, remaining, end: new Date(Date.now() + remaining * 1000),
    programs: [], options: [], consumables: [], controls: {}, actions: { pause: "demo", stop: "demo" }, more: [], counters: [],
    programSelects: [{ entity: "demo", options: [] }], temp: {},
  };
  const progs = (list, cat) => list.map((k) => ({ raw: k, canon: k, cat, tail: k, label: pl(k) }));
  const seg = (label, opts, labels, value) => ({ entity: "demo", domain: "select", kind: "segment", label, avail: true, value, options: opts, optionLabels: labels || opts });
  const sel = state.demoSel || {};
  const pickSel = (k, def) => (sel[k] != null ? sel[k] : def);
  if (type === "oven") {
    m.programs = [
      ...progs(["hotair", "topbottomheating", "hotairgrilling", "pizzasetting", "grilllargearea", "intensiveheat", "slowcook", "keepwarm", "airfry"], "heat"),
      ...progs(["microwave90watt", "microwave180watt", "microwave360watt", "microwave600watt", "microwavemax"], "micro")
        .map((p) => ({ ...p, label: p.canon === "microwavemax" ? pl("microwavemax") : `${lang === "de" ? "Mikrowelle" : "Microwave"} ${p.canon.match(/\d+/)} W` })),
      ...["cooking_oven_program_dish_recommendation_conv_browningdetection_pizzafrozen", "cooking_oven_program_dish_recommendation_conv_bakingsensor_breadrolls",
        "cooking_oven_program_dish_recommendation_conv_wholechicken", "cooking_oven_program_dish_recommendation_conv_browningdetection_lasagnehigh",
        "cooking_oven_program_dish_recommendation_conv_potatowedges", "cooking_oven_program_dish_recommendation_conv_muffins",
        "cooking_oven_program_dish_recommendation_conv_steam_freshbreadrolls", "cooking_oven_program_dish_automatic_microwave_risotto",
        "cooking_oven_program_dish_recommendation_conv_meatprobe_roastjoint", "cooking_oven_program_dish_recommendation_conv_tarteflambee"]
        .map((raw) => ({ raw, canon: canon(raw), cat: "dish", tail: "", label: programLabel({}, raw, lang, { favNames: {} }) })),
      ...progs(["doughproving", "reheat"], "steam"),
      ...progs(["pyrolysis", "descale"], "clean"),
    ];
    const cur = pickSel("prog", "hotair");
    m.program = m.programs.find((p) => p.canon === cur) || m.programs[0];
    m.selectedCanon = m.program.canon;
    m.temp = { current: Math.round(40 + Math.min(1, pct / 40) * 140), target: 180, unit: "°C" };
    m.controls.setpoint = { entity: "demo", kind: "stepper", label: T.temperature, avail: true, value: String(pickSel("setpoint", 180)), min: 30, max: 300, step: 5, unit: "°C" };
    m.controls.duration = { entity: "demo", kind: "stepper", label: T.duration, avail: true, value: String(pickSel("duration", 2700)), min: 60, max: 86400, step: 300, unit: "s", device_class: "duration" };
    m.options = [{ entity: "demo", label: lang === "de" ? "Schnelles Vorheizen" : "Fast preheat", on: true, avail: true },
      { entity: "demo", label: lang === "de" ? "Kindersicherung" : "Child lock", on: false, avail: true }];
    m.consumables = [{ label: T.water_tank, level: "ok", text: T.ok, pct: 90 }];
    m.light = { entity: "demo", on: true, control: true };
    m.camera = "demo"; m.camTime = Date.now() - 95000; m.camMax = 300;
    m.door = "closed";
  } else if (type === "dishwasher") {
    m.programs = progs(["eco50", "auto2", "intensiv70", "quick45", "glas40", "prerinse", "nightwash", "machinecare"], "prog");
    m.program = m.programs[0]; m.selectedCanon = "eco50";
    m.phaseKey = pct < 15 ? "prerinse" : pct < 60 ? "mainwash" : pct < 80 ? "finalrinse" : "drying";
    m.phase = T[`ph_${m.phaseKey}`];
    m.options = ["VarioSpeed+", lang === "de" ? "Halbe Beladung" : "Half load", "HygienePlus", lang === "de" ? "Intensivzone" : "Intensive zone", lang === "de" ? "Leise auf Knopfdruck" : "Silence on demand", lang === "de" ? "Extra Trocken" : "Extra dry"]
      .map((l, i) => ({ entity: "demo", label: l, on: i === 0, avail: true }));
    m.controls.startIn = { entity: "demo", kind: "startin", label: T.start_in, avail: true, value: String(pickSel("startIn", 0)), min: 0, max: 24, step: 1, unit: "h",
      cheap: { h: 5, value: 5, avg: 43.9, now: 47.6, unit: "ct/kWh" } };
    m.consumables = [{ label: T.salt, level: "ok", text: T.ok, pct: 90 }, { label: T.rinse_aid, level: "warn", text: T.low, pct: 25 }];
    m.forecast = { energy: 51, water: 40 };
    m.door = "closed";
  } else if (type === "washer" || type === "washerdryer") {
    m.programs = progs(["cotton", "eco4060", "easycare", "mix", "delicatessilk", "wool", "super153045", "shirtsblouses", "sportfitness", "towels", "outdoor", "rinse", "spin", "drumclean"], "prog");
    m.program = m.programs.find((p) => p.canon === pickSel("prog", "cotton")) || m.programs[0]; m.selectedCanon = m.program.canon;
    m.phaseKey = pct < 60 ? "wash" : pct < 82 ? "rinse" : type === "washerdryer" && pct > 92 ? "dry" : "spin";
    m.phase = T[`ph_${m.phaseKey}`];
    m.controls.washTemp = seg(T.wash_temp, ["cold", "20", "30", "40", "60", "90"], [lang === "de" ? "Kalt" : "Cold", "20°", "30°", "40°", "60°", "90°"], pickSel("washTemp", "40"));
    m.controls.spin = seg(T.spin, ["400", "800", "1000", "1200", "1400"], null, pickSel("spin", "1400"));
    m.idos = { tanks: [{ label: T.detergent, pct: 64, text: "64 %", level: "ok" }, { label: T.softener, pct: 22, text: "22 %", level: "warn" }],
      switches: [{ entity: "demo", label: lang === "de" ? "Auto-Dosierung" : "Auto dosing", on: true, avail: true }, { entity: "demo", label: lang === "de" ? "Fleckenautomatik" : "Stain removal", on: false, avail: true }] };
    m.consumables = [{ label: lang === "de" ? "Trommel" : "Drum", level: "ok", text: T.ok, pct: 80 }, { label: lang === "de" ? "Flusensieb" : "Lint filter", level: "warn", text: lang === "de" ? "Reinigen" : "Clean", pct: 25 }];
    m.options = ["Speed Perfect", "Eco Perfect", lang === "de" ? "Vorwäsche" : "Prewash", lang === "de" ? "Wasser Plus" : "Water plus"]
      .map((l, i) => ({ entity: "demo", label: l, on: i === 1, avail: true }));
    m.controls.startIn = { entity: "demo", kind: "startin", label: lang === "de" ? "Fertig in" : "Finish in", avail: true, value: String(pickSel("startIn", 0)), min: 0, max: 24, step: 1, unit: "h",
      cheap: { h: 4, value: 4, avg: 44.6, now: 47.6, unit: "ct/kWh" } };
    m.door = "closed";
  } else if (type === "dryer") {
    m.programs = progs(["cotton", "synthetic", "mix", "blankets", "businessshirts", "downfeathers", "hygiene", "jeans", "outdoor", "towels", "super40", "refresh", "timewarm"], "prog");
    m.program = m.programs[0]; m.selectedCanon = "cotton";
    m.phaseKey = "dry"; m.phase = T.ph_dry;
    m.controls.dry = seg(lang === "de" ? "Trocknungsziel" : "Drying target", ["iron", "cupboard", "cupboardplus", "extra"],
      lang === "de" ? ["Bügel", "Schrank", "Schrank+", "Extra"] : ["Iron", "Cupboard", "Cupboard+", "Extra"], pickSel("dry", "cupboard"));
    m.consumables = [{ label: lang === "de" ? "Kondensbehälter" : "Condensate", level: "ok", text: T.ok, pct: 70 }, { label: lang === "de" ? "Flusensieb" : "Lint filter", level: "warn", text: lang === "de" ? "Reinigen" : "Clean", pct: 25 }];
    m.options = [lang === "de" ? "Knitterschutz" : "Wrinkle guard", lang === "de" ? "Schonen" : "Gentle"].map((l, i) => ({ entity: "demo", label: l, on: i === 0, avail: true }));
    m.door = "closed";
  } else if (type === "coffee") {
    const drinks = ["cappuccino", "espresso", "coffee", "lattemacchiato", "caffelatte", "ristretto", "espressomacchiato", "flatwhite", "americano", "hotwater", "milkfroth"];
    m.programs = [{ raw: "favorite_001", canon: "favorite001", cat: "fav", tail: "", label: "Sandras Cappu" }, ...progs(drinks, "drink")];
    const cur = pickSel("prog", "favorite001");
    m.program = m.programs.find((p) => p.canon === cur) || m.programs[0];
    if (m.program.canon === "favorite001") m.program = { ...m.program, tail: "cappuccino" };
    m.selectedCanon = cur;
    m.remaining = 60 * (1 - pct / 100); m.end = new Date(Date.now() + m.remaining * 1000);
    m.controls.beans = { entity: "demo", kind: "beans", label: T.beans, avail: true, value: pickSel("beans", "strong"), options: ["verymild", "mild", "normal", "strong", "verystrong", "doubleshot", "tripleshot", "coffeeground"],
      optionLabels: lang === "de" ? ["Sehr mild", "Mild", "Normal", "Stark", "Sehr stark", "Doppio", "Triple Shot", "Pulver"] : ["Very mild", "Mild", "Normal", "Strong", "Very strong", "Double shot", "Triple shot", "Ground"] };
    m.controls.fill = { entity: "demo", kind: "stepper", label: T.fill, avail: true, value: String(pickSel("fill", 180)), min: 60, max: 260, step: 20, unit: "ml" };
    m.controls.ratio = { entity: "demo", kind: "ratio", label: T.ratio, avail: true, value: pickSel("ratio", "40percent"),
      options: ["30percent", "40percent", "50percent", "60percent", "70percent", "80percent", "90percent"] };
    m.controls.ratio.optionLabels = m.controls.ratio.options.map((o) => `${parseInt(o, 10)} %`);
    m.controls.waterTemp = seg(T.water_temp, ["normal", "high", "max"], lang === "de" ? ["Normal", "Hoch", "Max"] : ["Normal", "High", "Max"], pickSel("waterTemp", "high"));
    m.controls.multi = { entity: "demo", kind: "toggle", label: T.double, avail: true, value: "off" };
    m.consumables = [{ label: T.water_tank, level: "ok", text: T.ok, pct: 70 }, { label: T.bean_container, level: "ok", text: T.ok, pct: 60 },
      { label: T.descale, level: "ok", text: T.left.replace("{n}", 322), pct: 95 }, { label: T.drip_tray, level: "warn", text: lang === "de" ? "Bald voll" : "Nearly full", pct: 75 }];
    m.phaseKey = pct < 20 ? "grinding" : pct < 60 ? "coffeebrewing" : "milkfroth"; m.phase = T[`ph_${m.phaseKey}`];
  } else if (type === "fridge" || type === "freezer") {
    m.status = "run"; m.running = false; m.progress = null; m.remaining = null; m.end = null; m.statusText = type === "fridge" ? "4 °C · −18 °C" : "−18 °C";
    m.controls.fridgeSet = type === "fridge" ? { entity: "demo", kind: "stepper", label: T.fridge, avail: true, value: String(pickSel("fridgeSet", 4)), min: 2, max: 8, step: 1, unit: "°C" } : undefined;
    m.controls.freezerSet = { entity: "demo", kind: "stepper", label: T.freezer, avail: true, value: String(pickSel("freezerSet", -18)), min: -24, max: -16, step: 1, unit: "°C" };
    m.options = ["Super-Kühlen", "Super-Gefrieren", lang === "de" ? "Urlaubsmodus" : "Vacation", "Eco"].map((l, i) => ({ entity: "demo", label: l, on: i === 3, avail: true }));
    m.camera = type === "fridge" ? "demo" : null;
    m.door = "closed"; m.actions = {};
    m.temp = { current: type === "fridge" ? 4 : -18, unit: "°C" };
  } else if (type === "hob") {
    m.statusText = lang === "de" ? "2 Zonen aktiv" : "2 zones active"; m.progress = null; m.end = null; m.remaining = 600;
    m.zones = [{ label: "1", level: 7 }, { label: "2", level: 0 }, { label: "3", level: 4 }, { label: "4", level: 0 }];
    m.options = [lang === "de" ? "Kindersicherung" : "Child lock", lang === "de" ? "Wischschutz" : "Wipe protection"].map((l) => ({ entity: "demo", label: l, on: false, avail: true }));
    m.actions = {};
  } else if (type === "hood") {
    m.statusText = lang === "de" ? "Stufe 2 · Licht an" : "Level 2 · light on"; m.progress = null; m.end = null; m.remaining = null;
    m.controls.level = seg(T.level, ["0", "1", "2", "3", "i1", "i2"], ["0", "1", "2", "3", "Int 1", "Int 2"], pickSel("level", "2"));
    m.light = { entity: "demo", on: true, control: true };
    m.options = [lang === "de" ? "Nachlauf" : "Run-on", "Auto"].map((l, i) => ({ entity: "demo", label: l, on: i === 1, avail: true }));
    m.consumables = [{ label: lang === "de" ? "Fettfilter" : "Grease filter", level: "warn", text: lang === "de" ? "Bald reinigen" : "Clean soon", pct: 30 }];
    m.actions = {};
  } else if (type === "warmingdrawer") {
    m.programs = progs(["preheatovenware", "keepwarm", "slowcook", "doughproving", "defrost"], "prog");
    m.program = m.programs[1]; m.selectedCanon = "keepwarm";
    m.controls.level = seg(T.level, ["1", "2", "3", "4"], null, pickSel("level", "2"));
  }
  else if (type === "microwave") {
    m.programs = [...progs(["microwave90watt", "microwave180watt", "microwave360watt", "microwave600watt", "microwave900watt", "microwavemax"], "micro")
      .map((p) => ({ ...p, label: p.canon === "microwavemax" ? pl("microwavemax") : `${p.canon.match(/\d+/)} W` })),
      ...["cooking_oven_program_dish_automatic_microwave_defrostmeat", "cooking_oven_program_dish_automatic_microwave_vegetablesfresh",
        "cooking_oven_program_dish_automatic_microwave_basmatirice", "cooking_oven_program_dish_recommendation_microwave_microwavepopcornsweet",
        "cooking_oven_program_dish_recommendation_microwave_cup"].map((raw) => ({ raw, canon: canon(raw), cat: "dish", tail: "", label: programLabel({}, raw, lang, { favNames: {} }) })),
      ...progs(["hotair", "grilllargearea"], "heat")];
    m.program = m.programs.find((p) => p.canon === pickSel("prog", "microwave600watt")) || m.programs[3]; m.selectedCanon = m.program.canon;
    const tot = 300; m.remaining = tot * (1 - pct / 100); m.end = new Date(Date.now() + m.remaining * 1000);
    m.controls.duration = { entity: "demo", kind: "stepper", label: T.duration, avail: true, value: String(pickSel("duration", 300)), min: 10, max: 5400, step: 30, unit: "s", device_class: "duration" };
    m.light = { entity: "demo", on: true, control: true }; m.door = "closed";
  } else if (type === "winecooler") {
    m.running = false; m.progress = null; m.remaining = null; m.end = null; m.statusText = lang === "de" ? "Oben 12 °C · Unten 7 °C" : "Top 12 °C · Bottom 7 °C";
    m.controls.fridgeSet = { entity: "demo", kind: "stepper", label: lang === "de" ? "Zone oben" : "Upper zone", avail: true, value: String(pickSel("fridgeSet", 12)), min: 5, max: 20, step: 1, unit: "°C" };
    m.controls.freezerSet = { entity: "demo", kind: "stepper", label: lang === "de" ? "Zone unten" : "Lower zone", avail: true, value: String(pickSel("freezerSet", 7)), min: 5, max: 20, step: 1, unit: "°C" };
    m.options = [lang === "de" ? "Innenlicht" : "Interior light", lang === "de" ? "Präsentationsmodus" : "Presentation mode", "Eco"].map((l, i) => ({ entity: "demo", label: l, on: i === 2, avail: true }));
    m.temp = { current: 12, unit: "°C" }; m.door = "closed"; m.actions = {};
  } else if (type === "cookprocessor") {
    m.programs = progs(["stir", "knead", "chop", "steam", "slowcook", "fry", "sousvide", "ferment"], "prog")
      .map((p) => ({ ...p, label: { stir: lang === "de" ? "Rühren" : "Stir", knead: lang === "de" ? "Kneten" : "Knead", chop: lang === "de" ? "Zerkleinern" : "Chop", steam: lang === "de" ? "Dampfgaren" : "Steam", slowcook: lang === "de" ? "Schmoren" : "Slow cook", fry: lang === "de" ? "Anbraten" : "Fry", sousvide: "Sous-vide", ferment: lang === "de" ? "Fermentieren" : "Ferment" }[p.canon] }));
    m.program = m.programs.find((p) => p.canon === pickSel("prog", "stir")) || m.programs[0]; m.selectedCanon = m.program.canon;
    m.temp = { current: 92, target: 100, unit: "°C" };
    m.controls.setpoint = { entity: "demo", kind: "stepper", label: T.temperature, avail: true, value: String(pickSel("setpoint", 100)), min: 30, max: 200, step: 5, unit: "°C" };
    m.controls.duration = { entity: "demo", kind: "stepper", label: T.duration, avail: true, value: String(pickSel("duration", 1200)), min: 60, max: 7200, step: 60, unit: "s", device_class: "duration" };
    m.controls.level = seg(T.speed, ["1", "2", "3", "4", "5", "6", "turbo"], ["1", "2", "3", "4", "5", "6", "Turbo"], pickSel("level", "3"));
    m.options = [lang === "de" ? "Linkslauf" : "Reverse", lang === "de" ? "Deckel verriegelt" : "Lid locked"].map((l, i) => ({ entity: "demo", label: l, on: i === 1, avail: true }));
  } else if (type === "cleaningrobot") {
    m.programs = progs(["cleanall", "cleanmap", "gohome"], "prog").map((p) => ({ ...p, label: { cleanall: lang === "de" ? "Alles reinigen" : "Clean all", cleanmap: lang === "de" ? "Räume wählen" : "Select rooms", gohome: lang === "de" ? "Zur Station" : "Go home" }[p.canon] }));
    m.program = { canon: "cleaning", cat: "prog", label: T.v_cleaning }; m.selectedCanon = "cleanall"; m.programs = [];
    m.profile = "vacuum"; m.source = "ext"; m.platformLabel = "DEMO"; m.actions = {};
    m.battery = Math.round(100 - pct * 0.6); m.ringPct = m.battery; m.ringLabel = T.battery;
    m.statusText = `${T.v_cleaning} · ${m.battery} %`;
    m.info = [{ label: T.area, value: `${Math.round(pct / 3)} m²` }, { label: T.room, value: lang === "de" ? "Wohnzimmer" : "Living room" }];
    m.rooms = (lang === "de" ? ["Wohnzimmer", "Küche", "Esszimmer", "Büro", "Flur", "Bad"] : ["Living room", "Kitchen", "Dining", "Office", "Hall", "Bath"]).map((n, i) => ({ id: i + 1, name: n }));
    m.roomSvc = ["demo", "demo", "segments"];
    // Demo-Karte: Grundriss als SVG, Räume in Bildpixeln
    const R6 = [[10, 10, 190, 150], [200, 10, 330, 110], [200, 120, 330, 200], [340, 10, 470, 120], [10, 160, 190, 230], [340, 130, 470, 230]];
    const cols = ["#3c6e8f", "#8f6a3c", "#5d8f3c", "#6d4f8f", "#8f3c5a", "#3c8f86"];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="240" viewBox="0 0 480 240"><rect width="480" height="240" fill="#16181c"/>${R6.map(([x0, y0, x1, y1], i) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="4" fill="${cols[i]}" fill-opacity=".55" stroke="#c9d1d9" stroke-opacity=".5" stroke-width="2"/>`).join("")}<circle cx="60" cy="200" r="6" fill="#4caf50"/><circle cx="120" cy="80" r="7" fill="#fff"/></svg>`;
    m.camera = "demo"; m.mapPic = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    m.mapRooms = R6.map(([x0, y0, x1, y1], i) => ({ id: i + 1, name: m.rooms[i].name, pts: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], c: [(x0 + x1) / 2, (y0 + y1) / 2], area: (x1 - x0) * (y1 - y0) })).sort((a, b) => b.area - a.area);
    m.svcActions = [{ id: "pause", label: T.pause_btn, icon: "pause", svc: ["vacuum", "pause"], primary: true }, { id: "home", label: T.go_home, icon: "home2", svc: ["vacuum", "return_to_base"] }];
    m.controls.level = seg(lang === "de" ? "Saugstufe" : "Suction", ["silent", "standard", "power"], lang === "de" ? ["Leise", "Standard", "Power"] : ["Silent", "Standard", "Power"], pickSel("level", "standard"));
    m.consumables = [{ label: T.battery, level: "ok", text: `${Math.round(100 - pct * 0.6)} %`, pct: 100 - pct * 0.6 }, { label: lang === "de" ? "Staubbehälter" : "Dust bin", level: "warn", text: T.low, pct: 75 },
      { label: lang === "de" ? "Bürsten" : "Brushes", level: "ok", text: T.ok, pct: 80 }];
    m.camera = "demo";
  }
  else if (type === "lawnmower") {
    m.profile = "lawn_mower"; m.programs = []; m.actions = {}; m.source = "ext"; m.platformLabel = "DEMO";
    m.battery = Math.round(100 - pct * 0.5); m.ringPct = m.battery; m.ringLabel = T.battery;
    m.program = { canon: "mowing", cat: "prog", label: T.mw_mowing };
    m.statusText = `${T.mw_mowing} · ${m.battery} %`;
    m.info = [{ label: T.next_start, value: lang === "de" ? "Mo 08:00" : "Mon 08:00" }, { label: T.area, value: "312 m²" }];
    m.controls.cut = { entity: "demo", kind: "stepper", label: lang === "de" ? "Schnitthöhe" : "Cutting height", avail: true, value: String(pickSel("cut", 45)), min: 20, max: 60, step: 5, unit: "mm" };
    m.modeButtons = ["Auto", lang === "de" ? "Manuell" : "Manual", "Home", lang === "de" ? "Feierabend" : "End of day"].map((l) => ({ entity: "demo", label: l }));
    m.options = [lang === "de" ? "Zeitplan" : "Schedule", lang === "de" ? "Regensensor" : "Rain sensor", lang === "de" ? "Wintermodus" : "Winter mode"].map((l, i) => ({ entity: "demo", label: l, on: i < 2, avail: true }));
    m.consumables = [{ label: lang === "de" ? "Messer" : "Blades", pct: 62, text: "62 %", level: "ok" }, { label: T.battery, pct: m.battery, text: `${m.battery} %`, level: "ok" }];
    m.svcActions = [{ id: "pause", label: T.pause_btn, icon: "pause", svc: ["lawn_mower", "pause"], primary: true }, { id: "dock", label: T.go_home, icon: "home2", svc: ["lawn_mower", "dock"] }];
  } else if (type === "aircon") {
    m.profile = "climate"; m.programs = []; m.actions = {}; m.source = "ext"; m.platformLabel = "DEMO";
    const mode = pickSel("hvac", "cool");
    m.color = { cool: "#4fb7ff", heat: "#ff8a3d", dry: "#36cfc4", fan_only: "#a0b4c8", heat_cool: "#9d8cff" }[mode];
    m.climateMode = mode; m.running = false; m.status = mode === "off" ? "off" : "run"; m.progress = null; m.remaining = null; m.end = null;
    const tgt = parseFloat(pickSel("setpoint", 22));
    m.temp = { current: 25.5, target: tgt }; m.ringPct = ((tgt - 16) / 16) * 100; m.ringLabel = T.target_t;
    m.statusText = `${T[`hv_${mode}`]} · 25,5 °C → ${tgt} °C`;
    m.info = [{ label: T.current_t, value: "25,5 °C", big: true }, { label: T.target_t, value: `${tgt} °C` }, { label: T.humidity, value: "48 %" }];
    m.power = { entity: "demo", on: mode !== "off", svcDomain: "climate" };
    m.controls.setpoint = { entity: "demo", kind: "stepper", label: T.temperature, avail: true, value: String(tgt), min: 16, max: 32, step: 0.5, unit: "°C", fine: true };
    const sg = (k, label, opts, labels, v) => { m.controls[k] = { entity: "demo", kind: "segment", label, avail: true, value: pickSel(k, v), options: opts, optionLabels: labels }; };
    sg("hvac", T.mode, ["off", "cool", "heat", "dry", "fan_only", "heat_cool"], ["off", "cool", "heat", "dry", "fan_only", "heat_cool"].map((x) => T[`hv_${x}`]), "cool");
    sg("fanm", T.fan_mode, ["auto", "low", "medium", "high"], lang === "de" ? ["Auto", "Niedrig", "Mittel", "Hoch"] : ["Auto", "Low", "Medium", "High"], "auto");
    sg("swing", T.swing, ["off", "vertical", "horizontal", "both"], lang === "de" ? ["Aus", "Vertikal", "Horizontal", "Beide"] : ["Off", "Vertical", "Horizontal", "Both"], "vertical");
    sg("preset", T.preset, ["none", "eco", "comfort", "boost"], lang === "de" ? ["Keins", "Eco", "Komfort", "Boost"] : ["None", "Eco", "Comfort", "Boost"], "comfort");
    m.swing = swingInfo(m.controls.swing.value);
    m.display = { entity: "demo", on: true, avail: true };
    m.options = [lang === "de" ? "Schlafen" : "Sleep", lang === "de" ? "Display" : "Display", lang === "de" ? "Selbstreinigung" : "Self clean", "UV"].map((l, i) => ({ entity: "demo", label: l, on: i === 1, avail: true }));
    m.consumables = [{ label: "Filter", pct: 70, text: "70 %", level: "ok" }];
  }
  if (!m.program && m.programs.length) m.program = m.programs[0];
  return m;
}

/* ------------------------------------------------------------------ */
/* Icons & Animationen                                                 */
/* ------------------------------------------------------------------ */
const ICON = {
  oven: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 8h18"/><rect x="7" y="11" width="10" height="7" rx="1.5"/>',
  dishwasher: '<rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M4 7h16"/><path d="M12 11.5c-1.2 1.6-2 2.7-2 3.6a2 2 0 0 0 4 0c0-.9-.8-2-2-3.6z"/>',
  washer: '<rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M4 6.5h16"/><circle cx="12" cy="14" r="4.5"/>',
  dryer: '<rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M4 6.5h16"/><circle cx="12" cy="14" r="4.5"/><path d="M10 13.5c1-1 3 1 4 0"/>',
  coffee: '<path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3c0 1 1 1 1 2s-1 1-1 2M12 3c0 1 1 1 1 2s-1 1-1 2"/>',
  fridge: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M5 10h14M8.5 6v1.5M8.5 13v3"/>',
  hob: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="12" r="2.5"/><circle cx="15.5" cy="12" r="2.5"/>',
  hood: '<path d="M9 3h6v6l5 6H4l5-6z"/><path d="M7 18h10"/>',
  drawer: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M9 10h6"/>',
  generic: '<rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="12" cy="12" r="3"/>',
  robot: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M9 5.5h6"/>',
  cookit: '<path d="M5 10h14l-1.5 9a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7z"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/><path d="M12 13v4"/>',
  micro: '<rect x="3" y="5" width="18" height="14" rx="2"/><rect x="6" y="8" width="9" height="8" rx="1"/><path d="M18 9v1M18 13v1"/>',
  steam: '<path d="M8 20c0-2 2-2 2-4s-2-2-2-4 2-2 2-4M14 20c0-2 2-2 2-4s-2-2-2-4 2-2 2-4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  alarm: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3L2 6M19 3l3 3"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19l7-7"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  half: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 12h16"/><path d="M6 16h12" opacity=".5"/>',
  flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"/>',
  shield: '<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  cups: '<path d="M3 9h7v5a3.5 3.5 0 0 1-7 0z"/><path d="M13 9h7v5a3.5 3.5 0 0 1-7 0z"/>',
  euro: '<path d="M17 6.5A7 7 0 1 0 17 17.5"/><path d="M4 10.5h9M4 13.5h9"/>',
  camera: '<path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.5" r="3.5"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
  power: '<path d="M12 3v9"/><path d="M6.3 6.3a8 8 0 1 0 11.4 0"/>',
  pause: '<path d="M9 5v14M15 5v14"/>', play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>', chev: '<path d="M6 9l6 6 6-6"/>',
  minus: '<path d="M6 12h12"/>', plus: '<path d="M12 6v12M6 12h12"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>', expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  bean: '<ellipse cx="12" cy="12" rx="5.5" ry="8" transform="rotate(30 12 12)" fill="currentColor" stroke="none"/>',
  home: '<path d="M4 11l8-7 8 7v9H4z"/>', cloud: '<path d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>', drop: '<path d="M12 3c-3.5 4.5-6 7.6-6 10.5a6 6 0 0 0 12 0C18 10.6 15.5 7.5 12 3z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', door: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="15" cy="12" r="1"/>',
  turn: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
};
const ic = (name, size = 20, sw = 1.8) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ICON.generic}</svg>`;
Object.assign(ICON, {
  fan: '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4c0-3 1-6.4 4-6.4 2 0 2.6 2 1 3.6L13.4 11M13.6 12c3 0 6.4 1 6.4 4 0 2-2 2.6-3.6 1L13 13.4M12 13.6c0 3-1 6.4-4 6.4-2 0-2.6-2-1-3.6l3.6-3.4M10.4 12c-3 0-6.4-1-6.4-4 0-2 2-2.6 3.6-1L11 10.6"/>',
  display: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  auto: '<path d="M4 17l4-10 4 10M5.6 13h4.8"/><path d="M15 7h5M17.5 7v10"/>',
  mower: '<path d="M3 17h18"/><path d="M5 17V12a2 2 0 0 1 2-2h7l3 3h2a2 2 0 0 1 2 2v2"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
  aircon: '<rect x="2" y="5" width="20" height="8" rx="2"/><path d="M6 10h12"/><path d="M7 16c0 1.5-1 1.5-1 3M12 16c0 1.5-1 1.5-1 3M17 16c0 1.5-1 1.5-1 3"/>',
  home2: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>', target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  room: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h8v8M11 4v5"/>',
});

let _uid = 0;
function animKind(m) {
  if (m.status === "finished") return "done";
  const c = m.program?.canon || "";
  const tail = m.program?.tail || "";
  switch (m.type) {
    case "oven": case "warmingdrawer":
      if (/microwave/.test(c)) return "micro";
      if (/grill/.test(c) && !/hotairgrill/.test(c)) return "grill";
      if (/hotairgrill/.test(c)) return "grill";
      if (/steam|dough|reheat|descale/.test(c)) return "steam";
      if (/topbottom|bottom|intensive|pizza|keepwarm|slowcook|preheat|pyrolysis|warm/.test(c)) return "heat";
      return m.type === "warmingdrawer" ? "heat" : "fan";
    case "dishwasher":
      if (m.phaseKey === "drying" || (!m.phaseKey && (m.progress || 0) > 85)) return "dwdry";
      return "dwwash";
    case "washer": case "washerdryer": {
      const p = m.phaseKey || ((m.progress || 0) < 65 ? "wash" : (m.progress || 0) < 85 ? "rinse" : "spin");
      if (p === "dry" || p === "drying") return "tumble";
      return p === "rinse" || p === "rinsing" ? "rinse" : p === "spin" || p === "spinning" ? "spin" : "wash";
    }
    case "dryer": return "tumble";
    case "coffee": {
      const t = tail || c;
      if (/clean|rins|descal|calc/.test(c)) return "cupsteam";
      if (/hotwater/.test(t)) return "water";
      if (/milkfroth|warmmilk/.test(t)) return "milk";
      if (/lattemacchiato|galao|latte(?!e)|coldbrewmacchiato/.test(t)) return "latte";
      if (/espresso(?!macchiato)|ristretto|doppio/.test(t) && !/macchiato/.test(t)) return "espresso";
      if (/cappuccino|flatwhite|cortado|macchiato|caffelatte|cafeaulait|cafeconleche|melange|koffie|brauner|garoto/.test(t)) return "cappu";
      if (/fav/.test(m.program?.cat || "")) return "cappu";
      return "crema";
    }
    case "fridge": case "freezer": return "cold";
    case "winecooler": return "wine";
    case "microwave": return "micro";
    case "cookprocessor": return "stir";
    case "lawnmower": return m.status === "error" ? "generic" : "mower";
    case "aircon": {
      const cm = m.climateMode;
      return m.status === "off" ? "generic" : cm === "cool" ? "acCool" : cm === "heat" ? "acHeat" : cm === "dry" ? "acDry" : cm === "fan_only" ? "acFan" : cm === "idle" ? "acIdle" : "acFan";
    }
    case "cleaningrobot": return "robot";
    case "hob": return "hob";
    case "hood": return "hood";
    default: return "generic";
  }
}
// Bohnenstufe -> eigenes Symbol (Größe = Stärke, Plus = kleines +, Doppio/Triple = mehrere Bohnen, Pulver = Löffel)
function beanLabel(o, label, lang) {
  if (label && !/enum_?type|consumer|bean_?amount|beanamount/i.test(label) && label.length < 26) return label;
  const k = canon(o).replace(/^.*(beanamount|bohnenmenge)/, "");
  const plus = (k.match(/plus/g) || []).length;
  const de = { verymild: "Sehr mild", mild: "Mild", normal: "Normal", strong: "Stark", verystrong: "Sehr stark", extrastrong: "Extra stark", doubleshot: "Doppio", tripleshot: "Triple Shot", coffeeground: "Pulver" };
  const en = { verymild: "Very mild", mild: "Mild", normal: "Normal", strong: "Strong", verystrong: "Very strong", extrastrong: "Extra strong", doubleshot: "Double shot", tripleshot: "Triple shot", coffeeground: "Ground coffee" };
  const base = (lang === "de" ? de : en)[k.replace(/plus/g, "")];
  return base ? base + (plus ? " " + "+".repeat(plus) : "") : (label || o);
}
function beanSym(o, i, n, size = 22) {
  const k = canon(o).replace(/^.*(beanamount|bohnenmenge)/, "");
  const plus = (k.match(/plus/g) || []).length;
  const B = (cx, cy, sc) => `<g transform="translate(${cx} ${cy}) scale(${sc}) rotate(30)"><ellipse rx="4.3" ry="6.4"/><path d="M-0.9 5.4 C1.8 1.8 -1.8 -1.8 0.9 -5.4" stroke="var(--hc-bean-line,rgba(0,0,0,.4))" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>`;
  let body;
  if (/ground|pulver|powder/.test(k)) body = `<path d="M3 12.5h12a6 6 0 0 1-12 0z"/><path d="M14.5 13l6.5-6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/><circle cx="6.5" cy="10" r="1.3"/><circle cx="9.5" cy="8.6" r="1.3"/><circle cx="12" cy="10.2" r="1.2"/>`;
  else if (/triple|double|doppio/.test(k)) {
    const x = /triple/.test(k) ? "3" : "2";
    body = `<path d="M3.5 9h12v5.5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M15.5 10.5h1.5a2.2 2.2 0 0 1 0 4.4h-1.8" stroke="currentColor" stroke-width="1.8" fill="none"/><text x="9.5" y="17.2" text-anchor="middle" font-size="7.5" font-weight="800" font-family="system-ui,sans-serif" fill="var(--hc-bean-line,rgba(0,0,0,.55))">${x}×</text><path d="M7 6.5c-.8-1 .8-1.8 0-3M11.5 6.5c-.8-1 .8-1.8 0-3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  } else {
    const lv = { verymild: 1, mild: 1, normal: 2, strong: 3, verystrong: 4, extrastrong: 5 }[k.replace(/plus/g, "")] ?? Math.max(1, Math.min(5, Math.round(1 + 4 * (n > 1 ? i / (n - 1) : 1))));
    const small = k.startsWith("verymild");
    const pos = { 1: [[11, 12.5]], 2: [[7.5, 12.5], [15.5, 12.5]], 3: [[7, 15.5], [16, 15.5], [11.5, 7.5]], 4: [[7, 7.5], [16, 7.5], [7, 16.5], [16, 16.5]], 5: [[6, 7], [17, 7], [11.5, 12], [6, 17], [17, 17]] }[lv];
    const sc = small ? 0.7 : { 1: 1.15, 2: 0.95, 3: 0.75, 4: 0.68, 5: 0.58 }[lv];
    body = pos.map(([x, y]) => B(x, y, sc)).join("");
  }
  const pl = plus ? `<g stroke="currentColor" stroke-width="2" stroke-linecap="round">${Array.from({ length: plus }, (_, j) => `<path d="M${20.5 - j * 5.5} 1.8v5M${18 - j * 5.5} 4.3h5"/>`).join("")}</g>` : "";
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${body}${pl}</svg>`;
}
function animSvg(kind, color, m) {
  const id = `hc${++_uid}`;
  const glass = (inner) => `<circle cx="60" cy="60" r="54" fill="var(--hc-s2)" stroke="var(--hc-line)" stroke-width="4"/><circle cx="60" cy="60" r="42" fill="var(--hc-deep)"/><g clip-path="url(#${id})">${inner}</g><path d="M36 40 a30 30 0 0 1 20 -12" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="4" stroke-linecap="round"/>`;
  const clipC = `<defs><clipPath id="${id}"><circle cx="60" cy="60" r="42"/></clipPath></defs>`;
  const box = `<rect x="18" y="24" width="84" height="72" rx="10" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3"/>`;
  const wave = (y, fill, cls = "a-wave") => `<path class="${cls}" d="M-120 ${y} q15 -7 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V140 H-120Z" fill="${fill}"/>`;
  const cupLayers = (clipPath, layers, streams, extra = "") => `<defs><clipPath id="${id}"><path d="${clipPath}"/></clipPath></defs>${streams}<g clip-path="url(#${id})">${layers}</g><path d="${clipPath}" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/>${extra}`;
  switch (kind) {
    case "wash": return clipC + glass(`<g class="vb a-slosh"><ellipse cx="46" cy="78" rx="12" ry="7" fill="#7aa6ff"/><ellipse cx="70" cy="84" rx="13" ry="7" fill="#ff9fb8"/><ellipse cx="60" cy="72" rx="9" ry="6" fill="#f2f3f5"/></g>${wave(66, "rgba(54,207,196,0.38)")}`);
    case "rinse": return clipC + glass(`${wave(58, "rgba(90,169,255,0.4)")}<circle class="a-rise" cx="44" cy="96" r="3.5" fill="none" stroke="#cfe6ff" stroke-width="1.5"/><circle class="a-rise d1" cx="62" cy="100" r="2.5" fill="none" stroke="#cfe6ff" stroke-width="1.5"/><circle class="a-rise d2" cx="76" cy="96" r="4" fill="none" stroke="#cfe6ff" stroke-width="1.5"/><circle class="a-rise d3" cx="54" cy="104" r="2" fill="none" stroke="#cfe6ff" stroke-width="1.5"/>`);
    case "spin": return clipC + glass(`<g class="vb a-spinfast"><path d="M60 20 a40 40 0 0 1 34 20" fill="none" stroke="#7aa6ff" stroke-width="9" stroke-linecap="round"/><path d="M96 66 a40 40 0 0 1 -26 31" fill="none" stroke="#ff9fb8" stroke-width="9" stroke-linecap="round"/><path d="M44 96 a40 40 0 0 1 -22 -34" fill="none" stroke="#f2f3f5" stroke-width="9" stroke-linecap="round"/></g>`);
    case "tumble": return clipC + glass(`<g class="vb a-tumble"><ellipse cx="46" cy="80" rx="12" ry="7" fill="#7aa6ff"/><ellipse cx="72" cy="78" rx="12" ry="7" fill="#ff9fb8"/><ellipse cx="60" cy="88" rx="10" ry="6" fill="#f2f3f5"/></g><path class="a-rise" d="M48 60 c-3 -5 3 -8 0 -13" fill="none" stroke="rgba(242,166,90,.8)" stroke-width="2" stroke-linecap="round"/><path class="a-rise d1" d="M66 60 c-3 -5 3 -8 0 -13" fill="none" stroke="rgba(242,166,90,.8)" stroke-width="2" stroke-linecap="round"/>`);
    case "fan": return `${box}<circle cx="60" cy="60" r="22" fill="none" stroke="var(--hc-line)" stroke-width="2"/><g class="vb a-fanspin"><path d="M60 58 c0 -10 3 -18 10 -18 c5 0 6 5 3 9 L62 59 M62 60 c10 0 18 3 18 10 c0 5 -5 6 -9 3 L61 62 M60 62 c0 10 -3 18 -10 18 c-5 0 -6 -5 -3 -9 L58 61 M58 60 c-10 0 -18 -3 -18 -10 c0 -5 5 -6 9 -3 L59 58" fill="color-mix(in srgb, ${color} 25%, transparent)" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></g><circle cx="60" cy="60" r="3" fill="${color}"/>`;
    case "heat": return `${box}<rect class="a-pulse" x="28" y="32" width="64" height="5" rx="2.5" fill="${color}"/><rect class="a-pulse d1" x="28" y="83" width="64" height="5" rx="2.5" fill="${color}"/><path class="a-rise" d="M44 78 c-3 -5 3 -8 0 -13" fill="none" stroke="color-mix(in srgb, ${color} 70%, white)" stroke-width="2" stroke-linecap="round"/><path class="a-rise d1" d="M60 78 c-3 -5 3 -8 0 -13" fill="none" stroke="color-mix(in srgb, ${color} 70%, white)" stroke-width="2" stroke-linecap="round"/><path class="a-rise d2" d="M76 78 c-3 -5 3 -8 0 -13" fill="none" stroke="color-mix(in srgb, ${color} 70%, white)" stroke-width="2" stroke-linecap="round"/>`;
    case "grill": return `${box}<path class="a-flicker" d="M28 36 l8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6" fill="none" stroke="#ff5a2b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path class="a-fall" d="M44 48 v6" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path class="a-fall d1" d="M60 48 v6" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path class="a-fall d2" d="M76 48 v6" stroke="${color}" stroke-width="2" stroke-linecap="round"/><rect x="34" y="78" width="52" height="6" rx="3" fill="var(--hc-line)"/>`;
    case "micro": return `${box}<circle class="vb a-ripple" cx="60" cy="58" r="26" fill="none" stroke="#b3a6ff" stroke-width="2.5"/><circle class="vb a-ripple d1" cx="60" cy="58" r="26" fill="none" stroke="#b3a6ff" stroke-width="2.5"/><ellipse cx="60" cy="84" rx="28" ry="5" fill="none" stroke="var(--hc-line)" stroke-width="3"/><g class="fb a-spin"><rect x="52" y="74" width="16" height="9" rx="3" fill="#ffb98a"/></g>`;
    case "steam": return `${box}<path class="a-rise" d="M44 80 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2.2" stroke-linecap="round"/><path class="a-rise d1" d="M60 82 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2.2" stroke-linecap="round"/><path class="a-rise d2" d="M76 80 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2.2" stroke-linecap="round"/><rect x="30" y="84" width="60" height="5" rx="2.5" fill="rgba(90,169,255,.5)"/>`;
    case "dwwash": return `<rect x="20" y="18" width="80" height="84" rx="10" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3"/><path d="M34 50 a10 10 0 0 0 20 0 M66 50 a10 10 0 0 0 20 0" fill="none" stroke="var(--hc-line2)" stroke-width="2.5"/><path class="a-fall" d="M36 28 v6" stroke="#9cccff" stroke-width="2" stroke-linecap="round"/><path class="a-fall d1" d="M50 28 v6" stroke="#9cccff" stroke-width="2" stroke-linecap="round"/><path class="a-fall d3" d="M70 28 v6" stroke="#9cccff" stroke-width="2" stroke-linecap="round"/><path class="a-fall d4" d="M84 28 v6" stroke="#9cccff" stroke-width="2" stroke-linecap="round"/><ellipse cx="60" cy="88" rx="32" ry="6" fill="var(--hc-s2)"/><g class="fb a-arm"><rect x="32" y="86" width="56" height="4" rx="2" fill="${color}"/></g><circle cx="60" cy="88" r="4" fill="#9cccff"/>`;
    case "dwdry": return `<rect x="20" y="18" width="80" height="84" rx="10" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3"/><path d="M34 82 a10 10 0 0 0 20 0 M66 82 a10 10 0 0 0 20 0" fill="none" stroke="var(--hc-line2)" stroke-width="2.5"/><path class="a-rise" d="M44 74 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><path class="a-rise d1" d="M60 76 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><path class="a-rise d2" d="M76 74 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/>`;
    case "espresso": return cupLayers("M40 58 H80 V80 a10 10 0 0 1 -10 10 H50 a10 10 0 0 1 -10 -10Z",
      `<rect class="bot a-fillA" x="38" y="64" width="44" height="28" fill="#5a3420"/><rect class="bot a-fillB" x="38" y="58" width="44" height="7" fill="#c0874f"/>`,
      `<rect class="a-strA" x="58.5" y="14" width="3" height="46" rx="1.5" fill="#5a3420"/>`,
      `<path d="M80 63 h4 a7 7 0 0 1 0 14 h-4" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/><path d="M32 94 H88" stroke="var(--hc-line)" stroke-width="3" stroke-linecap="round"/>`);
    case "cappu": case "cup": return cupLayers("M30 42 H90 V78 a14 14 0 0 1 -14 14 H44 a14 14 0 0 1 -14 -14Z",
      `<rect class="bot a-fillA" x="28" y="74" width="64" height="20" fill="#5a3420"/><rect class="bot a-fillB" x="28" y="56" width="64" height="19" fill="#d7b48c"/><rect class="bot a-fillC" x="28" y="42" width="64" height="15" fill="#fbf7f1"/>`,
      `<rect class="a-strA" x="58.5" y="8" width="3" height="40" rx="1.5" fill="#5a3420"/><rect class="a-strB" x="57.5" y="8" width="5" height="40" rx="2.5" fill="#efe6da"/><rect class="a-strC" x="56.5" y="8" width="7" height="36" rx="3.5" fill="#fbf7f1"/>`,
      `<path d="M90 50 h5 a10 10 0 0 1 0 20 h-5" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/><path d="M22 98 H98" stroke="var(--hc-line)" stroke-width="3" stroke-linecap="round"/>`);
    case "latte": return cupLayers("M44 20 H76 L73 96 a4 4 0 0 1 -4 4 H51 a4 4 0 0 1 -4 -4Z",
      `<rect class="bot a-fillA" x="42" y="72" width="36" height="30" fill="#efe6da"/><rect class="bot a-fillB" x="42" y="30" width="36" height="20" fill="#fbf7f1"/><rect class="bot a-fillC" x="42" y="50" width="36" height="22" fill="#8a5a33"/>`,
      `<rect class="a-strA" x="57.5" y="2" width="5" height="30" rx="2.5" fill="#efe6da"/><rect class="a-strB" x="56.5" y="2" width="7" height="28" rx="3.5" fill="#fbf7f1"/><rect class="a-strC" x="58.5" y="2" width="3" height="40" rx="1.5" fill="#5a3420"/>`);
    case "crema": return cupLayers("M34 46 H86 V76 a14 14 0 0 1 -14 14 H48 a14 14 0 0 1 -14 -14Z",
      `<rect class="bot a-fillA" x="32" y="56" width="56" height="38" fill="#6b3f22"/><rect class="bot a-fillB" x="32" y="48" width="56" height="9" fill="#c0874f"/>`,
      `<rect class="a-strA" x="58.5" y="8" width="3" height="42" rx="1.5" fill="#5a3420"/>`,
      `<path d="M86 54 h5 a9 9 0 0 1 0 18 h-5" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/>`);
    case "water": return cupLayers("M34 46 H86 V76 a14 14 0 0 1 -14 14 H48 a14 14 0 0 1 -14 -14Z",
      `<rect class="bot a-fillA" x="32" y="52" width="56" height="42" fill="rgba(90,169,255,.45)"/>`,
      `<rect class="a-strA" x="58.5" y="8" width="3" height="42" rx="1.5" fill="rgba(156,204,255,.9)"/><path class="a-rise" d="M50 40 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/>`,
      `<path d="M86 54 h5 a9 9 0 0 1 0 18 h-5" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/>`);
    case "milk": return cupLayers("M34 46 H86 V76 a14 14 0 0 1 -14 14 H48 a14 14 0 0 1 -14 -14Z",
      `<rect class="bot a-fillA" x="32" y="60" width="56" height="34" fill="#efe6da"/><rect class="bot a-fillB" x="32" y="46" width="56" height="15" fill="#fbf7f1"/>`,
      `<rect class="a-strA" x="57" y="8" width="6" height="42" rx="3" fill="#efe6da"/><rect class="a-strB" x="56" y="8" width="8" height="38" rx="4" fill="#fbf7f1"/>`,
      `<path d="M86 54 h5 a9 9 0 0 1 0 18 h-5" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/>`);
    case "cupsteam": return `<defs><clipPath id="${id}"><path d="M34 46 H86 V76 a14 14 0 0 1 -14 14 H48 a14 14 0 0 1 -14 -14Z"/></clipPath></defs><path class="a-rise" d="M50 40 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><path class="a-rise d1" d="M62 40 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><path class="a-rise d2" d="M74 40 c-4 -6 4 -10 0 -16" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><g clip-path="url(#${id})"><rect x="32" y="54" width="56" height="38" fill="rgba(90,169,255,0.35)"/></g><path d="M34 46 H86 V76 a14 14 0 0 1 -14 14 H48 a14 14 0 0 1 -14 -14Z" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/><path d="M86 54 h5 a9 9 0 0 1 0 18 h-5" fill="none" stroke="var(--hc-cupline)" stroke-width="2.5"/>`;
    case "cold": return `<rect x="30" y="14" width="60" height="92" rx="10" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3"/><path d="M30 50 H90" stroke="var(--hc-line)" stroke-width="3"/><g class="fb a-spinslow"><path d="M60 22 v22 M50.5 27.5 l19 11 M50.5 38.5 l19 -11" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/></g><path class="a-fall" d="M44 60 v5" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path class="a-fall d1" d="M60 62 v5" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path class="a-fall d2" d="M76 60 v5" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`;
    case "hob": {
      const z = (m.zones || [{ level: 6 }, { level: 0 }, { level: 3 }, { level: 0 }]);
      const pos = [[40, 42], [80, 42], [40, 80], [80, 80]];
      return `<rect x="14" y="20" width="92" height="80" rx="10" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3"/>` + pos.map((p, i) => {
        const lv = z[i]?.level || 0;
        return `<circle cx="${p[0]}" cy="${p[1]}" r="14" fill="none" stroke="${lv ? "#ff5a2b" : "var(--hc-line)"}" stroke-width="3" class="${lv ? "a-pulse" : ""}" style="${lv ? `opacity:${0.4 + lv / 15}` : ""}"/>${lv ? `<text x="${p[0]}" y="${p[1] + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#ffb98a">${lv}</text>` : ""}`;
      }).join("");
    }
    case "hood": return `<path d="M44 20 h32 v22 l22 26 H22 l22 -26z" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3" stroke-linejoin="round"/><g class="fb a-fanspin"><path d="M60 46 v12 M54 52 h12" stroke="${color}" stroke-width="3" stroke-linecap="round"/></g><path class="a-rise" d="M40 98 c-3 -5 3 -8 0 -13" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><path class="a-rise d1" d="M60 100 c-3 -5 3 -8 0 -13" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><path class="a-rise d2" d="M80 98 c-3 -5 3 -8 0 -13" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/>`;
    case "wine": return `<rect x="30" y="14" width="60" height="92" rx="10" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3"/>${[34, 56, 78].map((y, r) => [44, 60, 76].map((x) => `<g transform="translate(${x} ${y})"><rect x="-5" y="-3" width="10" height="16" rx="3" fill="#7a2140"/><rect x="-2" y="-9" width="4" height="7" rx="1.5" fill="#5a1830"/></g>`).join("")).join("")}<path class="a-fall" d="M40 98 v4" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path class="a-fall d1" d="M60 98 v4" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path class="a-fall d2" d="M80 98 v4" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`;
    case "stir": return `<path d="M26 46 h68 l-6 46 a8 8 0 0 1 -8 7 H40 a8 8 0 0 1 -8 -7z" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3" stroke-linejoin="round"/><defs><clipPath id="${id}"><path d="M28 56 h64 l-5 36 a8 8 0 0 1 -8 7 H41 a8 8 0 0 1 -8 -7z"/></clipPath></defs><g clip-path="url(#${id})">${wave(62, `color-mix(in srgb, ${color} 45%, transparent)`)}</g><g class="vb a-spinfast" style="transform-origin:60px 80px"><path d="M60 80 l14 -4 M60 80 l-14 4 M60 80 l4 14 M60 80 l-4 -14" stroke="${color}" stroke-width="3" stroke-linecap="round"/></g><path class="a-rise" d="M48 40 c-3 -5 3 -8 0 -13" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/><path class="a-rise d1" d="M72 40 c-3 -5 3 -8 0 -13" fill="none" stroke="#c3c8cf" stroke-width="2" stroke-linecap="round"/>`;
    case "mower": return `<defs><clipPath id="${id}"><circle cx="60" cy="60" r="50"/></clipPath></defs><g clip-path="url(#${id})"><rect x="0" y="0" width="120" height="120" fill="#2f5d2a"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 20}" y="0" width="10" height="120" fill="#3a7034"/>`).join("")}<g class="a-mow"><rect x="-8" y="-8" width="26" height="16" rx="6" fill="${color}"/><circle cx="-2" cy="9" r="4" fill="#1d1d1d"/><circle cx="12" cy="9" r="4" fill="#1d1d1d"/><path d="M-6 -2 h22" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/></g></g>`;
    case "acCool": case "acHeat": case "acDry": case "acFan": case "acIdle": {
      const flow = kind === "acCool" ? "#9ad7ff" : kind === "acHeat" ? "#ffb98a" : kind === "acDry" ? "#6fe3da" : "#c3c8cf";
      const unit = `<rect x="16" y="22" width="88" height="30" rx="8" fill="var(--hc-deep)" stroke="var(--hc-line)" stroke-width="3"/><path d="M26 44 h68" stroke="var(--hc-line2)" stroke-width="3" stroke-linecap="round"/><circle cx="92" cy="31" r="2.5" fill="${color}"/>`;
      const sw = m.swing || {};
      // Lamelle (Klappe, schwenkt auf/ab) und senkrechte Lamellen (schwenken links/rechts)
      const flap = `<g class="sw-o ${sw.v && kind !== "acIdle" ? "a-flapv" : ""}"><rect x="22" y="52" width="76" height="5" rx="2.5" fill="var(--hc-s2)" stroke="var(--hc-line2)" stroke-width="1.5"/></g>`;
      const slats = `<g class="sw-o ${sw.h && kind !== "acIdle" ? "a-slath" : ""}">${[32, 41, 50, 59, 68, 77, 86].map((x) => `<path d="M${x} 46 v5" stroke="var(--hc-line2)" stroke-width="2" stroke-linecap="round"/>`).join("")}</g>`;
      if (kind === "acIdle") return unit + slats + flap;
      const lines = [34, 52, 70, 88].map((x, i) => `<path class="a-flow d${i % 4 + 1}" d="M${x} 60 c-4 8 4 14 0 22 c-4 8 4 14 0 22" fill="none" stroke="${flow}" stroke-width="2.5" stroke-linecap="round"/>`).join("");
      const flowG = `<g class="sw-o ${sw.v ? "a-swv" : ""}"><g class="sw-o ${sw.h ? "a-swh" : ""}">${lines}</g></g>`;
      const extra = kind === "acCool" ? `<g class="fb a-spinslow"><path d="M60 74 v24 M49.6 80 l20.8 12 M49.6 92 l20.8 -12" stroke="${flow}" stroke-width="2.5" stroke-linecap="round"/></g>`
        : kind === "acDry" ? `<path class="a-fall" d="M60 72c-4 5-6 8-6 11a6 6 0 0 0 12 0c0-3-2-6-6-11z" fill="${flow}"/>` : "";
      return unit + slats + flowG + flap + extra;
    }
    case "robot": return `<rect x="12" y="12" width="96" height="96" rx="14" fill="var(--hc-deep)"/><path d="M20 40 H100 M20 70 H100 M50 12 V108" stroke="var(--hc-line)" stroke-width="1.5"/><g class="a-patrol"><circle cx="0" cy="0" r="13" fill="var(--hc-s2)" stroke="${color}" stroke-width="3"/><circle cx="0" cy="0" r="4" fill="${color}"/><path d="M-6 -9 h12" stroke="${color}" stroke-width="2" stroke-linecap="round"/></g>`;
    case "done": return `<circle cx="60" cy="60" r="42" fill="color-mix(in srgb, ${color} 20%, transparent)"/><path d="M40 61 l13 13 l27 -28" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    default: return `<circle cx="60" cy="60" r="42" fill="color-mix(in srgb, ${color} 14%, transparent)"/><g transform="translate(36 36) scale(2)" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICON[TYPE_META[m.type]?.icon || "generic"]}</g>`;
  }
}

/* ------------------------------------------------------------------ */
/* Stil                                                                */
/* ------------------------------------------------------------------ */
const STYLE = `
:host{display:block;--hc-accent:#ff8a3d;--hc-text:var(--primary-text-color,#f2f3f5);--hc-muted:var(--secondary-text-color,#a0a6af);
--hc-card:var(--bubble-main-background-color,var(--ha-card-background,var(--card-background-color,#1c1e22)));
--hc-s1:rgba(var(--rgb-primary-text-color,242,243,245),.07);--hc-s2:rgba(var(--rgb-primary-text-color,242,243,245),.11);
--hc-line:rgba(var(--rgb-primary-text-color,242,243,245),.18);--hc-line2:rgba(var(--rgb-primary-text-color,242,243,245),.26);
--hc-deep:rgba(0,0,0,.28);--hc-cupline:rgba(var(--rgb-primary-text-color,242,243,245),.75);
--hc-ok:#3fbf8f;--hc-warn:#ffb547;--hc-bad:#ff6b6b;--hc-radius:var(--bubble-border-radius,28px);
font-family:var(--paper-font-body1_-_font-family,inherit);color:var(--hc-text)}
*{box-sizing:border-box}
button{font:inherit;color:inherit}
.wrap{display:flex;flex-direction:column;gap:12px}
.box{background:var(--hc-card);border-radius:var(--hc-radius);padding:16px;display:flex;flex-direction:column;gap:12px}
.lbl{font-size:12px;color:var(--hc-muted);font-weight:500}
.row{display:flex;align-items:center;gap:10px}
.sp{flex:1;min-width:0}
.pill{position:relative;overflow:hidden;display:flex;align-items:center;gap:12px;background:var(--hc-card);border-radius:32px;padding:8px;min-height:60px;cursor:pointer;border:0;width:100%;text-align:left}
.pill.compact{min-height:50px;padding:5px;gap:10px;border-radius:var(--bubble-border-radius,28px);border:var(--bubble-border,0.8px solid rgba(120,120,120,.18));background:var(--bubble-main-background-color,radial-gradient(600px 220px at 0% 0%,rgba(255,255,255,.12),transparent 70%),var(--hc-card))}
.pill.compact .ico{width:38px;height:38px}
.pill.compact .ico svg{width:20px;height:20px}
:host{container-type:inline-size;position:relative}
.ddm{position:absolute;z-index:20;display:flex;flex-direction:column;gap:2px;padding:6px;overflow-y:auto;background:var(--bubble-main-background-color,var(--hc-card));background-color:var(--card-background-color,#1c1e22);border:0.8px solid var(--hc-line2);border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.45);backdrop-filter:blur(12px);animation:ddin .14s ease-out}
@keyframes ddin{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.ddi{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:40px;padding:0 12px;border:0;border-radius:12px;background:transparent;color:var(--hc-text);font:inherit;font-size:14px;font-weight:500;text-align:left;cursor:pointer;white-space:nowrap}
.ddi:hover,.ddi:focus-visible{background:var(--hc-s2);outline:none}
.ddi.on{background:color-mix(in srgb,var(--hc-accent) 22%,transparent);color:color-mix(in srgb,var(--hc-accent) 55%,var(--hc-text));font-weight:600}
.qs{position:relative;display:flex;align-items:center;gap:5px;margin-left:auto;flex:none;z-index:1}
.qb{position:relative;height:36px;min-width:36px;border-radius:18px;border:0;background:var(--bubble-sub-button-background-color,var(--hc-s2));color:var(--hc-text);display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 10px;cursor:pointer;font:inherit;font-size:13px;font-weight:600}
.qb.on{background:var(--hc-accent);color:#141414}
.qsel select{position:absolute;inset:0;opacity:0;width:100%;height:100%;cursor:pointer;font-size:16px}
.qstep{padding:0 2px;gap:0;cursor:default}
.qstep button{width:28px;height:36px;border:0;background:transparent;color:inherit;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:18px}
.qstep .stepval{min-width:38px;text-align:center;font-variant-numeric:tabular-nums}
.pill.compact .txt{min-width:64px;flex:1}
@container (max-width: 290px){.qlow{display:none}}
@container (max-width: 380px){.pill:not(.compact) > .badge{display:none}}
@container (max-width: 360px){.qstep button{width:22px}.qstep .stepval{min-width:30px}.qb{padding:0 6px}.pill.compact .txt .name{font-size:14px}.pill.compact:has(.qs) .val{display:none}}
.pill .fill{position:absolute;left:0;top:0;bottom:0;background:color-mix(in srgb,var(--hc-accent) 16%,transparent);transition:width 1s linear}
.ico{position:relative;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none;background:color-mix(in srgb,var(--hc-accent) 22%,transparent);color:var(--hc-accent)}
.ico.off{background:color-mix(in srgb,var(--hc-accent) 12%,transparent);color:color-mix(in srgb,var(--hc-accent) 65%,var(--hc-muted))}
.txt{position:relative;flex:1;min-width:0;display:flex;flex-direction:column}
.name{font-size:15px;font-weight:600;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.state{font-size:13px;color:var(--hc-muted);line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.val{position:relative;font-size:15px;font-weight:700;color:var(--hc-accent);padding:0 6px;white-space:nowrap}
.sub{position:relative;height:44px;min-width:44px;border-radius:22px;background:var(--hc-s2);border:0;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 14px;font-size:13px;font-weight:600;cursor:pointer;flex:none}
.sub.on{background:color-mix(in srgb,var(--hc-accent) 28%,transparent);color:var(--hc-accent)}
.sub.small{height:32px;padding:0 10px;font-weight:500}
.badge{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 8px;border-radius:11px;font-size:11px;font-weight:700;letter-spacing:.04em;flex:none;position:relative}
.b-local{background:rgba(54,207,196,.18);color:#36cfc4}.b-cloud{background:var(--hc-s2);color:var(--hc-muted)}
.b-both{background:color-mix(in srgb,var(--hc-accent) 20%,transparent);color:var(--hc-accent)}.b-offline{background:rgba(255,107,107,.18);color:var(--hc-bad)}
.b-demo{background:rgba(157,140,255,.2);color:#b3a6ff}
.cam{position:relative;border-radius:var(--hc-radius);overflow:hidden;background:#111;aspect-ratio:16/9;cursor:pointer}
.cam img{width:100%;height:100%;object-fit:cover;display:block}
.cam .ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#a0a6af;font-size:13px}
.cam .tl{position:absolute;left:12px;top:12px}.cam .tr{position:absolute;right:12px;top:12px}
.cam .bl{position:absolute;left:12px;bottom:12px}.cam .camrf{position:absolute;right:12px;bottom:12px;background:rgba(0,0,0,.55);color:#fff}
.cam.map{aspect-ratio:auto;background:var(--hc-deep);cursor:default}
.mapw{position:relative;width:100%;line-height:0}
.mapw img{width:100%;height:auto;object-fit:contain;display:block;max-height:420px}
.mapsvg{position:absolute;inset:0;width:100%;height:100%}
.mapsvg polygon{fill:transparent;stroke:transparent;stroke-width:6;cursor:pointer;transition:fill .2s}
.mapsvg polygon.on{fill:color-mix(in srgb,var(--hc-accent) 30%,transparent);stroke:var(--hc-accent)}
.mlabels{position:absolute;inset:0;pointer-events:none}
.mlabel{position:absolute;transform:translate(-50%,-50%);pointer-events:auto;line-height:1;white-space:nowrap;border:1px solid rgba(255,255,255,.25);background:rgba(20,20,20,.62);color:#fff;border-radius:12px;padding:5px 9px;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px;backdrop-filter:blur(4px)}
.mlabel:not([style]){visibility:hidden}
.mlabel.on{background:var(--hc-accent);color:#141414;border-color:transparent}
.cam.map .camrf{right:10px;bottom:10px}
.cam.stale{cursor:default;background:var(--hc-card)}.cam.stale .ph{color:var(--hc-muted);text-align:center;padding:12px}
.banner{background:color-mix(in srgb,var(--hc-accent) 12%,var(--hc-card));box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--hc-accent) 55%,transparent)}
.btitle{font-size:12px;color:var(--hc-accent);font-weight:600}.btext{font-size:16px;font-weight:700}
.hero{display:flex;align-items:center;gap:16px}
.ring{position:relative;width:168px;height:168px;flex:none}
.ring>svg{position:absolute;left:0;top:0}
.ring>.inner{position:absolute;left:24px;top:24px;width:120px;height:120px}
.ring .ringtxt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.info{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px}
.big{font-size:26px;font-weight:700;line-height:1.1}
.mid{font-size:16px;font-weight:600}
.paused *{animation-play-state:paused!important}
.seg{display:flex;background:var(--hc-s2);border-radius:22px;padding:2px;gap:2px;overflow-x:auto;scrollbar-width:none}
.seg::-webkit-scrollbar{display:none}
.seg button{flex:1 0 auto;min-width:44px;height:40px;border:0;border-radius:20px;background:transparent;color:var(--hc-muted);font-size:13px;font-weight:500;cursor:pointer;padding:0 10px;white-space:nowrap}
.seg button.on{background:var(--hc-accent);color:#141414;font-weight:600}
.tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;align-content:start}
.tiles.scroll{max-height:290px;overflow-y:auto;padding-right:6px;scrollbar-width:thin;scrollbar-color:var(--hc-line2) transparent}
.tiles.scroll::-webkit-scrollbar{width:6px}.tiles.scroll::-webkit-scrollbar-thumb{background:var(--hc-line2);border-radius:3px}
.tile{min-height:90px;border-radius:20px;border:0;background:var(--hc-s2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:600;cursor:pointer;padding:8px;text-align:center;line-height:1.2}
.tile.on{background:color-mix(in srgb,var(--hc-accent) 22%,transparent);box-shadow:inset 0 0 0 2px var(--hc-accent)}
.tile span{overflow-wrap:anywhere;hyphens:auto}
.tile small{font-size:10px;font-weight:500;color:var(--hc-muted);overflow-wrap:anywhere;hyphens:auto;max-width:100%}
.search{display:flex;align-items:center;gap:10px;height:48px;border-radius:24px;background:var(--hc-s2);padding:0 16px}
.search input{flex:1;min-width:0;height:44px;border:0;background:transparent;color:var(--hc-text);font:inherit;font-size:15px;outline:none}
.list{display:flex;flex-direction:column;gap:6px;max-height:300px;overflow-y:auto}
.morebtn{align-self:center;border:0;background:transparent;color:var(--hc-muted);font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:4px;min-height:36px;padding:0 12px;border-radius:18px;cursor:pointer}
.morebtn:hover{background:var(--hc-s1)}
.morebtn.up svg{transform:rotate(180deg)}
.item{min-height:52px;border-radius:16px;border:0;background:var(--hc-s2);display:flex;align-items:center;gap:12px;padding:8px 14px 8px 8px;font-size:14px;text-align:left;cursor:pointer;width:100%}
.item.on{background:color-mix(in srgb,var(--hc-accent) 16%,transparent);box-shadow:inset 0 0 0 2px var(--hc-accent)}
.item .ii{width:36px;height:36px;border-radius:12px;background:var(--hc-s2);display:flex;align-items:center;justify-content:center;flex:none;color:var(--hc-accent)}
.item .il{flex:1;min-width:0;display:flex;flex-direction:column}
.item .il span:first-child{font-weight:600}
.stepper{display:flex;align-items:center;justify-content:space-between;gap:8px}
.stepbtn{width:44px;height:44px;border-radius:50%;border:0;background:var(--hc-s2);display:flex;align-items:center;justify-content:center;cursor:pointer}
.stepval{font-size:18px;font-weight:700;text-align:center;flex:1;white-space:nowrap}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.grid2s{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips.scroll{max-height:156px;overflow-y:auto;padding-right:6px;scrollbar-width:thin;scrollbar-color:var(--hc-line2) transparent}
.chip{min-height:44px;border-radius:22px;border:1px solid var(--hc-line2);background:transparent;display:inline-flex;align-items:center;gap:8px;padding:0 16px;font-size:14px;font-weight:600;cursor:pointer;transition:background .2s,border-color .2s}
.chip svg{flex:none}
.chip.on{background:color-mix(in srgb,var(--hc-accent) 20%,transparent);border-color:var(--hc-accent);color:color-mix(in srgb,var(--hc-accent) 45%,var(--hc-text))}
.chip:disabled{opacity:.45;cursor:default}
.tog{min-height:48px;border-radius:16px;border:0;background:var(--hc-s2);display:flex;align-items:center;gap:10px;padding:0 12px;font-size:13px;font-weight:500;text-align:left;cursor:pointer}
.tog.on{background:color-mix(in srgb,var(--hc-accent) 16%,transparent)}
.sw{width:32px;height:20px;border-radius:10px;background:var(--hc-line2);position:relative;flex:none;margin-left:auto;transition:background .2s}
.sw i{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#e6e8eb;transition:left .2s}
.tog.on .sw{background:var(--hc-accent)}.tog.on .sw i{left:14px;background:#fff}
.mini{background:var(--hc-card);border-radius:22px;padding:12px 14px;display:flex;flex-direction:column;gap:6px;min-width:0}
.mini.warn{box-shadow:inset 0 0 0 1.5px var(--hc-warn)}.mini.bad{box-shadow:inset 0 0 0 1.5px var(--hc-bad)}
.tanks{display:flex;flex-wrap:wrap;gap:14px 12px}
.tank{display:flex;flex-direction:column;align-items:center;gap:5px;width:84px;text-align:center}
.tk{width:40px;height:72px;border-radius:12px;background:var(--hc-s2);display:flex;align-items:flex-end;overflow:hidden}
.tk i{display:block;width:100%;transition:height .4s}
.tk.warn{box-shadow:inset 0 0 0 1.5px var(--hc-warn)}.tk.bad{box-shadow:inset 0 0 0 1.5px var(--hc-bad)}
.tv{font-size:12px;font-weight:700;line-height:1.2}.tl2{font-size:11px;color:var(--hc-muted);line-height:1.2;hyphens:auto;overflow-wrap:break-word;max-width:100%}
.steps{display:flex;align-items:flex-end;gap:3px;height:20px}.steps i{display:block;width:8px;border-radius:2px;background:var(--hc-line)}
.bar{height:6px;border-radius:3px;background:var(--hc-s2);overflow:hidden}.bar i{display:block;height:6px;border-radius:3px}
.mv{font-size:13px;font-weight:600}
.minis{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px}
.actions{display:grid;grid-template-columns:2fr 1fr;gap:12px}
.actions.one{grid-template-columns:1fr}
.abtn{height:52px;border-radius:26px;border:0;display:flex;align-items:center;justify-content:center;gap:8px;font-size:15px;font-weight:600;cursor:pointer;background:var(--hc-s2)}
.abtn.pri{background:var(--hc-accent);color:#141414}
.beans{display:flex;justify-content:space-between;gap:6px}
.bean{width:44px;height:44px;border-radius:50%;border:0;background:var(--hc-s2);color:var(--hc-line2);display:flex;align-items:center;justify-content:center;cursor:pointer}
.bean.f{background:color-mix(in srgb,var(--hc-accent) 22%,transparent);color:var(--hc-accent)}
.bean.sel{box-shadow:inset 0 0 0 2px var(--hc-accent)}
.beans.small{gap:3px}.beans.small{flex-wrap:wrap}.beans.small .bean{width:auto;flex:1 0 calc(12.5% - 3px);min-width:30px;height:38px;border-radius:12px}
.bean{--hc-bean-line:var(--hc-card)}
.bcur{display:inline-flex;align-items:center;gap:6px;max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--hc-accent);font-weight:600;font-size:13px}
.btrack{position:relative;height:28px;margin:0 12px}
.btrack::before{content:"";position:absolute;left:0;right:0;top:12px;height:4px;border-radius:2px;background:var(--hc-s2)}
.bfill{position:absolute;left:0;top:12px;height:4px;border-radius:2px;background:var(--hc-accent);transition:width .2s}
.bthumb{position:absolute;top:-2px;width:32px;height:32px;margin-left:-16px;border-radius:50%;background:var(--hc-accent);color:#141414;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.35);transition:left .2s;--hc-bean-line:var(--hc-accent)}
.bslider{position:absolute;left:-12px;right:-12px;top:0;width:calc(100% + 24px);height:100%;margin:0;opacity:0;cursor:ew-resize;touch-action:none}
.ratio{position:relative;display:flex;height:44px;border-radius:22px;overflow:hidden;cursor:pointer}
.rslider{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;touch-action:none}
.ratio .c{background:#7a4a26;display:flex;align-items:center;padding-left:14px;font-size:12px;font-weight:600;color:#f6dcbc;transition:width .3s}
.ratio .m{flex:1;background:#ece2d4;display:flex;align-items:center;justify-content:flex-end;padding-right:14px;font-size:12px;font-weight:600;color:#3b2a1a}
.ratio .gap{width:4px;background:var(--hc-card)}
details{background:var(--hc-card);border-radius:var(--hc-radius);padding:4px 16px}
summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:8px;min-height:44px;font-size:13px;font-weight:600;color:var(--hc-muted)}
summary::-webkit-details-marker{display:none}
.morelist{display:flex;flex-direction:column;gap:8px;padding:4px 0 14px}
.morerow{display:flex;align-items:center;gap:10px;min-height:44px}
.morerow .ml{flex:1;min-width:0;font-size:13px}
select.dd{height:40px;border-radius:20px;border:0;background:var(--hc-s2);color:var(--hc-text);font:inherit;font-size:13px;font-weight:600;padding:0 32px 0 14px;max-width:60%;appearance:none;-webkit-appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23a0a6af%27 stroke-width=%273%27 stroke-linecap=%27round%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
select option{background:var(--card-background-color,#1c1e22);color:var(--hc-text)}
.empty{padding:20px;text-align:center;color:var(--hc-muted);font-size:13px}
.phases{display:flex;align-items:flex-start}
.phases div{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px;color:var(--hc-muted);text-align:center}
.phases span.d{width:12px;height:12px;border-radius:50%;background:var(--hc-line)}
.phases .done span.d{background:var(--hc-accent)}.phases .cur span.d{background:transparent;box-shadow:0 0 0 3px var(--hc-accent)}
.phases .cur{color:var(--hc-text);font-weight:600}
.toast{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;font-size:12px;padding:8px 12px;border-radius:12px;pointer-events:none;opacity:0;transition:opacity .3s}
.toast.show{opacity:1}
.vb{transform-box:view-box;transform-origin:60px 60px}.fb{transform-box:fill-box;transform-origin:center}.bot{transform-box:fill-box;transform-origin:50% 100%}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes patrol{0%{transform:translate(30px,26px)}25%{transform:translate(90px,26px)}50%{transform:translate(90px,94px)}75%{transform:translate(30px,94px)}100%{transform:translate(30px,26px)}}
.a-patrol{animation:patrol 8s linear infinite}
@keyframes mow{0%{transform:translate(10px,20px)}22%{transform:translate(104px,20px)}25%{transform:translate(104px,46px)}47%{transform:translate(10px,46px)}50%{transform:translate(10px,72px)}72%{transform:translate(104px,72px)}75%{transform:translate(104px,98px)}97%{transform:translate(10px,98px)}100%{transform:translate(10px,20px)}}
.a-mow{animation:mow 14s linear infinite}
@keyframes flow{0%{transform:translateY(-6px);opacity:0}30%{opacity:1}100%{transform:translateY(16px);opacity:0}}
.a-flow{animation:flow 1.8s ease-in infinite}
@keyframes slosh{0%,100%{transform:rotate(-40deg)}50%{transform:rotate(40deg)}}
@keyframes tumble{0%{transform:rotate(0)}50%{transform:rotate(200deg)}100%{transform:rotate(360deg)}}
@keyframes wave{from{transform:translateX(0)}to{transform:translateX(60px)}}
@keyframes rise{0%{transform:translateY(0);opacity:0}25%{opacity:1}100%{transform:translateY(-46px);opacity:0}}
@keyframes fall{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(34px);opacity:0}}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes flicker{0%,100%{opacity:.5}20%{opacity:1}40%{opacity:.7}60%{opacity:1}80%{opacity:.6}}
@keyframes ripple{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.25);opacity:0}}
@keyframes fillA{0%{transform:scaleY(0)}28%,88%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes fillB{0%,28%{transform:scaleY(0)}55%,88%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes fillC{0%,55%{transform:scaleY(0)}75%,88%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes strA{0%,26%{opacity:1}30%,100%{opacity:0}}
@keyframes strB{0%,28%{opacity:0}30%,53%{opacity:1}56%,100%{opacity:0}}
@keyframes strC{0%,55%{opacity:0}57%,73%{opacity:1}76%,100%{opacity:0}}
.a-spin{animation:spin 5s linear infinite}.a-spinslow{animation:spin 12s linear infinite}.a-spinfast{animation:spin .45s linear infinite}
.a-slosh{animation:slosh 2.4s ease-in-out infinite}.a-tumble{animation:tumble 3s ease-in-out infinite}
.a-wave{animation:wave 2.2s linear infinite}.a-rise{animation:rise 2.2s ease-out infinite}.a-fall{animation:fall 1s ease-in infinite}
.a-pulse{animation:pulse 2s ease-in-out infinite}.a-flicker{animation:flicker .9s linear infinite}.a-ripple{animation:ripple 2.1s ease-out infinite}
.a-fanspin{animation:spin 1.1s linear infinite}.a-arm{animation:spin 1.6s linear infinite}
.a-fillA{animation:fillA 7s ease-in-out infinite}.a-fillB{animation:fillB 7s ease-in-out infinite}.a-fillC{animation:fillC 7s ease-in-out infinite}
.a-strA{animation:strA 7s linear infinite}.a-strB{animation:strB 7s linear infinite}.a-strC{animation:strC 7s linear infinite}
.sw-o{transform-box:view-box;transform-origin:60px 52px}
@keyframes flapv{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1.9)}}
@keyframes slath{0%,100%{transform:skewX(-32deg)}50%{transform:skewX(32deg)}}
@keyframes swv{0%,100%{transform:scaleY(.72)}50%{transform:scaleY(1.12)}}
@keyframes swh{0%,100%{transform:skewX(-24deg)}50%{transform:skewX(24deg)}}
.a-flapv{animation:flapv 4s ease-in-out infinite}.a-slath{animation:slath 5s ease-in-out infinite}
.a-swv{animation:swv 4s ease-in-out infinite}.a-swh{animation:swh 5s ease-in-out infinite}
.d1{animation-delay:-.7s}.d2{animation-delay:-1.4s}.d3{animation-delay:-.35s}.d4{animation-delay:-1.05s}
.static .a-fillA,.static .a-fillB,.static .a-fillC{animation:none;transform:none}
.static .a-strA,.static .a-strB,.static .a-strC{animation:none;opacity:0}
@media (prefers-reduced-motion: reduce){.inner *{animation:none!important}}
`;

/* ------------------------------------------------------------------ */
/* Karte                                                               */
/* ------------------------------------------------------------------ */
const MODULES = ["banner", "hero", "camera", "programs", "controls", "idos", "options", "consumables", "actions", "more"];

class HomeConnectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._ui = { tab: null, search: "", demoSel: {}, demoOpts: {} };
    this._sig = "";
  }
  static getConfigElement() { return document.createElement("home-connect-card-editor"); }
  static getStubConfig(hass) {
    const g = discover(hass || {})[0];
    return g ? { device: g.key } : { demo: "oven" };
  }
  setConfig(config) {
    this._config = Object.assign({ layout: "full" }, config || {});
    this._sig = "";
    if (this._hass) this._update();
  }
  set hass(hass) {
    this._hass = hass;
    this._update();
  }
  get lang() { return (this._config?.language || this._hass?.language || "de").startsWith("de") ? "de" : "en"; }
  connectedCallback() {
    this._timer = setInterval(() => this._tick(), 1000);
  }
  disconnectedCallback() { clearInterval(this._timer); }
  getCardSize() { return this._config?.layout === "compact" ? 1 : 8; }
  getGridOptions() { return this._config?.layout === "compact" ? { columns: 12, rows: 1, min_rows: 1 } : { columns: 12, rows: "auto" }; }

  _tick() {
    if (!this._hass && !this._config?.demo) return;
    this._tickN = (this._tickN || 0) + 1;
    if (this._config?.demo) { this._update(); return; }
    if (this._tickN % 30 === 0 && this._m) { const T = I18N[this.lang]; this._updateLive(this._m, { state: this._statusText(this._m, T) }); }
    if (this._tickN % 10 === 0) this._refreshCam();
    if (this._tickN % 15 === 0 && this._m?.camTime != null) {
      this.shadowRoot.querySelectorAll(".hc-camage").forEach((el) => { el.textContent = this._ago(this._m.camTime); });
      const stale = (Date.now() - this._m.camTime) / 1000 > this._m.camMax;
      if (stale !== this._m.camStale) { this._sig = ""; this._update(true); }
    }
  }
  _refreshCam() {
    const img = this.shadowRoot.querySelector(".cam img[data-src]");
    if (img && this.isConnected) img.src = `${img.dataset.src}${img.dataset.src.includes("?") ? "&" : "?"}_t=${Date.now()}`;
  }

  _group() {
    if (!this._hass) return null;
    const c = this._config;
    const extra = Array.isArray(c.extra_entities) ? c.extra_entities : [];
    if (c.entity) return groupFromDevice(this._hass, this._hass.entities?.[c.entity]?.device_id, [c.entity, ...extra]);
    if (c.ha_device) return groupFromDevice(this._hass, c.ha_device, extra);
    const groups = discover(this._hass);
    const want = c.device;
    const g = groups.find((x) => x.key === want || x.name === want || x.devices.some((d) => d.id === want)) || null;
    if (g && extra.length) {
      const g2 = { ...g, entities: [...g.entities] };
      extra.forEach((id) => { if (!g2.entities.some((e) => e.eid === id)) g2.entities.push({ eid: id, platform: this._hass.entities?.[id]?.platform || "extra", rank: 9, reg: this._hass.entities?.[id] || { entity_id: id }, devName: null }); });
      return g2;
    }
    return g;
  }
  _model() {
    const cfg = this._config;
    if (cfg.demo) return demoModel(cfg.demo, this.lang, cfg, this._ui);
    const g = this._group();
    if (!g) return null;
    enrich(this._hass, g);
    const main = (cfg.entity && g.entities.find((e) => e.eid === cfg.entity && MAIN_DOMAINS.includes(e.domain))) || g.entities.find((e) => MAIN_DOMAINS.includes(e.domain));
    if (main && (g.generic || cfg.entity)) return buildProfileModel(this._hass, g, cfg, this.lang, main);
    return buildModel(this._hass, g, cfg, this.lang);
  }
  _update(force) {
    if (!this._config) return;
    // Nur neu rechnen, wenn sich Zustände dieses Geräts geändert haben
    if (!this._config.demo && this._hass && this._watch && !force && this._sig) {
      const st = this._hass.states;
      let changed = this._hass.devices !== this._watchDev || this._hass.entities !== this._watchEnt;
      if (!changed) for (const id of this._watch) { if (st[id] !== this._watchStates[id]) { changed = true; break; } }
      if (!changed) return;
    }
    let m;
    try { m = this._model(); } catch (e) { console.error("home-connect-card", e); m = null; this._err = e; }
    this._m = m;
    if (!this._config.demo && this._hass) {
      const g = this._group();
      this._watch = g ? g.entities.map((e) => e.eid) : [];
      this._watchStates = Object.fromEntries(this._watch.map((id) => [id, this._hass.states[id]]));
      this._watchDev = this._hass.devices; this._watchEnt = this._hass.entities;
    }
    const T = I18N[this.lang];
    const live = m ? { state: this._statusText(m, T) } : null;
    const sm = m && { ...m, camTime: null, end: null, remaining: m.remaining != null, progress: m.progress != null, temp: m.temp ? { ...m.temp, current: m.temp.current != null } : null, statusText: null };
    const sig = JSON.stringify([sm, this._ui.tab, this._ui.demoSel, this._config, this._hass?.themes?.darkMode, this.lang]);
    if (sig === this._sig) { this._updateLive(m, live); return; }
    this._sig = sig;
    this._render(m);
  }
  _updateLive(m, live) {
    if (!m) return;
    const R = this.shadowRoot;
    const set = (sel, txt) => R.querySelectorAll(sel).forEach((el) => { if (el.textContent !== txt) el.textContent = txt; });
    const f = R.querySelector(".pill .fill");
    if (f && m.progress != null) f.style.width = `${m.progress}%`;
    if (m.remaining != null) set(".hc-rem", fmtDur(m.remaining, this.lang));
    if (m.end) set(".hc-end", fmtClock(m.end));
    if (m.temp?.current != null) set(".hc-temp", `${m.temp.current}`);
    if (live) set(".hc-state", live.state);
    const arc = R.querySelector(".hc-arc");
    if (arc) {
      const C = 2 * Math.PI * 78;
      const pct = m.ringPct != null ? m.ringPct : m.status === "finished" ? 100 : m.progress || 0;
      arc.setAttribute("stroke-dasharray", `${(C * pct / 100).toFixed(1)} ${C.toFixed(1)}`);
      arc.setAttribute("opacity", pct > 0 ? "1" : "0");
    }
  }

  /* ---------- Darstellung ---------- */
  _render(m) {
    const T = I18N[this.lang];
    const cfg = this._config;
    const focusSearch = this.shadowRoot.activeElement?.classList?.contains("q");
    const caret = focusSearch ? this.shadowRoot.activeElement.selectionStart : null;
    if (!m) {
      const msg = cfg.device ? T.not_found : T.no_device;
      this.shadowRoot.innerHTML = `<style>${STYLE}</style><div class="box"><div class="row"><div class="ico off">${ic("generic")}</div><div class="txt"><span class="name">Home Connect Card</span><span class="state">${esc(msg)}</span></div></div><div class="lbl">${esc(T.choose_device)}</div></div>`;
      return;
    }
    const cc = cfg.color;
    const color = Array.isArray(cc) ? `rgb(${cc.join(",")})` : (cc || m.color || TYPE_META[m.type]?.color || TYPE_META.generic.color);
    const hide = new Set(cfg.hide || []);
    let html = `<style>${STYLE}:host{--hc-accent:${esc(color)}}</style>`;
    if (cfg.layout === "compact") {
      html += this._compact(m, T);
    } else {
      const parts = [this._header(m, T)];
      for (const mod of MODULES) {
        if (hide.has(mod)) continue;
        const fn = this[`_m_${mod}`];
        const out = fn ? fn.call(this, m, T, color) : "";
        if (out) parts.push(out);
      }
      html += `<div class="wrap" lang="${this.lang}">${parts.join("")}</div><div class="toast"></div>`;
    }
    this.shadowRoot.innerHTML = html;
    this._bind(m);
    if (focusSearch) {
      const q = this.shadowRoot.querySelector("input.q");
      if (q) { q.focus(); try { q.setSelectionRange(caret, caret); } catch (e) { /* */ } }
    }
  }

  _statusText(m, T) {
    if (m.statusText) return m.statusText;
    const st = T[m.status] || m.status;
    const parts = [];
    if (m.running) {
      if (m.program) parts.push(m.program.label.split(" · ")[0]);
      parts.push(m.status === "run" ? (m.phase || st) : st);
      if (m.type === "oven" && m.temp?.current != null) parts.push(`${m.temp.current}${m.temp.target ? ` / ${m.temp.target}` : ""} °C`);
    } else {
      parts.push(st);
      if (m.status === "ready" && m.program) parts.push(m.program.label.split(" · ")[0]);
    }
    return parts.filter(Boolean).join(" · ");
  }
  _badge(m, T) {
    if (m.demo) return `<span class="badge b-demo">${T.demo}</span>`;
    const map = { local: [T.local, "b-local", "home"], cloud: [T.cloud, "b-cloud", "cloud"], both: [T.both, "b-both", "home"], offline: [T.offline.toUpperCase(), "b-offline", "cloud"] };
    if (m.source === "ext") return m.platformLabel ? `<span class="badge b-cloud">${esc(m.platformLabel.slice(0, 18))}</span>` : "";
    const [txt, cls] = map[m.source] || map.cloud;
    return `<span class="badge ${cls}">${esc(txt)}</span>`;
  }
  _compact(m, T) {
    const icon = TYPE_META[m.type]?.icon || "generic";
    const off = ["off", "inactive", "offline"].includes(m.status);
    const done = m.status === "finished";
    const right = m.running && m.remaining != null ? `<span class="val hc-rem">${esc(fmtDur(m.remaining, this.lang))}</span>` : "";
    const cam = m.camera ? `<button class="sub" data-act="cam" aria-label="${esc(T.camera)}">${ic("camera", 18)}</button>` : "";
    const fill = m.running && m.progress != null ? `<div class="fill" style="width:${m.progress}%"></div>` : "";
    return `<div class="pill compact" data-act="tap" role="button" tabindex="0" ${done ? 'style="box-shadow:inset 0 0 0 2px var(--hc-accent)"' : ""}>${fill}
      <div class="ico ${off ? "off" : ""}" ${done ? 'style="background:var(--hc-accent);color:#141414"' : ""}>${ic(done ? "check" : icon, 22, done ? 2.2 : 1.8)}</div>
      <div class="txt"><span class="name">${esc(m.name)}</span><span class="state hc-state">${esc(this._statusText(m, T))}</span></div>${right}${this._quick(m, T, cam)}</div>`;
  }
  // Schnellwahl-Knöpfe (wie Bubble-Card-Sub-Buttons)
  _quick(m, T, cam) {
    if (this._config.sub_buttons === false || m.status === "offline") return cam;
    const L = this.lang === "de";
    const items = [];
    const btn = (attrs, icon, on, label, sw = 2, low = false) => `<button class="qb ${on ? "on" : ""} ${low ? "qlow" : ""}" ${attrs} aria-label="${esc(label)}" title="${esc(label)}">${ic(icon, 18, sw)}</button>`;
    const sel = (k, ctl, icon, short, low = false) => {
      if (!ctl || !ctl.options?.length || !ctl.avail) return "";
      const i = ctl.options.indexOf(ctl.value);
      const lab = i >= 0 ? (ctl.optionLabels?.[i] || ctl.value) : "–";
      return `<label class="qb qsel ${low ? "qlow" : ""}" title="${esc(ctl.label)}: ${esc(lab)}">${ic(icon, 18, 2)}${short ? `<span class="qt">${esc(lab)}</span>` : ""}<select data-ctl="${k}" aria-label="${esc(ctl.label)}">${ctl.options.map((o, j) => `<option value="${esc(o)}" ${o === ctl.value ? "selected" : ""}>${esc(ctl.optionLabels?.[j] || o)}</option>`).join("")}</select></label>`;
    };
    if (m.profile === "climate") {
      const c = m.controls;
      if (c.setpoint && m.status !== "off") items.push(`<span class="qb qstep"><button data-ctl="setpoint" data-step="-1" aria-label="−">${ic("minus", 14, 2.4)}</button><span class="stepval">${esc(this._fmtNum(c.setpoint, c.setpoint.value))}</span><button data-ctl="setpoint" data-step="1" aria-label="+">${ic("plus", 14, 2.4)}</button></span>`);
      const mode = c.hvac?.value;
      const mIcon = { cool: "snow", heat: "flame", dry: "drop", fan_only: "fan", off: "power", auto: "auto", heat_cool: "auto" }[mode] || "aircon";
      items.push(sel("hvac", c.hvac, mIcon));
      if (m.status !== "off") items.push(sel("fanm", c.fanm, "fan", false, true));
      if (m.display) items.push(btn('data-act="display"', "display", m.display.on, L ? "Display" : "Display", 2, true));
    } else if (m.profile === "vacuum" || m.profile === "lawn_mower") {
      const sa = m.svcActions || [];
      const prim = sa.findIndex((x) => ["start", "pause"].includes(x.id));
      const home = sa.findIndex((x) => ["home", "dock"].includes(x.id));
      if (prim >= 0) items.push(btn(`data-svca="${prim}"`, sa[prim].icon, sa[prim].id === "pause", sa[prim].label, 2.2));
      if (home >= 0) items.push(btn(`data-svca="${home}"`, "home2", false, sa[home].label));
      else if (m.profile === "vacuum" && m.status !== "docked") items.push(btn('data-qsvc="vacuum.return_to_base"', "home2", false, T.go_home));
    } else {
      const a = m.actions || {};
      if (m.status === "run" && (a.pause || a.startPause)) items.push(btn('data-act="pause"', "pause", true, T.pause_btn, 2.4));
      else if (m.status === "pause" && (a.resume || a.startPause)) items.push(btn('data-act="resume"', "play", false, T.resume));
      else if (!["run", "pause", "delayedstart", "off", "inactive"].includes(m.status) && (a.start || a.startPause || m.activeSelect) && m.program && !m.banner && ["dishwasher", "washer", "dryer", "washerdryer", "oven", "microwave", "coffee", "cookprocessor"].includes(m.type)) items.push(btn('data-act="start"', "play", false, T.start));
      const sup = (m.options || []).map((o, i) => [o, i]).filter(([o]) => /super|schnell.?k|schnell.?gefrier|fast.?(cool|freez)/i.test(o.label)).slice(0, 2);
      if (["fridge", "freezer", "winecooler"].includes(m.type)) sup.forEach(([o, i]) => items.push(btn(`data-opt-i="${i}"`, /gefrier|freez/i.test(o.label) ? "snow" : "bolt", o.on, o.label)));
      if (m.light?.control && ["oven", "hood", "fridge", "winecooler", "warmingdrawer"].includes(m.type)) items.push(btn('data-act="light"', "bulb", m.light.on, T.light));
      if (m.type === "hood" && m.controls?.level?.options) items.push(sel("level", m.controls.level, "fan"));
      if (m.power && ["oven", "coffee", "dishwasher", "washer", "dryer", "washerdryer", "hood", "microwave"].includes(m.type)) items.push(btn('data-act="power"', "power", m.power.on, T.power));
    }
    const list = items.filter(Boolean);
    if (!list.length) return cam;
    return `<div class="qs">${list.join("")}</div>`;
  }
  _header(m, T) {
    const icon = TYPE_META[m.type]?.icon || "generic";
    const off = ["off", "inactive", "offline"].includes(m.status);
    const light = m.light && m.light.control ? `<button class="sub ${m.light.on ? "on" : ""}" data-act="light" aria-label="${esc(T.light)}">${ic("bulb", 18)}</button>` : "";
    const power = m.power ? `<button class="sub ${m.power.on ? "on" : ""}" data-act="power" aria-label="${esc(T.power)}">${ic("power", 18, 2)}</button>` : "";
    return `<div class="pill" style="cursor:default"><div class="ico ${off ? "off" : ""}">${ic(icon, 22)}</div>
      <div class="txt"><span class="name">${esc(m.name)}</span><span class="state hc-state">${esc(this._statusText(m, T))}</span></div>
      ${this._badge(m, T)}${light}${power}</div>`;
  }
  _mapView(m, pic, T) {
    const sel = (this._ui.rooms || []).map(String);
    const shapes = m.mapRooms.map((r) => `<polygon data-maproom="${esc(r.id)}" class="${sel.includes(String(r.id)) ? "on" : ""}" points="${r.pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")}"/>`).join("");
    const labels = m.mapRooms.map((r) => `<button class="mlabel ${sel.includes(String(r.id)) ? "on" : ""}" data-maproom="${esc(r.id)}" data-cx="${r.c[0].toFixed(1)}" data-cy="${r.c[1].toFixed(1)}">${sel.includes(String(r.id)) ? ic("check", 12, 3) : ""}${esc(r.name)}</button>`).join("");
    const hint = sel.length ? "" : `<span class="badge tl" style="background:rgba(0,0,0,.55);color:#fff;height:26px;font-size:12px">${ic("room", 13, 2)}${esc(T.map_hint)}</span>`;
    return `<div class="cam map"><div class="mapw"><img src="${esc(pic)}" alt="" onerror="this.style.visibility='hidden'"><svg class="mapsvg" preserveAspectRatio="none">${shapes}</svg><div class="mlabels">${labels}</div></div>${hint}<button class="sub camrf" data-act="cam" aria-label="${esc(T.camera)}">${ic("expand", 18, 2)}</button></div>`;
  }
  _layoutMap() {
    const w = this.shadowRoot?.querySelector(".mapw"); if (!w) return;
    const img = w.querySelector("img"), svg = w.querySelector("svg");
    const apply = () => {
      const W = img.naturalWidth, H = img.naturalHeight; if (!W || !H) return;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      w.querySelectorAll(".mlabel").forEach((b) => { b.style.left = `${(b.dataset.cx / W) * 100}%`; b.style.top = `${(b.dataset.cy / H) * 100}%`; b.style.display = ""; });
    };
    if (img.complete) apply(); else img.addEventListener("load", apply, { once: true });
  }
  _m_camera(m, T) {
    if (!m.camera) return "";
    if (m.mapRooms?.length && (m.demo || !m.camStale)) {
      const pic = m.demo ? m.mapPic : this._hass.states[m.camera]?.attributes?.entity_picture;
      if (pic) return this._mapView(m, pic, T);
    }
    if (m.demo) return `<div class="cam" data-act="cam"><div class="ph" style="background:linear-gradient(160deg,#2a1d14,#120c08)">${ic("camera", 34, 1.5)}<span>${esc(T.camera)} (Demo)</span></div><span class="badge tl" style="background:rgba(255,92,92,.9);color:#fff">● ${T.live}</span>${m.temp?.current != null ? `<span class="badge tr" style="background:rgba(0,0,0,.55);color:#fff;height:26px;font-size:12px"><span class="hc-temp">${m.temp.current}</span> °C</span>` : ""}${m.camTime ? `<span class="badge bl" style="background:rgba(0,0,0,.6);color:#fff;height:26px;font-size:12px">${ic("clock", 13, 2)}<span class="hc-camage">${esc(this._ago(m.camTime))}</span></span>` : ""}<button class="sub camrf" data-act="camrefresh" aria-label="${esc(T.refresh)}">${ic("refresh", 18, 2)}</button></div>`;
    const st = this._hass.states[m.camera];
    const pic = st?.attributes?.entity_picture;
    const live = st && ["streaming", "recording"].includes(st.state);
    if (!st || st.state === "unavailable") return "";
    const age = m.camTime != null ? `<span class="badge bl" style="background:rgba(0,0,0,.6);color:#fff;height:26px;font-size:12px">${ic("clock", 13, 2)}<span class="hc-camage">${esc(this._ago(m.camTime))}</span></span>` : "";
    if (m.camStale) {
      return `<div class="cam stale"><div class="ph">${ic("camera", 30, 1.5)}<span>${esc(T.cam_old.replace("{m}", Math.round(m.camMax / 60)))}</span>
        <button class="sub on" data-act="camrefresh" style="margin-top:6px">${ic("refresh", 18, 2)}${esc(T.refresh)}</button></div>${age}</div>`;
    }
    return `<div class="cam" data-act="cam">${pic ? `<div class="ph">${ic("camera", 34, 1.5)}<span>${esc(T.camera)}</span></div><img data-src="${esc(pic)}" src="${esc(pic)}" alt="" loading="lazy" style="position:relative" onerror="this.style.display='none'">` : `<div class="ph">${ic("camera", 34, 1.5)}<span>${esc(T.camera)}</span></div>`}
      ${live ? `<span class="badge tl" style="background:rgba(255,92,92,.9);color:#fff">● ${T.live}</span>` : ""}
      ${m.temp?.current != null && m.running ? `<span class="badge tr" style="background:rgba(0,0,0,.55);color:#fff;height:26px;font-size:12px"><span class="hc-temp">${m.temp.current}</span> °C</span>` : ""}
      ${age}<button class="sub camrf" data-act="camrefresh" aria-label="${esc(T.refresh)}">${ic("refresh", 18, 2)}</button></div>`;
  }
  _ago(t) {
    const T = I18N[this.lang];
    const s = Math.max(0, (Date.now() - t) / 1000);
    let txt;
    if (s < 60) txt = `${Math.round(s)} s`;
    else if (s < 3600) txt = `${Math.round(s / 60)} min`;
    else if (s < 86400) txt = `${Math.floor(s / 3600)} h ${Math.round((s % 3600) / 60)} min`;
    else txt = `${Math.round(s / 86400)} ${T.days}`;
    return T.ago.replace("{t}", txt);
  }
  _m_banner(m, T) {
    const b = m.banner;
    if (!b) return "";
    const icon = b.kind === "turn" ? "turn" : b.kind === "error" ? "bolt" : TYPE_META[m.type]?.icon || "generic";
    const btns = b.kind === "dish" && (m.actions.start || m.activeSelect) ? `<div class="grid2s"><button class="sub" style="background:var(--hc-accent);color:#141414" data-act="start">${esc(T.apply_start)}</button><button class="sub" data-act="tab-dish">${esc(T.other_dish)}</button></div>` : "";
    return `<div class="box banner" ${b.kind === "error" ? 'style="--hc-accent:var(--hc-bad)"' : ""}><div class="row"><div class="ico">${ic(icon, 22)}</div><div class="txt"><span class="btitle">${esc(b.title)}</span><span class="btext">${esc(b.text || "")}</span></div></div>${btns}</div>`;
  }
  _m_hero(m, T, color) {
    if (["hob"].includes(m.type) && !m.demo) return "";
    const kind = animKind(m);
    const always = (["fridge", "freezer", "winecooler", "hood", "hob"].includes(m.type) && !["off", "offline", "inactive"].includes(m.status))
      || (m.profile === "climate" && m.status === "run") || (m.profile && m.program?.canon === "cleaning") || (m.profile && m.program?.canon === "mowing");
    const idle = !m.running && m.status !== "finished" && !always;
    const pct = m.ringPct != null ? m.ringPct : m.status === "finished" ? 100 : m.progress != null ? m.progress : 0;
    const C = 2 * Math.PI * 78;
    const ring = `<svg width="168" height="168" viewBox="0 0 168 168" aria-hidden="true"><circle cx="84" cy="84" r="78" fill="none" stroke="var(--hc-s2)" stroke-width="8"/><circle class="hc-arc" opacity="${pct > 0 ? 1 : 0}" cx="84" cy="84" r="78" fill="none" stroke="${esc(color)}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(C * pct / 100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 84 84)" style="transition:stroke-dasharray 1s"/></svg>`;
    const animCls = idle ? (/espresso|cappu|latte|crema|water|milk/.test(kind) ? "static" : "paused") : m.status === "pause" ? "paused" : "";
    const inner = `<svg class="inner ${animCls}" viewBox="0 0 120 120" aria-hidden="true">${animSvg(idle && kind === "generic" ? "generic" : kind, color, m)}</svg>`;
    const info = [];
    if (m.profile) {
      if (m.ringPct != null && m.ringLabel && m.profile !== "climate") info.push(`<div><div class="lbl">${esc(m.ringLabel)}</div><div class="big">${Math.round(m.ringPct)} %</div></div>`);
      (m.info || []).forEach((x) => info.push(`<div><div class="lbl">${esc(x.label)}</div><div class="${x.big ? "big" : "mid"}">${esc(x.value)}</div></div>`));
      if (!info.length) info.push(`<div><div class="mid">${esc(m.statusText || "")}</div></div>`);
    }
    if (!m.profile && m.running && m.remaining != null) info.push(`<div><div class="lbl">${esc(T.remaining)}</div><div class="big hc-rem">${esc(fmtDur(m.remaining, this.lang))}</div></div>`);
    if (m.running && m.end) info.push(`<div><div class="lbl">${esc(T.ends)}</div><div class="mid hc-end">${fmtClock(m.end)}</div></div>`);
    if (m.startsIn) info.push(`<div><div class="lbl">${esc(T.starts_in)}</div><div class="mid">${esc(fmtDur(m.startsIn, this.lang))}</div></div>`);
    if (m.temp?.current != null && ["oven", "warmingdrawer", "cookprocessor"].includes(m.type)) info.push(`<div><div class="lbl">${esc(T.temperature)}</div><div class="mid"><span class="hc-temp">${m.temp.current}</span> °C${m.temp.target && m.running ? ` <span class="lbl">/ ${esc(T.target)} ${m.temp.target} °C</span>` : ""}</div></div>`);
    if (m.temp?.probe != null) info.push(`<div><div class="lbl">${esc(T.meat_probe)}</div><div class="mid">${m.temp.probe} °C</div></div>`);
    if (["fridge", "freezer", "winecooler"].includes(m.type) && m.temp?.current != null) info.push(`<div><div class="lbl">${esc(T.temperature)}</div><div class="big">${m.temp.current} °C</div></div>`);
    if (m.phase && m.running) info.push(`<div><div class="lbl">${esc(T.phase)}</div><div class="mid">${esc(m.phase)}</div></div>`);
    if (!m.profile && !info.length && m.statusText) info.push(`<div><div class="mid">${esc(m.statusText)}</div></div>`);
    if (!info.length) info.push(`<div><div class="lbl">${esc(T.program)}</div><div class="mid">${esc(m.program?.label || T[m.status] || m.status)}</div></div><div class="lbl">${esc(T[m.status] || m.status)}</div>`);
    if (m.door) info.push(`<div class="row lbl">${ic("door", 14)}${esc(m.door === "open" ? T.door_open : T.door_closed)}</div>`);
    let extra = "";
    if (m.type === "dishwasher" && (m.running || m.demo)) {
      const ph = ["prerinse", "mainwash", "finalrinse", "drying"];
      const cur = ph.indexOf(m.phaseKey);
      if (cur >= 0) extra = `<div class="phases">${ph.map((p, i) => `<div class="${i < cur ? "done" : i === cur ? "cur" : ""}"><span class="d"></span>${esc(T[`ph_${p}`])}</div>`).join("")}<div><span class="d"></span>${esc(T.ph_done)}</div></div>`;
    }
    if (["washer", "washerdryer"].includes(m.type) && m.running) {
      const ph = m.type === "washerdryer" ? ["wash", "rinse", "spin", "dry"] : ["wash", "rinse", "spin"];
      const cur = Math.max(0, ph.indexOf(m.phaseKey || (m.progress < 65 ? "wash" : m.progress < 85 ? "rinse" : "spin")));
      extra = `<div class="phases">${ph.map((p, i) => `<div class="${i < cur ? "done" : i === cur ? "cur" : ""}"><span class="d"></span>${esc(T[`ph_${p}`])}</div>`).join("")}</div>`;
    }
    if (m.forecast) {
      const steps = (v, c) => `<div class="row" style="gap:8px"><div class="steps">${[6, 10, 14, 18].map((h, i) => `<i style="height:${h}px;${v > i * 25 ? `background:${c}` : ""}"></i>`).join("")}</div><span class="mv">${Math.round(v)} %</span></div>`;
      extra += `<div class="grid2s">${m.forecast.energy != null ? `<div class="mini" style="background:var(--hc-s1)"><span class="lbl">${esc(T.energy)}</span>${steps(m.forecast.energy, "var(--hc-accent)")}</div>` : ""}${m.forecast.water != null ? `<div class="mini" style="background:var(--hc-s1)"><span class="lbl">${esc(T.water)}</span>${steps(m.forecast.water, "#5aa9ff")}</div>` : ""}</div>`;
    }
    return `<div class="box"><div class="hero"><div class="ring">${ring}${inner}</div><div class="info">${info.join("")}</div></div>${extra}</div>`;
  }
  _m_programs(m, T) {
    if (m.rooms?.length) {
      const sel = this._ui.rooms || [];
      const chips = m.rooms.map((r) => `<button class="chip ${sel.includes(r.id) ? "on" : ""}" data-room="${esc(r.id)}">${ic("room", 16, 2)}${esc(r.name)}</button>`).join("");
      const go = sel.length && m.roomSvc ? `<div class="row" style="gap:8px;margin-top:4px"><button class="abtn pri" data-act="rooms" style="flex:1">${ic("play", 18)}${esc(sel.length === 1 ? T.clean_room1 : T.clean_rooms.replace("{n}", sel.length))}</button><button class="sub" data-act="roomsclear" aria-label="${esc(T.sel_clear)}" title="${esc(T.sel_clear)}">${ic("stop", 16, 2)}</button></div>` : "";
      return `<div class="box"><span class="lbl">${esc(T.rooms)}</span><div class="chips ${m.rooms.length > 9 ? "scroll" : ""}">${chips}</div>${go}</div>`;
    }
    if (!m.programs.length || m.type === "hob" || m.profile) return "";
    const cats = [...new Set(m.programs.map((p) => p.cat))];
    const order = ["fav", "drink", "world", "dish", "heat", "micro", "steam", "prog", "clean"];
    cats.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    let tab = this._ui.tab && cats.includes(this._ui.tab) ? this._ui.tab : null;
    if (!tab) {
      const cur = m.programs.find((p) => p.canon === m.selectedCanon);
      tab = cur && cur.cat !== "clean" ? cur.cat : cats.find((c) => c !== "clean") || cats[0];
    }
    const tabs = cats.length > 1 ? `<div class="seg">${cats.map((c) => `<button class="${c === tab ? "on" : ""}" data-tab="${c}">${esc(T[`tab_${c}`] || c)}</button>`).join("")}</div>` : "";
    const count = m.programs.filter((p) => p.cat === tab).length;
    const q = this._ui.search || "";
    const search = count > 12 ? `<label class="search">${ic("search", 18)}<input class="q" type="text" value="${esc(q)}" placeholder="${esc(T.search)}" aria-label="${esc(T.search)}"><span class="lbl qc"></span></label>` : "";
    const body = `${search}<div class="tiles ${count > 9 ? "scroll" : ""}" data-cat="${tab}"></div>`;
    return `<div class="box" data-mod="programs"><div class="row"><span class="lbl sp">${esc(T.program)}</span></div>${tabs}${body}</div>`;
  }
  _progIcon(m, p) {
    const t = p.tail || p.canon;
    if (m.type === "coffee") {
      const k = animKind({ type: "coffee", program: p, status: "run" });
      const map = { espresso: '<path d="M7 12h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4z"/><path d="M15 12.5h1a2 2 0 0 1 0 4h-1"/>', latte: '<path d="M8 3h8l-1.5 18h-5z"/><path d="M8.6 10h6.8M9.3 16h5.4"/>', cappu: '<path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M5.5 11.5c2 1 8 1 10 0"/>', water: '<path d="M12 4c-3 3.8-5 6.5-5 9a5 5 0 0 0 10 0c0-2.5-2-5.2-5-9z"/>', milk: '<path d="M8 3h8v4l2 3v11H6V10l2-3z"/>' };
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${map[k] || ICON.coffee}</svg>`;
    }
    if (m.type === "oven") {
      const k = animKind({ type: "oven", program: p, status: "run" });
      const map = { fan: '<circle cx="12" cy="12" r="1.5"/><path d="M12 10.5c0-3 1-6 4-6 2 0 2.5 2 1 3.5L13.3 11M13.5 12c3 0 6 1 6 4 0 2-2 2.5-3.5 1L13 13.3M12 13.5c0 3-1 6-4 6-2 0-2.5-2-1-3.5l3.7-2.7M10.5 12c-3 0-6-1-6-4 0-2 2-2.5 3.5-1L11 10.7"/>', heat: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M6 7.5h12M6 16.5h12"/>', grill: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M6 7.5l2 1.5 2-1.5 2 1.5 2-1.5 2 1.5 2-1.5"/>', micro: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10c1.5-1 3 1 4.5 0M7 14c1.5-1 3 1 4.5 0"/><path d="M16 9v6"/>', steam: '<path d="M8 20c0-2 2-2 2-4s-2-2-2-4 2-2 2-4M14 20c0-2 2-2 2-4s-2-2-2-4 2-2 2-4"/>' };
      if (/pizza/.test(t)) return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L3.5 19.5a20 20 0 0 0 17 0z"/><circle cx="11" cy="12" r="1"/><circle cx="13.5" cy="16" r="1"/></svg>`;
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${map[k] || ICON.oven}</svg>`;
    }
    return ic(TYPE_META[m.type]?.icon || "generic", 24, 1.6);
  }
  _fillList() {
    const box = this.shadowRoot.querySelector(".tiles[data-cat]");
    const m = this._m;
    if (!box || !m) return;
    const T = I18N[this.lang];
    const cat = box.dataset.cat;
    const q = norm(this._ui.search || "").trim();
    let list = m.programs.filter((p) => p.cat === cat);
    if (q) list = list.filter((p) => norm(p.label).includes(q) || p.canon.includes(canon(q)));
    const total = list.length;
    if (!q) {
      const sel = list.find((p) => p.canon === m.selectedCanon);
      if (sel) list = [sel, ...list.filter((p) => p !== sel)];
    }
    list = list.slice(0, 150);
    const qc = this.shadowRoot.querySelector(".qc");
    if (qc) qc.textContent = `${total} ${T.results}`;
    box.innerHTML = list.length ? list.map((p) => {
      const parts = p.label.split(" · ");
      return `<button class="tile ${p.canon === m.selectedCanon ? "on" : ""}" data-prog="${esc(p.canon)}">${this._progIcon(m, p)}<span>${esc(parts[0])}</span>${parts[1] ? `<small>${esc(parts[1])}</small>` : ""}</button>`;
    }).join("") : `<div class="empty" style="grid-column:1/-1">${esc(T.no_results)}</div>`;
    box.scrollTop = 0;
  }
  _m_controls(m, T) {
    const c = m.controls;
    const out = [];
    const steppers = ["setpoint", "duration", "fill", "fridgeSet", "freezerSet"].filter((k) => c[k]);
    if (steppers.length) {
      out.push(`<div class="grid2">${steppers.map((k) => this._stepper(k, c[k])).join("")}</div>`);
    }
    for (const k of ["beans"]) if (c[k]) out.push(this._beans(k, c[k]));
    for (const k of ["ratio"]) if (c[k]) out.push(this._ratio(k, c[k]));
    for (const k of ["washTemp", "spin", "dry", "level", "rooms", "size", "waterTemp", "aroma"]) if (c[k] && c[k].options) out.push(this._segment(k, c[k]));
    if (c.multi) out.push(`<div class="chips"><button class="chip ${c.multi.value === "on" ? "on" : ""}" data-ctl="multi" data-kind="toggle" aria-pressed="${c.multi.value === "on"}">${ic("cups", 16, 2)}${esc(c.multi.label)}</button></div>`);
    if (c.startIn) out.push(c.startIn.options ? this._segment("startIn", c.startIn) : this._startIn("startIn", c.startIn, T));
    const known = new Set(["setpoint", "duration", "fill", "fridgeSet", "freezerSet", "beans", "ratio", "washTemp", "spin", "dry", "level", "rooms", "size", "waterTemp", "aroma", "multi", "startIn"]);
    const extraSteppers = Object.keys(c).filter((k) => !known.has(k) && c[k] && c[k].kind === "stepper");
    if (extraSteppers.length) out.push(`<div class="grid2">${extraSteppers.map((k) => this._stepper(k, c[k])).join("")}</div>`);
    for (const k of Object.keys(c)) if (!known.has(k) && c[k] && c[k].kind === "segment" && c[k].options) out.push(this._segment(k, c[k]));
    if (m.modeButtons?.length) out.push(`<div style="display:flex;flex-direction:column;gap:8px"><span class="lbl">${esc(T.modes)}</span><div class="chips">${m.modeButtons.map((b, i) => `<button class="chip" data-modebtn="${i}">${esc(b.label)}</button>`).join("")}</div></div>`);
    if (!out.length) return "";
    return `<div class="box"><span class="lbl">${esc(T.settings)}</span>${out.join("")}</div>`;
  }
  _fmtNum(ctl, v) {
    const n = parseFloat(v);
    if (isNaN(n)) return "–";
    if (ctl.device_class === "duration" || ctl.unit === "s") {
      const s = ctl.unit === "min" ? n * 60 : ctl.unit === "h" ? n * 3600 : n;
      const h = Math.floor(s / 3600), mm = Math.round((s % 3600) / 60);
      return `${h}:${String(mm).padStart(2, "0")}`;
    }
    const u = ctl.unit === "°C" || ctl.unit === "°F" ? "°" : ctl.unit ? ` ${ctl.unit}` : "";
    return `${Math.round(n * 10) / 10}${u}`;
  }
  _stepper(k, ctl) {
    const dis = !ctl.avail ? "disabled" : "";
    return `<div class="mini" style="background:var(--hc-s1)"><span class="lbl">${esc(ctl.label)}</span><div class="stepper">
      <button class="stepbtn" data-ctl="${k}" data-step="-1" aria-label="−" ${dis}>${ic("minus", 18, 2.2)}</button>
      <span class="stepval">${esc(ctl.avail ? this._fmtNum(ctl, ctl.value) : "–")}</span>
      <button class="stepbtn" data-ctl="${k}" data-step="1" aria-label="+" ${dis}>${ic("plus", 18, 2.2)}</button></div></div>`;
  }
  _segment(k, ctl) {
    const labels = ctl.optionLabels || ctl.options;
    if (ctl.options.length > 7 || labels.reduce((n, l) => n + String(l).length, 0) > 38) {
      return `<div class="morerow"><span class="ml lbl">${esc(ctl.label)}</span><select class="dd" data-ctl="${k}" ${ctl.avail ? "" : "disabled"}>${ctl.options.map((o, i) => `<option value="${esc(o)}" ${o === ctl.value ? "selected" : ""}>${esc(labels[i])}</option>`).join("")}</select></div>`;
    }
    return `<div style="display:flex;flex-direction:column;gap:8px"><span class="lbl">${esc(ctl.label)}</span><div class="seg">${ctl.options.map((o, i) => `<button class="${o === ctl.value ? "on" : ""}" data-ctl="${k}" data-opt="${esc(o)}" ${ctl.avail ? "" : "disabled"}>${esc(labels[i])}</button>`).join("")}</div></div>`;
  }
  _beans(k, ctl) {
    const opts = ctl.options || [];
    const n = opts.length;
    const idx = opts.indexOf(ctl.value);
    const labels = opts.map((o, i) => beanLabel(o, (ctl.optionLabels || [])[i], this.lang));
    ctl.beanLabels = labels;
    const pct = n > 1 ? (Math.max(0, idx) / (n - 1)) * 100 : 100;
    const small = n > 7;
    return `<div class="beanctl" style="display:flex;flex-direction:column;gap:8px"><div class="row"><span class="lbl sp">${esc(ctl.label)}</span><span class="bcur">${idx >= 0 ? beanSym(opts[idx], idx, n, 24) : ""}<span class="bname">${esc(idx >= 0 ? labels[idx] : "–")}</span></span></div>
      <div class="beans ${small ? "small" : ""}">${opts.map((o, i) => `<button class="bean ${i <= idx ? "f" : ""} ${i === idx ? "sel" : ""}" data-ctl="${k}" data-opt="${esc(o)}" data-bi="${i}" aria-label="${esc(labels[i])}" title="${esc(labels[i])}" ${ctl.avail ? "" : "disabled"}>${beanSym(o, i, n, small ? 22 : 30)}</button>`).join("")}</div>
      <div class="btrack"><div class="bfill" style="width:${pct}%"></div><div class="bthumb" style="left:${pct}%">${idx >= 0 ? beanSym(opts[idx], idx, n, 22) : ""}</div>
        <input type="range" class="bslider" data-ctl="${k}" min="0" max="${Math.max(0, n - 1)}" step="1" value="${Math.max(0, idx)}" aria-label="${esc(ctl.label)}" ${ctl.avail ? "" : "disabled"}></div></div>`;
  }
  _ratio(k, ctl) {
    const opts = ctl.options || [];
    const v = parseInt(String(ctl.value), 10);
    const coffee = isNaN(v) ? 50 : v;
    const T = I18N[this.lang];
    return `<div style="display:flex;flex-direction:column;gap:8px"><div class="row"><span class="lbl sp">${esc(ctl.label)}</span><span class="mv">${isNaN(v) ? "–" : `${coffee} : ${100 - coffee}`}</span></div>
      <div class="row"><button class="stepbtn" data-ctl="${k}" data-cycle="-1" aria-label="−" ${ctl.avail ? "" : "disabled"}>${ic("minus", 18, 2.2)}</button>
      <div class="ratio sp"><div class="c" style="width:${coffee}%">${esc(T.coffee)}</div><div class="gap"></div><div class="m">${esc(T.milk)}</div>
        <input type="range" class="rslider" data-ctl="${k}" min="0" max="${Math.max(0, opts.length - 1)}" step="1" value="${Math.max(0, opts.indexOf(ctl.value))}" aria-label="${esc(ctl.label)}" ${ctl.avail ? "" : "disabled"}></div>
      <button class="stepbtn" data-ctl="${k}" data-cycle="1" aria-label="+" ${ctl.avail ? "" : "disabled"}>${ic("plus", 18, 2.2)}</button></div></div>`;
  }
  _startIn(k, ctl, T) {
    const max = parseFloat(ctl.max ?? 24);
    const unit = ctl.unit || "h";
    const toUnit = (h) => (unit === "s" ? h * 3600 : unit === "min" ? h * 60 : h);
    const presets = [0, 1, 3, 6, 9].filter((h) => toUnit(h) <= max);
    const cur = parseFloat(ctl.value) || 0;
    const ch = ctl.cheap;
    const pre = this._cheapPre(this._m);
    const chOn = (ch && Math.abs(ch.value - cur) < 1e-6 && ch.h > 0) || !!pre;
    const chBtn = ch ? `<button class="${chOn ? "on" : ""}" data-ctl="${k}" data-num="${ch.value}" ${ctl.avail ? "" : "disabled"} style="display:inline-flex;align-items:center;gap:4px">${ic("euro", 15, 2)}${ch.h > 0 ? `+${String(Math.round(ch.h * 100) / 100).replace(".", ",")} h` : esc(T.now)}</button>` : "";
    const save = ch && ch.now ? Math.round((1 - ch.avg / ch.now) * 100) : 0;
    const info = ch ? `<div class="row lbl" style="gap:6px">${ic("euro", 14, 2)}<span>${esc(T.cheapest)}: ${ch.h > 0 ? `+${String(Math.round(ch.h * 100) / 100).replace(".", ",")} h` : esc(T.now)} · Ø ${esc(fmtPrice(ch.avg, ch.unit))}${save > 0 ? ` · ${esc(T.save.replace("{p}", save))}` : ""}${pre ? ` · ${esc(T.preselected)}` : ""}</span></div>` : "";
    return `<div style="display:flex;flex-direction:column;gap:8px"><span class="lbl">${esc(ctl.label)}</span><div class="seg">${chBtn}${presets.map((h) => `<button class="${!chOn && Math.abs(toUnit(h) - cur) < 1e-6 ? "on" : ""}" data-ctl="${k}" data-num="${toUnit(h)}" ${ctl.avail ? "" : "disabled"}>${h === 0 ? esc(T.now) : `+${h} h`}</button>`).join("")}</div>${info}</div>`;
  }
  _optIcon(label) {
    const k = norm(label);
    const map = [[/vorheiz|preheat|speed|vario|schnell|turbo|boost/, "bolt"], [/dampf|steam/, "steam"], [/kinder|child|lock|verriegel|sperre/, "lock"],
      [/wecker|alarm|timer/, "alarm"], [/eco|spar/, "leaf"], [/leise|silence|stille|nacht|night/, "moon"], [/trocken|dry/, "sun"],
      [/halb|half/, "half"], [/intensiv|intensive/, "flame"], [/hygien/, "shield"], [/super.*k|frost|gefrier|kuhl|cool/, "snow"],
      [/sabbat|feiertag/, "star"], [/licht|light|beleucht/, "bulb"], [/wasser|water|aqua/, "drop"], [/tassen|cups|getranke|beverag|doppel/, "cups"],
      [/vorwasch|prewash/, "drop"], [/knitter|wrinkle|schon|gentle/, "leaf"], [/energ/, "bolt"]];
    for (const [re, icon] of map) if (re.test(k)) return icon;
    return "check";
  }
  _m_options(m, T) {
    if (!m.options.length) return "";
    return `<div class="box"><span class="lbl">${esc(T.options)}</span><div class="chips ${m.options.length > 9 ? "scroll" : ""}">${m.options.map((o, i) => `<button class="chip ${o.on ? "on" : ""}" data-opt-i="${i}" aria-pressed="${o.on ? "true" : "false"}" ${o.avail ? "" : "disabled"}>${ic(this._optIcon(o.label), 16, 2)}${esc(o.label)}</button>`).join("")}</div></div>`;
  }
  _tank(c) {
    const col = { ok: "color-mix(in srgb,var(--hc-accent) 70%,transparent)", warn: "var(--hc-warn)", bad: "var(--hc-bad)" }[c.level || "ok"];
    const tcol = { ok: "var(--hc-text)", warn: "var(--hc-warn)", bad: "var(--hc-bad)" }[c.level || "ok"];
    const pct = c.pct == null ? 80 : Math.max(0, Math.min(100, c.pct));
    return `<div class="tank"><div class="tk ${c.level !== "ok" ? c.level : ""}"><i style="height:${pct}%;background:${col}"></i></div><span class="tv" style="color:${tcol}">${esc(c.text)}</span><span class="tl2">${esc(c.label)}</span></div>`;
  }
  _m_consumables(m, T) {
    if (!m.consumables.length && !m.counters.length) return "";
    const counters = m.counters.map((c) => `<div class="mini" style="background:var(--hc-s1)"><span class="lbl">${esc(c.label)}</span><span class="mv">${esc(c.value)}</span></div>`);
    return `<div class="box"><span class="lbl">${esc(T.consumables)}</span>${m.consumables.length ? `<div class="tanks">${m.consumables.map((c) => this._tank(c)).join("")}</div>` : ""}${counters.length ? `<div class="minis">${counters.join("")}</div>` : ""}</div>`;
  }
  _m_idos(m, T) {
    if (!m.idos) return "";
    const chips = m.idos.switches.map((o, i) => `<button class="chip ${o.on ? "on" : ""}" data-idos-i="${i}" aria-pressed="${o.on}" ${o.avail ? "" : "disabled"}>${esc(o.label)}</button>`).join("");
    return `<div class="box"><span class="lbl">${esc(T.idos)}</span><div class="row" style="align-items:center;gap:16px;flex-wrap:wrap"><div class="tanks" style="flex:none">${m.idos.tanks.map((c) => this._tank(c)).join("")}</div>${chips ? `<div class="chips" style="flex:1;flex-direction:column;align-items:flex-end;min-width:140px">${chips}</div>` : ""}</div></div>`;
  }
  _m_actions(m, T) {
    if (m.svcActions?.length) {
      const b = m.svcActions.map((x, i) => `<button class="abtn ${x.primary ? "pri" : ""}" data-svca="${i}">${ic(x.icon, 18, 2.2)}${esc(x.label)}</button>`);
      return `<div class="actions ${b.length === 1 ? "one" : ""}">${b.join("")}</div>`;
    }
    const a = m.actions;
    const btns = [];
    if (m.status === "run" || m.status === "actionrequired") {
      if (a.pause || a.startPause) btns.push(`<button class="abtn pri" data-act="pause">${ic("pause", 18, 2.4)}${esc(T.pause_btn)}</button>`);
      if (a.stop) btns.push(`<button class="abtn" data-act="stop">${ic("stop", 16)}${esc(T.stop)}</button>`);
    } else if (m.status === "pause") {
      if (a.resume || a.startPause) btns.push(`<button class="abtn pri" data-act="resume">${ic("play", 18)}${esc(T.resume)}</button>`);
      if (a.stop) btns.push(`<button class="abtn" data-act="stop">${ic("stop", 16)}${esc(T.stop)}</button>`);
    } else if (m.status === "delayedstart") {
      if (a.stop) btns.push(`<button class="abtn" data-act="stop">${ic("stop", 16)}${esc(T.stop)}</button>`);
    } else if (m.status !== "offline") {
      if ((a.start || m.activeSelect || a.startPause) && m.program && !m.banner) { const pre = this._cheapPre(m); btns.push(`<button class="abtn pri" data-act="start">${ic("play", 18)}${esc(T.start)}${m.program ? ` · ${esc(m.program.label.split(" · ")[0])}` : ""}${pre ? ` · ${ic("euro", 14, 2)}+${String(Math.round(pre.h * 100) / 100).replace(".", ",")} h` : ""}</button>`); }
    }
    if (!btns.length) return "";
    return `<div class="actions ${btns.length === 1 ? "one" : ""}">${btns.join("")}</div>`;
  }
  _m_more(m, T) {
    if (!m.more.length || m.demo) return "";
    const rows = m.more.map((e, i) => {
      const st = e.st;
      let ctl = "";
      if (e.domain === "switch") ctl = `<button class="tog ${st.state === "on" ? "on" : ""}" data-more="${i}" style="min-height:40px" ${e.avail ? "" : "disabled"}><span class="sw" style="margin-left:0"><i></i></span></button>`;
      else if (e.domain === "select") ctl = `<select class="dd" data-more="${i}" ${e.avail ? "" : "disabled"}>${(st.attributes.options || []).map((o, j) => `<option value="${esc(o)}" ${o === st.state ? "selected" : ""}>${esc(e.optionLabels[j])}</option>`).join("")}</select>`;
      else if (e.domain === "button") ctl = `<button class="sub small" data-more="${i}" ${e.avail ? "" : "disabled"}>${ic("play", 14)}</button>`;
      else if (e.domain === "number") ctl = `<div class="row"><button class="stepbtn" data-more="${i}" data-step="-1" ${e.avail ? "" : "disabled"}>${ic("minus", 16, 2.2)}</button><span class="mv" style="min-width:56px;text-align:center">${esc(e.avail ? this._fmtNum({ unit: st.attributes.unit_of_measurement, device_class: st.attributes.device_class }, st.state) : "–")}</span><button class="stepbtn" data-more="${i}" data-step="1" ${e.avail ? "" : "disabled"}>${ic("plus", 16, 2.2)}</button></div>`;
      return `<div class="morerow"><span class="ml">${esc(e.label)}${e.avail ? "" : ` <span class="lbl">(${esc(T.unavailable)})</span>`}</span>${ctl}</div>`;
    });
    return `<details ${this._ui.moreOpen ? "open" : ""}><summary>${ic("chev", 16)}${esc(T.more)} <span class="lbl">(${m.more.length})</span></summary><div class="morelist">${rows.join("")}</div></details>`;
  }

  /* ---------- Bedienung ---------- */
  // Eigenes Auswahlmenü statt der nativen Dropdown-Liste (sieht in jedem Browser gleich aus)
  _openDD(sel) {
    this._closeDD();
    if (sel.disabled) return;
    const host = this.getBoundingClientRect();
    const anchor = sel.closest(".qb") || sel;
    const r = anchor.getBoundingClientRect();
    const menu = document.createElement("div");
    menu.className = "ddm";
    menu.setAttribute("role", "listbox");
    menu.innerHTML = [...sel.options].map((o, i) => `<button type="button" role="option" class="ddi ${o.selected ? "on" : ""}" data-i="${i}" aria-selected="${o.selected}"><span>${esc(o.textContent)}</span>${o.selected ? ic("check", 16, 2.4) : ""}</button>`).join("");
    this.shadowRoot.appendChild(menu);
    const mw = Math.max(r.width, Math.min(260, menu.scrollWidth + 4));
    menu.style.minWidth = `${mw}px`;
    const mh = Math.min(menu.scrollHeight, 300);
    const below = window.innerHeight - r.bottom, above = r.top;
    const up = below < mh + 12 && above > below;
    menu.style.top = `${(up ? r.top - mh - 6 : r.bottom + 6) - host.top}px`;
    let left = r.right - mw - host.left;
    if (r.left - host.left + mw <= host.width) left = r.left - host.left;
    menu.style.left = `${Math.max(4, left)}px`;
    menu.style.maxHeight = "300px";
    const cur = menu.querySelector(".ddi.on"); if (cur) cur.scrollIntoView({ block: "nearest" });
    menu.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const b = ev.target.closest(".ddi"); if (!b) return;
      sel.selectedIndex = +b.dataset.i;
      this._closeDD();
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    });
    menu.addEventListener("keydown", (ev) => {
      const items = [...menu.querySelectorAll(".ddi")]; const i = items.indexOf(this.shadowRoot.activeElement);
      if (ev.key === "Escape") { this._closeDD(); sel.focus(); }
      else if (ev.key === "ArrowDown") { ev.preventDefault(); items[Math.min(items.length - 1, i + 1)]?.focus(); }
      else if (ev.key === "ArrowUp") { ev.preventDefault(); items[Math.max(0, i - 1)]?.focus(); }
    });
    (cur || menu.querySelector(".ddi"))?.focus({ preventScroll: true });
    this._ddOut = (ev) => { if (!ev.composedPath().includes(menu) && !ev.composedPath().includes(sel)) this._closeDD(); };
    setTimeout(() => { document.addEventListener("pointerdown", this._ddOut, true); window.addEventListener("scroll", this._ddOut, true); }, 0);
    this._dd = menu;
    this.style.zIndex = "10";
  }
  _closeDD() {
    if (this._dd) { this._dd.remove(); this._dd = null; this.style.zIndex = ""; }
    if (this._ddOut) { document.removeEventListener("pointerdown", this._ddOut, true); window.removeEventListener("scroll", this._ddOut, true); this._ddOut = null; }
  }
  _bind(m) {
    const R = this.shadowRoot;
    this._closeDD();
    R.querySelectorAll("select").forEach((sel) => {
      const open = (ev) => { ev.preventDefault(); ev.stopPropagation(); this._dd ? this._closeDD() : this._openDD(sel); };
      sel.addEventListener("mousedown", open);
      sel.addEventListener("touchstart", open, { passive: false });
      sel.addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation(); });
      sel.addEventListener("keydown", (ev) => { if (["Enter", " ", "ArrowDown"].includes(ev.key)) open(ev); });
    });
    R.querySelectorAll("[data-act]").forEach((el) => el.addEventListener("click", (ev) => { ev.stopPropagation(); this._action(el.dataset.act); }));
    R.querySelectorAll("[data-expand]").forEach((el) => el.addEventListener("click", () => {
      const t = el.dataset.expand; this._ui.expanded = { ...(this._ui.expanded || {}), [t]: !this._ui.expanded?.[t] };
      if (el.previousElementSibling?.classList.contains("list")) { this._fillList(); this._bindList(); } else { this._sig = ""; this._update(true); }
    }));
    R.querySelectorAll("[data-tab]").forEach((el) => el.addEventListener("click", () => { this._ui.tab = el.dataset.tab; this._ui.search = ""; this._sig = ""; this._update(true); }));
    const q = R.querySelector("input.q");
    if (q) q.addEventListener("input", () => { this._ui.search = q.value; this._fillList(); this._bindList(); });
    if (R.querySelector(".tiles[data-cat]")) { this._fillList(); this._bindList(); }
    R.querySelectorAll("[data-ctl]").forEach((el) => {
      if (el.classList.contains("bslider")) {
        const ctl = m.controls[el.dataset.ctl];
        const box = el.closest(".beanctl");
        const upd = () => {
          const i = +el.value, n = ctl.options.length, pct = n > 1 ? (i / (n - 1)) * 100 : 100;
          const sym = beanSym(ctl.options[i], i, n, 22);
          box.querySelector(".bfill").style.width = `${pct}%`;
          const th = box.querySelector(".bthumb"); th.style.left = `${pct}%`; th.innerHTML = sym;
          box.querySelector(".bcur").innerHTML = `${beanSym(ctl.options[i], i, n, 24)}<span class="bname">${esc((ctl.beanLabels || ctl.optionLabels || ctl.options)[i])}</span>`;
          box.querySelectorAll(".bean").forEach((b) => { const bi = +b.dataset.bi; b.classList.toggle("f", bi <= i); b.classList.toggle("sel", bi === i); });
        };
        el.addEventListener("input", upd);
        el.addEventListener("change", () => this._control(el));
        return;
      }
      if (el.classList.contains("rslider")) {
        const ctl = m.controls[el.dataset.ctl];
        const upd = () => {
          const o = ctl.options[+el.value]; const v = parseInt(o, 10);
          const box = el.parentElement; box.querySelector(".c").style.width = `${v}%`;
          const mv = box.parentElement.parentElement.querySelector(".mv"); if (mv) mv.textContent = `${v} : ${100 - v}`;
        };
        el.addEventListener("input", upd);
        el.addEventListener("change", () => this._control(el));
        return;
      }
      const ev = el.tagName === "SELECT" ? "change" : "click";
      el.addEventListener(ev, () => this._control(el));
    });
    R.querySelectorAll("[data-opt-i]").forEach((el) => el.addEventListener("click", () => {
      const o = m.options[+el.dataset.optI];
      if (m.demo) { o.on = !o.on; el.classList.toggle("on"); return; }
      this._call("homeassistant", o.on ? "turn_off" : "turn_on", { entity_id: o.entity });
    }));
    R.querySelectorAll("[data-svca]").forEach((el) => el.addEventListener("click", () => {
      const x = m.svcActions[+el.dataset.svca];
      const ent = this._config.entity || this._group()?.entities.find((e) => MAIN_DOMAINS.includes(e.eid.split(".")[0]))?.eid;
      this._call(x.svc[0], x.svc[1], { entity_id: ent, ...(x.data || {}) });
    }));
    R.querySelectorAll("[data-modebtn]").forEach((el) => el.addEventListener("click", () => {
      const b = m.modeButtons[+el.dataset.modebtn]; this._call("button", "press", { entity_id: b.entity });
    }));
    const toggleRoom = (raw) => {
      const id = isNaN(+raw) ? raw : +raw;
      const cur = new Set(this._ui.rooms || []); cur.has(id) ? cur.delete(id) : cur.add(id);
      this._ui.rooms = [...cur]; this._sig = ""; this._update(true);
    };
    R.querySelectorAll("[data-room]").forEach((el) => el.addEventListener("click", () => toggleRoom(el.dataset.room)));
    R.querySelectorAll("[data-maproom]").forEach((el) => el.addEventListener("click", (ev) => { ev.stopPropagation(); toggleRoom(el.dataset.maproom); }));
    R.querySelectorAll('[data-act="roomsclear"]').forEach((el) => el.addEventListener("click", () => { this._ui.rooms = []; this._sig = ""; this._update(true); }));
    this._layoutMap();
    R.querySelectorAll(".qs").forEach((q) => { q.addEventListener("click", (ev) => ev.stopPropagation()); q.addEventListener("keydown", (ev) => ev.stopPropagation()); });
    R.querySelectorAll("[data-qsvc]").forEach((el) => el.addEventListener("click", () => {
      const [d, sv] = el.dataset.qsvc.split(".");
      const ent = this._config.entity || this._group()?.entities.find((e) => MAIN_DOMAINS.includes(e.eid.split(".")[0]))?.eid;
      this._call(d, sv, { entity_id: ent });
    }));
    R.querySelectorAll("[data-idos-i]").forEach((el) => el.addEventListener("click", () => {
      const o = m.idos.switches[+el.dataset.idosI];
      if (m.demo) { o.on = !o.on; el.classList.toggle("on"); return; }
      this._call("homeassistant", o.on ? "turn_off" : "turn_on", { entity_id: o.entity });
    }));
    R.querySelectorAll("[data-more]").forEach((el) => {
      const ev = el.tagName === "SELECT" ? "change" : "click";
      el.addEventListener(ev, () => this._moreControl(el));
    });
    const det = R.querySelector("details");
    if (det) det.addEventListener("toggle", () => { this._ui.moreOpen = det.open; });
    const pill = R.querySelector('.pill[data-act="tap"]');
    if (pill) pill.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") this._action("tap"); });
  }
  _bindList() {
    this.shadowRoot.querySelectorAll(".tiles[data-cat] [data-prog]").forEach((el) => el.addEventListener("click", () => this._selectProgram(el.dataset.prog)));
  }
  _toast(msg) {
    const t = this.shadowRoot.querySelector(".toast");
    if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(this._tt); this._tt = setTimeout(() => t.classList.remove("show"), 1800);
  }
  _call(domain, service, data) {
    if (this._m?.demo) { this._toast(I18N[this.lang].demo_note); return Promise.resolve(); }
    return this._hass.callService(domain, service, data).catch((e) => this._toast(e.message || String(e)));
  }
  _moreInfo(entityId) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
  }
  _navigate(path) {
    if (path.startsWith("#")) { window.location.hash = path; return; }
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }
  _action(act) {
    const m = this._m; if (!m) return;
    const a = m.actions;
    switch (act) {
      case "tap":
        if (this._config.navigation_path) this._navigate(this._config.navigation_path);
        else if (!m.demo) { const g = this._group(); const e = g?.entities.find((x) => isOpState(x)) || g?.entities[0]; if (e) this._moreInfo(e.eid); }
        break;
      case "cam": if (m.camera && !m.demo) this._moreInfo(m.camera); else this._toast(I18N[this.lang].demo_note); break;
      case "camrefresh":
        if (m.demo) { this._toast(I18N[this.lang].demo_note); break; }
        if (m.camRefresh) this._call("button", "press", { entity_id: m.camRefresh });
        else this._call("homeassistant", "update_entity", { entity_id: m.camera });
        this._toast("↻"); break;
      case "light":
        if (!m.light?.control) break;
        if (m.demo) { this._ui.demoLight = !this._ui.demoLight; this._toast(I18N[this.lang].demo_note); break; }
        this._call(m.light.domain === "light" ? "light" : "switch", "toggle", { entity_id: m.light.entity }); break;
      case "display": if (m.display) { if (m.demo) { this._toast(I18N[this.lang].demo_note); break; } this._call("homeassistant", "toggle", { entity_id: m.display.entity }); } break;
      case "power": if (m.power) this._call(m.power.svcDomain || "switch", m.power.on ? "turn_off" : "turn_on", { entity_id: m.power.entity }); break;
      case "pause": if (a.pause) this._call("button", "press", { entity_id: a.pause }); else if (a.startPause) this._call("button", "press", { entity_id: a.startPause }); else this._toast(I18N[this.lang].demo_note); break;
      case "resume": if (a.resume) this._call("button", "press", { entity_id: a.resume }); else if (a.startPause) this._call("button", "press", { entity_id: a.startPause }); break;
      case "stop": if (a.stop) this._call("button", "press", { entity_id: a.stop }); break;
      case "start": this._start(); break;
      case "tab-dish": this._ui.tab = "dish"; this._sig = ""; this._update(true); break;
      case "rooms": {
        if (!m.roomSvc || !this._ui.rooms?.length) break;
        const ent = this._config.entity || this._group()?.entities.find((e) => e.eid.startsWith("vacuum."))?.eid;
        const [d, sv, key] = m.roomSvc;
        if (d === "mqtt") this._call("mqtt", "publish", { topic: key, payload: JSON.stringify({ segment_ids: this._ui.rooms.map(String), iterations: 1, customOrder: true }) });
        else if (d === "vacuum" && sv === "send_command") this._call("vacuum", "send_command", { entity_id: ent, command: "app_segment_clean", params: this._ui.rooms });
        else this._call(d, sv, { entity_id: ent, [key]: this._ui.rooms });
        this._ui.rooms = []; this._sig = ""; this._update(true); break;
      }
      default: break;
    }
  }
  _start() {
    const m = this._m;
    if (m.demo) { this._toast(I18N[this.lang].demo_note); return; }
    const pre = this._cheapPre(m);
    if (pre) {
      const c = m.controls.startIn;
      return Promise.resolve(this._call("number", "set_value", { entity_id: c.entity, value: pre.value }))
        .then(() => new Promise((r) => setTimeout(r, 800))).then(() => { this._ui.startPicked = false; return this._startNow(); });
    }
    return this._startNow();
  }
  _startNow() {
    const m = this._m;
    if (m.actions.start) return this._call("button", "press", { entity_id: m.actions.start });
    if (m.actions.startPause) return this._call("button", "press", { entity_id: m.actions.startPause });
    if (m.activeSelect && m.program) {
      const st = this._hass.states[m.activeSelect];
      const opt = (st?.attributes?.options || []).find((o) => canon(o) === m.program.canon);
      if (opt) return this._call("select", "select_option", { entity_id: m.activeSelect, option: opt });
    }
    return null;
  }
  _selectProgram(c) {
    const m = this._m;
    if (m.demo) { this._ui.demoSel = { ...this._ui.demoSel, prog: c }; this._sig = ""; this._update(true); return; }
    for (const s of m.programSelects) {
      const opt = s.options.find((o) => canon(o) === c);
      if (opt) { this._call("select", "select_option", { entity_id: s.entity, option: opt }); this._toast("✓"); return; }
    }
    this._toast(I18N[this.lang].unavailable);
  }
  _cheapPre(m) {
    const c = m?.controls?.startIn; const ch = c?.cheap;
    if (!ch || !(ch.h > 0) || m.running || this._ui.startPicked || this._config.cheapest_default === false) return null;
    if ((parseFloat(c.value) || 0) !== 0) return null;
    return ch;
  }
  _control(el) {
    const m = this._m;
    const k = el.dataset.ctl;
    if (k === "startIn" && !this._ui.startPicked) { this._ui.startPicked = true; this._sig = ""; setTimeout(() => this._update(true), 0); }
    const ctl = m.controls[k];
    if (!ctl) return;
    let value;
    if (el.dataset.kind === "toggle") {
      if (m.demo) { ctl.value = ctl.value === "on" ? "off" : "on"; el.classList.toggle("on"); return; }
      return this._call("homeassistant", ctl.value === "on" ? "turn_off" : "turn_on", { entity_id: ctl.entity });
    }
    if (el.tagName === "SELECT") value = el.value;
    else if (el.classList.contains("rslider") || el.classList.contains("bslider")) value = ctl.options[+el.value];
    else if (el.dataset.opt != null) value = el.dataset.opt;
    else if (el.dataset.cycle != null) {
      const i = ctl.options.indexOf(ctl.value);
      const ni = Math.max(0, Math.min(ctl.options.length - 1, (i < 0 ? 0 : i) + parseInt(el.dataset.cycle, 10)));
      value = ctl.options[ni];
    } else if (el.dataset.num != null) value = parseFloat(el.dataset.num);
    else if (el.dataset.step != null) {
      const step = parseFloat(ctl.step) || 1;
      let big = step;
      if (ctl.device_class === "duration" && step < 60) big = ctl.unit === "s" ? 300 : step;
      if ((ctl.unit === "°C" || ctl.unit === "°F") && step < 5 && k === "setpoint" && !ctl.fine) big = 5;
      const cur = parseFloat(this._pending?.[k] ?? ctl.value) || 0;
      value = Math.max(ctl.min ?? -Infinity, Math.min(ctl.max ?? Infinity, cur + big * parseInt(el.dataset.step, 10)));
      this._pending = { ...(this._pending || {}), [k]: value };
      const sv = el.parentElement.querySelector(".stepval");
      if (sv) sv.textContent = this._fmtNum(ctl, value);
      clearTimeout(this._stepT);
      this._stepT = setTimeout(() => {
        const v = this._pending[k]; this._pending = {};
        if (m.demo) { this._ui.demoSel = { ...this._ui.demoSel, [k]: v }; this._sig = ""; this._update(true); return; }
        if (ctl.svc) this._call(ctl.svc[0], ctl.svc[1], { entity_id: ctl.entity, [ctl.svcKey]: v });
        else this._call("number", "set_value", { entity_id: ctl.entity, value: v });
      }, 700);
      return;
    }
    if (m.demo) { this._ui.demoSel = { ...this._ui.demoSel, [k]: value }; this._sig = ""; this._update(true); return; }
    if (ctl.svc) this._call(ctl.svc[0], ctl.svc[1], { entity_id: ctl.entity, [ctl.svcKey]: value });
    else if (ctl.domain === "number" || el.dataset.num != null) this._call("number", "set_value", { entity_id: ctl.entity, value });
    else this._call("select", "select_option", { entity_id: ctl.entity, option: value });
  }
  _moreControl(el) {
    const e = this._m.more[+el.dataset.more];
    if (!e) return;
    if (e.domain === "switch") return this._call("switch", e.st.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity });
    if (e.domain === "button") return this._call("button", "press", { entity_id: e.entity });
    if (e.domain === "select") return this._call("select", "select_option", { entity_id: e.entity, option: el.value });
    if (e.domain === "number") {
      const a = e.st.attributes;
      const step = parseFloat(a.step) || 1;
      const v = Math.max(a.min ?? -Infinity, Math.min(a.max ?? Infinity, (parseFloat(e.st.state) || 0) + step * parseInt(el.dataset.step, 10)));
      return this._call("number", "set_value", { entity_id: e.entity, value: v });
    }
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Editor                                                              */
/* ------------------------------------------------------------------ */
class HomeConnectCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { const first = !this._hass; this._hass = hass; if (first) this._render(); else if (this._form) this._form.hass = hass; }
  get lang() { return (this._hass?.language || "de").startsWith("de") ? "de" : "en"; }
  _render() {
    if (!this._hass || !this._config) return;
    const T = I18N[this.lang];
    const groups = discover(this._hass);
    const devOpts = [{ value: "", label: T.none }, ...groups.map((g) => ({ value: g.key, label: `${g.name} (${T[`t_${g.type}`] || g.type}) · ${g.platforms.length} ${this.lang === "de" ? "Quelle(n)" : "source(s)"}` }))];
    const demoOpts = [{ value: "", label: T.none }, ...DEMO_TYPES.map((t) => ({ value: t, label: T[`t_${t}`] }))];
    const schema = [
      { name: "device", selector: { select: { mode: "dropdown", options: devOpts } } },
      { name: "entity", selector: { entity: { domain: ["vacuum", "lawn_mower", "climate"] } } },
      { name: "ha_device", selector: { device: {} } },
      { name: "demo", selector: { select: { mode: "dropdown", options: demoOpts } } },
      { name: "layout", selector: { select: { mode: "dropdown", options: [{ value: "full", label: T.l_full }, { value: "compact", label: T.l_compact }] } } },
      { name: "name", selector: { text: {} } },
      { name: "navigation_path", selector: { text: {} } },
      { name: "color", selector: { color_rgb: {} } },
      { name: "device_type", selector: { select: { mode: "dropdown", options: [{ value: "", label: T.auto }, ...Object.keys(TYPE_META).filter((t) => t !== "generic").map((t) => ({ value: t, label: T[`t_${t}`] || t }))] } } },
      { name: "price_entity", selector: { entity: { domain: "sensor" } } },
      { name: "sub_buttons", selector: { boolean: {} } },
      { name: "cheapest_default", selector: { boolean: {} } },
      { name: "valetudo_topic", selector: { text: {} } },
      { name: "camera_max_age", selector: { number: { min: 1, max: 1440, mode: "box", unit_of_measurement: "min" } } },
      { name: "hide", selector: { select: { multiple: true, mode: "list", options: MODULES.map((m) => ({ value: m, label: T[`m_${m}`] || m })) } } },
      { name: "extra_entities", selector: { entity: { multiple: true } } },
      { name: "entities", type: "expandable", title: T.e_roles, schema: [
        ["camera", "camera"], ["battery", "sensor"], ["error", "sensor"], ["op", "sensor"], ["remaining", "sensor"], ["progress", "sensor"],
        ["selectedProg", "select"], ["power", "switch"], ["light", "light"], ["cavity", "sensor"], ["setpoint", "number"], ["duration", "number"],
        ["startIn", "number"], ["start", "button"], ["pause", "button"], ["stop", "button"], ["waterTank", "sensor"], ["display", ["light", "switch"]],
      ].map(([n, d]) => ({ name: n, selector: { entity: { domain: d } } })) },
    ];
    const roleL = this.lang === "de"
      ? { camera: "Kamera / Karte", battery: "Akku", error: "Fehler", op: "Betriebszustand", remaining: "Restzeit", progress: "Fortschritt", selectedProg: "Programmauswahl", power: "Ein/Aus", light: "Licht", cavity: "Ist-Temperatur", setpoint: "Soll-Temperatur", duration: "Dauer", startIn: "Startverzögerung", start: "Start-Taste", pause: "Pause-Taste", stop: "Stopp-Taste", waterTank: "Wassertank", display: "Display / Anzeige (Klima)" }
      : { camera: "Camera / map", battery: "Battery", error: "Error", op: "Operation state", remaining: "Remaining time", progress: "Progress", selectedProg: "Program select", power: "Power", light: "Light", cavity: "Current temperature", setpoint: "Target temperature", duration: "Duration", startIn: "Start delay", start: "Start button", pause: "Pause button", stop: "Stop button", waterTank: "Water tank", display: "Display (air conditioner)" };
    const labels = { ...roleL, entity: T.e_entity, ha_device: T.e_hadevice, extra_entities: T.e_extra, entities: T.e_roles, device: T.e_device, demo: T.e_demo, layout: T.e_layout, name: T.e_name, navigation_path: T.e_nav, color: T.e_color, hide: T.e_hide, device_type: T.e_type, price_entity: T.e_price, sub_buttons: T.e_subbtn, cheapest_default: T.e_cheapdef, valetudo_topic: T.e_valtopic, camera_max_age: T.e_camage };
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => labels[s.name] || s.name;
      this._form.addEventListener("value-changed", (ev) => {
        const v = { ...ev.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === "" || v[k] == null || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        // Nur eine Quelle gleichzeitig: die zuletzt geänderte gewinnt
        const srcKeys = ["device", "entity", "ha_device", "demo"];
        const changed = srcKeys.find((k) => v[k] && v[k] !== this._config[k]);
        if (changed) srcKeys.forEach((k) => { if (k !== changed) delete v[k]; });
        if (v.entities) { Object.keys(v.entities).forEach((k) => { if (!v.entities[k]) delete v.entities[k]; }); if (!Object.keys(v.entities).length) delete v.entities; }
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = schema;
    this._form.data = { layout: "full", cheapest_default: true, sub_buttons: true, ...this._config };
  }
}

if (!customElements.get("home-connect-card")) customElements.define("home-connect-card", HomeConnectCard);
if (!customElements.get("home-connect-card-editor")) customElements.define("home-connect-card-editor", HomeConnectCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "home-connect-card")) {
  window.customCards.push({
    type: "home-connect-card", name: "Home Connect Card", preview: true,
    description: "Bubble-Card-Stil für Home-Connect-Geräte – kombiniert offizielle, Alt-, Local- und Oven-Private-Integration.",
    documentationURL: "https://github.com/IngoPodolak/home-connect-card-",
  });
}
console.info(`%c HOME-CONNECT-CARD %c ${HC_VERSION} `, "background:#ff8a3d;color:#141414;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px", "background:#26292e;color:#f2f3f5;border-radius:0 4px 4px 0;padding:2px 4px");

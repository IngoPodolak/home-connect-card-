# Eigene Programmbilder mit einem KI-Bildgenerator

> Die Karte bringt bereits ein fertiges Foto-Bildpaket mit (`image_source: photo`, Ordner `dist/images/`). Es wurde mit Google Gemini aus genau diesen Prompts erzeugt. Diese Anleitung brauchst du nur, wenn du eigene Bilder möchtest.

Die Karte kann statt der eingebauten Zeichnungen eigene Bilder zeigen.

**Einrichtung:**
- Im Editor die **Bildquelle** auf „Eigene Bilder aus Ordner“ stellen.
- Beim **Ordner** z. B. `/local/hc-bilder` eintragen. Das entspricht dem Ordner `/config/www/hc-bilder/` in Home Assistant.

Pro Motivgruppe reicht **ein Bild**: Alle Getränke und alle 291 Backofen-Gerichte verteilen sich auf die Dateien unten. Fehlt eine Datei, zeigt die Karte an dieser Stelle die gezeichnete Vorschau.

## Technische Vorgaben

- **Format:** PNG, quadratisch, mindestens 512 × 512 px (1024 × 1024 ist ideal)
- **Hintergrund:** transparent oder reines Schwarz. So passt das Bild in die dunkle Display-Ansicht.
- **Motiv:** mittig, freigestellt, ohne Text, ohne Logo
- **Dateiname:** genau wie in der Tabelle, klein geschrieben, Endung `.png`. Eine andere Endung lässt sich mit `program_image_ext: jpg` einstellen.

## Stil-Zusatz für jeden Prompt

Hänge an jeden Prompt diesen Text an, damit alle Bilder einheitlich aussehen:

> photorealistic food photography, single subject centered, isolated on pure black background, soft studio light from top left, subtle shadow, high detail, square format, no text, no logo, no hands

Für Getränke zusätzlich:

> top-down view directly from above, cup handle pointing to the bottom left

## Getränke (15 Dateien)

| Datei | Gilt für | Prompt |
|---|---|---|
| `espresso.png` | Espresso | a single espresso in a small dark ceramic cup with steel rim, thick golden-orange crema with darker tiger stripes, one roasted coffee bean beside the cup |
| `ristretto.png` | Ristretto | a ristretto in a small dark espresso cup, very little coffee, dense dark crema, a few coffee beans scattered beside |
| `doppio.png` | Espresso doppio | a double espresso in a dark ceramic cup, rich golden crema with fine bubbles, two coffee beans beside |
| `espressomacchiato.png` | Espresso Macchiato, Cortado, Kleiner Brauner, Garoto | espresso macchiato in a small glass cup, crema with a small white dollop of milk foam in the center |
| `caffecrema.png` | Caffè Crema, Kaffee | caffè crema in a black mug, smooth light-brown crema with small bubbles, a coffee biscuit beside |
| `caffexl.png` | Caffè Grande, XL-Kaffee, Americano, Verlängerter | large cup of black coffee in a white cup, swirling dark coffee surface with light crema marbling |
| `cappuccino.png` | Cappuccino | cappuccino in a dark cup, white milk foam with a heart latte art, golden crema ring at the edge |
| `lattemacchiato.png` | Latte Macchiato, Galão | latte macchiato in a tall glass seen from above, thick white milk foam with a caramel-colored espresso spot in the middle |
| `milkcoffee.png` | Milchkaffee, Caffè Latte, Café au Lait, Wiener Melange, Kaapi | milk coffee in a large cup, light brown surface with a white rosette in the center |
| `flatwhite.png` | Flat White | flat white in a small cup, velvety microfoam with tulip latte art |
| `milkfroth.png` | Milchschaum | glass cup filled with fluffy white milk foam, fine bubbles |
| `warmmilk.png` | Warme Milch | glass cup of warm milk, creamy white surface with a few tiny bubbles |
| `hotwater.png` | Heißes Wasser | clear glass cup of hot water with fine bubbles, slight steam |
| `coldbrew.png` | Cold Brew, Eiskaffee | glass cup of cold brew coffee with three ice cubes, amber coffee, condensation |
| `chocolate.png` | Kakao, heiße Schokolade | mug of hot chocolate with a small dollop of whipped cream |

## Backofen-Gerichte (39 Dateien)

| Datei | Gilt für (Beispiele) | Prompt |
|---|---|---|
| `meat.png` | Braten, Rind, Schwein, Lamm, Kalb, Wild, Kaninchen, Steak, Schweinebauch (41 Gerichte) | raw marbled piece of beef with a sprig of rosemary and coarse salt |
| `poultry_whole.png` | ganzes Hähnchen, Ente, Gans, Pute, Poularde (12) | whole golden roasted chicken, crispy skin, on a dark plate |
| `poultry_pieces.png` | Hähnchenbrust, Keulen, Entenbrust, Gänsebrust, Nuggets (13) | crispy roasted duck breast with scored skin and a few basil leaves |
| `ham.png` | Kasseler, Schinken, Weihnachtsschinken, geräuchertes Schwein (4) | glazed roast ham on the bone |
| `meatballs.png` | Hackbraten, Frikadellen (2) | browned meatballs in a small pile |
| `skewers.png` | Grillspieße (1) | two grilled meat and vegetable skewers |
| `stew.png` | Gulasch, Rouladen, Schmorbraten, Ossobuco, Eintopf (7) | cast iron pot of rich goulash stew, seen slightly from above |
| `fish.png` | Fisch, Lachs, Fischfilet, Tintenfisch, Austern (12) | two whole red snappers, fresh, glistening skin |
| `bread.png` | Brot, Weißbrot, Vollkornbrot, Ciabatta, Fladenbrot (16) | rustic sourdough bread loaf with flour dusting and a crackled crust |
| `breadrolls.png` | Brötchen, Baguette, Aufbackbrötchen, Backwaren (11) | crispy golden baguette with diagonal scores |
| `pretzel.png` | Laugengebäck, Brezeln (1) | soft pretzel with coarse salt |
| `puffpastry.png` | Blätterteig, Croissants, Plunder, Windbeutel, Baklava, Pastetchen (6) | golden flaky croissant |
| `stollen.png` | Stollen, Strudel (3) | apple strudel dusted with powdered sugar |
| `cake.png` | Kuchen, Rührkuchen, Biskuit, Hefekuchen, Biskuitrolle (19) | slice of marble cake dusted with powdered sugar |
| `muffins.png` | Muffins, kleine Kuchen (3) | two chocolate chip muffins |
| `fruittart.png` | Obstkuchen, Tartes, Mürbeteig, Käsekuchen, Tortenboden (11) | fruit tart with fresh berries on a shortcrust base |
| `quiche.png` | Quiche, pikanter Kuchen, Tarte (3) | savory quiche with spinach and cheese, one slice cut |
| `pizza.png` | Pizza, Minipizza, Flammkuchen (12) | slices of thin-crust tarte flambée with red onions and rosemary |
| `filledpastry.png` | Börek, Empanadas, Piroggen, Kartoffeltaschen (4) | golden baked empanadas |
| `scones.png` | Scones, Yorkshire Pudding (3) | three fluffy scones |
| `cookies.png` | Plätzchen, Kekse, Makronen, Spritzgebäck, Mondkuchen (4) | assorted butter cookies and macarons |
| `meringue.png` | Baiser, Pavlova (2) | pavlova with whipped cream and fresh berries |
| `souffle.png` | Soufflés in Förmchen (1) | golden risen soufflé in a white ramekin |
| `crumble.png` | Obst-Crumble (1) | fruit crumble in a baking dish with golden crumbs |
| `gratin.png` | Aufläufe, Gratins, Lasagne, Cannelloni (9) | vegetable gratin in a cast iron oval dish with melted cheese and herbs |
| `potatoes.png` | Pell-, Ofen-, Salzkartoffeln (7) | baked potatoes with crispy skin, one cut open |
| `sweetpotatoes.png` | Süßkartoffeln (1) | roasted sweet potato halves |
| `fries.png` | Pommes, Kroketten, Kartoffelspalten (6) | golden french fries in a small pile |
| `hashbrowns.png` | Rösti, Hash Browns (2) | crispy golden hash browns |
| `rice.png` | Reis, Risotto (4) | pile of white basmati rice grains |
| `couscous.png` | Couscous, Hirse (2) | small bowl of fluffy couscous |
| `grains.png` | Graupen, Dinkel, Weizen, Langkornreis (4) | bowl of pearl barley and spelt grains |
| `polenta.png` | Polenta (1) | creamy yellow polenta in a bowl |
| `vegetables.png` | Gemüse, gefüllte Paprika, Spinat, Grillgemüse (7) | fresh broccoli, carrots, green beans and peas arranged loosely |
| `cheese.png` | Ofenkäse, panierter Käse (2) | baked camembert with melted center and herbs |
| `reheat.png` | Regenerieren, Tellergericht, herzhaft/süß backen (4) | plated meal with meat, rice and vegetables |
| `cup.png` | Tasse, kleine Mengen (2) | ceramic mug with steaming soup |
| `popcorn.png` | Popcorn (2) | bowl of fresh popcorn |
| `odourfilter.png` | Geruchsfilter (1) | optional: fresh herbs and a lemon slice, clean and airy |

## Heizarten, Pflege, Spül- und Waschprogramme

Für diese Programme behält die Karte die gezeichneten Symbole, so wie das Gerätedisplay hier auch Symbole zeigt. Wer trotzdem ein eigenes Bild möchte, legt es unter dem Programmnamen ab, z. B. `hotair.png` oder `eco50.png`.

## Einzelne Programme gezielt ersetzen

Einzelne Programme lassen sich unabhängig von den Gruppen festlegen:

```yaml
program_images:
  cappuccino: /local/hc-bilder/mein-cappuccino.png
  Sandras Cappu: /local/hc-bilder/sandra.png
```

# Home Connect Card

Eine Home-Assistant-Dashboard-Karte für **Home-Connect-Geräte** (Bosch, Siemens, Neff, Gaggenau …) im Stil der [Bubble Card](https://github.com/Clooos/Bubble-Card) – gemacht, um in **Bubble-Card-Popups** zu stecken.

> Status: **1.0.0 – erster Release.** An echten Geräten getestet: Backofen, Geschirrspüler, Kaffeevollautomat (Home Connect), Dreame- und Valetudo-Saugroboter, Robonect-Mähroboter, Tuya-Klimaanlagen. Alle übrigen Gerätetypen laufen über dieselbe Logik und sind mit Demo-Daten getestet.

## Was die Karte kann

- **Geräteauswahl im Editor** – die Karte findet alle Home-Connect-Geräte selbst.
- **Mehrere Datenquellen kombiniert**, lokale Daten haben Vorrang:
  1. Home Connect Local (`homeconnect_ws`) – lokal
  2. Home Connect Oven Private (`homeconnect_oven_private`) – Kamera, Hinweise wie „Wenden“
  3. Home Connect Alt (`home_connect_alt`)
  4. Home Connect (offizielle Integration, `home_connect`)

  Die Geräte werden über die Seriennummer einander zugeordnet. Ein Badge zeigt, woher die Daten gerade kommen (LOKAL, CLOUD, LOKAL + CLOUD, OFFLINE).
- **Animierte Statusanzeige** – Ring für den Fortschritt, innen eine Animation je nach Programm, Phase oder Getränk (Heißluft, Ober-/Unterhitze, Grill, Mikrowelle, Dampf, Waschen/Spülen/Schleudern, Sprüharm/Trocknen, Kaffee, Cappuccino, Latte Macchiato …).
- **Programme und Gerichte** mit Reitern (Gerichte, Heizarten, Mikrowelle, Dampf, Pflege, Getränke …) und **Suche**.
- **Erkanntes bzw. vorgeschlagenes Gericht** beim Backofen, sofern das Gerät eins meldet, sowie der Hinweis „Jetzt wenden“ (Oven Private).
- **Kamera** (Backofen, Kühlschrank), wenn eine `camera`-Entität vorhanden ist – mit Bildalter. Ist das Bild älter als 5 Minuten (einstellbar), erscheint statt des Bildes ein Aktualisieren-Knopf.
- **i-DOS** bei Waschmaschinen: Füllstände als Tanks plus Auto-Dosierung.
- **Einstellungen kompakt statt als Liste**: Temperatur, Dauer, Startzeit, Bohnenmenge, Kaffee/Milch, Bohnenmenge (eigenes Symbol je Stufe plus Schieberegler), Füllmenge, Waschtemperatur, Schleudern, Optionen als Schalter, Verbrauchsmaterial (Salz, Klarspüler, Wassertank, Auffangschale, i-DOS …).
- Alles Übrige steht unter **„Weitere Einstellungen“**, ohne doppelte Einträge aus mehreren Quellen.
- **Günstigster Start** für Spülmaschine, Waschmaschine und Trockner: berechnet aus der Strompreis-Prognose und der Programmdauer. Die günstigste Startzeit ist **vorausgewählt** und wird beim Drücken auf „Starten“ gesetzt (abschaltbar mit `cheapest_default: false`, „Sofort“ hebt die Vorauswahl auf).
- **Kompakt-Ansicht** als Bubble-Button für die Übersicht – mit **Schnellwahl-Knöpfen** je Gerät: Klima (Temperatur −/+, Modus, Lüfter, Display), Sauger/Mäher (Start/Pause, Station), Spülmaschine/Waschmaschine/Trockner/Backofen/Kaffee (Start/Pause, Ein/Aus), Backofen/Dunstabzug/Kühlschrank (Licht, Lüfterstufe, Super-Kühlen/-Gefrieren). Abschaltbar mit `sub_buttons: false`.
- **Demo-Modus** für alle Gerätetypen (zum Ausprobieren ohne echtes Gerät).
- Deutsch und Englisch, richtet sich nach der HA-Sprache.

## Installation

### HACS (empfohlen)
1. HACS → ⋮ → **Benutzerdefinierte Repositories**
2. Repository `IngoPodolak/home-connect-card-`, Typ **Dashboard** hinzufügen
3. „Home Connect Card“ herunterladen, Browser neu laden

### Manuell
`dist/home-connect-card.js` nach `/config/www/` kopieren und als Dashboard-Ressource (`/local/home-connect-card.js`, Typ *JavaScript-Modul*) hinzufügen.

## Konfiguration

Die Karte lässt sich komplett im Editor einrichten. YAML-Beispiele:

```yaml
# Vollständige Ansicht (für ein Popup)
type: custom:home-connect-card
device: "384050532704003972"   # wird im Editor ausgewählt

# Kompakt als Bubble-Button, öffnet ein Bubble-Popup
type: custom:home-connect-card
device: "384050532704003972"
layout: compact
navigation_path: "#backofen"

# Demo ohne echtes Gerät
type: custom:home-connect-card
demo: washer   # oven, microwave, dishwasher, washer, dryer, washerdryer, coffee, fridge, freezer, winecooler, hob, hood, warmingdrawer, cookprocessor, cleaningrobot
```

| Option | Beschreibung |
|---|---|
| `device` | Home-Connect-Gerät (Seriennummer oder Geräte-ID) |
| `entity` | Hauptentität eines anderen Geräts (`vacuum.*`, `lawn_mower.*`, `climate.*`) |
| `ha_device` | beliebiges HA-Gerät (Geräte-ID) |
| `extra_entities` | zusätzliche Entitäten |
| `demo` | Demo-Gerätetyp statt echtem Gerät |
| `layout` | `full` (Standard) oder `compact` |
| `name` | eigener Name |
| `navigation_path` | Ziel beim Antippen der Kompakt-Ansicht, z. B. `#backofen` für ein Bubble-Popup |
| `color` | Akzentfarbe (Farbwähler im Editor oder `"#ff8a3d"`), Standard: eigene Farbe je Gerätetyp |
| `device_type` | Gerätetyp erzwingen, falls falsch erkannt |
| `price_entity` | Strompreis-Sensor mit Prognose für „Günstigster Start“ (Tibber, EPEX Spot, Nordpool …) – wird sonst automatisch gesucht, `none` schaltet ab |
| `hide` | Module ausblenden: `camera`, `banner`, `hero`, `programs`, `controls`, `idos`, `options`, `consumables`, `actions`, `more` |
| `favorites` | Namen für Favoriten-Plätze, z. B. `favorite_001: Sandras Cappu` |
| `program_view` | Startansicht der Programme; in der Karte lässt sie sich je Unterkategorie (Reiter) über die drei Symbole oben rechts umschalten und wird im Browser gemerkt. Werte:  `icons` (Standard), `display` (Karussell wie am Gerätedisplay: großes Bild in Draufsicht, Name, Herkunft, Stärke, Menge, Wischen/Pfeile/Punkte) oder `images`: Programme als Vorschaubilder – Getränke im Glas mit Schichten, Backofen-Heizarten wie im Gerätedisplay, Gerichte, Spül-/Waschprogramme mit Temperatur |
| `schedule_calendar` | Kalender für **Planen** (Standard: automatisch `calendar.haushaltsgerate`). Ist ein Gerät aus, bietet die Rückfrage neben „Einschalten“ auch „Planen“: Programm und Einstellungen wählen, Uhrzeit festlegen – die Auswahl wird als Termin im Kalender gespeichert und zum Termin von der Automation „Home Connect Planung ausführen“ ans Gerät gesendet. Termin löschen = Planung gelöscht. `schedule: false` blendet „Planen“ aus. |
| `image_source` | `drawn` (eingebaute Zeichnungen, Standard), `photo` (eingebautes Foto-Bildpaket für Kaffeegetränke und Backofen-Gerichte, KI-generiert mit Google Gemini, wird über den Marketplace mitinstalliert) oder `custom` (eigene Bilder aus `program_image_path`) |
| `program_image_path` | Ordner mit eigenen Bildern – eine Datei pro Motivgruppe (z. B. `/local/hc-bilder/cappuccino.png`, `meat.png`); fehlende Bilder fallen auf die Zeichnung zurück. Dateinamen und fertige KI-Prompts: [docs/bilder-prompts.md](docs/bilder-prompts.md) |
| `program_images` | einzelne eigene Bilder, z. B. `cappuccino: /local/cappu.jpg` |
| `sub_buttons` | Schnellwahl-Knöpfe in der Kompakt-Ansicht (Standard `true`) |
| `cheapest_default` | günstigste Startzeit vorauswählen (Standard `true`) |
| `valetudo_topic` | MQTT-Basis-Topic des Valetudo-Roboters, falls abweichend (Standard `valetudo/<Kennung>`) |
| `camera_max_age` | maximales Alter des Kamerabilds in Minuten (Standard 5) |
| `entities` | einzelne Zuordnungen überschreiben, z. B. `camera: camera.mein_ofen` |

### In einem Bubble-Card-Popup (eigenständiges Format ab Bubble Card 3.2)

```yaml
type: custom:bubble-card
card_type: pop-up
hash: "#backofen"
name: Backofen
icon: mdi:stove
cards:
  - type: custom:home-connect-card
    device: "384050532704003972"
```


## Andere Geräte (nicht Home Connect)

Die Karte funktioniert auch mit Geräten anderer Integrationen. Im Editor:

- **Hauptentität** wählen (Saugroboter `vacuum.*`, Mähroboter `lawn_mower.*`, Klimaanlage `climate.*`) – alle Entitäten desselben Geräts werden automatisch einbezogen, oder
- **beliebiges HA-Gerät** wählen – die Karte ordnet die Entitäten wie bei Home Connect selbst zu.
- Unter **„Entitäten selbst zuordnen“** lässt sich jede Rolle (Kamera/Karte, Akku, Fehler, Restzeit, Start-Taste …) gezielt festlegen; **„Zusätzliche Entitäten“** fügt weitere hinzu.

Automatische Profile:

| Profil | Getestet mit | Inhalt |
|---|---|---|
| Saugroboter | Dreame, Valetudo (MQTT) | Akku-Ring, Fläche/Dauer/Raum, Karte mit **antippbaren Räumen** (Mehrfachauswahl, sofern die Karte Raumkoordinaten liefert – z. B. Dreame, Xiaomi Cloud Map Extractor), Räume als Chips (Dreame, Xiaomi Miio, Roborock, Valetudo), Saugstufe, Wischmodus, Verschleißteile, Start/Pause/Station/Orten |
| Mähroboter | Robonect (Husqvarna) | Akku-Ring, nächster Start, Schnitthöhe, Betriebsarten-Tasten, Zeitpläne/Optionen, Mähen/Pause/Station |
| Klimaanlage | Tuya | Ist/Soll, Modus, Lüfter, Lamellen, Profile, Optionen, Farbe je Modus (Kühlen blau, Heizen orange …), Animation mit schwenkenden Lamellen (vertikal/horizontal) |

Valetudo-Räume kommen aus dem Sensor „Map segments“ und werden per `mqtt.publish` an `valetudo/<Kennung>/MapSegmentationCapability/clean/set` gestartet.

Weitere Marken (Ecovacs, SwitchBot, Roomba, Gardena, Bosch Indego, Worx Landroid, Mammotion, Daikin, Midea, Sensibo …) laufen über dieselben Profile, sofern ihre Integration die üblichen HA-Entitäten anbietet.

## Bekannte Grenzen

- Gerichtenamen werden aus den englischen Programmschlüsseln übersetzt – nicht jeder Name ist perfekt.
- Favoriten haben in den Integrationen keine Namen. Die Karte merkt sich Namen, sobald Home Connect Alt sie meldet, oder sie werden über `favorites` vergeben.
- Waschmaschine, Trockner, Kühlschrank und Dunstabzug sind bisher nur mit Demo-Daten getestet.
- Raumauswahl auf der Karte braucht eine Karten-Kamera mit Raumkoordinaten (z. B. Dreame). Valetudo-Räume erscheinen als Chips, sobald der Roboter Segmente meldet.
- Ecovacs, SwitchBot, Roomba, Gardena, Indego, Worx usw. laufen über die allgemeinen Profile und sind nicht an echten Geräten getestet.

---

## English (short)

A Bubble-Card-style dashboard card for Home Connect appliances, made for Bubble Card pop-ups.

- Combines Home Connect Local, Oven Private, Home Connect Alt and the official integration. Local data wins.
- Pick the appliance in the visual editor.
- Animated status ring, program and dish search, camera, compact settings, and a demo mode for every appliance type.

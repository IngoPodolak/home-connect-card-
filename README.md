# Home Connect Card

Eine Home-Assistant-Dashboard-Karte für **Home-Connect-Geräte** (Bosch, Siemens, Neff, Gaggenau …) im Stil der [Bubble Card](https://github.com/Clooos/Bubble-Card) – gemacht, um in **Bubble-Card-Popups** zu stecken.

> Status: **erste Testversion (0.1.0)**. Funktioniert, ist aber noch nicht mit allen Gerätetypen an echter Hardware getestet.

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
- **Kamera** (Backofen, Kühlschrank), wenn eine `camera`-Entität vorhanden ist.
- **Einstellungen kompakt statt als Liste**: Temperatur, Dauer, Startzeit, Bohnenmenge, Kaffee/Milch, Füllmenge, Waschtemperatur, Schleudern, Optionen als Schalter, Verbrauchsmaterial (Salz, Klarspüler, Wassertank, Auffangschale, i-DOS …).
- Alles Übrige steht unter **„Weitere Einstellungen“**, ohne doppelte Einträge aus mehreren Quellen.
- **Kompakt-Ansicht** als Bubble-Button für die Übersicht.
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
demo: washer   # oven, dishwasher, washer, dryer, washerdryer, coffee, fridge, freezer, hob, hood, warmingdrawer
```

| Option | Beschreibung |
|---|---|
| `device` | Gerät (Seriennummer oder Geräte-ID) |
| `demo` | Demo-Gerätetyp statt echtem Gerät |
| `layout` | `full` (Standard) oder `compact` |
| `name` | eigener Name |
| `navigation_path` | Ziel beim Antippen der Kompakt-Ansicht, z. B. `#backofen` für ein Bubble-Popup |
| `color` | Akzentfarbe, z. B. `"#ff8a3d"` |
| `hide` | Module ausblenden: `camera`, `banner`, `hero`, `programs`, `controls`, `options`, `consumables`, `actions`, `more` |
| `favorites` | Namen für Favoriten-Plätze, z. B. `favorite_001: Sandras Cappu` |
| `entities` | einzelne Zuordnungen überschreiben, z. B. `camera: camera.mein_ofen` |

### In einem Bubble-Card-Popup

```yaml
type: vertical-stack
cards:
  - type: custom:bubble-card
    card_type: pop-up
    hash: "#backofen"
    name: Backofen
    icon: mdi:stove
  - type: custom:home-connect-card
    device: "384050532704003972"
```

## Bekannte Grenzen (0.1.0)

- Gerichtenamen werden aus den englischen Programmschlüsseln übersetzt – nicht jeder Name ist perfekt.
- Favoriten haben in den Integrationen keine Namen. Die Karte merkt sich Namen, sobald Home Connect Alt sie meldet, oder sie werden über `favorites` vergeben.
- Waschmaschine, Trockner, Kühlschrank und Dunstabzug sind bisher nur mit Demo-Daten getestet.

---

## English (short)

A Bubble-Card-style dashboard card for Home Connect appliances, made for Bubble Card pop-ups.

- Combines Home Connect Local, Oven Private, Home Connect Alt and the official integration. Local data wins.
- Pick the appliance in the visual editor.
- Animated status ring, program and dish search, camera, compact settings, and a demo mode for every appliance type.

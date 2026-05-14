---
name: feedback-bitsui-maximum-usage
description: bits-ui komponensek maximális kihasználása — minden elérhető primitívet kötelező használni
metadata:
  type: feedback
---

Minden BITSUI- todo-ban kiemelten fontos fókusz: **mindent felhasználni bits-ui-ból amit csak lehet.** Ha egy primitív elérhető bits-ui-ban, kötelező azt használni — saját implementáció csak ott megengedett, ahol bits-ui nem nyújt megfelelő primitívet.

**Why:** A projekt célja pontosan az, hogy a nehéz interakciós problémákat (a11y, keyboard nav, focus management, ARIA) bits-ui-ra delegálja. Ha saját implementációt írunk ahol bits-ui primitív létezik, elvész az újraírás értelme.

**How to apply:** Minden komponens implementálása előtt ellenőrizni a bits-ui dokumentációt / package exportokat, hogy mi érhető el. Kételkedés esetén a bits-ui-s megoldást kell preferálni, nem a sajátot.

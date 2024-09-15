# PIO_Editor_Meta
[Englische version](./README_EN.md)
## Einführung

Das Meta-Repository enthält die Klassendefinition eines SubTree (siehe Abbildung unten).


![subtree-diagram.svg](subtree-diagram.svg)

Ein SubTree hat eine rekursive Struktur (Eigenschaft: children) und repräsentiert einen Teilbereich der XML-Baumstruktur eines PIO. 
Jedes Element kann einen Wert enthalten (Eigenschaft: data).

Diese Werte sind analog zu FHIR als „primitive Datentypen“ (z.B. string, code, integer, UUID) implementiert. 
Das Meta-Repository stellt eine separate Klasse für jeden dieser Datentypen bereit.

Zusätzlich wird die Position im XML-Dokument, an der die Daten platziert werden sollen, in jedem SubTree gespeichert (Eigenschaft: absolutePath). 
SubTrees haben auch Methoden zur Datenmanipulation, sodass die Formulare im Frontend die Benutzereingaben im gespeicherten SubTree speichern können.

Das Meta-Repository stellt außerdem Schnittstellen bereit, die eine vollständige FHIR-Ressource darstellen (z.B. repräsentiert IAllergyObject eine Allergieressource). 
Diese werden für Akkordeonmenüs und den Redux Store im Frontend sowie für das Adressbuch im Backend benötigt.

-----------------------------------------------------------------
## Anforderungen
Um das Frontend schnell zu starten, muss der Benutzer alle Abhängigkeiten installieren, die in der package.json aufgeführt sind. 
Öffnen Sie das Terminal und installieren Sie alle Abhängigkeiten mit:
```
npm install
```



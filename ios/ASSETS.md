# Zasoby natywne iOS

| Plik | Źródło/narzędzie | Licencja | Uwagi |
|---|---|---|---|
| `App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png` | `public/assets/brand/icon-1024.png`, kopiowanie i generator `@capacitor/assets@3.0.5` | Własne | Docelowa ikona 1024×1024 |
| `App/App/Assets.xcassets/Splash.imageset/splash.png` | `public/assets/brand/splash-2732.png`, kopiowanie i generator `@capacitor/assets@3.0.5` | Własne | Splash 2732×2732 |
| `App/App/Base.lproj/LaunchScreen.storyboard` | Szablon Capacitor 8.5.3 + modyfikacja | MIT + własne zmiany | Natywny start z obrazem Splash |
| `App/App/PrivacyInfo.xcprivacy` | Autorska deklaracja na podstawie dokumentacji prywatności i Apple | Własne | UserDefaults CA92.1, brak śledzenia |

Pełny opis pochodzenia marki i licencji: `public/assets/brand/ASSETS.md`. Pliki iOS pochodzą ze szablonu Capacitor 8.5.3 (MIT). Generator przy `npm run ios:assets` może ponownie zapisać ikonę, splash i storyboard; zweryfikować po wygenerowaniu. Nie edytować `CapApp-SPM/Package.swift`, ponieważ zarządza nim CLI Capacitor.

# Capacitor 8 dostarcza reguły consumer ProGuard we własnej bibliotece.
# Dodatkowa bezpieczna reguła dla pluginów używanych przez refleksję
# chroni mostek JavaScript -> natywne metody podczas minifikacji R8.
# https://capacitorjs.com/docs/android/troubleshooting#using-proguard
-keep public class * extends com.getcapacitor.Plugin { *; }

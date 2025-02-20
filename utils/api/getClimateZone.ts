export function getClimateZone(latitude: number, longitude: number) {
    // Strefa 5: Obszary górskie (Karpaty i Sudety)
    // Karpaty (49.0°N - 49.7°N, 19.0°E - 22.0°E)
    if (latitude >= 49.0 && latitude < 50.0 && longitude >= 19.0 && longitude <= 22.0) {
        return 5;
    }
    // Sudety (50.0°N - 50.9°N, 15.0°E - 17.0°E)
    if (latitude >= 50.0 && latitude < 51.0 && longitude >= 15.0 && longitude <= 17.0) {
        return 5;
    }

    // Strefa 1: Wybrzeże Bałtyku
    if (latitude >= 54.0 || (latitude >= 53.5 && longitude >= 14.0 && longitude <= 18.5)) {
        return 1;
    }

    // Strefa 2: Niziny Zachodnie (szerzej: zachód od 18°E i szer. geogr. 51.0°N+)
    if (latitude >= 51.0 && longitude < 18.0) {
        return 2;
    }

    // Strefa 3: Polska Centralna (na wschód od 18°E)
    if (longitude >= 18.0) {
        return 3;
    }

    // Strefa 4: Wschód i Pogórze (południowy wschód, ale nie góry)
    if (latitude >= 49.5) {
        return 4;
    }

    return 5; // Domyślnie: strefa górska
}
  
  interface ProductResult {
    name: string;
    biwa: number;
  }
  
  /**
   * Funkcja obliczająca zapotrzebowanie cieplne przy różnych temperaturach zewnętrznych
   * @param proj_temp_outside - projektowa temperatura zewnętrzna [°C]
   * @param needed_kw - zapotrzebowanie cieplne przy projektowej temperaturze [kW]
   * @param temp_inside - temperatura wewnętrzna [°C]
   * @param outside_temp - temperatura zewnętrzna, dla której obliczamy zapotrzebowanie [°C]
   * @returns zapotrzebowanie cieplne [kW] przy danej temperaturze zewnętrznej
   */
  function calculateHeatDemand(
    proj_temp_outside: number,
    needed_kw: number,
    temp_inside: number,
    outside_temp: number
  ): number {
    return needed_kw * (temp_inside - outside_temp) / (temp_inside - proj_temp_outside);
  }
  
  /**
   * Funkcja zwracająca klucz dostępu do danych pompy ciepła przy określonej temperaturze zasilania i zewnętrznej
   * @param supply_temp - temperatura zasilania [°C] (25, 30, 35, 40, 45, 50)
   * @param outside_temp - temperatura zewnętrzna [°C]
   * @returns klucz do obiektu product
   */
  function getProductKey(supply_temp: number, outside_temp: number): string {
    // Zaokrąglenie temperatury zasilania do najbliższej wartości w specyfikacji
    const valid_supply_temps = [25, 30, 35, 40, 45, 50];
    const closest_supply_temp = valid_supply_temps.reduce((prev, curr) => 
      Math.abs(curr - supply_temp) < Math.abs(prev - supply_temp) ? curr : prev
    );
    
    // Zaokrąglenie temperatury zewnętrznej do wartości w specyfikacji
    const valid_outside_temps = [-20, -15, -10, -7, -2, 2, 7, 10];
    const closest_outside_temp = valid_outside_temps.reduce((prev, curr) => 
      Math.abs(curr - outside_temp) < Math.abs(prev - outside_temp) ? curr : prev
    );
    
    return `p${closest_supply_temp}_${closest_outside_temp < 0 ? 'minus' : 'plus'}${Math.abs(closest_outside_temp)}`;
  }
  
  /**
   * Funkcja znajduje punkt biwalentny poprzez interpolację liniową
   * @param product - dane produktu (pompy ciepła)
   * @param max_install_temp - maksymalna temperatura instalacji [°C]
   * @param proj_temp_outside - projektowa temperatura zewnętrzna [°C]
   * @param needed_kw - zapotrzebowanie cieplne przy temperaturze projektowej [kW]
   * @param temp_inside - temperatura wewnętrzna [°C]
   * @returns przybliżona temperatura punktu biwalentnego [°C]
   */
  function findBivalentPoint(
    product: any,
    max_install_temp: number,
    proj_temp_outside: number,
    needed_kw: number,
    temp_inside: number
  ): number {
    // Temperatury zewnętrzne do analizy
    const outside_temps = [-20, -15, -10, -7, -2, 2, 7, 10];
    
    // Przygotowanie danych do interpolacji
    let points: { temp: number; demand: number; power: number }[] = [];
    
    for (const temp of outside_temps) {
      if (temp < proj_temp_outside - 5) continue; // Pomijamy temperatury znacznie niższe od projektowej
      
      const demand = calculateHeatDemand(proj_temp_outside, needed_kw, temp_inside, temp);
      const key = getProductKey(max_install_temp, temp);
      const power = product[key] ? parseFloat(product[key] as string) : null;
      
      if (power !== null) {
        points.push({ temp, demand, power });
      }
    }
    
    // Sortujemy punkty według temperatury
    points.sort((a, b) => a.temp - b.temp);
    
    // Szukamy przecięcia krzywych (gdzie różnica między mocą a zapotrzebowaniem zmienia znak)
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      const currentDiff = current.power - current.demand;
      const nextDiff = next.power - next.demand;
      
      // Sprawdzamy czy jest przecięcie (zmiana znaku różnicy)
      if ((currentDiff >= 0 && nextDiff <= 0) || (currentDiff <= 0 && nextDiff >= 0)) {
        // Interpolacja liniowa dla znalezienia dokładnego punktu przecięcia
        // Rozwiązujemy równanie: power = demand dla temperatury między current.temp i next.temp
        
        const powerSlope = (next.power - current.power) / (next.temp - current.temp);
        const demandSlope = (next.demand - current.demand) / (next.temp - current.temp);
        
        // Jeśli nachylenia są takie same, zwracamy średnią temperaturę
        if (Math.abs(powerSlope - demandSlope) < 0.0001) {
          return (current.temp + next.temp) / 2;
        }
        
        // powerSlope * (x - current.temp) + current.power = demandSlope * (x - current.temp) + current.demand
        // (powerSlope - demandSlope) * (x - current.temp) = current.demand - current.power
        const bivalentTemp = current.temp + (current.demand - current.power) / (powerSlope - demandSlope);
        
        return parseFloat(bivalentTemp.toFixed(3)); // Zaokrąglenie do 1 miejsca po przecinku
      }
    }
    
    // Jeśli nie znaleziono punktu przecięcia, sprawdzamy czy pompa jest zbyt słaba czy zbyt mocna
    if (points.length > 0) {
      const lowestTemp = points[0];
      // Jeśli moc pompy przy najniższej temperaturze jest wyższa od zapotrzebowania,
      // to pompa jest przewymiarowana i punkt biwalentny jest poniżej analizowanego zakresu
      if (lowestTemp.power > lowestTemp.demand) {
        return proj_temp_outside - 5; // Przybliżony punkt biwalentny poniżej zakresu
      } else {
        // Pompa jest zbyt słaba - punkt biwalentny znacznie powyżej analizowanego zakresu
        return 0; // Przybliżony punkt biwalentny powyżej zakresu
      }
    }
    
    return NaN; // Brak wystarczających danych
  }
  
  /**
   * Główna funkcja wybierająca odpowiednie pompy ciepła
   * @param products - tablica produktów (pomp ciepła)
   * @param proj_temp_outside - projektowa temperatura zewnętrzna [°C]
   * @param needed_kw - zapotrzebowanie cieplne przy temperaturze projektowej [kW]
   * @param temp_inside - temperatura wewnętrzna [°C]
   * @param max_install_temp - maksymalna temperatura instalacji [°C]
   * @returns tablica produktów z obliczonym odchyleniem od idealnego punktu biwalentnego
   */
  export const selectHeatPumps = (
    {products,
    proj_temp_outside,
    needed_kw,
    temp_inside,
    max_install_temp
  }: {
    products: any[],
    proj_temp_outside: number,
    needed_kw: number,
    temp_inside: number,
    max_install_temp: number
  }): ProductResult[] =>  {
    // Dla 3 strefy klimatycznej idealny punkt biwalentny to -10 stopni C
    const idealBivalent = proj_temp_outside/2;
    const results: any = [];
    
    for (const product of products) {
      const bivalentPoint = findBivalentPoint(
        product,
        max_install_temp,
        proj_temp_outside,
        needed_kw,
        temp_inside
      );
      
      if (!isNaN(bivalentPoint)) {
        // Obliczenie odchylenia od idealnego punktu biwalentnego
        const deviation = bivalentPoint - idealBivalent;
        
        results.push({
          product: product,
          name: product.desc,
          ideal: idealBivalent,
          currentBivalent: bivalentPoint,
          differenceBivalent: Math.abs(parseFloat(deviation.toFixed(3))) // Odchylenie w stopniach C zaokrąglone do 1 miejsca po przecinku
        });
      }
    }
    
    // Sortujemy wyniki według wartości bezwzględnej odchylenia (od najmniejszego)
    results.sort((a: any, b: any) => Math.abs(a.differenceBivalent) - Math.abs(b.differenceBivalent));
    
    let monobloks = results.filter((r: any) => r.product.type == 'Monoblok')
    let splits = results.filter((r: any) => r.product.type == 'Split')
    let allinones = results.filter((r: any) => r.product.type == 'All-In-One')

    console.log(results)
    return [monobloks[0], splits[0], allinones[0]];
  }
  
  // Przykład użycia:
  // const selectedPumps = selectHeatPumps(products, -20, 8.5, 20, 35);
  // console.log(selectedPumps);
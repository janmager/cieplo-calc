type Point = { x: number; y: number };

type Line = Point[];

export function getPunktBiwalentny(line1: Point[], line2: Point[]): Point | null {
  // Sprawdzenie, czy każda linia ma co najmniej dwa punkty
  if (line1.length < 2 || line2.length < 2) {
      return null;
  }

  // Pobranie pierwszych dwóch punktów z każdej linii
  const p1 = line1[0];
  const p2 = line1[1];
  const p3 = line2[0];
  const p4 = line2[1];

  // Obliczenie współczynników równania prostej dla linii 1: A1*x + B1*y + C1 = 0
  const A1 = p2.y - p1.y;
  const B1 = p1.x - p2.x;
  const C1 = p2.x * p1.y - p1.x * p2.y;

  // Obliczenie współczynników równania prostej dla linii 2: A2*x + B2*y + C2 = 0
  const A2 = p4.y - p3.y;
  const B2 = p3.x - p4.x;
  const C2 = p4.x * p3.y - p3.x * p4.y;

  // Obliczenie wyznacznika głównego
  const determinant = A1 * B2 - A2 * B1;

  // Jeśli wyznacznik jest zerowy, proste są równoległe
  if (determinant === 0) {
      return null;
  }

  // Obliczenie współrzędnych punktu przecięcia
  const x = (B1 * C2 - B2 * C1) / determinant;
  const y = (A2 * C1 - A1 * C2) / determinant;

  return { x, y };
}
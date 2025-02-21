interface Point {
  x: number;
  y: number;
}

// Funkcja sprawdzająca przecięcie dwóch odcinków
function getIntersectionPoint(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
  const denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  
  // Jeśli denominator = 0, linie są równoległe
  if (denominator === 0) return null;

  const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
  const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;

  // Sprawdzamy, czy przecięcie jest w granicach obu odcinków
  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      const x = p1.x + ua * (p2.x - p1.x);
      const y = p1.y + ua * (p2.y - p1.y);
      return { x, y };
  }
  return null;
}

// Główna funkcja znajdująca punkt przecięcia dwóch tablic punktów
export function getPunktBiwalentny(points1: Point[], points2: Point[]): Point | null {
  // Sprawdzamy każdy odcinek z points1 z każdym odcinkiem z points2
  for (let i = 0; i < points1.length - 1; i++) {
      for (let j = 0; j < points2.length - 1; j++) {
          const intersection = getIntersectionPoint(
              points1[i],
              points1[i + 1],
              points2[j],
              points2[j + 1]
          );
          if (intersection) return intersection;
      }
  }
  return null; // Brak przecięcia
}
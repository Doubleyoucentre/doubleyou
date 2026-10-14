/**
 * Reused from Oluwaferanmi's Hall of Fame impact-map implementation.
 * Simplified Africa outline + projection helpers.
 * Coordinates are [lon, lat]. Both the outline and the country markers go
 * through the same `project()` so dots always line up with the shape.
 * The outline is intentionally low-detail; swap AFRICA_PATH for a real
 * SVG/GeoJSON asset later without touching ImpactMap.
 */
export type LonLat = readonly [lon: number, lat: number];

const SCALE = 6;
const LON_MIN = -18;
const LAT_MAX = 37.5;

export const MAP_WIDTH = 420;
export const MAP_HEIGHT = 438;

export function project([lon, lat]: LonLat): { x: number; y: number } {
  return { x: (lon - LON_MIN) * SCALE, y: (LAT_MAX - lat) * SCALE };
}

const MAINLAND: LonLat[] = [
  [-5.9, 35.8], [-2, 35.1], [3, 36.8], [10, 37.2], [11, 35], [10.1, 34],
  [11.5, 33], [15, 32.3], [19, 30.3], [20.5, 32.3], [23, 32.7], [25, 31.6],
  [29, 30.9], [32, 31.3], [34.2, 31.3], [32.5, 29.9], [33.8, 27.5],
  [35.5, 24], [37.2, 21], [38.5, 18], [39.5, 15.5], [42.7, 13], [43.3, 11.7],
  [44.5, 10.4], [48, 11.2], [51.2, 11.8], [51, 10.5], [50.2, 8], [48.5, 5],
  [46, 2], [44, 0.5], [41.5, -1.7], [40, -3], [39.2, -5], [39.5, -8],
  [40.5, -10.5], [40.6, -14.5], [40.5, -16.5], [37, -18], [35, -20],
  [35.5, -24], [33, -25.5], [32.9, -26.5], [32.8, -28.5], [30.5, -31],
  [27.5, -33.3], [25.5, -34], [22, -34.2], [20, -34.8], [18.4, -34.2],
  [18, -32], [16.5, -28.6], [15, -26.5], [14.5, -22.5], [12, -18],
  [11.8, -16], [13.5, -12], [13.2, -9], [12.3, -6], [12, -5], [9.5, -1],
  [9.3, 1], [9.7, 3.9], [8.5, 4.5], [6, 4.3], [4.5, 6.3], [1.5, 6],
  [-2, 4.8], [-4.5, 5.2], [-7.5, 4.4], [-10.5, 6.2], [-13.2, 8.5],
  [-15, 10.8], [-16.7, 12.3], [-17.5, 14.7], [-16.5, 16.5], [-16.2, 19.5],
  [-16.8, 21.5], [-14.5, 26], [-12.5, 28], [-10, 29.7], [-9.7, 31.5],
  [-8.5, 33.3], [-6.5, 34.3],
];

const MADAGASCAR: LonLat[] = [
  [49.3, -12], [50.4, -15.5], [49.5, -17], [48, -21], [47, -25], [45, -25.3],
  [43.7, -23], [44.3, -19.5], [44.2, -16.5], [47, -15],
];

function toPath(points: LonLat[]): string {
  return (
    points
      .map((p, i) => {
        const { x, y } = project(p);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

export const AFRICA_PATH = `${toPath(MAINLAND)} ${toPath(MADAGASCAR)}`;

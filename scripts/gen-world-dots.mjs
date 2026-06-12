/**
 * gen-world-dots.mjs — generate the dot-matrix world map coordinates.
 *
 * Reads public-domain Natural Earth land polygons and samples a pixel grid: for
 * each grid point it projects to lon/lat (equirectangular) and keeps the point
 * if it falls on land. The result is a compact JSON of [x, y] dots that the
 * WorldMap component renders as <circle>s.
 *
 * Run once (and re-run only if you change the grid): `npm run gen:worldmap`.
 * Output is committed, so the site has NO runtime/map dependency.
 *
 * No external packages — point-in-polygon is hand-rolled (ray casting).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Output geometry (equirectangular 2:1). Markers must use the same maths. ---
const WIDTH = 800;
const HEIGHT = 400;
const STEP = 6; // px between grid dots — smaller = denser map

const land = JSON.parse(
  readFileSync(join(__dirname, 'data', 'ne_110m_land.json'), 'utf8'),
);

/** Pixel -> geographic coordinate (equirectangular). */
const pxToLon = (px) => (px / WIDTH) * 360 - 180;
const pxToLat = (py) => 90 - (py / HEIGHT) * 180;

/** Ray-casting test: is [lon,lat] inside a single ring of [lon,lat] points? */
function inRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Inside a polygon = inside its outer ring and not inside any hole ring. */
function inPolygon(lon, lat, polygon) {
  if (!inRing(lon, lat, polygon[0])) return false;
  for (let h = 1; h < polygon.length; h++) {
    if (inRing(lon, lat, polygon[h])) return false; // in a hole
  }
  return true;
}

// Pre-compute a bounding box per polygon so we can skip cheaply.
const polygons = [];
for (const feature of land.features) {
  const { type, coordinates } = feature.geometry;
  const polys = type === 'MultiPolygon' ? coordinates : [coordinates];
  for (const poly of polys) {
    let minLon = 180,
      minLat = 90,
      maxLon = -180,
      maxLat = -90;
    for (const [lon, lat] of poly[0]) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    polygons.push({ poly, minLon, minLat, maxLon, maxLat });
  }
}

const dots = [];
for (let py = 0; py <= HEIGHT; py += STEP) {
  const lat = pxToLat(py);
  for (let px = 0; px <= WIDTH; px += STEP) {
    const lon = pxToLon(px);
    for (const p of polygons) {
      if (
        lon < p.minLon ||
        lon > p.maxLon ||
        lat < p.minLat ||
        lat > p.maxLat
      ) {
        continue; // outside bbox
      }
      if (inPolygon(lon, lat, p.poly)) {
        dots.push([px, py]);
        break;
      }
    }
  }
}

const out = { width: WIDTH, height: HEIGHT, step: STEP, dots };
writeFileSync(
  join(__dirname, '..', 'src', 'data', 'world-dots.json'),
  JSON.stringify(out),
);
console.log(`Generated ${dots.length} land dots -> src/data/world-dots.json`);

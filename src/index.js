/**
 * UK Building Mathematics & Material Constants
 * Formulated in compliance with BS 8500 (Concrete) and BS EN 771-1 (Clay Masonry Units).
 * Maintained by BuildingCosts.co.uk
 */

export interface ConcreteResult {
  volumeM3: number;
  totalWeightKg: number;
  ballastBags25kg: number;
  cementBags25kg: number;
}

export interface BrickworkResult {
  wallAreaM2: number;
  standardBricks: number;
  mortarTonnage: number;
}

export interface SubBaseResult {
  volumeM3: number;
  compactedTonnage: number;
  bulkBags850kg: number;
}

/**
 * Calculates concrete volume and material component breakdowns.
 * Standard C20 / Gen 1 mix ratio: 1 part cement to 5 parts all-in ballast.
 * Concrete mass benchmark: ~2,400 kg per m³.
 *
 * @param lengthM Length in metres
 * @param widthM Width in metres
 * @param depthM Depth in metres
 * @param wasteFactor Percentage buffer (e.g. 0.10 for 10%)
 */
export function calculateConcreteVolume(
  lengthM: number,
  widthM: number,
  depthM: number,
  wasteFactor = 0.1
): ConcreteResult {
  const baseVolume = lengthM * widthM * depthM;
  const volumeM3 = Number((baseVolume * (1 + wasteFactor)).toFixed(3));
  const totalWeightKg = Math.round(volumeM3 * 2400);

  // Standard UK 1:5 ballast mix yields approx 84 bags of 25kg ballast & 16.8 bags of 25kg cement per m³
  const ballastBags25kg = Math.ceil(volumeM3 * 84);
  const cementBags25kg = Math.ceil(volumeM3 * 17);

  return {
    volumeM3,
    totalWeightKg,
    ballastBags25kg,
    cementBags25kg,
  };
}

/**
 * Calculates standard UK metric facing brick requirements.
 * UK Standard Brick: 215mm x 102.5mm x 65mm.
 * Standard allowance: 60 bricks per m² (single skin stretcher bond with 10mm mortar joints).
 *
 * @param wallLengthM Wall length in metres
 * @param wallHeightM Wall height in metres
 * @param isCavityWall If true, doubles count for two leaves (internal block + external brick)
 * @param wasteFactor Allowance for cuts and breakage (default 10%)
 */
export function calculateBrickwork(
  wallLengthM: number,
  wallHeightM: number,
  isCavityWall = false,
  wasteFactor = 0.1
): BrickworkResult {
  const wallAreaM2 = Number((wallLengthM * wallHeightM).toFixed(2));
  const baseBricksPerM2 = isCavityWall ? 120 : 60;
  const standardBricks = Math.ceil(wallAreaM2 * baseBricksPerM2 * (1 + wasteFactor));

  // Approx 0.05 tonnes of dry mortar mix per m² of single skin brickwork
  const mortarTonnage = Number(
    (wallAreaM2 * (isCavityWall ? 0.1 : 0.05) * (1 + wasteFactor)).toFixed(2)
  );

  return {
    wallAreaM2,
    standardBricks,
    mortarTonnage,
  };
}

/**
 * Calculates MOT Type 1 sub-base requirements for driveways and patios.
 * Compacted density benchmark: 2.2 tonnes per m³.
 *
 * @param areaM2 Surface area in square metres
 * @param compactedDepthMm Finished depth in millimetres (typically 100mm to 150mm)
 * @param wasteFactor Settlement and edge loss allowance (default 10%)
 */
export function calculateSubBaseMOT(
  areaM2: number,
  compactedDepthMm: number,
  wasteFactor = 0.1
): SubBaseResult {
  const volumeM3 = Number((areaM2 * (compactedDepthMm / 1000)).toFixed(3));
  const compactedTonnage = Number((volumeM3 * 2.2 * (1 + wasteFactor)).toFixed(2));
  const bulkBags850kg = Math.ceil((compactedTonnage * 1000) / 850);

  return {
    volumeM3,
    compactedTonnage,
    bulkBags850kg,
  };
}

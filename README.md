# UK Building Mathematics (`@buildingcosts/uk-building-math`)

> Lightweight mathematical constants and calculation models calibrated for United Kingdom construction benchmarks, British Standards (**BS 8500**, **BS EN 771-1**), and standard metric building practices.

Maintained by the engineering team at [BuildingCosts.co.uk](https://buildingcosts.co.uk) — the open-access UK construction cost estimation platform.

---

## 📌 Features

- **No Proprietary Data Exposed:** Standard civil engineering formulas without proprietary price indices or business logic.
- **British Standards Compliant:**
  - Standard UK metric brick dimensions ($215 \times 102.5 \times 65\text{ mm}$ with $10\text{ mm}$ mortar joints $\to 60\text{ bricks}/m^2$).
  - Concrete mass constant of $2,400\text{ kg}/m^3$ for structural C20/Gen 1 mixes under BS 8500.
  - Sub-base MOT Type 1 aggregate compaction density calibrated at $2.2\text{ tonnes}/m^3$.
- **Zero Dependencies:** Pure, native JavaScript / TypeScript compatible with any runtime.

---

## 🛠️ Usage

### 1. Concrete Slab & Bag Estimator
Calculates net volume ($m^3$), total mass, and required $25\text{ kg}$ ballast and cement bags for a standard $1:5$ on-site mix.

```javascript
import { calculateConcreteVolume } from './src/index.js';

// Calculate for a 4m x 3m patio base at 100mm (0.1m) depth with 10% waste
const result = calculateConcreteVolume(4.0, 3.0, 0.1, 0.10);
console.log(result);
// {
//   volumeM3: 1.32,
//   totalWeightKg: 3168,
//   ballastBags25kg: 111,
//   cementBags25kg: 23
// }
```

### 2. Brickwork & Mortar Estimator
Calculates standard UK facing bricks and dry mortar tonnage for single-skin or cavity walls.

```javascript
import { calculateBrickwork } from './src/index.js';

// Calculate for a 6m long by 1.8m high single-skin garden wall with 10% cutting waste
const wall = calculateBrickwork(6.0, 1.8, false, 0.10);
console.log(wall);
// {
//   wallAreaM2: 10.8,
//   standardBricks: 713,
//   mortarTonnage: 0.59
// }
```

### 3. MOT Type 1 Sub-Base Compaction
Estimates compacted sub-base tonnage and standard $850\text{ kg}$ bulk bag requirements for driveways, shed bases, and patios.

```javascript
import { calculateSubBaseMOT } from './src/index.js';

// Calculate sub-base for a 30m² driveway with 150mm sub-base depth
const subbase = calculateSubBaseMOT(30, 150, 0.10);
console.log(subbase);
// {
//   volumeM3: 4.5,
//   compactedTonnage: 10.89,
//   bulkBags850kg: 13
// }
```

---

## 🔗 Live Interactive Tools

For real-time 2026 UK material costs, regional price adjustments (London / South East vs North), and interactive web tools, visit:

- 🧱 [UK Brick Calculator](https://buildingcosts.co.uk/brick-calculator/)
- 🏗️ [UK Concrete Volume & Bag Calculator](https://buildingcosts.co.uk/concrete-calculator/)
- 🚗 [Driveway & Sub-Base Calculator](https://buildingcosts.co.uk/driveway-cost-calculator/)
- 🏡 [UK House Rebuild Cost Calculator](https://buildingcosts.co.uk/house-rebuild-cost-calculator/)

---

## 📜 License

MIT License. Free to use for personal and commercial projects.

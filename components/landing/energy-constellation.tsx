"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: 110, y: 112, color: "violet", r: 3 },
  { x: 174, y: 74, color: "teal", r: 3 },
  { x: 238, y: 102, color: "amber", r: 2.5 },
  { x: 304, y: 66, color: "violet", r: 3.5 },
  { x: 385, y: 101, color: "teal", r: 3 },
  { x: 474, y: 85, color: "violet", r: 2.5 },
  { x: 90, y: 213, color: "teal", r: 2.5 },
  { x: 171, y: 202, color: "violet", r: 3 },
  { x: 224, y: 248, color: "teal", r: 3.5 },
  { x: 363, y: 204, color: "amber", r: 3 },
  { x: 434, y: 238, color: "teal", r: 2.5 },
  { x: 509, y: 193, color: "violet", r: 3 },
  { x: 122, y: 337, color: "amber", r: 3 },
  { x: 199, y: 386, color: "teal", r: 3 },
  { x: 290, y: 352, color: "violet", r: 3.5 },
  { x: 386, y: 384, color: "teal", r: 3 },
  { x: 483, y: 332, color: "amber", r: 2.5 },
  { x: 267, y: 468, color: "teal", r: 2.5 },
];

const links = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 11], [7, 2], [9, 4], [6, 12], [12, 13],
  [13, 14], [14, 15], [15, 16], [8, 13], [10, 15], [14, 17], [3, 14],
];

export function EnergyConstellation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="constellation" aria-label="Illustration of connected electricity measurement points">
      <div className="constellation-orbit orbit-one" />
      <div className="constellation-orbit orbit-two" />
      <svg viewBox="0 0 600 540" role="img" aria-labelledby="energy-map-title energy-map-desc">
        <title id="energy-map-title">Connected energy measurement points</title>
        <desc id="energy-map-desc">A central energy meter connects to simulated appliance measurements through a quiet network of violet, teal, and amber nodes.</desc>
        <g className="constellation-links">
          {links.map(([start, end]) => (
            <line
              key={`${start}-${end}`}
              x1={nodes[start].x}
              y1={nodes[start].y}
              x2={nodes[end].x}
              y2={nodes[end].y}
            />
          ))}
        </g>
        <path className="energy-wave" d="M72 278h82l20-32 30 62 33-105 35 148 31-88 20 28h222" />
        {nodes.map((node, index) => (
          <motion.circle
            key={`${node.x}-${node.y}`}
            className={`constellation-node node-${node.color}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            animate={reduceMotion ? undefined : { opacity: [0.48, 1, 0.48], scale: [0.88, 1.12, 0.88] }}
            transition={reduceMotion ? undefined : { duration: 3 + (index % 4) * 0.55, delay: (index % 6) * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <motion.circle
          className="constellation-pulse"
          cx="300"
          cy="275"
          r="64"
          animate={reduceMotion ? undefined : { opacity: [0.3, 0], scale: [0.86, 1.24] }}
          transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        />
        <circle className="constellation-core" cx="300" cy="275" r="53" />
      </svg>
      <div className="constellation-readout">
        <span className="readout-signal"><i /> SIMULATED SYSTEM</span>
        <strong>24.8 <small>kWh</small></strong>
        <span>Energy tracked across 5 devices</span>
      </div>
      <div className="constellation-label label-espresso"><span /> Espresso machine <b>385 W</b></div>
      <div className="constellation-label label-cooling"><span /> Cooling <b>845 W</b></div>
      <div className="constellation-label label-lighting"><span /> Ice maker <b>95 W</b></div>
    </div>
  );
}

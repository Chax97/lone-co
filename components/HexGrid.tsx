"use client";

import { useEffect, useRef } from "react";

export default function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let colCount = 0;
    let rowCount = 0;

    const hexSize = 48;
    const gap = 0;
    const skewX = 0.15;
    const skewY = 0.06;
    const scaleY = 0.9;
    const maxExtrude = 35;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const hStep = hexSize * 1.75;
      const vStep = hexSize * 1.52;
      colCount = Math.ceil(w / hStep) + 8;
      rowCount = Math.ceil(h / (vStep * scaleY)) + 8;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const project = (x: number, y: number): [number, number] => {
      return [x + y * skewX, y * scaleY + x * skewY];
    };

    const getHexVerts = (cx: number, cy: number, size: number): [number, number][] => {
      const verts: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        verts.push(project(cx + size * Math.cos(a), cy + size * Math.sin(a)));
      }
      return verts;
    };

    const drawHex = (
      gridX: number,
      gridY: number,
      size: number,
      depth: number,
      edgeFade: number
    ) => {
      const lift = depth * maxExtrude;
      const topVerts = getHexVerts(gridX, gridY, size).map(
        ([x, y]) => [x, y - lift] as [number, number]
      );
      const baseVerts = getHexVerts(gridX, gridY, size);
      const a = edgeFade;

      // ── Sunken: draw well walls ──
      if (depth < -0.05) {
        for (let i = 0; i < 6; i++) {
          const next = (i + 1) % 6;
          const [bx1, by1] = baseVerts[i];
          const [bx2, by2] = baseVerts[next];
          const [tx1, ty1] = topVerts[i];
          const [tx2, ty2] = topVerts[next];

          const projCenter = project(gridX, gridY);
          const wallMidX = (bx1 + bx2) / 2;
          const wallMidY = (by1 + by2) / 2;
          const normalX = wallMidX - projCenter[0];
          const normalY = wallMidY - projCenter[1];
          const lightDot = normalX * 0.5 + normalY * 0.9;

          if (lightDot > 0) {
            ctx.beginPath();
            ctx.moveTo(bx1, by1);
            ctx.lineTo(bx2, by2);
            ctx.lineTo(tx2, ty2);
            ctx.lineTo(tx1, ty1);
            ctx.closePath();
            ctx.fillStyle = `rgba(180, 180, 190, ${Math.abs(depth) * 0.35 * a})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.abs(depth) * 0.08 * a})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }

        // Floor darkening
        ctx.beginPath();
        topVerts.forEach(([vx, vy], i) => {
          if (i === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.abs(depth) * 0.12 * a})`;
        ctx.fill();
      }

      // ── Raised: side extrusion ──
      if (depth > 0.08) {
        const extrudeH = lift;

        // Drop shadow
        const shadowOff = depth * 12;
        ctx.beginPath();
        topVerts.forEach(([vx, vy], i) => {
          if (i === 0) ctx.moveTo(vx + shadowOff * 0.5, vy + shadowOff + extrudeH);
          else ctx.lineTo(vx + shadowOff * 0.5, vy + shadowOff + extrudeH);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 0, 0, ${depth * 0.08 * a})`;
        ctx.fill();

        // Side faces
        const projCenter = project(gridX, gridY);
        for (let i = 0; i < 6; i++) {
          const next = (i + 1) % 6;
          const [x1, y1] = topVerts[i];
          const [x2, y2] = topVerts[next];
          const midY = (y1 + y2) / 2;
          const faceDir = midY - (projCenter[1] - lift);

          if (faceDir > 0) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x2, y2 + extrudeH);
            ctx.lineTo(x1, y1 + extrudeH);
            ctx.closePath();

            const midX = (x1 + x2) / 2;
            const normalX = midX - projCenter[0];
            const shade = normalX > 0 ? 0.2 : 0.1;
            ctx.fillStyle = `rgba(200, 200, 210, ${depth * shade * a})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(255, 255, 255, ${depth * 0.06 * a})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      // ── Top face ──
      ctx.beginPath();
      topVerts.forEach(([vx, vy], i) => {
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      });
      ctx.closePath();

      const faceBright = 0.3 + (depth + 1) * 0.35;
      ctx.fillStyle = `rgba(255, 255, 255, ${faceBright * 0.06 * a})`;
      ctx.fill();

      ctx.strokeStyle = `rgba(255, 255, 255, ${(0.08 + depth * 0.06) * a})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Specular on raised
      if (depth > 0.4) {
        const center = project(gridX, gridY);
        const grad = ctx.createRadialGradient(
          center[0] - 5, center[1] - lift - 5, 0,
          center[0], center[1] - lift, hexSize * 0.4
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${(depth - 0.4) * 0.08 * a})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Inset shadow on sunken
      if (depth < -0.3) {
        const center = project(gridX, gridY);
        const grad = ctx.createRadialGradient(
          center[0] + 3, center[1] - lift + 3, 0,
          center[0], center[1] - lift, hexSize * 0.6
        );
        grad.addColorStop(0, `rgba(0, 0, 0, ${Math.abs(depth) * 0.06 * a})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Base rim
      ctx.beginPath();
      baseVerts.forEach(([vx, vy], i) => {
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      });
      ctx.closePath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.025 * a})`;
      ctx.lineWidth = 0.3;
      ctx.stroke();
    };

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, w, h);

      const hStep = hexSize * 1.75;
      const vStep = hexSize * 1.52;
      const offsetX = -hStep * 4;
      const offsetY = -vStep * 4;

      for (let row = -4; row < rowCount; row++) {
        for (let col = -4; col < colCount; col++) {
          const rowOffset = row % 2 === 0 ? 0 : hStep * 0.5;
          const gridX = col * hStep + rowOffset + offsetX;
          const gridY = row * vStep + offsetY;

          const wave1 = Math.sin(gridX * 0.005 + gridY * 0.003 + time * 1.3);
          const wave2 =
            Math.cos(gridX * 0.008 - time * 0.7) *
            Math.sin(gridY * 0.006 + time * 1.0) * 0.7;
          const wave3 =
            Math.sin((gridX + gridY) * 0.003 + time * 1.8) * 0.4;

          let depth = (wave1 + wave2 + wave3) / 2.1;

          const [mx, my] = project(gridX, gridY);
          const dx = mouse.current.x - mx;
          const dy = mouse.current.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            depth += (1 - dist / 200) * 0.6;
          }

          depth = Math.max(-1, Math.min(1, depth));

          const [projX, projY] = project(gridX, gridY);
          const fadeL = Math.min(1, (projX / w) * 3);
          const fadeR = Math.min(1, ((w - projX) / w) * 3);
          const fadeT = Math.min(1, (projY / h) * 2.5);
          const fadeB = Math.min(1, ((h - projY) / h) * 2.5);
          const edgeFade = fadeL * fadeR * fadeT * fadeB;

          if (edgeFade < 0.01) continue;
          if (projX < -hexSize * 3 || projX > w + hexSize * 3) continue;
          if (projY < -hexSize * 3 || projY > h + hexSize * 3) continue;

          drawHex(gridX, gridY, hexSize, depth, edgeFade);
        }
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1]"
      style={{ pointerEvents: "none" }}
    />
  );
}

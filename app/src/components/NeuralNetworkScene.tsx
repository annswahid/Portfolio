import { useRef, useEffect } from 'react';

interface DraftingNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  isCross: boolean;
  active: boolean;
  activationTime: number;
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function NeuralNetworkScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isMoving: false });
  const mouseTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const SPACING = 110;
    const cols = Math.floor(width / SPACING) + 2;
    const rows = Math.floor(height / SPACING) + 2;
    const nodes: DraftingNode[] = [];
    const pulses: Pulse[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.35) continue;
        
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        const x = i * SPACING + offsetX;
        const y = j * SPACING + offsetY;
        
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          isCross: Math.random() > 0.4,
          active: false,
          activationTime: 0,
        });
      }
    }

    const CONNECTION_DIST = SPACING * 1.8;
    const MOUSE_RADIUS = 220;

    function maybeSpawnPulse() {
      // 5% chance per frame to spawn a data pulse
      if (Math.random() > 0.05) return;
      const i = Math.floor(Math.random() * nodes.length);
      const j = Math.floor(Math.random() * nodes.length);
      if (i === j) return;
      
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      
      // Only spawn pulses along valid connections
      if (Math.hypot(dx, dy) < CONNECTION_DIST) {
        pulses.push({
          fromNode: i,
          toNode: j,
          progress: 0,
          speed: 0.006 + Math.random() * 0.01,
          color: Math.random() > 0.5 ? '#f5c642' : '#ffffff', // Mix of gold and white pulses
        });
      }
    }

    function drawPulse(p: Pulse) {
      const a = nodes[p.fromNode];
      const b = nodes[p.toNode];
      const px = a.x + (b.x - a.x) * p.progress;
      const py = a.y + (b.y - a.y) * p.progress;

      const grad = ctx!.createRadialGradient(px, py, 0, px, py, 8);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.3, p.color === '#ffffff' ? 'rgba(255,255,255,0.8)' : 'rgba(245, 198, 66,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx!.beginPath();
      ctx!.arc(px, py, 8, 0, Math.PI * 2);
      ctx!.fillStyle = grad;
      ctx!.shadowColor = p.color;
      ctx!.shadowBlur = 20; // Massive glowing trail
      ctx!.fill();
      ctx!.shadowBlur = 0;
    }

    function animate(t: number) {
      animFrameRef.current = requestAnimationFrame(animate);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#18181f';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const time = t / 1000;

      ctx.globalCompositeOperation = 'lighter';

      nodes.forEach((n) => {
        const dx = mx - n.baseX;
        const dy = my - n.baseY;
        const dist = Math.hypot(dx, dy);
        
        let targetX = n.baseX;
        let targetY = n.baseY;

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = Math.pow((MOUSE_RADIUS - dist) / MOUSE_RADIUS, 2);
          targetX -= (dx / dist) * force * 35;
          targetY -= (dy / dist) * force * 35;
          n.active = true;
          n.activationTime = time;
        } else if (time - n.activationTime > 1.5) {
          n.active = false;
        }

        const ax = (targetX - n.x) * 0.15;
        const ay = (targetY - n.y) * 0.15;
        
        n.vx += ax;
        n.vy += ay;
        n.vx *= 0.5;
        n.vy *= 0.5;
        n.x += n.vx;
        n.y += n.vy;
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CONNECTION_DIST) {
            const isActive = a.active || b.active;
            const alpha = isActive 
              ? (1 - dist / CONNECTION_DIST) * 1.0 
              : (1 - dist / CONNECTION_DIST) * 0.6;
            
            if (isActive) {
              ctx.strokeStyle = `rgba(245, 198, 66, ${alpha})`;
              ctx.shadowColor = '#f5c642';
              ctx.shadowBlur = 25;
              ctx.lineWidth = 2;
              if (Math.random() > 0.96) {
                ctx.setLineDash([4, 4]);
              } else {
                ctx.setLineDash([]);
              }
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.shadowColor = '#ffffff';
              ctx.shadowBlur = 12;
              ctx.lineWidth = 1;
              ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
      ctx.setLineDash([]);

      nodes.forEach((n) => {
        const isActive = n.active;
        const color = isActive ? '#cda434' : 'rgba(255,255,255,0.8)';
        
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.shadowColor = isActive ? '#f5c642' : '#ffffff';
        ctx.shadowBlur = isActive ? 30 : 15;

        if (n.isCross) {
          const size = isActive ? 3.5 : 2.5;
          ctx.beginPath();
          ctx.moveTo(n.x - size, n.y);
          ctx.lineTo(n.x + size, n.y);
          ctx.moveTo(n.x, n.y - size);
          ctx.lineTo(n.x, n.y + size);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, isActive ? 2 : 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        if (isActive) {
          const timeSinceActive = time - n.activationTime;
          if (timeSinceActive < 0.6) {
            const expand = timeSinceActive * 35;
            ctx.beginPath();
            ctx.arc(n.x, n.y, expand, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(245, 198, 66, ${0.8 * (1 - timeSinceActive / 0.6)})`;
            ctx.shadowBlur = 15;
            ctx.stroke();
          }
        }
        ctx.shadowBlur = 0;
      });
      
      // ── Process and Draw Pulses ──
      maybeSpawnPulse();
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].progress += pulses[i].speed;
        if (pulses[i].progress >= 1) {
          pulses.splice(i, 1);
        } else {
          drawPulse(pulses[i]);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      
      if (mouseRef.current.isMoving) {
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS * 0.9, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.setLineDash([5, 15]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.beginPath();
        ctx.moveTo(mx - 8, my);
        ctx.lineTo(mx + 8, my);
        ctx.moveTo(mx, my - 8);
        ctx.lineTo(mx, my + 8);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.stroke();
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, isMoving: true };
      if (mouseTimeout.current) clearTimeout(mouseTimeout.current);
      mouseTimeout.current = setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 150);
    };
    
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, isMoving: false };
    };
    
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
      if (mouseTimeout.current) clearTimeout(mouseTimeout.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

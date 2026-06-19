import { useRef, useEffect } from "react";
import * as THREE from "three";

const NODE_COUNT = 80;
const MAX_CONNECTIONS = 200;
const CONNECTION_DISTANCE = 180;
const MOUSE_RADIUS = 350;
const DRIFT_SPEED = 0.2;

interface NodeData {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  phase: number;
  size: number;
}

export default function NeuralNetworkScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create nodes
    const nodes: NodeData[] = [];
    const nodePositions = new Float32Array(NODE_COUNT * 3);
    const nodeSizes = new Float32Array(NODE_COUNT);
    const nodeOpacities = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 1200;
      const y = (Math.random() - 0.5) * 900;
      const z = (Math.random() - 0.5) * 200;
      nodes.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        x: x,
        y: y,
        z: z,
        vx: 0,
        vy: 0,
        vz: 0,
        phase: Math.random() * Math.PI * 2,
        size: 2.5 + Math.random() * 2,
      });
      nodeSizes[i] = nodes[i].size;
      nodeOpacities[i] = 0.6 + Math.random() * 0.4;
    }

    // Node geometry and material
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodePositions, 3)
    );
    nodeGeometry.setAttribute("aSize", new THREE.BufferAttribute(nodeSizes, 1));
    nodeGeometry.setAttribute(
      "aOpacity",
      new THREE.BufferAttribute(nodeOpacities, 1)
    );

    const nodeVertexShader = `
      attribute float aSize;
      attribute float aOpacity;
      varying float vOpacity;
      void main() {
        vOpacity = aOpacity;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (400.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const nodeFragmentShader = `
      varying float vOpacity;
      uniform float uTime;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        alpha = pow(alpha, 0.6);
        float pulse = 0.7 + 0.3 * sin(uTime * 1.5 + vOpacity * 10.0);
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * pulse);
      }
    `;

    const nodeMaterial = new THREE.ShaderMaterial({
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(points);

    // Line connections
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_CONNECTIONS * 2 * 3); // 2 vertices per line, 3 coords each
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Mouse conversion to world space
    const getMouseWorld = () => {
      const fov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * camera.position.z;
      const width = height * camera.aspect;
      return {
        x: mouseRef.current.x * (width / 2),
        y: mouseRef.current.y * (height / 2),
      };
    };

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const mouse = mouseRef.current.active
        ? getMouseWorld()
        : { x: 99999, y: 99999 };

      nodeMaterial.uniforms.uTime.value = elapsed;

      // Update node positions
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];

        // Base drift (floating)
        const driftX =
          Math.sin(elapsed * DRIFT_SPEED + node.phase) * 60 +
          Math.sin(elapsed * DRIFT_SPEED * 0.3 + node.phase * 2) * 30;
        const driftY =
          Math.cos(elapsed * DRIFT_SPEED * 0.7 + node.phase * 1.3) * 60 +
          Math.cos(elapsed * DRIFT_SPEED * 0.5 + node.phase) * 30;
        const driftZ =
          Math.sin(elapsed * DRIFT_SPEED * 0.4 + node.phase * 0.7) * 40;

        let targetX = node.baseX + driftX;
        let targetY = node.baseY + driftY;
        let targetZ = node.baseZ + driftZ;

        // Mouse attraction
        const dx = mouse.x - targetX;
        const dy = mouse.y - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.5;
          targetX += (dx / dist) * force * MOUSE_RADIUS * 0.15;
          targetY += (dy / dist) * force * MOUSE_RADIUS * 0.15;
        }

        // Smooth position update
        node.x += (targetX - node.x) * 0.05;
        node.y += (targetY - node.y) * 0.05;
        node.z += (targetZ - node.z) * 0.05;

        // Wrap around edges to keep density consistent
        if (node.x > 650) node.baseX -= 1300;
        if (node.x < -650) node.baseX += 1300;
        if (node.y > 500) node.baseY -= 1000;
        if (node.y < -500) node.baseY += 1000;
        if (node.z > 300) node.baseZ -= 600;
        if (node.z < -300) node.baseZ += 600;

        // Update geometry
        nodePositions[i * 3] = node.x;
        nodePositions[i * 3 + 1] = node.y;
        nodePositions[i * 3 + 2] = node.z;
      }

      nodeGeometry.attributes.position.needsUpdate = true;

      // Find connections
      let connectionIndex = 0;
      const lineArray = lineGeometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (connectionIndex >= MAX_CONNECTIONS) break;

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE) {
            const idx = connectionIndex * 6;
            lineArray[idx] = nodes[i].x;
            lineArray[idx + 1] = nodes[i].y;
            lineArray[idx + 2] = nodes[i].z;
            lineArray[idx + 3] = nodes[j].x;
            lineArray[idx + 4] = nodes[j].y;
            lineArray[idx + 5] = nodes[j].z;
            connectionIndex++;
          }
        }
        if (connectionIndex >= MAX_CONNECTIONS) break;
      }

      lineGeometry.setDrawRange(0, connectionIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;

      // Slight camera rotation based on mouse
      const targetRotX = mouseRef.current.y * 0.02;
      const targetRotY = mouseRef.current.x * 0.02;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.03;
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleWheel = (e: WheelEvent) => {
      camera.position.z += e.deltaY * 0.2;
      camera.position.z = Math.max(300, Math.min(800, camera.position.z));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

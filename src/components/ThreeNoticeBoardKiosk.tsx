import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Box, 
  Layers, 
  RotateCw, 
  Eye, 
  Sun, 
  Moon, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Maximize2,
  Cpu,
  Tv,
  Info
} from 'lucide-react';
import { INITIAL_NOTICES, Notice } from '../data/mockNotices';

export const ThreeNoticeBoardKiosk: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive UI state
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState<number>(0);
  const [explodedAmount, setExplodedAmount] = useState<number>(0);
  const [lightingPreset, setLightingPreset] = useState<'daylight' | 'cyberpunk' | 'warm'>('daylight');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [activeCameraView, setActiveCameraView] = useState<'hero' | 'front' | 'macro' | 'exploded'>('hero');

  // Three.js mutable refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const explodedGroupsRef = useRef<{
    base: THREE.Group;
    columns: THREE.Group;
    displayChassis: THREE.Group;
    screenMesh: THREE.Mesh;
    hardwareBoard: THREE.Group;
  } | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);

  const currentNotice = INITIAL_NOTICES[selectedNoticeIndex] || INITIAL_NOTICES[0];

  // Draw 2D canvas texture for the OLED screen
  const updateScreenCanvas = useCallback((notice: Notice) => {
    if (!canvas2DRef.current) {
      canvas2DRef.current = document.createElement('canvas');
      canvas2DRef.current.width = 1024;
      canvas2DRef.current.height = 1440;
    }
    const canvas = canvas2DRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient (Deep Navy Blue / Obsidian)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#0d1527');
    bgGrad.addColorStop(1, '#05070d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Grid pattern
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Top Header Banner
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, canvas.width, 160);
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(0, 154, canvas.width, 6);

    // University Logo & Header Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('INSTITUTE OF TECHNOLOGY', 60, 75);

    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('CENTRAL DIGITAL NOTICE BOARD • CSE CORRIDOR KIOSK', 60, 120);

    // Live Clock & Status
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 32px monospace';
    ctx.fillText(`● LIVE ${timeStr}`, canvas.width - 240, 95);

    // Notice Category Badge
    let badgeColor = '#4f46e5';
    let badgeText = notice.category.toUpperCase();
    if (notice.category === 'Exam') badgeColor = '#e11d48';
    if (notice.category === 'Placement') badgeColor = '#059669';
    if (notice.category === 'Events') badgeColor = '#9333ea';

    ctx.fillStyle = badgeColor;
    ctx.beginPath();
    ctx.roundRect(60, 210, 240, 56, 12);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`${badgeText} BULLETIN`, 80, 248);

    // Pinned notice indicator
    if (notice.isPinned) {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.roundRect(320, 210, 220, 56, 12);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('★ PINNED NOTICE', 340, 248);
    }

    // Notice Title (Word wrapped)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px sans-serif';
    const words = notice.title.split(' ');
    let line = '';
    let y = 340;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > canvas.width - 120 && n > 0) {
        ctx.fillText(line, 60, y);
        line = words[n] + ' ';
        y += 66;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 60, y);

    // Divider line
    y += 40;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(canvas.width - 60, y);
    ctx.stroke();

    // Notice Content (Word wrapped)
    y += 60;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '34px sans-serif';
    const contentWords = notice.content.split(' ');
    let cLine = '';
    for (let n = 0; n < contentWords.length; n++) {
      const testLine = cLine + contentWords[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > canvas.width - 120 && n > 0) {
        ctx.fillText(cLine, 60, y);
        cLine = contentWords[n] + ' ';
        y += 48;
      } else {
        cLine = testLine;
      }
    }
    ctx.fillText(cLine, 60, y);

    // Attachments Callout Box
    if (notice.attachments && notice.attachments.length > 0) {
      y += 80;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(60, y, canvas.width - 120, 140, 16);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(`📎 Attached: ${notice.attachments[0].name}`, 90, y + 60);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px sans-serif';
      ctx.fillText(`File Type: ${notice.attachments[0].type.toUpperCase()} • Size: ${notice.attachments[0].size} • Download via Student Portal`, 90, y + 105);
    }

    // Issuer & Metadata Footer Card
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, canvas.height - 180, canvas.width, 180);
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 180);
    ctx.lineTo(canvas.width, canvas.height - 180);
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`Issued by: ${notice.author} (${notice.authorRole})`, 60, canvas.height - 115);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Department: ${notice.department} • Expiry: ${notice.expiryDate}`, 60, canvas.height - 65);

    // Procedural QR Code Box on bottom right
    const qrX = canvas.width - 190;
    const qrY = canvas.height - 165;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qrX, qrY, 130, 130);
    ctx.fillStyle = '#000000';
    // Draw pseudo QR grid
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if ((r + c) % 2 === 0 || (r === 0 && c === 0) || (r === 4 && c === 4)) {
          ctx.fillRect(qrX + 15 + c * 20, qrY + 15 + r * 20, 16, 16);
        }
      }
    }

    if (screenTextureRef.current) {
      screenTextureRef.current.needsUpdate = true;
    }
  }, []);

  // Update texture whenever selected notice changes
  useEffect(() => {
    updateScreenCanvas(currentNotice);
  }, [selectedNoticeIndex, currentNotice, updateScreenCanvas]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d);
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.035);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.6, 6.2);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Studio Environment map using RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 2.2, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent dipping beneath floor
    controls.minDistance = 2.0;
    controls.maxDistance = 12.0;
    controlsRef.current = controls;

    // Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 1.2);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.8);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.0);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    // Floor Grid & Ground Plane
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.85,
      metalness: 0.15,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // Floor Circular Grid Accent
    const gridHelper = new THREE.GridHelper(24, 24, 0x4f46e5, 0x1e293b);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Contact Shadow Plane beneath kiosk
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,0.7)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    scene.add(shadowMesh);

    // BUILD COMPOSITE 3-12 PART PROCEDURAL KIOSK MODEL
    const kioskRoot = new THREE.Group();
    scene.add(kioskRoot);

    // Group 1: Base Pedestal
    const baseGroup = new THREE.Group();
    kioskRoot.add(baseGroup);

    // Part 1: Heavy Steel Base Disc
    const baseGeo = new THREE.CylinderGeometry(1.25, 1.35, 0.12, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.22,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.06;
    baseMesh.castShadow = !isSoftwareGl;
    baseMesh.receiveShadow = !isSoftwareGl;
    baseGroup.add(baseMesh);

    // Part 2: Rubber footings (4 peripheral dampers)
    const footGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16);
    const footMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.95 });
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(Math.cos(angle) * 1.15, 0.02, Math.sin(angle) * 1.15);
      baseGroup.add(foot);
    }

    // Part 3: Base Trim Ring
    const ringGeo = new THREE.TorusGeometry(1.22, 0.025, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.12;
    baseGroup.add(ringMesh);

    // Group 2: Twin Vertical Columns
    const columnsGroup = new THREE.Group();
    kioskRoot.add(columnsGroup);

    const colGeo = new THREE.BoxGeometry(0.12, 1.4, 0.24);
    const colMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.18,
    });

    const leftCol = new THREE.Mesh(colGeo, colMat);
    leftCol.position.set(-0.45, 0.82, 0);
    leftCol.castShadow = !isSoftwareGl;
    columnsGroup.add(leftCol);

    const rightCol = new THREE.Mesh(colGeo, colMat);
    rightCol.position.set(0.45, 0.82, 0);
    rightCol.castShadow = !isSoftwareGl;
    columnsGroup.add(rightCol);

    // Central Cable / Airflow Conduit
    const conduitGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 24);
    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.5,
      roughness: 0.4,
    });
    const conduit = new THREE.Mesh(conduitGeo, conduitMat);
    conduit.position.set(0, 0.82, 0);
    columnsGroup.add(conduit);

    // Group 3: Display Chassis & Bezel
    const chassisGroup = new THREE.Group();
    chassisGroup.position.y = 2.4;
    kioskRoot.add(chassisGroup);

    // Part 5: Main display housing
    const chassisGeo = new THREE.BoxGeometry(1.68, 2.36, 0.16);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.7,
      roughness: 0.3,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.castShadow = !isSoftwareGl;
    chassisMesh.receiveShadow = !isSoftwareGl;
    chassisGroup.add(chassisMesh);

    // Part 6: Glowing LED status strip on top of chassis
    const ledGeo = new THREE.BoxGeometry(1.64, 0.03, 0.03);
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
    });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0, 1.18, 0.08);
    chassisGroup.add(ledMesh);

    // Part 7: OLED Screen Canvas Surface
    if (!canvas2DRef.current) {
      canvas2DRef.current = document.createElement('canvas');
      canvas2DRef.current.width = 1024;
      canvas2DRef.current.height = 1440;
    }
    const screenTex = new THREE.CanvasTexture(canvas2DRef.current);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    screenTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    screenTextureRef.current = screenTex;

    const screenGeo = new THREE.PlaneGeometry(1.52, 2.14);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTex,
      roughness: 0.25,
      metalness: 0.1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, 0.082); // flush with front face
    chassisGroup.add(screenMesh);

    // Part 8: Protective Glass Front Layer
    const glassGeo = new THREE.PlaneGeometry(1.58, 2.22);
    const glassMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.08,
      metalness: 0.1,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.set(0, 0, 0.095);
    chassisGroup.add(glassMesh);

    // Group 4: Backplane IoT Hardware Board (visible in Exploded view)
    const hardwareGroup = new THREE.Group();
    hardwareGroup.position.set(0, 0, -0.2);
    chassisGroup.add(hardwareGroup);

    const pcbGeo = new THREE.BoxGeometry(0.7, 0.9, 0.04);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      metalness: 0.3,
      roughness: 0.6,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    hardwareGroup.add(pcbMesh);

    // Microchips on PCB
    const chipGeo = new THREE.BoxGeometry(0.2, 0.2, 0.02);
    const chipMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 });
    const mainChip = new THREE.Mesh(chipGeo, chipMat);
    mainChip.position.set(0, 0.1, 0.03);
    hardwareGroup.add(mainChip);

    // Store references for exploded view
    explodedGroupsRef.current = {
      base: baseGroup,
      columns: columnsGroup,
      displayChassis: chassisGroup,
      screenMesh: screenMesh,
      hardwareBoard: hardwareGroup,
    };

    // Draw initial texture
    updateScreenCanvas(INITIAL_NOTICES[0]);

    // Handle Resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Damping
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();

      // Auto rotation
      if (isAutoRotate) {
        kioskRoot.rotation.y += 0.35 * delta;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
    };
  }, [updateScreenCanvas, isAutoRotate]);

  // Handle Exploded View separation
  useEffect(() => {
    if (!explodedGroupsRef.current) return;
    const { base, columns, displayChassis, screenMesh, hardwareBoard } = explodedGroupsRef.current;

    // Separate groups along Y and Z axes proportional to explodedAmount
    base.position.y = -explodedAmount * 0.4;
    columns.position.y = 0;
    displayChassis.position.y = 2.4 + explodedAmount * 0.5;
    screenMesh.position.z = 0.082 + explodedAmount * 0.4;
    hardwareBoard.position.z = -0.2 - explodedAmount * 0.5;
  }, [explodedAmount]);

  // Lighting Preset Switcher
  useEffect(() => {
    if (!keyLightRef.current || !hemiLightRef.current || !sceneRef.current) return;
    const scene = sceneRef.current;

    if (lightingPreset === 'daylight') {
      keyLightRef.current.color.setHex(0xfff7ed);
      keyLightRef.current.intensity = 2.8;
      hemiLightRef.current.color.setHex(0x93c5fd);
      scene.background = new THREE.Color(0x0a0f1d);
      scene.fog = new THREE.FogExp2(0x0a0f1d, 0.035);
    } else if (lightingPreset === 'cyberpunk') {
      keyLightRef.current.color.setHex(0xec4899);
      keyLightRef.current.intensity = 3.2;
      hemiLightRef.current.color.setHex(0x06b6d4);
      scene.background = new THREE.Color(0x050510);
      scene.fog = new THREE.FogExp2(0x050510, 0.04);
    } else if (lightingPreset === 'warm') {
      keyLightRef.current.color.setHex(0xfbbf24);
      keyLightRef.current.intensity = 2.4;
      hemiLightRef.current.color.setHex(0xf97316);
      scene.background = new THREE.Color(0x181009);
      scene.fog = new THREE.FogExp2(0x181009, 0.03);
    }
  }, [lightingPreset]);

  // Camera Presets
  const setCameraPreset = (preset: 'hero' | 'front' | 'macro' | 'exploded') => {
    if (!cameraRef.current || !controlsRef.current) return;
    setActiveCameraView(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (preset === 'hero') {
      camera.position.set(3.2, 2.8, 5.0);
      controls.target.set(0, 2.2, 0);
    } else if (preset === 'front') {
      camera.position.set(0, 2.4, 4.6);
      controls.target.set(0, 2.4, 0);
    } else if (preset === 'macro') {
      camera.position.set(0, 2.4, 2.6);
      controls.target.set(0, 2.4, 0);
    } else if (preset === 'exploded') {
      setExplodedAmount(1.0);
      camera.position.set(3.8, 3.2, 5.2);
      controls.target.set(0, 2.5, 0);
    }
  };

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-slate-950 overflow-hidden select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Spec Badge (Unobtrusive) */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-2 bg-slate-900/90 text-white border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xl backdrop-blur-none">
          <Tv className="w-4 h-4 text-indigo-400" />
          <span>3D Campus Kiosk & IoT Corridor Terminal</span>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
            Three.js PBR
          </span>
        </div>
        <p className="text-[11px] text-slate-400 pl-1">
          Drag to rotate 360° • Scroll to zoom • Right-click to pan
        </p>
      </div>

      {/* Top Right Quick Auto-Rotate Toggle */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition shadow-lg ${
            isAutoRotate
              ? 'bg-indigo-600 text-white border-indigo-500'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
          <span>{isAutoRotate ? 'Rotating' : 'Static'}</span>
        </button>
      </div>

      {/* UNIFIED COLLAPSIBLE BOTTOM CONTROL DOCK (Zero Viewport Occlusion) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 pointer-events-auto">
        <div className="flex flex-col items-center">
          {/* Collapse / Expand Toggle Button */}
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="mb-1.5 bg-slate-900/95 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-1 rounded-t-xl text-xs font-semibold border-t border-x border-slate-700/80 flex items-center gap-1.5 shadow-lg transition"
          >
            {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{isDockCollapsed ? 'Show 3D Studio Controls' : 'Hide Controls'}</span>
          </button>

          {/* Dock Body */}
          {!isDockCollapsed && (
            <div className="w-full bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl space-y-3.5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                {/* 1. Broadcast Notice on 3D OLED */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-slate-400 font-bold block flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Active Screen Notice (CanvasTexture)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {INITIAL_NOTICES.slice(0, 4).map((notice, idx) => (
                      <button
                        key={notice.id}
                        onClick={() => setSelectedNoticeIndex(idx)}
                        className={`p-2 rounded-xl text-left border transition truncate ${
                          selectedNoticeIndex === idx
                            ? 'bg-indigo-600 text-white border-indigo-500 font-semibold shadow-md'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        <span className="block truncate font-medium text-[11px]">{notice.title}</span>
                        <span className="text-[10px] opacity-75">{notice.category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Exploded Anatomy Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                      <span>Exploded View</span>
                    </span>
                    <span className="text-purple-300 font-mono text-[11px]">{Math.round(explodedAmount * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explodedAmount}
                    onChange={(e) => setExplodedAmount(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <p className="text-[10px] text-slate-500">
                    Demonstrates hardware anatomy: Frame, OLED & IoT controller.
                  </p>
                </div>

                {/* 3. Lighting & Camera Presets */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>Camera & Lighting</span>
                  </label>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setCameraPreset('hero')}
                      className={`px-2 py-1 rounded-md text-[11px] border font-medium transition ${
                        activeCameraView === 'hero' ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Hero 45°
                    </button>
                    <button
                      onClick={() => setCameraPreset('front')}
                      className={`px-2 py-1 rounded-md text-[11px] border font-medium transition ${
                        activeCameraView === 'front' ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Frontal
                    </button>
                    <button
                      onClick={() => setCameraPreset('macro')}
                      className={`px-2 py-1 rounded-md text-[11px] border font-medium transition ${
                        activeCameraView === 'macro' ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Screen Macro
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      onClick={() => setLightingPreset('daylight')}
                      className={`p-1 rounded border text-[10px] flex items-center gap-1 ${
                        lightingPreset === 'daylight' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Sun className="w-3 h-3" /> Day
                    </button>
                    <button
                      onClick={() => setLightingPreset('cyberpunk')}
                      className={`p-1 rounded border text-[10px] flex items-center gap-1 ${
                        lightingPreset === 'cyberpunk' ? 'bg-pink-600 text-white border-pink-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" /> Neon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

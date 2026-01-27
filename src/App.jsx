import React, { useState, useEffect, useRef } from 'react';
import { Save, Settings, X } from 'lucide-react';

const SciFiHUD = () => {
  const [showControls, setShowControls] = useState(false);
  const [time, setTime] = useState(0);

  // Animated data states
  const [radarAngle, setRadarAngle] = useState(0);
  const [dataValues, setDataValues] = useState({
    coord1: 42.7394,
    coord2: -118.2615,
    coord3: 2847.9,
    coreTemp: 347.2,
    radiation: 0.012,
    plasmaFlow: 89.7,
    energyOutput: 1.21,
    signal1: 67,
    signal2: 45,
    signal3: 82,
    signal4: 58,
    signal5: 73,
    waveform: Array(50).fill(0).map(() => Math.random() * 100),
    barGraph: Array(20).fill(0).map(() => Math.random() * 100),
    circularProgress: [72, 45, 88, 63],
    scanProgress: 0,
  });

  // Continuous animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
      setRadarAngle(a => (a + 2) % 360);

      setDataValues(prev => ({
        coord1: prev.coord1 + (Math.random() - 0.5) * 0.01,
        coord2: prev.coord2 + (Math.random() - 0.5) * 0.01,
        coord3: prev.coord3 + (Math.random() - 0.5) * 0.1,
        coreTemp: Math.max(300, Math.min(400, prev.coreTemp + (Math.random() - 0.5) * 2)),
        radiation: Math.max(0, Math.min(0.05, prev.radiation + (Math.random() - 0.5) * 0.002)),
        plasmaFlow: Math.max(70, Math.min(100, prev.plasmaFlow + (Math.random() - 0.5) * 1)),
        energyOutput: Math.max(0.8, Math.min(1.5, prev.energyOutput + (Math.random() - 0.5) * 0.02)),
        signal1: Math.max(0, Math.min(100, prev.signal1 + (Math.random() - 0.5) * 10)),
        signal2: Math.max(0, Math.min(100, prev.signal2 + (Math.random() - 0.5) * 10)),
        signal3: Math.max(0, Math.min(100, prev.signal3 + (Math.random() - 0.5) * 10)),
        signal4: Math.max(0, Math.min(100, prev.signal4 + (Math.random() - 0.5) * 10)),
        signal5: Math.max(0, Math.min(100, prev.signal5 + (Math.random() - 0.5) * 10)),
        waveform: [...prev.waveform.slice(1), Math.random() * 100],
        barGraph: prev.barGraph.map(v => Math.max(10, Math.min(100, v + (Math.random() - 0.5) * 15))),
        circularProgress: prev.circularProgress.map(v => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 3))),
        scanProgress: (prev.scanProgress + 0.5) % 100,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num, decimals = 2) => num.toFixed(decimals);

  return (
    <div className="hud-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #000;
          overflow: hidden;
        }

        .hud-container {
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #001520 0%, #000 70%);
          color: #0ff;
          font-family: 'Share Tech Mono', monospace;
          position: relative;
          overflow: hidden;
        }

        /* CRT Scanline Effect */
        .hud-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 1000;
        }

        /* Vignette Effect */
        .hud-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.7) 100%);
          pointer-events: none;
          z-index: 999;
        }

        /* Grid Background */
        .grid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
        }

        /* Main Layout */
        .hud-content {
          width: 100%;
          height: 100%;
          padding: 20px;
          display: grid;
          grid-template-columns: 280px 1fr 280px;
          grid-template-rows: 1fr 1fr;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        /* Panels */
        .panel {
          background: rgba(0, 20, 30, 0.6);
          border: 1px solid rgba(0, 255, 255, 0.3);
          padding: 15px;
          position: relative;
          overflow: hidden;
        }

        .panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #0ff, transparent);
        }

        .panel-label {
          font-size: 0.7rem;
          color: #0aa;
          letter-spacing: 0.15em;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        /* Central Radar */
        .central-display {
          grid-column: 2;
          grid-row: 1 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .radar-container {
          position: relative;
          width: 450px;
          height: 450px;
        }

        .radar-ring {
          position: absolute;
          border: 1px solid rgba(0, 255, 255, 0.2);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .radar-ring-1 { width: 100%; height: 100%; border-color: rgba(0, 255, 255, 0.3); }
        .radar-ring-2 { width: 75%; height: 75%; }
        .radar-ring-3 { width: 50%; height: 50%; }
        .radar-ring-4 { width: 25%; height: 25%; }

        .radar-sweep {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 2px;
          background: linear-gradient(90deg, #0ff, transparent);
          transform-origin: left center;
          box-shadow: 0 0 20px #0ff, 0 0 40px #0ff;
        }

        .radar-crosshair {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .radar-crosshair::before,
        .radar-crosshair::after {
          content: '';
          position: absolute;
          background: rgba(0, 255, 255, 0.5);
        }

        .radar-crosshair::before {
          width: 450px;
          height: 1px;
          left: -225px;
          top: 0;
        }

        .radar-crosshair::after {
          width: 1px;
          height: 450px;
          top: -225px;
          left: 0;
        }

        .radar-blip {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #0ff;
          border-radius: 50%;
          box-shadow: 0 0 10px #0ff, 0 0 20px #0ff;
          animation: blip-pulse 1.5s ease-in-out infinite;
        }

        @keyframes blip-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        /* Circular Gauges */
        .circular-gauge {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .gauge-bg {
          fill: none;
          stroke: rgba(0, 255, 255, 0.1);
          stroke-width: 4;
        }

        .gauge-fill {
          fill: none;
          stroke: #0ff;
          stroke-width: 4;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: center;
          filter: drop-shadow(0 0 5px #0ff);
        }

        .gauge-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.9rem;
          font-weight: bold;
          text-shadow: 0 0 10px #0ff;
        }

        /* Bar Graphs */
        .bar-graph {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 60px;
        }

        .bar {
          flex: 1;
          background: linear-gradient(to top, #0ff, #0aa);
          min-width: 4px;
          box-shadow: 0 0 5px #0ff;
          transition: height 0.1s ease;
        }

        /* Waveform */
        .waveform-container {
          height: 80px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .waveform-bar {
          width: 3px;
          background: #0ff;
          box-shadow: 0 0 5px #0ff;
          transition: height 0.05s ease;
        }

        /* Progress Bars */
        .progress-bar {
          height: 8px;
          background: rgba(0, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin: 5px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ff, #0aa);
          box-shadow: 0 0 10px #0ff;
          transition: width 0.1s ease;
        }

        /* Data Display */
        .data-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid rgba(0, 255, 255, 0.1);
          font-size: 0.85rem;
        }

        .data-label {
          color: #0aa;
        }

        .data-value {
          color: #0ff;
          text-shadow: 0 0 5px #0ff;
          font-family: 'Orbitron', sans-serif;
        }

        /* Corner Decorations */
        .corner-bracket {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: #0ff;
          border-style: solid;
          border-width: 2px;
        }

        .corner-bracket.tl { top: 5px; left: 5px; border-right: none; border-bottom: none; }
        .corner-bracket.tr { top: 5px; right: 5px; border-left: none; border-bottom: none; }
        .corner-bracket.bl { bottom: 5px; left: 5px; border-right: none; border-top: none; }
        .corner-bracket.br { bottom: 5px; right: 5px; border-left: none; border-top: none; }

        /* Floating Elements */
        .floating-circle {
          position: absolute;
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }

        .pulsing-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #0ff;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px #0ff; }
          50% { opacity: 0.3; box-shadow: 0 0 15px #0ff; }
        }

        /* Hexagon */
        .hexagon-container {
          position: relative;
          width: 60px;
          height: 52px;
          margin: 10px auto;
        }

        .hexagon {
          width: 100%;
          height: 100%;
          background: rgba(0, 255, 255, 0.1);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          border: 1px solid #0ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        /* Rotating Ring */
        .rotating-ring {
          position: absolute;
          border: 2px dashed rgba(0, 255, 255, 0.3);
          border-radius: 50%;
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Arc Segments */
        .arc-container {
          position: relative;
          width: 100px;
          height: 100px;
        }

        /* Scanning Line */
        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0ff, transparent);
          animation: scan-vertical 3s linear infinite;
        }

        @keyframes scan-vertical {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0.3; }
        }

        /* Status Indicators */
        .status-row {
          display: flex;
          gap: 10px;
          margin: 5px 0;
          align-items: center;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: status-blink 1s ease-in-out infinite;
        }

        .status-dot.active { background: #0f0; box-shadow: 0 0 10px #0f0; }
        .status-dot.warning { background: #ff6600; box-shadow: 0 0 10px #ff6600; }
        .status-dot.info { background: #0ff; box-shadow: 0 0 10px #0ff; }

        @keyframes status-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Mini Gauges Row */
        .mini-gauges {
          display: flex;
          justify-content: space-around;
          margin-top: 15px;
        }

        /* Toolbar */
        .toolbar {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
          z-index: 1500;
        }

        .toolbar button {
          width: 40px;
          height: 40px;
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid #0ff;
          color: #0ff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .toolbar button:hover {
          background: rgba(0, 255, 255, 0.2);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        }

        /* Control Panel */
        .control-panel {
          position: fixed;
          top: 0;
          right: ${showControls ? '0' : '-350px'};
          width: 350px;
          height: 100vh;
          background: rgba(0, 10, 20, 0.95);
          border-left: 2px solid #0ff;
          padding: 20px;
          overflow-y: auto;
          transition: right 0.3s;
          z-index: 2000;
        }

        .control-panel h2 {
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .control-panel button {
          width: 100%;
          padding: 10px;
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid #0ff;
          color: #0ff;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          margin-top: 20px;
        }

        /* Ticker Display */
        .ticker {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          color: #0aa;
          white-space: nowrap;
          overflow: hidden;
        }

        .ticker-content {
          display: inline-block;
          animation: ticker 30s linear infinite;
        }

        @keyframes ticker {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }

        /* Frequency Bars */
        .freq-bars {
          display: flex;
          gap: 2px;
          align-items: flex-end;
          height: 40px;
        }

        .freq-bar {
          width: 6px;
          background: linear-gradient(to top, #0aa, #0ff);
          transition: height 0.1s;
        }

        /* Connection Lines */
        .connection-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent);
        }

        /* Bottom Bar */
        .bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: rgba(0, 20, 30, 0.8);
          border-top: 1px solid rgba(0, 255, 255, 0.3);
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 30px;
          z-index: 100;
        }

        /* Top Bar */
        .top-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 35px;
          background: rgba(0, 20, 30, 0.8);
          border-bottom: 1px solid rgba(0, 255, 255, 0.3);
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 30px;
          z-index: 100;
        }

        .top-bar-item {
          font-size: 0.7rem;
          color: #0aa;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .top-bar-value {
          color: #0ff;
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>

      <div className="grid-bg"></div>

      {/* Floating Decorative Elements */}
      <div className="floating-circle" style={{ width: 100, height: 100, top: '10%', left: '5%', animationDelay: '0s' }}></div>
      <div className="floating-circle" style={{ width: 60, height: 60, top: '70%', left: '8%', animationDelay: '1s' }}></div>
      <div className="floating-circle" style={{ width: 80, height: 80, top: '20%', right: '10%', animationDelay: '2s' }}></div>
      <div className="floating-circle" style={{ width: 40, height: 40, bottom: '15%', right: '5%', animationDelay: '0.5s' }}></div>

      <div className="pulsing-dot" style={{ top: '15%', left: '15%' }}></div>
      <div className="pulsing-dot" style={{ top: '25%', right: '20%', animationDelay: '0.5s' }}></div>
      <div className="pulsing-dot" style={{ bottom: '30%', left: '12%', animationDelay: '1s' }}></div>
      <div className="pulsing-dot" style={{ bottom: '20%', right: '15%', animationDelay: '1.5s' }}></div>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-item">
          SYS <span className="top-bar-value">ONLINE</span>
        </div>
        <div className="top-bar-item">
          FREQ <span className="top-bar-value">{(2400 + Math.sin(time * 0.1) * 50).toFixed(1)} MHz</span>
        </div>
        <div className="top-bar-item">
          LAT <span className="top-bar-value">{formatNumber(dataValues.coord1, 4)}</span>
        </div>
        <div className="top-bar-item">
          LONG <span className="top-bar-value">{formatNumber(dataValues.coord2, 4)}</span>
        </div>
        <div className="top-bar-item">
          ALT <span className="top-bar-value">{formatNumber(dataValues.coord3, 1)} m</span>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="top-bar-item">
          <span className="top-bar-value">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => setShowControls(!showControls)} title="Settings">
          <Settings size={20} />
        </button>
      </div>

      <div className="hud-content" style={{ paddingTop: 55, paddingBottom: 60 }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {/* Coordinates Panel */}
          <div className="panel">
            <div className="corner-bracket tl"></div>
            <div className="corner-bracket tr"></div>
            <div className="corner-bracket bl"></div>
            <div className="corner-bracket br"></div>
            <div className="panel-label">COORDINATES</div>
            <div className="data-row">
              <span className="data-label">X</span>
              <span className="data-value">{formatNumber(dataValues.coord1, 4)}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Y</span>
              <span className="data-value">{formatNumber(dataValues.coord2, 4)}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Z</span>
              <span className="data-value">{formatNumber(dataValues.coord3, 1)}</span>
            </div>
          </div>

          {/* Waveform Panel */}
          <div className="panel">
            <div className="panel-label">SIGNAL WAVEFORM</div>
            <div className="waveform-container">
              {dataValues.waveform.map((v, i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{ height: `${v * 0.8}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Circular Gauges */}
          <div className="panel">
            <div className="panel-label">SYSTEM LOAD</div>
            <div className="mini-gauges">
              {dataValues.circularProgress.map((value, i) => (
                <div key={i} className="circular-gauge">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle className="gauge-bg" cx="40" cy="40" r="32"></circle>
                    <circle
                      className="gauge-fill"
                      cx="40"
                      cy="40"
                      r="32"
                      strokeDasharray={`${value * 2.01} 201`}
                    ></circle>
                  </svg>
                  <span className="gauge-value">{Math.round(value)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Panel */}
          <div className="panel">
            <div className="panel-label">STATUS</div>
            <div className="status-row">
              <div className="status-dot active"></div>
              <span style={{ fontSize: '0.75rem' }}>CORE ONLINE</span>
            </div>
            <div className="status-row">
              <div className="status-dot info"></div>
              <span style={{ fontSize: '0.75rem' }}>SYNC ACTIVE</span>
            </div>
            <div className="status-row">
              <div className="status-dot active"></div>
              <span style={{ fontSize: '0.75rem' }}>NETWORK OK</span>
            </div>
          </div>
        </div>

        {/* Central Display - Radar */}
        <div className="central-display">
          <div className="radar-container">
            {/* Rotating outer rings */}
            <div
              className="rotating-ring"
              style={{
                width: 480,
                height: 480,
                top: '50%',
                left: '50%'
              }}
            ></div>
            <div
              className="rotating-ring"
              style={{
                width: 500,
                height: 500,
                top: '50%',
                left: '50%',
                animationDirection: 'reverse',
                animationDuration: '30s'
              }}
            ></div>

            {/* Static rings */}
            <div className="radar-ring radar-ring-1"></div>
            <div className="radar-ring radar-ring-2"></div>
            <div className="radar-ring radar-ring-3"></div>
            <div className="radar-ring radar-ring-4"></div>

            {/* Crosshair */}
            <div className="radar-crosshair"></div>

            {/* Sweep */}
            <div
              className="radar-sweep"
              style={{ transform: `rotate(${radarAngle}deg)` }}
            ></div>

            {/* Blips */}
            <div
              className="radar-blip"
              style={{
                top: `${45 + Math.sin(time * 0.02) * 15}%`,
                left: `${55 + Math.cos(time * 0.02) * 10}%`
              }}
            ></div>
            <div
              className="radar-blip"
              style={{
                top: `${30 + Math.sin(time * 0.03 + 1) * 10}%`,
                left: `${35 + Math.cos(time * 0.03 + 1) * 15}%`,
                animationDelay: '0.5s'
              }}
            ></div>
            <div
              className="radar-blip"
              style={{
                top: `${65 + Math.sin(time * 0.025 + 2) * 12}%`,
                left: `${60 + Math.cos(time * 0.025 + 2) * 8}%`,
                animationDelay: '1s'
              }}
            ></div>
            <div
              className="radar-blip"
              style={{
                top: `${50 + Math.sin(time * 0.015 + 3) * 20}%`,
                left: `${25 + Math.cos(time * 0.015 + 3) * 5}%`,
                animationDelay: '0.3s',
                background: '#ff6600',
                boxShadow: '0 0 10px #ff6600, 0 0 20px #ff6600'
              }}
            ></div>

            {/* Center Info */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10
            }}>
              <div style={{
                fontSize: '2rem',
                fontFamily: 'Orbitron',
                textShadow: '0 0 20px #0ff',
                marginBottom: 5
              }}>
                {formatNumber(dataValues.scanProgress, 0)}%
              </div>
              <div style={{ fontSize: '0.7rem', color: '#0aa', letterSpacing: '0.2em' }}>
                SCANNING
              </div>
            </div>

            {/* Scan Progress Arc */}
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              viewBox="0 0 450 450"
            >
              <circle
                cx="225"
                cy="225"
                r="200"
                fill="none"
                stroke="rgba(0, 255, 255, 0.1)"
                strokeWidth="8"
              />
              <circle
                cx="225"
                cy="225"
                r="200"
                fill="none"
                stroke="#0ff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dataValues.scanProgress * 12.56} 1256`}
                transform="rotate(-90 225 225)"
                style={{ filter: 'drop-shadow(0 0 10px #0ff)' }}
              />
            </svg>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {/* Metrics Panel */}
          <div className="panel">
            <div className="corner-bracket tl"></div>
            <div className="corner-bracket tr"></div>
            <div className="corner-bracket bl"></div>
            <div className="corner-bracket br"></div>
            <div className="panel-label">METRICS</div>
            <div className="data-row">
              <span className="data-label">CORE TEMP</span>
              <span className="data-value">{formatNumber(dataValues.coreTemp, 1)}°K</span>
            </div>
            <div className="data-row">
              <span className="data-label">RADIATION</span>
              <span className="data-value">{formatNumber(dataValues.radiation, 3)} Sv</span>
            </div>
            <div className="data-row">
              <span className="data-label">PLASMA</span>
              <span className="data-value">{formatNumber(dataValues.plasmaFlow, 1)}%</span>
            </div>
            <div className="data-row">
              <span className="data-label">OUTPUT</span>
              <span className="data-value">{formatNumber(dataValues.energyOutput, 2)} GW</span>
            </div>
          </div>

          {/* Bar Graph Panel */}
          <div className="panel">
            <div className="panel-label">FREQUENCY ANALYSIS</div>
            <div className="bar-graph">
              {dataValues.barGraph.map((v, i) => (
                <div key={i} className="bar" style={{ height: `${v}%` }}></div>
              ))}
            </div>
          </div>

          {/* Signal Strength */}
          <div className="panel">
            <div className="panel-label">SIGNAL STRENGTH</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 3 }}>
                <span>CH-1</span>
                <span>{Math.round(dataValues.signal1)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${dataValues.signal1}%` }}></div>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 3 }}>
                <span>CH-2</span>
                <span>{Math.round(dataValues.signal2)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${dataValues.signal2}%` }}></div>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 3 }}>
                <span>CH-3</span>
                <span>{Math.round(dataValues.signal3)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${dataValues.signal3}%` }}></div>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 3 }}>
                <span>CH-4</span>
                <span>{Math.round(dataValues.signal4)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${dataValues.signal4}%` }}></div>
              </div>
            </div>
          </div>

          {/* Frequency Bars */}
          <div className="panel">
            <div className="panel-label">SPECTRUM</div>
            <div className="freq-bars">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="freq-bar"
                  style={{
                    height: `${20 + Math.sin((time * 0.1) + i * 0.5) * 20 + Math.random() * 10}px`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="status-dot active"></div>
          <span style={{ fontSize: '0.75rem' }}>OPERATIONAL</span>
        </div>
        <div className="ticker" style={{ flex: 1, overflow: 'hidden' }}>
          <span className="ticker-content">
            SYSTEM NOMINAL // QUANTUM ARRAY SYNCHRONIZED // SECTOR 7 SCAN ACTIVE // NAVIGATION LOCKED // SHIELDS AT 100% // DATA STREAM ACTIVE // CORE TEMPERATURE STABLE //
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#0aa' }}>
          MEM: <span style={{ color: '#0ff' }}>{(45 + Math.sin(time * 0.05) * 5).toFixed(1)}%</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#0aa' }}>
          CPU: <span style={{ color: '#0ff' }}>{(32 + Math.sin(time * 0.07) * 8).toFixed(1)}%</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <h2>SETTINGS</h2>
        <p style={{ color: '#0aa', fontSize: '0.8rem', marginBottom: 20 }}>
          HUD is running in continuous animation mode. All data values are dynamically updating.
        </p>
        <button onClick={() => setShowControls(false)}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default SciFiHUD;

import React, { useState, useEffect } from 'react';
import { Save, Upload, Play, Pause, Settings, X } from 'lucide-react';

const SciFiHUD = () => {
  const defaultData = {
    mainTitle: "STELLAR NEXUS",
    subtitle: "QUANTUM ARRAY SYSTEM",
    systemStatus: "OPERATIONAL",
    coordinates: ["X: 42.7394", "Y: -118.2615", "Z: 2847.9"],
    metrics: [
      { label: "CORE TEMP", value: "347.2°K", status: "nominal" },
      { label: "RADIATION", value: "0.012 Sv", status: "safe" },
      { label: "PLASMA FLOW", value: "89.7%", status: "optimal" },
      { label: "ENERGY OUTPUT", value: "1.21 GW", status: "stable" }
    ],
    alerts: [
      "SECTOR 7 SCAN COMPLETE",
      "NAVIGATION LOCKED",
      "SHIELDS AT 100%"
    ],
    timestamp: "2247.01.27 / 14:23:47"
  };

  const [data, setData] = useState(defaultData);
  const [presets, setPresets] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [editingField, setEditingField] = useState(null);

  // Load presets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hud-presets');
    if (saved) setPresets(JSON.parse(saved));
  }, []);

  const savePreset = () => {
    const name = prompt("Nom du preset :");
    if (!name) return;
    const newPresets = [...presets, { name, data: { ...data } }];
    setPresets(newPresets);
    localStorage.setItem('hud-presets', JSON.stringify(newPresets));
  };

  const loadPreset = (preset) => {
    setData(preset.data);
  };

  const deletePreset = (index) => {
    const newPresets = presets.filter((_, i) => i !== index);
    setPresets(newPresets);
    localStorage.setItem('hud-presets', JSON.stringify(newPresets));
  };

  const updateField = (path, value) => {
    setData(prev => {
      const newData = { ...prev };
      if (path.includes('.')) {
        const [parent, child] = path.split('.');
        newData[parent] = { ...newData[parent], [child]: value };
      } else {
        newData[path] = value;
      }
      return newData;
    });
  };

  const updateArrayField = (field, index, value) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const updateMetric = (index, key, value) => {
    setData(prev => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) => 
        i === index ? { ...metric, [key]: value } : metric
      )
    }));
  };

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
          background: #000;
          color: #0ff;
          font-family: 'Share Tech Mono', monospace;
          position: relative;
          overflow: hidden;
        }

        /* CRT Effects */
        .hud-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 1000;
          animation: scanline 8s linear infinite;
        }

        .hud-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
          pointer-events: none;
          z-index: 999;
        }

        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }

        /* Glitch Animation */
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .glitch {
          animation: glitch 0.3s infinite;
        }

        /* Main Layout */
        .hud-content {
          width: 100%;
          height: 100%;
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: auto 1fr auto;
          gap: 30px;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .hud-header {
          grid-column: 1 / -1;
          text-align: center;
          border-bottom: 2px solid #0ff;
          padding-bottom: 20px;
          position: relative;
        }

        .main-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: 0.3em;
          text-shadow: 
            0 0 10px #0ff,
            0 0 20px #0ff,
            0 0 30px #0ff,
            0 0 40px #0aa;
          animation: glow 2s ease-in-out infinite alternate;
          margin-bottom: 10px;
        }

        @keyframes glow {
          from { text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff; }
          to { text-shadow: 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff, 0 0 50px #0aa; }
        }

        .subtitle {
          font-size: 1rem;
          letter-spacing: 0.2em;
          color: #0aa;
          text-transform: uppercase;
        }

        /* Panels */
        .panel {
          background: rgba(0, 20, 30, 0.8);
          border: 1px solid #0ff;
          padding: 20px;
          box-shadow: 
            inset 0 0 20px rgba(0, 255, 255, 0.1),
            0 0 20px rgba(0, 255, 255, 0.2);
          position: relative;
        }

        .panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0ff, transparent);
          animation: scan 2s linear infinite;
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .panel-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.2rem;
          color: #ff6600;
          margin-bottom: 15px;
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px #ff6600;
        }

        /* Left Panel - Coordinates */
        .coordinates {
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .coord-line {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          padding: 5px 0;
          border-bottom: 1px solid rgba(0, 255, 255, 0.2);
        }

        /* Center Panel - Metrics */
        .metrics-grid {
          display: grid;
          gap: 20px;
        }

        .metric-card {
          background: rgba(0, 255, 255, 0.05);
          border-left: 3px solid #0ff;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s;
        }

        .metric-card:hover {
          background: rgba(0, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .metric-label {
          font-size: 0.9rem;
          color: #0aa;
          letter-spacing: 0.1em;
        }

        .metric-value {
          font-size: 1.4rem;
          font-weight: bold;
          text-shadow: 0 0 10px currentColor;
        }

        .status-nominal { color: #0f0; }
        .status-safe { color: #0ff; }
        .status-optimal { color: #0f0; }
        .status-stable { color: #ff6600; }

        /* Right Panel - Alerts */
        .alerts-list {
          list-style: none;
        }

        .alert-item {
          padding: 12px;
          margin: 10px 0;
          background: rgba(255, 102, 0, 0.1);
          border-left: 3px solid #ff6600;
          font-size: 0.9rem;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Footer */
        .hud-footer {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #0ff;
          padding-top: 20px;
        }

        .system-status {
          font-size: 1.2rem;
          color: #0f0;
          text-shadow: 0 0 10px #0f0;
          letter-spacing: 0.1em;
        }

        .timestamp {
          font-family: 'Orbitron', sans-serif;
          font-size: 1rem;
          color: #0aa;
          letter-spacing: 0.15em;
        }

        /* Control Panel */
        .control-panel {
          position: fixed;
          top: 0;
          right: ${showControls ? '0' : '-400px'};
          width: 400px;
          height: 100vh;
          background: rgba(0, 10, 20, 0.95);
          border-left: 2px solid #0ff;
          padding: 20px;
          overflow-y: auto;
          transition: right 0.3s;
          z-index: 2000;
        }

        .control-section {
          margin: 20px 0;
          padding: 15px;
          background: rgba(0, 255, 255, 0.05);
          border: 1px solid rgba(0, 255, 255, 0.2);
        }

        .control-label {
          font-size: 0.8rem;
          color: #0aa;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        input, textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid #0ff;
          color: #0ff;
          padding: 8px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          margin: 5px 0;
        }

        input:focus, textarea:focus {
          outline: none;
          box-shadow: 0 0 10px #0ff;
        }

        button {
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid #0ff;
          color: #0ff;
          padding: 10px 20px;
          font-family: 'Orbitron', sans-serif;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
        }

        button:hover {
          background: rgba(0, 255, 255, 0.2);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
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
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .preset-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .preset-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          margin: 5px 0;
          background: rgba(0, 255, 255, 0.05);
          border: 1px solid rgba(0, 255, 255, 0.2);
        }

        .preset-item:hover {
          background: rgba(0, 255, 255, 0.1);
        }

        .corner-decoration {
          position: absolute;
          width: 30px;
          height: 30px;
          border: 2px solid #0ff;
        }

        .corner-decoration.top-left {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }

        .corner-decoration.top-right {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
        }

        .corner-decoration.bottom-left {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
        }

        .corner-decoration.bottom-right {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }

        .grid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
        }

        @media (max-width: 1200px) {
          .hud-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .main-title {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <div className="grid-bg"></div>

      <div className="toolbar">
        <button onClick={() => setIsPlaying(!isPlaying)} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={savePreset} title="Save Preset">
          <Save size={24} />
        </button>
        <button onClick={() => setShowControls(!showControls)} title="Settings">
          <Settings size={24} />
        </button>
      </div>

      <div className="hud-content">
        <div className="hud-header">
          <div className="corner-decoration top-left"></div>
          <div className="corner-decoration top-right"></div>
          <div className={`main-title ${isPlaying ? 'glitch' : ''}`}>
            {data.mainTitle}
          </div>
          <div className="subtitle">{data.subtitle}</div>
        </div>

        <div className="panel">
          <div className="panel-title">◢ COORDINATES</div>
          <div className="coordinates">
            {data.coordinates.map((coord, i) => (
              <div key={i} className="coord-line">
                <span>{coord.split(':')[0]}:</span>
                <span>{coord.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">◢ SYSTEM METRICS</div>
          <div className="metrics-grid">
            {data.metrics.map((metric, i) => (
              <div key={i} className="metric-card">
                <div className="metric-label">{metric.label}</div>
                <div className={`metric-value status-${metric.status}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">◢ ALERTS</div>
          <ul className="alerts-list">
            {data.alerts.map((alert, i) => (
              <li key={i} className="alert-item">
                ▸ {alert}
              </li>
            ))}
          </ul>
        </div>

        <div className="hud-footer">
          <div className="corner-decoration bottom-left"></div>
          <div className="corner-decoration bottom-right"></div>
          <div className="system-status">
            ● STATUS: {data.systemStatus}
          </div>
          <div className="timestamp">
            {data.timestamp}
          </div>
        </div>
      </div>

      <div className="control-panel">
        <h2 style={{ marginBottom: '20px', fontFamily: 'Orbitron', letterSpacing: '0.2em' }}>
          CONTROL PANEL
        </h2>
        
        <div className="control-section">
          <div className="control-label">Main Title</div>
          <input 
            value={data.mainTitle}
            onChange={(e) => updateField('mainTitle', e.target.value)}
          />
        </div>

        <div className="control-section">
          <div className="control-label">Subtitle</div>
          <input 
            value={data.subtitle}
            onChange={(e) => updateField('subtitle', e.target.value)}
          />
        </div>

        <div className="control-section">
          <div className="control-label">Coordinates</div>
          {data.coordinates.map((coord, i) => (
            <input 
              key={i}
              value={coord}
              onChange={(e) => updateArrayField('coordinates', i, e.target.value)}
            />
          ))}
        </div>

        <div className="control-section">
          <div className="control-label">Metrics</div>
          {data.metrics.map((metric, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <input 
                placeholder="Label"
                value={metric.label}
                onChange={(e) => updateMetric(i, 'label', e.target.value)}
              />
              <input 
                placeholder="Value"
                value={metric.value}
                onChange={(e) => updateMetric(i, 'value', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="control-section">
          <div className="control-label">Alerts</div>
          {data.alerts.map((alert, i) => (
            <input 
              key={i}
              value={alert}
              onChange={(e) => updateArrayField('alerts', i, e.target.value)}
            />
          ))}
        </div>

        <div className="control-section">
          <div className="control-label">Status & Time</div>
          <input 
            value={data.systemStatus}
            onChange={(e) => updateField('systemStatus', e.target.value)}
          />
          <input 
            value={data.timestamp}
            onChange={(e) => updateField('timestamp', e.target.value)}
          />
        </div>

        <div className="control-section">
          <div className="control-label">Presets</div>
          <div className="preset-list">
            {presets.map((preset, i) => (
              <div key={i} className="preset-item">
                <span onClick={() => loadPreset(preset)} style={{ cursor: 'pointer', flex: 1 }}>
                  {preset.name}
                </span>
                <button onClick={() => deletePreset(i)} style={{ padding: '5px 10px' }}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setShowControls(false)} style={{ width: '100%', marginTop: '20px' }}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default SciFiHUD;

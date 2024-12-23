import React, { useState, useRef, useEffect } from 'react';
import { 
  Pencil, 
  Square, 
  Circle, 
  Type, 
  Eraser, 
  Undo, 
  Redo,
  Download,
  Trash,
  Palette
} from 'lucide-react';

const WhiteboardTool = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const tools = [
    { id: 'pencil', icon: Pencil, label: 'Pencil' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set initial canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set initial canvas style
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    switch (tool) {
      case 'pencil':
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      case 'rectangle':
        // Implementation for rectangle drawing
        break;
      case 'circle':
        // Implementation for circle drawing
        break;
      case 'eraser':
        ctx.strokeStyle = '#ffffff';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = color;
        break;
      default:
        break;
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL();
      
      // Save to history
      const newHistory = [...history.slice(0, historyIndex + 1), imageData];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      loadImageFromHistory(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      loadImageFromHistory(historyIndex + 1);
    }
  };

  const loadImageFromHistory = (index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = history[index];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save clear state to history
    const imageData = canvas.toDataURL();
    setHistory([...history, imageData]);
    setHistoryIndex(history.length);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {tools.map((toolItem) => (
            <button
              key={toolItem.id}
              onClick={() => setTool(toolItem.id)}
              className={`p-2 rounded-lg ${
                tool === toolItem.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
              title={toolItem.label}
            >
              <toolItem.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
          <select
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="p-1 border rounded"
          >
            <option value={2}>Thin</option>
            <option value={4}>Medium</option>
            <option value={6}>Thick</option>
          </select>
        </div>
      </div>

      <div className="flex-1 border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex space-x-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 text-gray-600 disabled:opacity-50"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 text-gray-600 disabled:opacity-50"
          >
            <Redo className="w-5 h-5" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={clearCanvas}
            className="p-2 text-red-600"
            title="Clear canvas"
          >
            <Trash className="w-5 h-5" />
          </button>
          <button
            onClick={downloadCanvas}
            className="p-2 text-blue-600"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardTool;
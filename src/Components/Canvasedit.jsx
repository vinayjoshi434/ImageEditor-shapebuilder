import { useEffect, useRef, useState } from "react";
// import { Canvas, IText, Rect, Circle, Triangle } from "fabric";
// import { FabricImage } from "fabric";

import { fabric } from "fabric";

const CanvasEdit = ({ image, onBack }) => {
  const canvasRef = useRef(null);
  const [canvas, setcanvas] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
      });

      fabric.Image.fromURL(
        image,
        (img) => {
          if (!img) {
            console.error("Failed to load the image");
            return;
          }

          img.scaleToWidth(800);
          initCanvas.setBackgroundImage(
            img,
            initCanvas.renderAll.bind(initCanvas)
          );
        },
        {
          crossOrigin: "anonymous",
        }
      );

      setcanvas(initCanvas); // set AFTER everything is good
      return () => {
        initCanvas.dispose();
      };
    }
  }, [image]);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Your Caption", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "white",
    });
    canvas.add(text);
  };

  const addShape = (type) => {
    const initcanvas = canvasRef.current;
    let shape;
    switch (type) {
      case "circle":
        shape = new fabric.Circle({
          radius: 30,
          fill: "red",
          left: 150,
          top: 150,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 60,
          height: 60,
          fill: "green",
          left: 150,
          top: 150,
        });
        break;
      case "rect":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "blue",
          left: 150,
          top: 150,
        });
        break;
      default:
        return;
    }
    canvas.add(shape);
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const downloadImage = () => {
    console.log("Hello");
    if (!canvas) return; // Ensure the canvas exists
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div className="mt-6">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        ← Back to Results
      </button>
      <div className="flex gap-4 mb-4">
        <button
          onClick={addText}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add Text
        </button>
        <button
          onClick={() => addShape("rect")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Rectangle
        </button>
        <button
          onClick={() => addShape("circle")}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Circle
        </button>
        <button
          onClick={() => addShape("triangle")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Triangle
        </button>
        <button
          onClick={deleteSelected}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Delete Selected
        </button>
        <button
          onClick={downloadImage}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Download
        </button>
      </div>
      <canvas
        id="fabricCanvas"
        ref={canvasRef}
        className="border border-gray-400"
      />
    </div>
  );
};

export default CanvasEdit;

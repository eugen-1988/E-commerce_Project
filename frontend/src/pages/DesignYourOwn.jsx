import React, { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import PreviewCustomProduct from "./PreviewCustomProduct";

const DesignYourOwn = () => {
  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const [bgImage, setBgImage] = useState(assets.back_img);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [activeText, setActiveText] = useState(null);
  const [deleteIconPos, setDeleteIconPos] = useState(null);
  const [savedImage, setSavedImage] = useState(null);
  const [textOptions, setTextOptions] = useState({
    text: "Your text here",
    fontSize: 24,
    fill: "#000000",
    fontFamily: "Arial",
    curved: false,
    angle: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "transparent",
    });

    const resizeCanvas = () => {
      const container = canvasRef.current?.parentElement;
      if (!container) return;
      if (!canvas.lowerCanvasEl) return;

      canvas.setWidth(container.clientWidth);
      canvas.setHeight(container.clientHeight);
      canvas.renderAll();
    };
    const img = new Image();
    img.src = bgImage;

    img.onload = function () {
      resizeCanvas();
      const fabricBg = new fabric.Image(img, {
        selectable: false,
        evented: false,
        hasControls: false,
        hasBorders: false,
      });

      fabricBg.scaleToWidth(canvas.getWidth());
      fabricBg.scaleToHeight(canvas.getHeight());

      fabricBg.left = (canvas.getWidth() - fabricBg.getScaledWidth()) / 2;
      fabricBg.top = (canvas.getHeight() - fabricBg.getScaledHeight()) / 2;

      canvas.add(fabricBg);

      canvas.renderAll();
    };

    canvasRef.current.fabric = canvas;

    canvas.on("selection:created", updateDeleteIconHTML);
    canvas.on("selection:updated", updateDeleteIconHTML);
    canvas.on("selection:cleared", () => setDeleteIconPos(null));
    canvas.on("object:moving", updateDeleteIconHTML);
    canvas.on("object:scaling", updateDeleteIconHTML);
    canvas.on("object:rotating", updateDeleteIconHTML);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [bgImage]);

  const updateDeleteIconHTML = () => {
    const canvas = canvasRef.current?.fabric;
    const activeObject = canvas?.getActiveObject();
    const canvasElem = canvasRef.current;
    if (!canvas || !activeObject || !canvasElem) return;

    const canvasRect = canvasElem.getBoundingClientRect();
    const objectRect = activeObject.getBoundingRect(true);

    setDeleteIconPos({
      top: canvasRect.top + objectRect.top - 180,
      left: canvasRect.left + objectRect.left + objectRect.width - 320,
    });
  };

  const handleDelete = () => {
    const canvas = canvasRef.current?.fabric;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      setShowTextEditor(false);
      setDeleteIconPos(null);
    }
  };

  const addText = () => {
    const canvas = canvasRef.current?.fabric;
    if (!canvas) return;

    if (showTextEditor) {
      setShowTextEditor(false);
      setActiveText(null);
      canvas.discardActiveObject();
      canvas.renderAll();
      return;
    }

    const text = new fabric.IText(textOptions.text, {
      left: 320,
      top: 200,
      fill: textOptions.fill,
      fontSize: textOptions.fontSize,
      fontFamily: textOptions.fontFamily,
      angle: textOptions.angle,
      hasRotatingPoint: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    setActiveText(text);
    setShowTextEditor(true);
  };

  const updateActiveText = (option, value) => {
    const canvas = canvasRef.current?.fabric;
    if (!canvas || !activeText) return;

    if (activeText.type === "group" && Array.isArray(activeText._objects)) {
      activeText._objects.forEach((obj) => {
        if (obj.set) obj.set(option, value);
      });
    } else {
      activeText.set(option, value);
    }

    canvas.renderAll();

    setTextOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  const updateRotation = (angle) => {
    const canvas = canvasRef.current?.fabric;
    if (!canvas || !activeText) return;

    activeText.set("angle", angle);
    canvas.renderAll();

    setTextOptions((prev) => ({
      ...prev,
      angle,
    }));
  };

  const toggleCurvedText = () => {
    const canvas = canvasRef.current?.fabric;
    if (!canvas) return;

    const current = canvas.getActiveObject();
    if (!current) return;

    const isCurved = current.type === "group";
    const actualText = current.text || textOptions.text;
    const fontSize = current.fontSize || textOptions.fontSize;
    const fill = current.fill || textOptions.fill;
    const fontFamily = current.fontFamily || textOptions.fontFamily;
    const centerX = current.left || 320;
    const centerY = current.top || 200;
    const arcAngle = Math.PI / 2;
    const radius = 100;

    if (isCurved) {
      const straight = new fabric.IText(actualText, {
        left: centerX,
        top: centerY,
        fill,
        fontSize,
        fontFamily,
        originX: "center",
        originY: "center",
        angle: current.angle || 0,
      });

      canvas.remove(current);
      canvas.add(straight);
      canvas.setActiveObject(straight);
      setActiveText(straight);
      setTextOptions((prev) => ({
        ...prev,
        curved: false,
        text: actualText,
        angle: straight.angle,
      }));
    } else {
      const letters = actualText.split("");
      const angleStep = arcAngle / (letters.length - 1);
      const startAngle = -arcAngle / 2;

      const letterObjects = letters.map((char, i) => {
        const angle = startAngle + i * angleStep;
        const x = radius * Math.sin(angle);
        const y = radius * (1 - Math.cos(angle));

        return new fabric.Text(char, {
          left: x,
          top: y,
          originX: "center",
          originY: "center",
          angle: (angle * 180) / Math.PI,
          fontFamily,
          fontSize,
          fill,
        });
      });

      const group = new fabric.Group(letterObjects, {
        left: centerX,
        top: centerY,
        originX: "center",
        originY: "center",
        angle: current.angle || 0,
        hasRotatingPoint: true,
      });

      canvas.remove(current);
      canvas.add(group);
      canvas.setActiveObject(group);
      setActiveText(group);
      setTextOptions((prev) => ({
        ...prev,
        curved: true,
        text: actualText,
        angle: group.angle,
      }));
    }

    canvas.renderAll();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (f) {
      const imgElement = new Image();
      imgElement.src = f.target.result;

      imgElement.onload = function () {
        const fabricImage = new fabric.Image(imgElement);
        fabricImage.scaleToWidth(200);
        fabricImage.set({
          left: 300,
          top: 150,
          selectable: true,
        });

        const canvas = canvasRef.current?.fabric;
        if (canvas) {
          canvas.add(fabricImage);
          canvas.setActiveObject(fabricImage);
          canvas.renderAll();
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const rotateActiveObject = () => {
    setBgImage((current) =>
      current === assets.back_img ? assets.front_img : assets.back_img
    );
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current?.fabric;
    if (!canvas) return;

    // Șterge tot conținutul
    canvas.clear();

    // Reîncarcă imaginea de fundal
    const img = new Image();
    img.src = bgImage;

    img.onload = function () {
      const fabricBg = new fabric.Image(img, {
        selectable: false,
        evented: false,
        hasControls: false,
        hasBorders: false,
      });

      // Scalează și centrează imaginea
      fabricBg.scaleToWidth(canvas.getWidth());
      fabricBg.scaleToHeight(canvas.getHeight());

      fabricBg.left = (canvas.getWidth() - fabricBg.getScaledWidth()) / 2;
      fabricBg.top = (canvas.getHeight() - fabricBg.getScaledHeight()) / 2;

      canvas.add(fabricBg);
      canvas.renderAll();
    };

    // Resetări adiționale
    setActiveText(null);
    setShowTextEditor(false);
    setDeleteIconPos(null);
  };

  return (
    <>
      {/* CONȚINUTUL CENTRAL: CANVAS, EDITOR */}
      <div className="flex flex-col items-center gap-4 p-4 w-full max-w-screen-xl mx-auto relative">
        <Title text1={"CREATE"} text2={"YOUR OWN DESIGN"} />
        <div className="relative flex flex-col lg:flex-row items-start w-full gap-2">
          {/* BUTOANE ȘI CANVAS */}
          <div className="relative border border-gray-400 w-full lg:w-auto">
            <div className="absolute top-2 left-2 z-10 flex flex-col items-center gap-2">
              <label
                className="flex flex-col items-center p-1 border border-transparent rounded bg-white shadow-md w-14 
                hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              >
                <img src={assets.upload_img} alt="Upload" className="w-6 h-6" />
                <span className="text-[10px]">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={rotateActiveObject}
                className="flex flex-col items-center p-1 border border-transparent rounded bg-white shadow-md w-14 
                hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              >
                <img src={assets.rotate_img} alt="Rotate" className="w-6 h-6" />
                <span className="text-[10px]">Rotate</span>
              </button>

              <button
                onClick={resetCanvas}
                className="flex flex-col items-center p-1 border border-transparent rounded bg-white shadow-md w-14 
                hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              >
                <img src={assets.reset_img} alt="Reset" className="w-6 h-6" />
                <span className="text-[10px]">Reset</span>
              </button>

              <button
                onClick={() => {
                  const canvas = canvasRef.current?.fabric;
                  if (!canvas) return;
                  const image = canvas.toDataURL({ format: "png", quality: 1 });
                  setSavedImage(image);

                  setTimeout(() => {
                    previewRef.current?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="flex flex-col items-center p-1 border border-transparent rounded bg-white shadow-md w-14 
                  hover:bg-green-100 hover:border-green-400 hover:scale-[1.05] transition-all duration-200"
              >
                <img src={assets.save_img} alt="Save" className="w-6 h-6" />
                <span className="text-[10px] font-semibold text-green-700">
                  Save Design
                </span>
              </button>
            </div>

            <div className="relative w-full max-w-[800px] aspect-[4/3] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="absolute top-0 left-0 w-full h-full"
              />

              {deleteIconPos && (
                <div
                  onClick={handleDelete}
                  style={{
                    position: "absolute",
                    top: `${deleteIconPos.top}px`,
                    left: `${deleteIconPos.left}px`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    zIndex: 50,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <path d="M9 3v1H4v2h1v14a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9zm2 4h2v12h-2V7zm4 0h2v12h-2V7zM7 7h2v12H7V7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* EDITOR TEXT */}
          <div className="relative flex flex-col items-start gap-1 mt-4 lg:mt-0">
            <button
              onClick={addText}
              className="flex flex-col items-center p-1 border border-transparent rounded bg-white shadow-md w-14 
                hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
            >
              <img src={assets.text_img} alt="Text" className="w-8 h-6" />
              <span className="text-[10px]">Add Text</span>
            </button>

            {showTextEditor && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-[280px] max-w-[90vw] mt-1 text-sm flex flex-col gap-4">
                <div>
                  <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Text
                  </label>
                  <input
                    type="text"
                    value={textOptions.text}
                    onChange={(e) => {
                      const newText = e.target.value;
                      setTextOptions((prev) => ({ ...prev, text: newText }));

                      if (!activeText || !canvasRef.current?.fabric) return;
                      const canvas = canvasRef.current.fabric;

                      if (activeText.type === "group") {
                        const fontSize = textOptions.fontSize;
                        const fill = textOptions.fill;
                        const fontFamily = textOptions.fontFamily;
                        const centerX = activeText.left;
                        const centerY = activeText.top;
                        const arcAngle = Math.PI / 2;
                        const radius = 100;

                        const letters = newText.split("");
                        const angleStep =
                          arcAngle / Math.max(letters.length - 1, 1);
                        const startAngle = -arcAngle / 2;

                        const letterObjects = letters.map((char, i) => {
                          const angle = startAngle + i * angleStep;
                          const x = radius * Math.sin(angle);
                          const y = radius * (1 - Math.cos(angle));

                          return new fabric.Text(char, {
                            left: x,
                            top: y,
                            originX: "center",
                            originY: "center",
                            angle: (angle * 180) / Math.PI,
                            fontFamily,
                            fontSize,
                            fill,
                          });
                        });

                        const newGroup = new fabric.Group(letterObjects, {
                          left: centerX,
                          top: centerY,
                          originX: "center",
                          originY: "center",
                          angle: activeText.angle || 0,
                          hasRotatingPoint: true,
                        });

                        canvas.remove(activeText);
                        canvas.add(newGroup);
                        canvas.setActiveObject(newGroup);
                        setActiveText(newGroup);
                      } else {
                        activeText.set("text", newText);
                      }

                      canvas.renderAll();
                    }}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#007c99]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Font size
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={textOptions.fontSize}
                    onChange={(e) =>
                      updateActiveText("fontSize", parseInt(e.target.value))
                    }
                    className="w-full accent-[#007c99]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Color
                  </label>
                  <input
                    type="color"
                    value={textOptions.fill}
                    onChange={(e) => updateActiveText("fill", e.target.value)}
                    className="w-full h-10 p-1 rounded-md border cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Font Family
                  </label>
                  <select
                    value={textOptions.fontFamily}
                    onChange={(e) =>
                      updateActiveText("fontFamily", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#007c99]"
                  >
                    {[
                      "Anton",
                      "Bebas Neue",
                      "Black Ops One",
                      "Cinzel Decorative",
                      "DM Serif Display",
                      "Fredericka the Great",
                      "Gajraj One",
                      "Germania One",
                      "Gloock",
                      "Grenze Gotisch",
                      "Holtwood One SC",
                      "Monoton",
                      "Orbitron",
                      "Permanent Marker",
                      "Press Start 2P",
                      "Rock Salt",
                      "Ruslan Display",
                      "Staatliches",
                      "Syncopate",
                      "UnifrakturCook",
                      "Outfit",
                      "Prata",
                      "Arial",
                      "Comic Sans MS",
                      "Impact",
                    ].map((font) => (
                      <option
                        key={font}
                        value={font}
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Rotation
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={textOptions.angle}
                    onChange={(e) => updateRotation(parseInt(e.target.value))}
                    className="w-full accent-[#007c99]"
                  />
                  <div className="text-[11px] text-center text-gray-500 mt-1">
                    {textOptions.angle}°
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <button
                    onClick={toggleCurvedText}
                    className="px-4 py-2 rounded-md bg-[#005f78] text-white text-sm font-medium shadow-sm 
                     hover:bg-[#007c99] hover:scale-[1.02] transition-all duration-200 ease-out"
                  >
                    Toggle Curved
                  </button>

                  <button
                    onClick={() => setShowTextEditor(false)}
                    className="px-4 py-2 rounded-md bg-gray-100 text-sm text-gray-700 font-medium border border-gray-300 
                     hover:bg-gray-200 hover:text-black hover:scale-[1.01] transition-all duration-200 ease-out"
                  >
                    Close Editor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PREVIEW LARG - ÎN AFARA CONTAINERULUI */}
      {savedImage && (
        <div className="w-full px-4 mt-10" ref={previewRef}>
          <PreviewCustomProduct
            productData={{
              _id: "custom-001",
              name: "Your Custom Product",
              image: [savedImage],
              price: 129.99,
              sizes: ["S", "M", "L", "XL"],
              description: "This is your custom-designed product preview.",
            }}
            canvasImage={savedImage} // 🔥 AICI e cheia
          />
        </div>
      )}
    </>
  );
};

export default DesignYourOwn;

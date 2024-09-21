const colorPicker = document.getElementById("color-picker");
const canvasColor = document.getElementById("canvas-color");
const fontSize = document.getElementById("font-size");
const canvasBox = document.getElementById("canvas-box");
const clear = document.getElementById("clear");
const downloadBtn = document.getElementById("download");
const saved = document.getElementById("saved");
const canvas = canvasBox.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener("change", (e) => {
  canvas.strokeStyle = e.target.value;
  canvas.fillStyle = e.target.value;
});

canvasBox.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvasBox.addEventListener("mousemove", (e) => {
  if (isDrawing === true) {
    canvas.beginPath();
    canvas.moveTo(lastX, lastY);
    canvas.lineTo(e.offsetX, e.offsetY);
    canvas.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvasBox.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

canvasColor.addEventListener("change", (e) => {
  canvas.fillStyle = e.target.value;
  canvas.fillRect(0, 0, 800, 500);
});

fontSize.addEventListener("change", (e) => {
  const size = parseInt(e.target.value); // Remove 'px' and convert to an integer
  canvas.lineWidth = size; // Set the line width
});
clear.addEventListener("click", () => {
  canvas.clearRect(0, 0, canvasBox.width, canvasBox.height);
});

downloadBtn.addEventListener("click", () => {
  localStorage.setItem("canvascontent", canvasBox.toDataURL()); // Store canvas content in localStorage
  let link = document.createElement("a");
  link.download = "my_canvas.png";
  link.href = canvasBox.toDataURL();
  link.click();
});

saved.addEventListener("click", (e) => {
  let savedCanvas = localStorage.getItem("canvascontent");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    canvas.drawImage(img, 0, 0);
  }
});

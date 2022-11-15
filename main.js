const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

//Variable temporaire
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;


//Action for etch a stetch
const colorMode = document.getElementById("colorMode");
const colorBtn = document.getElementById("colorBtn");
const randomBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

colorBtn.onclick = () => setCurrentMode("color");
randomBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

// ? Functions

function setCurrentColor(newColor) {
  currentColor = newColor;
}
function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}
function setCurrentSize(newSize) {
  currentSize = newSize;
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = "";
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, auto)`;
  grid.style.gridTemplateRows = `repeat(${size}, auto)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}
//Change Color on mouseOver
function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    colorMode.style.display = "none";
    randomBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
    colorMode.style.display = "contents";
  } else if (currentMode === "eraser") {
    colorMode.style.display = "contents";
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    colorMode.style.display = "none";
    randomBtn.classList.add("active");
  } else if (newMode === "color") {
    colorMode.style.display = "contents";
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    colorMode.style.display = "contents";
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};

function hexFromRGB(r, g, b) {
  var hex = [r.toString(16), g.toString(16), b.toString(16)];
  $.each(hex, function (nr, val) {
    if (val.length === 1) {
      hex[nr] = "0" + val;
    }
  });
  return hex.join("").toUpperCase();
}

//Slider Color
function refreshSwatch() {
  var red = $("#red").slider("value"),
    green = $("#green").slider("value"),
    blue = $("#blue").slider("value"),
    hex = hexFromRGB(red, green, blue);
  $("#swatch").css("background-color", "#" + hex);
  setCurrentColor("#" + hex);
  console.log("red" + red + "green" + green + "blue" + blue);
  $("#redValue").text("Red: " + red);
  $("#greenValue").text("Green: " + green);
  $("#blueValue").text("Blue: " + blue);
}
$(function () {
  $("#red, #green, #blue").slider({
    orientation: "horizontal",
    range: "min",
    min: 0,
    max: 255,
    slide: refreshSwatch,
    change: refreshSwatch,
  });
  $("#red").slider("value", 0);
  $("#green").slider("value", 140);
  $("#blue").slider("value", 228);
});

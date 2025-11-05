// Body parts data
const bodyParts = [
  { id: "cabeza", label: "Cabeza", x: 150, y: 40 },
  { id: "cuello", label: "Cuello", x: 150, y: 80 },
  { id: "hombro-izq", label: "Hombro Izquierdo", x: 100, y: 110 },
  { id: "hombro-der", label: "Hombro Derecho", x: 200, y: 110 },
  { id: "pecho", label: "Pecho", x: 150, y: 130 },
  { id: "brazo-izq", label: "Brazo Izquierdo", x: 75, y: 160 },
  { id: "brazo-der", label: "Brazo Derecho", x: 225, y: 160 },
  { id: "abdomen", label: "Abdomen", x: 150, y: 180 },
  { id: "codo-izq", label: "Codo Izquierdo", x: 60, y: 200 },
  { id: "codo-der", label: "Codo Derecho", x: 240, y: 200 },
  { id: "cadera", label: "Cadera", x: 150, y: 230 },
  { id: "mano-izq", label: "Mano Izquierda", x: 50, y: 240 },
  { id: "mano-der", label: "Mano Derecha", x: 250, y: 240 },
  { id: "muslo-izq", label: "Muslo Izquierdo", x: 130, y: 280 },
  { id: "muslo-der", label: "Muslo Derecho", x: 170, y: 280 },
  { id: "rodilla-izq", label: "Rodilla Izquierda", x: 130, y: 330 },
  { id: "rodilla-der", label: "Rodilla Derecha", x: 170, y: 330 },
  { id: "pie-izq", label: "Pie Izquierdo", x: 130, y: 400 },
  { id: "pie-der", label: "Pie Derecho", x: 170, y: 400 },
];
const button = document.querySelector("btn_1");
const button_2 = document.querySelector("btn_2");

let selectedParts = [];

// Initialize body points
function initBodyPoints() {
  const container = document.getElementById("bodyPoints");
  bodyParts.forEach((part) => {
    // Visible circle
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", part.x);
    circle.setAttribute("cy", part.y);
    circle.setAttribute("r", "8");
    circle.setAttribute("fill", "#00d9ff");
    circle.setAttribute("filter", "url(#glow)");
    circle.classList.add("body-point");
    circle.dataset.id = part.id;

    // Hit area (larger invisible circle)
    const hitArea = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    hitArea.setAttribute("cx", part.x);
    hitArea.setAttribute("cy", part.y);
    hitArea.setAttribute("r", "12");
    hitArea.setAttribute("fill", "transparent");
    hitArea.style.cursor = "pointer";
    hitArea.onclick = () => toggleBodyPart(part.id);

    container.appendChild(circle);
    container.appendChild(hitArea);
  });
}

function toggleBodyPart(id) {
  const index = selectedParts.indexOf(id);
  if (index > -1) {
    selectedParts.splice(index, 1);
  } else {
    selectedParts.push(id);
  }
  updateBodyMap();
  updateSelectedAreas();
}

function updateBodyMap() {
  const circles = document.querySelectorAll(".body-point");
  circles.forEach((circle) => {
    const id = circle.dataset.id;
    if (selectedParts.includes(id)) {
      circle.setAttribute("fill", "#ff006e");
    } else {
      circle.setAttribute("fill", "#00d9ff");
    }
  });
}

function updateSelectedAreas() {
  const container = document.getElementById("selectedAreasContainer");
  const tagsContainer = document.getElementById("selectedTags");

  if (selectedParts.length === 0) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  tagsContainer.innerHTML = "";

  selectedParts.forEach((partId) => {
    const part = bodyParts.find((p) => p.id === partId);
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = part.label + " ✕";
    tag.onclick = () => toggleBodyPart(partId);
    tagsContainer.appendChild(tag);
  });
}

function openSheet() {
  document.getElementById("sheetOverlay").classList.add("active");
  document.getElementById("sheet").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSheet() {
  document.getElementById("sheetOverlay").classList.remove("active");
  document.getElementById("sheet").classList.remove("active");
  document.body.style.overflow = "";
}

function submitEvaluation() {
  if (selectedParts.length > 0) {
    alert(
      "Evaluación enviada para: " +
        selectedParts
          .map((id) => {
            const part = bodyParts.find((p) => p.id === id);
            return part.label;
          })
          .join(", ")
    );
  }
  closeSheet();
}

initBodyPoints();

/**
 * Draws the bars in their current color.
 */
function draw() {
  removeDivs();
  createNewDivs();
}

/**
 * Removes the current divs.
 */
function removeDivs() {
  for (let i = barCounter; i > 0; i--) {
    let child = document.getElementById(`bar_${i}`);
    if (child !== null) {
      diagram.removeChild(child);
      barCounter--;
    }
  }
}

/**
 * Creates new Divs with correct arraySize and correct color and size of each bar.
 */
function createNewDivs() {
  randomArray.forEach((element) => {
    let newBar = document.createElement("div");
    newBar.id = `bar_${barCounter}`;
    barCounter += 1;
    newBar.style = `background: ${element.color}; height: ${
      element.number
    }%; width: ${100 / arraySize}%`;
    diagram.appendChild(newBar);
  });
}

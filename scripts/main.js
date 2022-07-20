// The input fields and the diagram
let sizeSlider = document.getElementById("size_slider");
let speedSlider = document.getElementById("speed_slider");
let diagram = document.getElementById("diagram");

let maxArraySize = sizeSlider.max;
let arraySize = sizeSlider.value;

let maxSortingSpeed = speedSlider.max;
// convert speed into delay in ms
let sortingSpeed = maxSortingSpeed - speedSlider.value + 1;

let min = 1;
let max = 100;
let barCounter = 1;
let randomArray = new Array(arraySize);

let sortingAlgorithmActive = false;
let stopSortingAlgorithm = false;

let sizeSliderValue = sizeSlider.value;

let blueColor = "var(--dark-blue)";
let finishedColor = "var(--green)";
let selectedColor = "var(--blue)";
let purpleColor = "var(--purple)";

// Generates the first Array
generateNewArray();

/**
 * If changes on the size slider happen a new array is generated and the values are adjusted.
 * If a sorting algorithm is already running the slider can't be changed and no new array is generated.
 */
sizeSlider.addEventListener("input", function () {
  if (!sortingAlgorithmActive) {
    sizeSliderValue = sizeSlider.value;
    arraySize = sizeSliderValue;
    generateNewArray();
  } else {
    sizeSlider.value = sizeSliderValue;
  }
});

/**
 * If changes on the speed slider happen the value is adjusted.
 */
speedSlider.addEventListener("input", function () {
  sortingSpeed = speedSlider.max - speedSlider.value + 1;
});

/**
 * This function generates a new Array based on the current arraySize
 * and resets the bar colors to blue.
 */
function generateNewArray() {
  randomArray = new Array(arraySize);

  for (let i = 0; i < arraySize; i++) {
    randomArray[i] = {
      number: randomNumber(),
      color: blueColor,
    };
  }
  draw();
}

/**
 * @returns a random number between min (inclusive) and max (inclusive).
 */
function randomNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Resets the color of every bar to blue.
 */
function resetColor() {
  randomArray.forEach((element) => {
    element.color = blueColor;
  });
  draw();
}

/**
 * Swaps the Elements at index i and j of the randomArray.
 *
 * @param {number} i the index of the first element.
 * @param {number} j the index of the second element.
 */
function swap(i, j) {
  let temp = randomArray[i];
  randomArray[i] = randomArray[j];
  randomArray[j] = temp;
}

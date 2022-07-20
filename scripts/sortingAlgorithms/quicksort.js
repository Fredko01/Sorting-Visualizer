let quick_sort_button = document.getElementById("quick_sort");
let pivot = 0;
let pivotIndex = 0;

/**
 * This function implements the quick sort and draws every step.
 * This function is called when the quick_sort button is clicked.
 */
async function quickSort() {
  prepareQuickSort();

  await quickSortRecursive(0, randomArray.length - 1);

  if (stopSortingAlgorithm) {
    stopSortingAlgorithm = false;
    sortingAlgorithmActive = false;
    quick_sort_button.className = "";
    return;
  }

  endQuickSort();
}

/**
 * This is the recursive function of the quicksort.
 * Every step is drawn.
 *
 * One of three possible pivot elements is selected.
 * All smaller elements are switched to the left
 * and all bigger elements are switched to the right of the pivot.
 * Then the algorithm recursively does the same for both parted arrays.
 */
async function quickSortRecursive(lowIndex, highIndex) {
  if (lowIndex >= highIndex || stopSortingAlgorithm) {
    return;
  }

  selectPivot(lowIndex, highIndex);

  draw();
  await new Promise((resolve) => setTimeout(resolve, sortingSpeed));

  swap(pivotIndex, highIndex);

  let pivotPointer = await partition(lowIndex, highIndex, pivot);

  if (stopSortingAlgorithm) {
    return;
  }

  randomArray[pivotPointer].color = finishedColor;

  await quickSortRecursive(lowIndex, pivotPointer - 1);
  randomArray[lowIndex].color = finishedColor;
  await quickSortRecursive(pivotPointer + 1, highIndex);
  randomArray[highIndex].color = finishedColor;
}

/**
 * Parts the array in bigger and smaller numbers than the pivot element.
 * The pivot is at the sorted position after running this function.
 * Every step is drawn.
 *
 * @param {number} lowIndex the low index of the array snippet
 * @param {number} highIndex the high index of the array snippet
 * @param {number} pivot the pivot element
 * @returns
 */
async function partition(lowIndex, highIndex, pivot) {
  lowPointer = lowIndex;
  highPointer = highIndex - 1;

  while (lowPointer < highPointer) {
    randomArray[lowPointer].color = selectedColor;
    randomArray[highPointer].color = selectedColor;
    draw();
    await new Promise((resolve) => setTimeout(resolve, sortingSpeed));

    // lowPointer: searches a number which is bigger or equal to the pivot.
    while (
      randomArray[lowPointer].number <= pivot &&
      lowPointer < highPointer
    ) {
      if (stopSortingAlgorithm) {
        return;
      }
      randomArray[lowPointer].color = blueColor;
      lowPointer++;
      randomArray[lowPointer].color = selectedColor;
      draw();
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    // highPointer: searches a number which is smaller or equal to the pivot.
    while (
      randomArray[highPointer].number >= pivot &&
      lowPointer < highPointer
    ) {
      if (stopSortingAlgorithm) {
        return;
      }
      randomArray[highPointer].color = blueColor;
      highPointer--;
      randomArray[highPointer].color = selectedColor;
      draw();
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    if (stopSortingAlgorithm) {
      return;
    }

    swap(lowPointer, highPointer);

    draw();
    await new Promise((resolve) => setTimeout(resolve, sortingSpeed));

    randomArray[lowPointer].color = blueColor;
    randomArray[highPointer].color = blueColor;
  }

  if (randomArray[lowPointer].number > randomArray[highIndex].number) {
    swap(lowPointer, highIndex);
  } else {
    lowPointer = highIndex;
  }
  return lowPointer;
}

/**
 * Prepares the Quick Sort.
 *
 * The button is selected and the bars are reseted.
 */
function prepareQuickSort() {
  sortingAlgorithmActive = true;
  quick_sort_button.className = "selected";
  resetColor();
}

/**
 * Ends the Quick Sort.
 *
 * The Bars are colored green and the button is deselected.
 */
function endQuickSort() {
  randomArray.forEach((element) => {
    element.color = finishedColor;
  });
  draw();
  quick_sort_button.className = "";
  sortingAlgorithmActive = false;
}

/**
 * The pivot element is either the number at low, high or median index of the array.
 * The median of those three numbers is the pivot element.
 *
 * @param {number} lowIndex the first index of the parted array.
 * @param {number} highIndex the last index of the parted array.
 */
function selectPivot(lowIndex, highIndex) {
  let pivotFirst = randomArray[lowIndex].number;
  let pivotLast = randomArray[highIndex].number;

  let median = Math.floor((highIndex - lowIndex) / 2) + lowIndex;
  let pivotMedian = randomArray[median].number;

  if (
    (pivotMedian <= pivotFirst && pivotMedian >= pivotLast) ||
    (pivotMedian >= pivotFirst && pivotMedian <= pivotLast)
  ) {
    pivot = pivotMedian;
    pivotIndex = median;
  } else if (
    (pivotFirst <= pivotMedian && pivotFirst >= pivotLast) ||
    (pivotFirst >= pivotMedian && pivotFirst <= pivotLast)
  ) {
    pivot = pivotFirst;
    pivotIndex = lowIndex;
  } else {
    pivot = pivotLast;
    pivotIndex = highIndex;
  }
  randomArray[pivotIndex].color = purpleColor;
}

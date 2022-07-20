let merge_sort_button = document.getElementById("merge_sort");

/**
 * This function implements the merge sort.
 * This function is called when the merge_sort button is clicked.
 */
async function mergeSort() {
  prepareMergeSort();

  await mergeSortRecursive(0, randomArray.length - 1);

  if (stopSortingAlgorithm) {
    stopSortingAlgorithm = false;
    sortingAlgorithmActive = false;
    merge_sort_button.className = "";
    return;
  }
  endMergeSort();
}

/**
 * Parts the array into two smaller arrays and merges them after sorting.
 *
 * @param {number} lowIndex the first index of the parted array.
 * @param {number} highIndex the last index of the parted array.
 * @returns a sorted copy of the parted array.
 */
async function mergeSortRecursive(lowIndex, highIndex) {
  let arrayLength = highIndex - lowIndex + 1;

  if (arrayLength == 1 || stopSortingAlgorithm) {
    return [
      {
        number: randomArray[lowIndex].number,
        color: randomArray[lowIndex].color,
      },
    ];
  }

  let midIndex = Math.floor((highIndex - lowIndex) / 2) + lowIndex;

  let lowArray = await mergeSortRecursive(lowIndex, midIndex);
  let highArray = await mergeSortRecursive(midIndex + 1, highIndex);

  return await merge(lowIndex, midIndex, lowArray, highArray);
}

/**
 * This function merges two arrays in a sorted order. For drawing purposes adds them to the randomArray.
 * Every step is drawn.
 *
 * @param {number} lowIndex the first index of the array in the randomArray.
 * @param {number} midIndex the middle index on which the arrays parted.
 * @param {Array.<{number: Number, color: String}>} lowArray the already sorted lower array.
 * @param {Array.<{number: Number, color: String}>} highArray the already sorted higher array.
 * @returns a sorted Array merged from both arrays.
 */
async function merge(lowIndex, midIndex, lowArray, highArray) {
  if (stopSortingAlgorithm) {
    return;
  }
  let lowArrayLength = lowArray.length;
  let highArrayLength = highArray.length;
  let lowPointer = 0;
  let highPointer = 0;
  let sortedMergedArray = new Array();

  while (lowPointer < lowArrayLength && highPointer < highArrayLength) {
    if (stopSortingAlgorithm) {
      return;
    }

    await drawComparisonOfLowAndHighPointer(
      lowIndex,
      midIndex,
      lowPointer,
      highPointer
    );

    // low and high pointer are compared and the smaller value at that index is pushed into sorted array.
    if (lowArray[lowPointer].number <= highArray[highPointer].number) {
      sortedMergedArray.push(lowArray[lowPointer]);
      lowPointer++;
    } else {
      sortedMergedArray.push(highArray[highPointer]);
      highPointer++;
    }
  }

  // pushes the remaining objects.
  for (let i = lowPointer; i < lowArrayLength; i++) {
    sortedMergedArray.push(lowArray[i]);
  }
  for (let i = highPointer; i < highArrayLength; i++) {
    sortedMergedArray.push(highArray[i]);
  }

  await drawMerge(lowIndex, sortedMergedArray);

  return sortedMergedArray;
}

/**
 * Adds the merged Array at the correct position to the randomArray.
 * Draws every step.
 *
 * @param {number} lowIndex the first index in the randomArray of the parted array.
 * @param {Array.<{number: Number, color: String}>} mergedArray the sorted merged array.
 */
async function drawMerge(lowIndex, mergedArray) {
  for (let i = 0; i < mergedArray.length; i++) {
    if (stopSortingAlgorithm) {
      return;
    }
    randomArray[i + lowIndex].color = mergedArray[i].color;
    randomArray[i + lowIndex].number = mergedArray[i].number;
    randomArray[i + lowIndex].color = selectedColor;
    draw();
    await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    randomArray[i + lowIndex].color = purpleColor;
  }
}

/**
 * Prepares the Merge Sort.
 *
 * Selects the button and resets the bars.
 */
function prepareMergeSort() {
  sortingAlgorithmActive = true;
  merge_sort_button.className = "selected";
  resetColor();
}

/**
 * Ends the Merge Sort.
 *
 * Each Bar is colored green and the button is deselected.
 */
function endMergeSort() {
  randomArray.forEach((element) => {
    element.color = finishedColor;
  });
  draw();
  merge_sort_button.className = "";
  sortingAlgorithmActive = false;
}

/**
 * Draws the Comparison of the two pointers while merging the elements.
 *
 * Selects the two elements which are compared, draws and deselect them.
 *
 * @param {number} lowIndex the first index of the parted array inside the randomArray.
 * @param {number} midIndex the index at whitch the arrays got parted.
 * @param {number} lowPointer the current lowPointer.
 * @param {number} highPointer the current highPointer.
 */
async function drawComparisonOfLowAndHighPointer(
  lowIndex,
  midIndex,
  lowPointer,
  highPointer
) {
  randomArray[lowPointer + lowIndex].color = selectedColor;
  randomArray[highPointer + midIndex + 1].color = selectedColor;
  draw();
  await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
  randomArray[lowPointer + lowIndex].color = purpleColor;
  randomArray[highPointer + midIndex + 1].color = purpleColor;
}

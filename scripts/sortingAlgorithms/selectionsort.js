let selection_sort_button = document.getElementById("selection_sort");

/**
 * This function implements the selection sort and draws every step.
 * This function is called when the selection_sort button is clicked.
 */
async function selectionSort() {
  prepareSelectionSort();

  for (let i = 0; i < randomArray.length - 1; i++) {
    let firstNumber = randomArray[i].number;
    let smallestNumber = firstNumber;
    let smallestNumberIndex = i;
    randomArray[i].color = selectedColor;

    for (let j = i + 1; j < randomArray.length; j++) {
      // stops the function if the user wants to stop the algorithm
      if (stopSortingAlgorithm) {
        stopSortingAlgorithm = false;
        sortingAlgorithmActive = false;
        selection_sort_button.className = "";
        return;
      }

      randomArray[j].color = selectedColor;

      draw();
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));

      randomArray[j].color = blueColor;

      if (randomArray[j].number < smallestNumber) {
        // older smallest number is deselected
        if (smallestNumberIndex != i) {
          randomArray[smallestNumberIndex].color = blueColor;
        }

        // new smallest number is selected
        smallestNumber = randomArray[j].number;
        smallestNumberIndex = j;
        randomArray[smallestNumberIndex].color = purpleColor;
      }
    }
    // deselect the current bar
    randomArray[i].color = blueColor;

    if (smallestNumber < firstNumber) {
      swap(i, smallestNumberIndex);
    }
    // after swapping, the bar on position i is sorted.
    randomArray[i].color = finishedColor;
  }

  endSelectionSort();
}

/**
 * Sets the algorithm up.
 */
function prepareSelectionSort() {
  sortingAlgorithmActive = true;
  selection_sort_button.className = "selected";
  resetColor();
}

/**
 * Ends the algorithm.
 */
function endSelectionSort() {
  randomArray[randomArray.length - 1].color = finishedColor;
  draw();
  selection_sort_button.className = "";
  sortingAlgorithmActive = false;
}

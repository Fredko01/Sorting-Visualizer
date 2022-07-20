let bubble_sort_button = document.getElementById("bubble_sort");

/**
 * This function implements the bubble sort and draws every step.
 * This function is called when the bubble_sort button is clicked.
 */
async function bubbleSort() {
  prepareBubbleSort();

  let sorted = false;
  let possibleSwapsLeft = randomArray.length - 1;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < possibleSwapsLeft; i++) {
      // stops the function if the user wants to stop the algorithm
      if (stopSortingAlgorithm) {
        stopSortingAlgorithm = false;
        sortingAlgorithmActive = false;
        bubble_sort_button.className = "";
        return;
      }
      randomArray[i].color = selectedColor;

      draw();
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));

      if (randomArray[i].number > randomArray[i + 1].number) {
        swap(i, i + 1);
        sorted = false;
      } else {
        randomArray[i].color = blueColor;
      }
    }
    randomArray[possibleSwapsLeft].color = finishedColor;
    possibleSwapsLeft--;
  }
  endBubbleSort();
}

/**
 * Prepares the Bubble sort.
 *
 * The button is selected and the bars are reseted.
 */
function prepareBubbleSort() {
  sortingAlgorithmActive = true;
  bubble_sort_button.className = "selected";
  resetColor();
}

/**
 * Ends the Bubble sort.
 *
 * Every Bar is colored green and the button is deselected.
 */
function endBubbleSort() {
  for (let i = 0; i < randomArray.length; i++) {
    randomArray[i].color = finishedColor;
  }
  draw();
  bubble_sort_button.className = "";
  sortingAlgorithmActive = false;
}

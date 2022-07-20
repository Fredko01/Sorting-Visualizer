let insertion_sort_button = document.getElementById("insertion_sort");

/**
 * This function implements the insertion sort and draws every step.
 * This function is called when the insertion_sort button is clicked.
 */
async function insertionSort() {
  prepareInsertionSort();

  let sorted = false;
  while (!sorted) {
    sorted = true;
    randomArray[0].color = purpleColor;
    for (let i = 1; i < randomArray.length; i++) {
      randomArray[i].color = selectedColor;
      for (let j = i - 1; j >= 0; j--) {
        // stops the function if the user wants to stop the algorithm
        if (stopSortingAlgorithm) {
          stopSortingAlgorithm = false;
          sortingAlgorithmActive = false;
          insertion_sort_button.className = "";
          return;
        }

        draw();
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed));

        if (randomArray[j + 1].number < randomArray[j].number) {
          swap(j + 1, j);
          if (j == 0) {
            await colorLastElement();
          }
        } else {
          randomArray[j + 1].color = purpleColor;
          break;
        }
      }
    }
  }
  endInsertionSort();
}

/**
 * If the element swaps to the last position,
 * the color of the element is changed to purple and the bars are drawn again.
 */
async function colorLastElement() {
  draw();
  await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
  randomArray[0].color = purpleColor;
}

/**
 * Prepares the insertion sort.
 *
 * The button is selected and the bars are reseted.
 */
function prepareInsertionSort() {
  sortingAlgorithmActive = true;
  insertion_sort_button.className = "selected";
  resetColor();
}

/**
 * Ends insertion sort.
 *
 * Each bar is colored green and the button is deselected.
 */
function endInsertionSort() {
  randomArray.forEach((element) => {
    element.color = finishedColor;
  });
  draw();
  insertion_sort_button.className = "";
  sortingAlgorithmActive = false;
}

/*******************************************************************************
    Crystal Collectors Game Script
*******************************************************************************/

$(document).ready(function() {          // Wait on document to load

    let targetNumber = 0;               // Game target number
    const targetMin = 19;               // Target minimum
    const targetMax = 120;              // Target maximum
    let crystalValues = [];             // Crystal values
    const crystalMin = 1;               // Crystal value minimum
    const crystalMax = 12;              // Crystal value maximum
    const crystalCount = 4;             // Number of crystals to use

    let wins = 0;
    let losses = 0;
    let score = 0;

    /***************************************************************************
        Helper Functions
    ***************************************************************************/

    // Return a random number between min and max inclusive. 'min' and 'max'
    // are optional, if unspecified, a number between 1 and 100 will be returned.
    function getRandom(min=1, max=100) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Return a specified number of random numbers between min and max 
    // inclusive as an array. 'count' is optional, and if unspecified, an
    // array containing a single number will be returned.
    function getRandoms(min, max, count=1) {
        let temp = [];
        do {
            let randomNum = getRandom(min, max);
            if (!temp.includes(randomNum)) {
                temp.push(randomNum);
            }
        } while (temp.length < count);
        return temp;
    }

    /***************************************************************************
        Play the game
    ***************************************************************************/
    // Reset for a new game
    function resetGame() {
        
        targetNumber = getRandom(targetMin, targetMax);     // Generate target
        $("#target-number").text("TARGET: " + targetNumber);

        score = 0;                                          // Reset user's score
        $("#score").text(score);

        // Generate unique random values for each of the crystals
        let temp = getRandoms(crystalMin, crystalMax, crystalCount);
        for (let i = 0; i < crystalValues.length; i++) {
            crystalValues[i].value = temp[i];
        }
    }

    // Display the won/lost results for the game
    function displayScore(msg = "") {
        $("#game-result").text(msg);
        $("#wins").text("WINS: " + wins);
        $("#losses").text("LOSSES: " + losses);
    }

    // Process a button click and determine results
    function processCrystal(buttonID) {
        for (let i = 0; i < crystalValues.length; i++) {
            if (crystalValues[i].id === buttonID) {
                score += crystalValues[i].value;
                $("#score").text(score);
                break;
            }
        }
        if (score === targetNumber) {
            wins++;
            displayScore("YOU WIN!!");
            resetGame();
        } else if (score > targetNumber) {
            losses++;
            displayScore("YOU LOSE!!");
            resetGame();
        }
    }

    /***************************************************************************
     * Button event handler
    ***************************************************************************/
        
    // Crystal button click event handler - get the id and process the button
    function crystalClick(event) {
        let buttonID = $(this).attr("id");
        processCrystal(buttonID);
    }

    /***************************************************************************
     * Inititialize crystal values array - each element is an object with the
     * properties of id and value.
    ***************************************************************************/
    function createCrystalValues() {
        for (let i = 0; i < crystalCount; i++) {
            crystalValues[i] = {
                id: "crystal-" + (i + 1),
                value: 0
            }
        }
    }

    /***************************************************************************
     * Game Entry Point
    ***************************************************************************/
    // Perform initialization, and wait for user input
    createCrystalValues();                          // Create array to control crystals
    resetGame();                                    // Reset the game
    $(".btn-crystal").on("click", crystalClick);    // Set event handler for crystals

});

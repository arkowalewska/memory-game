document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('start-game').addEventListener("click", function () {
        newBoard();
    });

});

var memoryArray = ['title_1.jpg', 'title_1.jpg',
    'title_2.jpg', 'title_2.jpg',
    'title_3.jpg', 'title_3.jpg',
    'title_4.jpg', 'title_4.jpg',
    'title_5.jpg', 'title_5.jpg',
    'title_6.jpg', 'title_6.jpg',
    'title_7.jpg', 'title_7.jpg',
    'title_8.jpg', 'title_8.jpg',
    'title_9.jpg', 'title_9.jpg',
    'title_10.jpg', 'title_10.jpg'];

var memoryValues = []; //for storying memory values
var memoryTileIds = []; //for storying memory tile ids
var tilesFlipped = 0; //to know how many tiles are flipped

console.log(memoryArray);

// Adding a shuffle method to the array object in JS
Array.prototype.memoryTileShuffle = function () {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

// Function for generating a new board
function newBoard() {
    tilesFlipped = 0;
    var output = '';

    memoryArray.memoryTileShuffle();
    for (var i = 0; i < memoryArray.length; i++) {

        //Each div get a id with a dynamic tile number
        output += '<div class="square" id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memoryArray[i] + '\')"></div>';

        /* <div id="tile_19" onclick="memoryFlipTile(this,'title_2.jpg')"></div> 
        'this' represents the div with the Id which has been accessed */
    }

    // Placing all small divs in the main div
    document.getElementById('memory-board').innerHTML = output;
}

window.addEventListener('click', newBoard());


//Function responsible for flipping the tile over
function memoryFlipTile(tile, val) {

    if (tile.innerHTML == "" && memoryValues.length < 2) {
        console.log(val);
        tile.style.backgroundImage = "url(img/" + val + ")";
        console.log(tile.style.backgroundImage);

        if (memoryValues.length == 0) {
            memoryValues.push(val);
            memoryTileIds.push(tile.id);

        } else if (memoryValues.length == 1) {
            memoryValues.push(val);
            memoryTileIds.push(tile.id);

            // to check if both cards are a match !
            if (memoryValues[0] == memoryValues[1]) {
                tilesFlipped += 2;

                // Clear both arrays
                memoryValues = [];
                memoryTileIds = [];

                // Check to see if the whole board is cleared
                if (tilesFlipped == memoryArray.length) {
                    alert("Board cleared... generating new board");
                    document.getElementById('memory-board').innerHTML = "";
                    newBoard();
                }

                // to check if match is not made !
            } else {
                function flip2Back() {

                    //Flip the 2 tiles back over
                    var tile1 = document.getElementById(memoryTileIds[0]);
                    var tile2 = document.getElementById(memoryTileIds[1]);
                    tile1.style.backgroundImage = "url(img/tile-bg.jpg)";
                    tile1.innerHTML = '';
                    tile2.style.backgroundImage = "url(img/tile-bg.jpg)";
                    tile2.innerHTML = '';

                    // Clear both arrays
                    memoryValues = [];
                    memoryTileIds = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}
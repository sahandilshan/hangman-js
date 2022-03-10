/**
* Hangman in Vanilla Javascript
* @see https://github.com/jelofsson/hangman-js
* @author jelofsson
**/
var Hangman = (function () {
    'use strict';

    /**
     * Constructor
     * @param {string} elId An ID used in this class and when rendering the DOM Elements
     */
    function Hangman(elId) {
        // DOM is ready
        this.elId       = elId;
        // Possible words
        this.words      = [
            'APPLE',
            
            
        ];
    }
    let wordIndex = 0;

    /**
     * Resets the hangman game
     */
    Hangman.prototype.reset = function () {
        // Variables
        console.log('index : ' + wordIndex);
        this.STOPPED        = false;
        this.MISTAKES       = 0;
        this.GUESSES        = [];
        // Select a random word from the list
        if (wordIndex === this.words.length) {
            wordIndex == 0;
        }
        this.WORD = this.words[wordIndex++];
        // DOM Elements
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
    };

    /**
     * Logic after the user guessed on a letter
     *
     * @param {char} letter A letter guessed by our enduser
     */
    Hangman.prototype.guess = function (letter) {
        letter = letter.charAt(0).toUpperCase();

        // Check if game is stopped or the user already guessed on that letter
        if (this.STOPPED || this.GUESSES.indexOf(letter) > -1) {
            // Then we wont do anything
            return;
        }

        // Add the letter to our GUESSES array
        this.GUESSES.push(letter);
        // Update the word hint, and guessed letter list for the user
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory condition
            this.showElementByIdWithContent(this.elId + "_end", "You made it!<br/>The word was: " + this.WORD);
            this.STOPPED = true;
        }
    };

    /**
     * Displays HTML element by id with the following content
     *
     * @param {string} elId     DOM ID
     * @param {HTML} content 
     */
    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    /**
     * Hides element by class
     *
     * @param {string} elClass DOM class
     */
    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    /**
     * The word but only with letters the user has guessed so far is visible
     */
    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                    this.WORD[i] : "_";
        }
        return result;
    };

    // Create and return an instance of this class, its go time!
    return new Hangman('hangm');    
}());
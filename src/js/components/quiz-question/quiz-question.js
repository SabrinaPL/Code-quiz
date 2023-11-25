/**
 * The quiz question component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <div id="quiz-question">
        <p><slot id="question">Question</slot></p>
    </div>
    <div id="answer-radio-btn">
        <input type="radio" id="answer1" name="answer" value="answer1">
            <label for="answer1">Answer 1</label><br>
        <input type="radio" id="answer2" name="answer" value="answer2">
            <label for="answer2">Answer 2</label><br>
        <input type="radio" id="answer3" name="answer" value="answer3">
            <label for="answer3">Answer 3</label><br>
        <input type="radio" id="answer4" name="answer" value="answer4">
            <label for="answer4">Answer 4</label><br>
        <input type="radio" id="answer5" name="answer" value="answer5">
            <label for="answer5">Answer 5</label><br>
        <input type="radio" id="answer6" name="answer" value="answer6">
            <label for="answer6">Answer 6</label><br>
        <input type="radio" id="answer7" name="answer" value="answer7">
            <label for="answer7">Answer 7</label><br>
        <input type="radio" id="answer8" name="answer" value="answer8">
            <label for="answer8">Answer 8</label><br>
        <input type="radio" id="answer9" name="answer" value="answer9">
            <label for="answer9">Answer 9</label><br>
        <input type="radio" id="answer10" name="answer" value="answer10">
            <label for="answer10">Answer 10</label>
    </div>
    <div id="answer-text">
        <label for="answer-text-input">Answer:</label>
        <input type="text" id="answer-text-input" name="answer-text-input">
    </div>

    <style>
        #question {
            font-size: 1.3rem; 
            font-weight: bold; 
            margin-bottom: 0.5rem; 
        }

        #answer-radio-btn {
            display: block; 
        }

        #answer-radio-btn input {
            margin-top: 0.5rem; 
            margin-bottom: 0.5rem; 
        }

        #answer-radio-btn label {
            font-size: 1.1rem; 
        }

        #answer-text {
            font-size: 1.3rem; 
            font-weight: bold; 
            margin-top: 0.5rem; 
        }
    </style>
`

// Define the custom element.
customElements.define('quiz-question',
/** Quiz question class that extends HTMLElement class
 * and creates a custom element.
 */
  class extends HTMLElement {
    /**
     * The quiz question element.
     *
     * @type {HTMLDivElement}
     */
    #quizQuestion

    /**
     * Constructor for quiz question class which invokes its super class constructor.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Get the countdown timer element in the shadow root.
      this.#quizQuestion = this.shadowRoot.querySelector('#quiz-question')

      // Add the 'hidden' attribute to the quiz-question component.
      this.setAttribute('hidden', '')
    }
  })

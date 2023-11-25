/**
 * The quiz question component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <div id="quiz-question"></div>
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

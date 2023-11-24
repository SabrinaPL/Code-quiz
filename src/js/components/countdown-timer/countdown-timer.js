/**
 * The countdown-timer component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <div id="countdown-timer">
        <p>Time left: <span id="time"></span></p>
    </div>
    <style>
        #countdown-timer {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0; 
            padding: 0;
            display: flex; 
            justify-content: left; 
            position: relative; 
        }
    </style>
`

// Define the custom element.
customElements.define('countdown-timer',
/** Countdown timer class that extends HTMLElement class
 * and creates a custom element.
 */
  class extends HTMLElement {
    /**
     * The countdown timer element.
     *
     * @type {HTMLDivElement}
     */
    #countdownTimer

    /**
     * Constructor for countdown timer class which invokes its super class constructor.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Get the countdown timer element in the shadow root.
      this.#countdownTimer = this.shadowRoot.querySelector('#countdown-timer')
    }
  })

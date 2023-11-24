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

        .colorChange {
       color: #084B83; 
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
     * StartTime of countdown timer.
     *
     * @type {number}
     */
    #startTime = 20000

    /**
     * Current time.
     *
     * @type {number}
     */
    #currentTime

    /**
     * IntervalID of countdown timer.
     *
     * @type {number}
     */
    #intervalID

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

      // Add the 'hidden' attribute to the countdown timer component.
      this.setAttribute('hidden', '')
    }

    /**
     * Function to start the countdown timer.
     *
     * @function
     * */
    startCountDown () {
      this.#currentTime = this.#startTime
      this.#updateTime()

      this.#intervalID = setInterval(() => {
        this.#setInterval()
      }, 1000)
    }

    /**
     * Function to update the countdown timer and stop the countdown when it reaches 0 by invoking other functions.
     */
    #setInterval () {
      this.#currentTime -= 1000
      this.#updateTime()
      this.#changeColor()
      this.#stopCountDown()
    }

    /**
     * Function to update the UI.
     */
    #updateTime () {
      this.#countdownTimer.querySelector('#time').textContent = this.#currentTime / 1000
    }

    /**
     * Function to change color of countdown timer when 3 seconds remain.
     *
     */
    #changeColor () {
      if (this.#currentTime <= 3000) {
        this.#countdownTimer.classList.add('colorChange')
      }
    }

    /**
     * Function to stop the countdown timer.
     */
    #stopCountDown () {
      if (this.#currentTime <= 0) {
        clearInterval(this.#intervalID)
      }
    }
  })

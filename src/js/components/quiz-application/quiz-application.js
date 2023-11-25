// Define the custom element.
customElements.define('quiz-application',

  /** Quiz application class that extends HTMLElement class
   * and creates a custom element.
   */
  class extends HTMLElement {
    /**
     * Player nickname, sent to quiz-application from nickname-form
     *
     * @type {string}
     */
    #nickname

    /**
     * Constructor for quiz application class which invokes its super class constructor.
     */
    constructor () {
      super()
    }

    /**
     * Connected callback for quiz application class which is invoked when the element is added to the DOM.
     */
    connectedCallback () {
      const nicknameForm = document.querySelector('nickname-form')
      const countdownTimer = document.querySelector('countdown-timer')
      const quizQuestion = document.querySelector('quiz-question')

      // Event listener for nickname event.
      nicknameForm.addEventListener('nickname', (event) => {
        this.#nickname = event.detail

        // Remove the 'hidden' attribute from the countdown timer component and start the countdown.
        countdownTimer.removeAttribute('hidden')
        countdownTimer.startCountDown()

        // Hide the nickname form.
        nicknameForm.setAttribute('hidden', '')

        // Remove the 'hidden' attribute from the quiz-question component.
        quizQuestion.removeAttribute('hidden')
      })
    }
  })

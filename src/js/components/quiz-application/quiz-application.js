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

    connectedCallback () {
      const nicknameForm = document.querySelector('nickname-form')
      const countdownTimer = document.querySelector('countdown-timer')
      const quizQuestion = document.querySelector('quiz-question')

      // Event listener for nickname event.
      nicknameForm.addEventListener('nickname', (event) => {
        this.#nickname = event.detail
        getQuestion()

        /**
         * Function to fetch questions from the API.
         *
         * @function
         * @async
         * @returns {Promise} - The response from the API.
         */
        async function getQuestion () {
          try {
            const response = await fetch('https://courselab.lnu.se/quiz/question/1')
            const data = await response.json()
            // Console log to see the received data.
            console.log(data)

            if (response.ok) {
              quizQuestion.textContent = data.question

              // Remove the 'hidden' attribute from the text input component.

              // Remove the 'hidden' attribute from the countdown timer component and start the countdown.
              countdownTimer.removeAttribute('hidden')
              countdownTimer.startCountDown()
            }
          } catch (error) {
            console.log('There was an error fetching the quiz question: ', error)
            quizQuestion.textContent = 'There was an error fetching the quiz question!'
          }
        }

        // Hide the nickname form.
        nicknameForm.setAttribute('hidden', '')

        // Remove the 'hidden' attribute from the quiz-question component.
        quizQuestion.removeAttribute('hidden')
      })
    }
  })

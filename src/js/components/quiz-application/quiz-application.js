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

            if (!response.ok) {
              const error = new Error('There was an error fetching the quiz question!')
              error.status = response.status
              throw error
            } else {
              quizQuestion.textContent = data.question

              if (data.limit !== null) {
                countdownTimer.updateStartTime(data.limit * 1000)
              }

              // Show the answer text input.
              quizQuestion.showTextAnswer()

              // Show the answer radio buttons and input numOfRadioBtns parameter.
              // quizQuestion.showRadioAnswer(4)

              // Remove the 'hidden' attribute from the countdown timer component and start the countdown.
              countdownTimer.removeAttribute('hidden')
              countdownTimer.startCountDown()
            }
          } catch (error) {
            console.log(error)
            quizQuestion.textContent = 'Oops! Something went wrong!'
          }
        }

        // Hide the nickname form.
        nicknameForm.setAttribute('hidden', '')

        // Remove the 'hidden' attribute from the quiz-question component.
        quizQuestion.removeAttribute('hidden')
      })
    }
  })

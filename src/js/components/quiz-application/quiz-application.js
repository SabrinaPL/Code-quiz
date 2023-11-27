// Define the custom element.
customElements.define('quiz-application',

  /** Quiz application class that extends HTMLElement class
   * and creates a custom element.
   */
  class extends HTMLElement {
    /**
     * Player nickname, sent to quiz-application from nickname-form.
     *
     * @type {string}
     */
    #nickname

    /**
     * URL used to fetch quiz questions from API.
     *
     */
    #fetchURL = 'https://courselab.lnu.se/quiz/question/1'

    /**
     * Next URL received from API.
     *
     */
    #postURL = ''

    /**
     * User answer to quiz question.
     *
     */
    #answer

    /**
     * Nickname form element.
     *
     */
    #nicknameForm

    /**
     * Countdown timer element.
     *
     */
    #countdownTimer

    /**
     * Quiz question element.
     *
     */
    #quizQuestion

    /**
     * Constructor for quiz application class which invokes its super class constructor.
     */
    constructor () {
      super()
    }

    /**
     * Function to fetch questions from the API.
     *
     * @param {string} URL - The URL used to fetch questions from the API.
     * @function
     * @async
     * @returns {Promise} - The response from the API.
     */
    async getQuestion (URL) {
      try {
        const response = await fetch(URL)
        const data = await response.json()
        // Console log to see the received data.
        console.log(data)

        if (!response.ok) {
          const error = new Error('There was an error fetching the quiz question!')
          error.status = response.status
          throw error
        } else {
          // Set the question text content to the question from the API.
          this.#quizQuestion.textContent = data.question
          this.#postURL = data.nextURL
          console.log(this.#postURL)

          // Check if the API response contains answer options to the fetched question and if so, show the same amount of radio buttons as the amount of options, otherwise present the text input to the user.
          if (data.alternatives) {
            this.#quizQuestion.showRadioAnswer(data.alternatives.length)
          } else {
            this.#quizQuestion.showTextAnswer()
          }

          if (data.limit) {
            this.#countdownTimer.updateStartTime(data.limit * 1000)
          }

          // Remove the 'hidden' attribute from the countdown timer component and start the countdown.
          this.#countdownTimer.removeAttribute('hidden')
          this.#countdownTimer.startCountDown()
        }
      } catch (error) {
        console.log(error)
        this.#quizQuestion.textContent = 'Oops! Something went wrong!'
      }
    }

    /**
     * Function to send the answer to the API.
     *
     * @function
     */
    async sendAnswer () {
      try {
        const response = await fetch(this.#postURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            answer: this.#answer
          })
        })

        if (!response.ok) {
          const error = new Error('There was an error posting the answer to the API!')
          error.status = response.status
          throw error
        } else {
          const data = await response.json()
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * Function that runs when the quiz application component is connected to the DOM.
     *
     * @function
     */
    connectedCallback () {
      // Get the nickname form, quiz question and countdown timer elements.
      this.#nicknameForm = document.querySelector('nickname-form')
      this.#quizQuestion = document.querySelector('quiz-question')
      this.#countdownTimer = document.querySelector('countdown-timer')

      // Event listener for nickname event.
      this.#nicknameForm.addEventListener('nickname', (event) => {
        this.#nickname = event.detail
        this.getQuestion(this.#fetchURL)

        // Hide the nickname form.
        this.#nicknameForm.setAttribute('hidden', '')

        // Remove the 'hidden' attribute from the quiz-question component.
        this.#quizQuestion.removeAttribute('hidden')

        // Event listener for answer event.
        this.#quizQuestion.addEventListener('answer', (event) => {
          this.#answer = event.detail
          // Test console log to see the answer.
          console.log(event.detail)
          this.sendAnswer()
        })
      })
    }
  })

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
     * @type {string}
     */
    #fetchURL = 'https://courselab.lnu.se/quiz/question/1'

    /**
     * Next URL received from API.
     *
     * @type {string}
     */
    #postURL = ''

    /**
     * User answer to quiz question.
     *
     * @type {string}
     */
    #answer

    /**
     * Nickname form element.
     *
     * @type {HTMLDivElement}
     */
    #nicknameForm

    /**
     * Countdown timer element.
     *
     * @type {HTMLDivElement}
     */
    #countdownTimer

    /**
     * Quiz question element.
     *
     * @type {HTMLDivElement}
     */
    #quizQuestion

    /**
     * Total time of finished quiz.
     *
     * @type {number}
     */
    #totalTime = 0

    /**
     * Boolean to determine if the quiz should continue.
     *
     * @type {boolean}
     */
    #continueQuiz = true

    /**
     * Constructor for quiz application class which invokes its super class constructor.
     */
    constructor () {
      super()

      // Get the nickname form, quiz question and countdown timer elements.
      this.#nicknameForm = document.querySelector('nickname-form')
      this.#quizQuestion = document.querySelector('quiz-question')
      this.#countdownTimer = document.querySelector('countdown-timer')

      // Hide the countdown timer and quiz question components.
      this.#countdownTimer.setAttribute('hidden', '')
      this.#quizQuestion.setAttribute('hidden', '')
    }

    /**
     * Function to end the game.
     *
     * @function
     */
    #gameOver () {
      if (!this.#continueQuiz) {
        // Reset the quiz.
        // Calculate the total time of the finished quiz.
        // Show the highscore component and hide the rest.
        this.#countdownTimer.resetTimer()
        this.#countdownTimer.setAttribute('hidden', '')
        this.#quizQuestion.setAttribute('hidden', '')
      }
    }

    /**
     * Function to calculate the total time of finished quiz.
     *
     * @function
     */
    #calcTotalTime () {
      const time = this.#countdownTimer.countTime()
      this.#totalTime += time
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

        if (!response.ok) {
          const error = new Error('There was an error fetching the quiz question!')
          error.status = response.status
          throw error
        } else {
          // Set the question text content to the question from the API.
          this.#quizQuestion.textContent = data.question
          this.#postURL = data.nextURL

          // Check if the API response contains answer options to the fetched question and if so, show the same amount of radio buttons as the amount of options, otherwise present the text input to the user.
          if (data.alternatives) {
            // Find the number of items with keyword alternatives in the data object and later pass that number to the showRadioAnswer function.
            let numOfAlternatives = 0
            const alternativeKeys = []
            const alternativesValues = Object.values(data.alternatives)

            Object.keys(data.alternatives).forEach(key => {
              numOfAlternatives++
              alternativeKeys.push(key)
            })

            // Get the radio buttons and labels in the shadow root.
            const radioBtns = this.#quizQuestion.shadowRoot.querySelectorAll('input[type="radio"]')
            const labels = this.#quizQuestion.shadowRoot.querySelectorAll('label')

            // Set the key of each alternative as an attribute to the radio buttons and their labels.
            for (let i = 0; i < numOfAlternatives; i++) {
              const currentKey = alternativeKeys[i]
              const currentValue = alternativesValues[i]
              radioBtns[i].setAttribute('value', currentKey)
              labels[i].textContent = currentValue
            }

            this.#quizQuestion.showRadioAnswer(numOfAlternatives)
          } else {
            this.#quizQuestion.showTextAnswer()
          }

          if (data.limit) {
            this.#countdownTimer.updateStartTime(data.limit * 1000)
          } else {
            this.#countdownTimer.updateStartTime(20000)
          }

          // Remove the 'hidden' attribute from the countdown timer component and start the countdown.
          this.#countdownTimer.removeAttribute('hidden')
          this.#countdownTimer.resetTimer()
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

          if (!data.nextURL) {
            // Set continueQuiz to false to stop the quiz.
            this.#continueQuiz = false
          }

          if (this.#continueQuiz) {
            this.#postURL = data.nextURL
            this.getQuestion(this.#postURL)
          } else {
            this.#gameOver()
          }
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

          // Calculate the total time of the finished quiz.
          this.#calcTotalTime()

          // Test console log to see the answer and total time.
          console.log(this.#answer)
          console.log(this.#totalTime)

          // Clear the answer text input.
          this.#quizQuestion.clearTextAnswer()

          // Clear the radio buttons.
          this.#quizQuestion.clearRadioBtns()

          // Send the answer to the API.
          this.sendAnswer()
        })
      })
    }
  })

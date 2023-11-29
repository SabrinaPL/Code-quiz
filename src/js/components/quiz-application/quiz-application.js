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
     * Player object to store current player nickname and total score, to be presented in high-score.
     *
     * @type {object}
     */
    #player = {
      nickname: '',
      totalScore: 0
    }

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

    /** High score element.
     *
     * @type {HTMLDivElement}
     */
    #highScore

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
     * Boolean to determine if the user has given the incorrect answer.
     *
     * @type {boolean}
     */
    #wrongAnswer = false

    /**
     * Boolean to determine if the time is up.
     *
     * @type {boolean}
     */
    #timeUp = false

    /**
     * Constructor for quiz application class which invokes its super class constructor.
     */
    constructor () {
      super()

      // Get the nickname form, quiz question and countdown timer elements.
      this.#nicknameForm = document.querySelector('nickname-form')
      this.#quizQuestion = document.querySelector('quiz-question')
      this.#countdownTimer = document.querySelector('countdown-timer')
      this.#highScore = document.querySelector('high-score')

      // Hide the countdown timer, quiz question and high score components.
      this.#countdownTimer.setAttribute('hidden', '')
      this.#quizQuestion.setAttribute('hidden', '')
      this.#highScore.setAttribute('hidden', '')
    }

    /**
     * Function to end the game.
     *
     * @function
     */
    #gameOver () {
      if (this.#wrongAnswer || this.#timeUp) {
        // Reset the quiz.
        this.#countdownTimer.setAttribute('hidden', '')
        this.#quizQuestion.hideRadioBtns()
        this.#quizQuestion.hideTextAnswer()
        this.#quizQuestion.textContent = 'Game Over! Try again?'
        this.#quizQuestion.showTryAgainBtn()
        this.#resetNickname()
        this.#countdownTimer.resetTimer()
        this.#continueQuiz = true
      } else {
        // Reset the quiz, update the player object and show the high score.
        this.#quizQuestion.hideRadioBtns()
        this.#quizQuestion.hideTextAnswer()
        this.#countdownTimer.setAttribute('hidden', '')
        this.#quizQuestion.setAttribute('hidden', '')

        // Update the player object.
        this.#player.nickname = this.#nickname
        this.#player.totalScore = this.#totalTime
        console.log(this.#player)

        this.#highScore.removeAttribute('hidden', '')
        this.#resetNickname()
        this.#countdownTimer.resetTimer()
        this.#continueQuiz = true
      }
    }

    /**
     * Function to restart the quiz.
     *
     * @function
     */
    #restartQuiz () {
      this.#nicknameForm.removeAttribute('hidden')
      this.#quizQuestion.hideRadioBtns()
      this.#quizQuestion.hideTextAnswer()
      this.#countdownTimer.setAttribute('hidden', '')
      this.#quizQuestion.setAttribute('hidden', '')
      this.#highScore.setAttribute('hidden', '')
      this.#countdownTimer.resetTimer()
      this.#continueQuiz = true
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
     * Function to reset nickname.
     *
     * @function
     */
    #resetNickname () {
      this.#nickname = ''
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
          this.#countdownTimer.resetTimer()
          this.#countdownTimer.startCountDown()
          this.#countdownTimer.removeAttribute('hidden')
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

        if (!response.ok && response.status === 400) {
          this.#wrongAnswer = true
          this.#gameOver()
          this.#continueQuiz = false
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
            // Dispatch event for high-score to listen to and handle.
            this.dispatchEvent(new CustomEvent('gameover', {
              detail: this.#player
            }))
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

        // Hide the nickname form.
        this.#nicknameForm.setAttribute('hidden', '')

        // Start the quiz.
        this.getQuestion(this.#fetchURL)

        // Remove the 'hidden' attribute from the quiz-question component.
        this.#quizQuestion.removeAttribute('hidden')

        this.#countdownTimer.addEventListener('countdownTimerFinished', (event) => {
          this.#timeUp = true
          this.#gameOver()
        })

        // Event listener for try again event.
        this.#quizQuestion.addEventListener('tryAgain', (event) => {
          this.#restartQuiz()
        })

        // Event listener for play again event.
        this.#highScore.addEventListener('playAgain', (event) => {
          this.#restartQuiz()
        })

        // Event listener for answer event.
        this.#quizQuestion.addEventListener('answer', (event) => {
          this.#answer = event.detail

          // Calculate the total time of the finished quiz.
          this.#calcTotalTime()
          console.log(this.#totalTime)

          // Hide the countdown timer.
          this.#countdownTimer.setAttribute('hidden', '')

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

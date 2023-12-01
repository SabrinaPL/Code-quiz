/**
 * The high-score component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <h1><slot></slot></h1>
    <h2>High Score</h2>
    <ul id="high-score">
    </ul>
    <div>
        <button type="submit" class="btn">Play again</button>
    </div>

    <style>
        #high-score {
          color: #5FDDDB; 
        }

        .btn {
        font-size: 1.1rem; 
        background-color: #FF66B3; 
        color: white; 
        padding: 5px; 
        margin-top: 0.5rem; 
        border-radius: 5px; 
        }

        .btn:active {
        background-color: #42BFDD;  
        }
    </style>
`

// Define the custom element.
customElements.define('high-score',
/** High score class that extends HTMLElement class
 * and creates a custom element.
 */
  class extends HTMLElement {
  /**
   * The high score form element.
   *
   * @type {HTMLDivElement}
   */
    #highScore

    /**
     * Constructor for high score class which invokes its super class constructor.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.append(template.content.cloneNode(true))

      // Get the nickname form element in the shadow root.
      this.#highScore = this.shadowRoot.querySelector('#high-score')
    }

    /** Present the high score.
     *
     * @function
     */
    showHighScore () {
      // Get the high score from local storage.
      // const highScore = JSON.parse(localStorage.getItem('highScore'))

      // Create a list within the high score ul-element.
      // const list = document.createElement('li')
      // const nickname = highScore[0].nickname
      // const score = highScore[0].score
      // list.innerHTML = `${'nickname: ' + nickname}: ${'score: ' + score}`
      // this.#highScore.append(list)
      // console.log(highScore)
    }

    /**
     * Connected callback that is invoked when the element is added to the DOM.
     *
     * @function
     */
    connectedCallback () {
      // Add event listener to play again button.
      this.shadowRoot.querySelector('.btn').addEventListener('click', () => {
        // Dispatch the event.
        this.dispatchEvent(new CustomEvent('playAgain', {}))
      })
    }
  })

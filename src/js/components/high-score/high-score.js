/**
 * The high-score component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <div id="high-score">
        <h2>High Score</h2>
    </div>
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
     * Player nickname
     *
     * @type {string}
     */
    #nickname

    /**
     * Player high score.
     *
     * @type {number}
     */
    #playerHighScore

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

    /**
     * Connected callback that is invoked when the element is added to the DOM.
     *
     * @function
     */
    // connectedCallback () { }

    /**
     * Disconnected callback that is invoked when the element is removed from the DOM.
     *
     * @function
     */
    // disconnectedCallback () { }
  })

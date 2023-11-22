/**
 * The nickname-form component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

/** Nickname form class that extends HTMLElement class
 * and creates a custom element.
 */
class nicknameForm extends HTMLElement {
  /**
     * The nickname form element.
     *
     * @type {HTMLDivElement}
     */
  #nicknameForm

  /**
     * The user nickname.
     *
     * @type {string}
     * */
  #nickname = ''

  /**
   * Constructor for nicknameForm class which invokes its super class constructor.
   */
  constructor () {
    super()

    const template = document.createElement('template')
    template.innerHTML = `
<div id="nickname-form">
  <form>
    <label for="playerName">Enter a nickname to start the quiz:</label><br>
    <input type="text" id="playerName" name="playerName"><br>
  </form><br>
  <div id="btn">
    <button id="submit">Let's play!</button>
  </div>
</div>
<style>
    #submit {
    background-color: #FF66B3; 
    color: white; 
    padding: 5px; 
    border-radius: 5px; 
  }
    #submit:active {
    background-color: #42BFDD;  
  }
</style>
`
    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(template.content.cloneNode(true))

    // Get the nickname form element in the shadow root.
    this.#nicknameForm = this.shadowRoot.querySelector('#nickname-form')

    // Set up event handler for the nickname form.
    this.shadowRoot.querySelector('#submit').addEventListener('click', (event) => {
      this.#nickname = this.shadowRoot.querySelector('#playerName').value
      // I want to prevent the browsers default behaviour here, so that the form doesn't submit (and refresh the webpage).
      event.preventDefault()

      // Test to check that the nickname has been stored.
      console.log(this.#nickname)
    })
  }
}

customElements.define('nickname-form', nicknameForm)

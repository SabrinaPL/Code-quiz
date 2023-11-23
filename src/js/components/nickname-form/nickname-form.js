/**
 * The nickname-form component module.
 *
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<form id="nickname-form">
  <label for="playerName">Enter a nickname to start the quiz:</label><br>
  <input type="text" id="playerName" name="playerName" required><br>
  <button type="submit" id="btn">Let's play!</button>
</form>

<style>
#btn {
background-color: #FF66B3; 
color: white; 
padding: 5px; 
border-radius: 5px; 
}

#btn:active {
background-color: #42BFDD;  
}
</style>
`

/** Nickname form class that extends HTMLElement class
 * and creates a custom element.
 */
class NicknameForm extends HTMLElement {
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
  #nickname

  /**
   * Constructor for nicknameForm class which invokes its super class constructor.
   */
  constructor () {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(template.content.cloneNode(true))

    // Get the nickname form element in the shadow root.
    this.#nicknameForm = this.shadowRoot.querySelector('#nickname-form')

    // Set up event handler for the nickname form.
    this.#nicknameForm.addEventListener('submit', (event) => {
      this.#nickname = this.shadowRoot.querySelector('#playerName').value
      // I want to prevent the browsers default behaviour here, so that the form doesn't submit (and refresh the webpage).
      event.preventDefault()

      // Dispatch event to communicate with quiz-application - quiz-application will listen for this event, store the nickname in a nickname property, then remove the nickname-form component from the DOM?
      this.dispatchEvent(new CustomEvent('nickname', {
        detail: this.#nickname
      }))
    })
  }
}

// Define the custom element.
customElements.define('nickname-form', NicknameForm)

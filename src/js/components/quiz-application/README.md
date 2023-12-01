# Quiz Application Web Component

The Quiz Application Web Component is a custom element that integrates various subcomponents to create an interactive quiz experience.

## Public Methods

`getQuestion(URL: string): Promise<void>`
Fetches a quiz question from the API URL.
Parameters: `URL` (string): The URL used to fetch questions from the API.

`sendAnswer(): Promise<void>`
Sends the user's answers to the quiz questions to the API and updates the quiz based on the response from the API.

`setAttribute(attribute: <string, string>)`
Is used when other components should be hidden (with the "hidden" attribute).

`removeAttribute(attribute: <string, string>)`
Is used when other components should be displayed.

## Event Listeners

`nickname`
Is triggered when the player enters their nickname through the nickname form component.

`tryAgain` and `playAgain`
Are triggered when the player chooses to try the quiz again (without having to refresh the webpage).

`showHighScore`
Is triggered when the high score should be displayed to the user (at the end of the game).

`answer`
Is triggered when the player submits their answer to a quiz question.

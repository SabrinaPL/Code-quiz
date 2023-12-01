# Countdown Timer Web Component

The Countdown Timer Web Component is a custom element that provides a visual countdown timer for use in various applications. It features dynamic color changes and triggers event when the timer reaches zero.

## Public Methods

`startCountDown(): void`
Starts the countdown timer with the configured start time.

`updateStartTime(newStartTime: number)`
Updates the starting time of the countdown timer.

Parameters: `newStartTime` (number): The new start time.

`resetTimer(): void`
Resets the countdown timer, stopping the countdown.

`resetTime(): void`
Resets the start and current time of the countdown timer.

## Events

`countdownTimerFinished`
Is triggered when the countdown timer reaches zero.

## Styling

The Countdown Timer Web Component includes default styling for the timer. Additionally, it dynamically changes color when there are 3 seconds remaining.

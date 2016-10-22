# CommitEmotion

Record your current emotion along with your git commit.

## How it works

Takes a photo using your webcam and then sends the image to [Microsoft Cognitive Services](https://www.microsoft.com/cognitive-services/en-us/emotion-api) for emotional analysis. It then prepends the commit message with the appropriate emoji.

## How To Use

### Requirements

*Linux* - Install `fswebcam` via your distributions package manager (apt-get, yum, etc.)

*Mac OS* - `brew install imagesnap`

1. `npm install`
2. Create a `.env` file that includes `MS_KEY={your MS Cognitive Services API key}`

## Adding to a git repository

1. `ln -s {full path to app.js} {full path to project directory}/.git/hooks/commit-msg`
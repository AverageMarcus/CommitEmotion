#!/usr/bin/env node
require('dotenv').config();
const NodeWebcam = require('node-webcam');
const request = require('request');
const fs = require('fs');

const emotion_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize';
const timestamp = new Date().getTime();

const emojiMap = {
  'anger': '😡',
  'contempt': '😔',
  'disgust': '💩',
  'fear': '😰',
  'neutral': '😐',
  'sadness': '😞',
  'surprise': '😮',
  'happiness': '😃'
};

NodeWebcam.capture('images/' + timestamp, {}, function() {
  const file = fs.readFileSync('images/' + timestamp + '.jpg');

  request(emotion_url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.MS_KEY,
      'Content-Type': 'application/octet-stream'
    },
    body: file
  }, (err, res, obj) => {
    if(err) throw err;

    let face = JSON.parse(obj)[0];
    console.log(`
      😡 Anger: ${(face.scores.anger * 100).toFixed(2)}%
      😔 Contempt: ${(face.scores.contempt * 100).toFixed(2)}%
      💩 Disgust: ${(face.scores.disgust * 100).toFixed(2)}%
      😰 Fear: ${(face.scores.fear * 100).toFixed(2)}%
      😐 Neutral: ${(face.scores.neutral * 100).toFixed(2)}%
      😞 Sad: ${(face.scores.sadness * 100).toFixed(2)}%
      😮 Surprise: ${(face.scores.surprise * 100).toFixed(2)}%
      😃 Happy: ${(face.scores.happiness * 100).toFixed(2)}%
    `);

    const topEmotion = Object.keys(face.scores).reduce((a, b) => face.scores[a] > face.scores[b] ? a : b);

    // Update commit message
    if(process.argv.length === 3) {
      let commit = fs.readFileSync(process.argv[2], 'utf8');
      commit = emojiMap[topEmotion] + ' ' + commit;
      fs.writeFileSync(process.argv[2], commit);
    }

    process.exit(0);
  });
});
<template>
  <div>
    <div id="room" class="darkwall" :style="style">
      <div class="titleStyle">{{ title }}</div>
      <input v-model="content" type="text" placeholder="Ask something..." class="input" clear>
      <div class="button-block">
        <button type="button" @click="askAi" class="btn">
          <strong>{{ btnText }}</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>
        <button type="button" @click="startSpeechToText" class="btn">Start Speaking</button>
        <button xr-layer @click="shared.increment">count is: {{ shared.state.count }}</button>
      </div>
      <div class="card">
        <pre class="answer">{{ res }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 600px;
  max-height: 200px; /* Adjust the maximum height as needed */
  overflow: auto;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}

.answer {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 0.5em; /* Adjust the font size as needed */
}
</style>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Title from '../../components/CenterTitle.vue'
import '../../assets/top.css'
import '../../assets/room.css'

let params = inject('params')
var title = params && params.text ? params.text : 'Soobin_v1 Testing...'
var color = params && params.color ? 'color: ' + params.color + ';' : 'color: green;'
var size = params && params.size ? 'font-size: ' + params.size + 'em;' : 'font-size: 2em;'
var style = color + size + 'white-space: nowrap;'

const shared = inject('shared')
const content = ref('What is Reality Media?')
const BTN_TEXT = 'Submit 🚀'
const res = ref('✅ The answer will be displayed here.')
const btnText = ref(BTN_TEXT)

const askAi = () => {
  res.value = content.value;
  btnText.value = BTN_TEXT; // Reset the button text
}

let recognition;
onMounted(() => {
    if ('SpeechRecognition' in window) {
        recognition = new window.SpeechRecognition();
        recognition.lang = 'en-US';

        recognition.onstart = function() {
            console.log('SpeechRecognition has started');
        };

        recognition.onend = function() {
            console.log('SpeechRecognition has ended');
        };

        recognition.onresult = function(event) {
            let lastResultIndex = event.results.length - 1;
            let text = event.results[lastResultIndex][0].transcript;
            content.value = text;
        };
    } else {
        console.log('SpeechRecognition is not supported in this browser');
    }
});

onUnmounted(() => {
    if (recognition) {
        recognition.stop();
    }
});

const startSpeechToText = () => {
    if (recognition) {
        recognition.start();
    }
};
</script>

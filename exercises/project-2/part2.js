// import * as tf from "@tensorflow/tfjs";
// import * as tfd from "@tensorflow/tfjs-data";

const recordButtons = document.getElementsByClassName('record-button');
const buttonContainer = document.getElementById('buttons-container');;

const trainButton = document.getElementById("train");
const predictButton = document.getElementById("predict");
const statusElement = document.getElementById("status");

let webcam, initialModel, mouseDown, newModel;

const totals = [0, 0];
const labels = ["left", "right"];

// learning rate is how frequently weights are changed during training which can be adjusted and observe the difference
const learningRate = 0.0001;
const batchSizeFraction = 0.4;
const epochs = 30; //steps to train the model
const denseUnits = 100;

let isTraining = false;
let isPredicting = false;

const loadModel = async () => {
  const mobilenet = await tf.loadLayersModel(
    "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/models.json"
  )

  //this layer is provided by mobilenet for transfer learning
  const layer = mobilenet.getLayer("conv_pw_13-relu");
  return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
}

const init = async () => {
  webcam = await tfd.webcam(document.getElementById('webcam')) 

  initialModel = await loadModel();
  statusElement.style.display = "none";

  document.getElementById("controller").style.dispaly = "block";
}

init();


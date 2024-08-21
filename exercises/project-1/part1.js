import "@tensorflow/tfjs";
// coco-ssd is used for image recognition
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { handleFilePicker, showResult } from './utils';

const init = async () => {
  model = await cocoSsd.load();

  handleFilePicker(predict)
}

const predict = async(img) => {
  const predictions = await model.detect(img)
  console.log(predictions);
  showResult(predictions);
}


init();

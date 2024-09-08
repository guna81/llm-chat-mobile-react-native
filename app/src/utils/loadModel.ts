// npm i @xenova/transformers
import { pipeline } from "@xenova/transformers";
import image from "../../assets/test.jpg";

console.log({ image });

// Allocate pipeline
const pipe = pipeline(
  "document-question-answering",
  "Xenova/donut-base-finetuned-docvqa"
);

// Run pipeline
export const result = pipe(image);

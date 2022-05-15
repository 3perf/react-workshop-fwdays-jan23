import { Button } from "@mui/material";
import { useState } from "react";

function RandomizeSizes({ numberOfParagraphs }) {
  const [sizes, setSizes] = useState([]);

  const randomizeSizes = () => {
    const newRandomSizes = [];

    for (let i = 0; i < numberOfParagraphs; ++i) {
      newRandomSizes.push(Math.floor(Math.random() * 20) + 10);
    }

    setSizes(newRandomSizes);
  };

  return (
    <>
      <style>
        {sizes
          .map(
            (size, i) =>
              ".note-view__text p:nth-child(" +
              (i + 1) +
              ") { font-size: " +
              size +
              "px; }"
          )
          .join("\n")}
      </style>
      <Button variant="outlined" onClick={randomizeSizes} size="small">
        Randomize sizes
      </Button>
    </>
  );
}

export default RandomizeSizes;

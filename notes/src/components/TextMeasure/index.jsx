const distanceToEarthCore = 6371; /* km */

const TextMeasure = ({ textLength, textHeight }) => {
  if (textLength === 0) {
    return <>Your text is empty 🫥</>;
  }

  if (textHeight < 100)
    return <>Your text is {textHeight}px tall! Teeny tiny 🤏</>;

  if (textHeight < distanceToEarthCore)
    return (
      <>
        Your text is {textHeight}px tall! Here’s a useless fact: if every pixel
        was 1 km tall, the text would be{" "}
        {Math.ceil((textHeight / distanceToEarthCore) * 100)}% of the way to the
        Earth’s core. 🌍
      </>
    );

  return (
    <>
      Your text is {textHeight}px tall. Here’s a useless fact: that’s{" "}
      {Math.round(textHeight / window.innerHeight)} times the height of your
      window 💀
    </>
  );
};

export default TextMeasure;

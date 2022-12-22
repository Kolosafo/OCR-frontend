import React, { useState, useEffect } from "react";
import { Container, DisplayContainer, DisplayToggle } from "./style";
import {
  ButtonContainer,
  ActionButton,
  buttonStyle,
} from "../DragAndDrop/style";
import { themes } from "../../Context/ThemeContext";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Preview = ({ themeColor, image, extractedText, setExtracted }) => {
  const [text, setText] = useState("NOTHING HERE YET!");
  const [copied, setCopied] = useState(null);
  const previewValues = {
    image: "IMAGE",
    text: "TEXT",
  };
  const [display, setDisplay] = useState(previewValues.text);
  const [Color, setColor] = useState(themeColor);

  const handleClick = () => {
    console.log(themeColor);
    display === previewValues.text
      ? setDisplay(previewValues.image)
      : setDisplay(previewValues.text);
  };

  useEffect(() => {
    if (extractedText) {
      console.log("its here!!!", extractedText);
      const extractionsArray = extractedText;
      extractionsArray.map((extraction) => setText(extraction.extraction));
    }

    themeColor === themes.dark.color
      ? setColor(themes.light.color)
      : setColor(themes.dark.color);
  }, [themeColor, Color, image, extractedText]);
  return (
    <>
      <Container>
        <DisplayContainer>
          {display === previewValues.image && image ? (
            <img src={image} style={{ width: "100%" }} alt="" />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "80%",
                height: "100%",
                width: "100%",
                marginTop: "30px",
                marginBottom: "15px",
              }}
            >
              {console.log("MA CHECK TEXT -->0", text.length)}
              {typeof text === "object"
                ? text.map((_text, id) => {
                    return (
                      <div key={id} style={{ marginTop: "15px" }}>
                        <span style={{ textAlign: "center", marginTop: "5px" }}>
                          {_text}
                        </span>
                      </div>
                    );
                  })
                : text}
            </div>
          )}
        </DisplayContainer>
        <DisplayToggle bgcolor={themeColor} color={Color}>
          <button className="toggleButton" onClick={handleClick}>
            <span style={{ marginLeft: "8px" }}>
              {display === previewValues.image
                ? "Hide the original image"
                : "Display the original image"}
            </span>
            <span style={{ marginRight: "8px" }}>
              {display === previewValues.image ? (
                <FiEye size={"1.5rem"} />
              ) : (
                <FiEyeOff size={"1.5rem"} />
              )}
            </span>
          </button>
        </DisplayToggle>
      </Container>

      <ButtonContainer>
        <ActionButton style={buttonStyle} onClick={() => setExtracted("cancel")}>Back</ActionButton>

        <CopyToClipboard text={text} onCopy={() => setCopied("Copied!")}>
          <ActionButton bgcolor={themeColor} color={Color}>
            {copied ? copied : "Copy to clipboard"}
          </ActionButton>
        </CopyToClipboard>
      </ButtonContainer>
    </>
  );
};

export default Preview;

import React, { useState, useEffect } from "react";
import {
  Container,
  DisplayContainer,
  DisplayToggle,
  PreviewMainContainer,
  CopyClipBoardBtnCont,
  InnerStyle,
} from "./style";
import { MagnifyingGlass } from "react-loader-spinner";
import {
  ButtonContainer,
  ActionButton,
  buttonStyle,
} from "../DragAndDrop/style";
import { themes } from "../../Context/ThemeContext";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Preview = ({
  themeColor,
  image,
  extractedText,
  setExtracted,
  multiple,
  setIndex,
  setTheme,
}) => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(null);
  const [noExtract, setNoExtract] = useState("NOTHING HERE YET!");
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

      //FIRST TRY BLOCK IS FOR SINGLE IMAGE EXTRACTED TEXT
      try {
        const extractionsArray = extractedText;
        extractionsArray.map((extraction) => setText(extraction.extraction));
        console.log("MA CHECK TEXT OK", text);
        //CATCH  BLOCK IS FOR MULTI IMAGE EXTRACTED TEXT
      } catch {
        const extractionsArray = extractedText.extraction;
        setText(extractionsArray);
        console.log("MA CHECK TEXT OKL 2", extractionsArray);
        setIndex(1);
      }
    }
    // IF TEXT IS EMPTY RETURN A MESSAGE
    if (text.length === 0) {
      setNoExtract("Nothing Here Yet!");
    }
    themeColor === themes.dark.color
      ? setColor(themes.light.color)
      : setColor(themes.dark.color);
  }, [themeColor, Color, image, extractedText, text, setIndex]);
  return (
    <PreviewMainContainer>
      <Container multiple={multiple}>
        <DisplayContainer>
          {display === previewValues.image && image ? (
            <img src={image} style={{ width: "100%" }} alt="" />
          ) : (
            <InnerStyle>
              {console.log("MA CHECK TEXT -->0", text.length)}
              {typeof text === "object" && text.length > 0 ? (
                text.map((_text, id) => {
                  return (
                    <div key={id} style={{ marginTop: "15px" }}>
                      <span style={{ textAlign: "center", marginTop: "5px" }}>
                        {_text}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div style={{ alignSelf: "center" }}>
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                  />
                </div>
              )}
            </InnerStyle>
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
      {!multiple ? (
        <CopyClipBoardBtnCont multiple={multiple}>
          <ActionButton
            style={buttonStyle}
            onClick={() => setExtracted("cancel")}
          >
            Back
          </ActionButton>

          <CopyToClipboard text={text} onCopy={() => setCopied("Copied!")}>
            <ActionButton
              bgcolor={themeColor}
              color={Color}
              style={{
                fontSize: "1.2rem",
                marginLeft: "30px",
                textAlign: "center",
              }}
            >
              {copied ? copied : "Copy to clipboard"}
            </ActionButton>
          </CopyToClipboard>
        </CopyClipBoardBtnCont>
      ) : null}
    </PreviewMainContainer>
  );
};

export default Preview;

import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { themes } from "../../Context/ThemeContext";
import darkDropIcon from "../../assets/darkDropIcon.png";
import lightDropIcon from "../../assets/lightDropIcon.png";
import { TbHandFinger } from "react-icons/tb";

import {
  Container,
  DragandDropArea,
  ButtonContainer,
  ActionButton,
  MainContainer,
  H3,
} from "./style";

const DragAndDrop = ({
  setInvalidFile,
  setImports,
  imports,
  setExtracted,
  children,
  themeColor,
  extractionStatus,
  handleExtract,
  loading,
}) => {
  const [btnColor, setBtnColor] = useState(themeColor);
  const [clickAble, setClickable] = useState(loading);
  const fileTypes = ["jpg", "png", "jpeg"];

  //USE-EFFECT

  const handleChange = async (file) => {
    const multipleFiles = [];
    // get each file data when we have more than one file
    if (file.length > 1) {
      const fileList = [];
      for (let i = 0; i < file.length; i++) {
        fileList.push(file[i]);
      }

      fileList.map((_file, index) => {
        return multipleFiles.push({
          index: index + 1,
          image: _file,
        });
      });
      setImports(multipleFiles);
      setExtracted("clear");
    } else {
      // console.log("CHECKING SINGLE FILE", file[0]);
      setImports(file);
      setExtracted("clear");
    }
  };

  const handleTypeError = () => {
    console.log("TYPE ERROR");
    setInvalidFile(true);
  };

  useEffect(() => {
    setClickable(loading);
    console.log("THE THEME COLOR", clickAble);
    themeColor === themes.dark.color
      ? setBtnColor(themes.light.color)
      : setBtnColor(themes.dark.color);
  }, [themeColor, btnColor, loading]);
  return (
    <MainContainer>
      <Container color={themeColor} imports={imports}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          onTypeError={handleTypeError}
          multiple={true}
          style={{ display: "flex" }}
        >
          <DragandDropArea imports={imports}>
            {children}

            {!imports ? (
              themeColor === themes.dark.color ? (
                <img
                  style={{ width: "70%", marginTop: "50px" }}
                  src={darkDropIcon}
                  alt="darkIcon"
                />
              ) : (
                <img
                  style={{ width: "70%", marginTop: "50px" }}
                  src={lightDropIcon}
                  alt="darkIcon"
                />
              )
            ) : null}

            {}

            <h3 style={{ flex: "1", fontSize: "18px" }}>
              Drop Your Files Here{" "}
              <TbHandFinger color="yellow" fill="yellow" size={"20px"} />
            </h3>
            {/* <H3>JPG, PNG, SVG, PDF file size no more than 10mb</H3> */}
          </DragandDropArea>
        </FileUploader>
      </Container>

      <ButtonContainer>
        <ActionButton
          // style={buttonStyle}
          onClick={() => setExtracted("cancel")}
        >
          Cancel
        </ActionButton>
        {
          imports && !extractionStatus > 0 ? (
            <ActionButton
              bgcolor={themeColor}
              color={btnColor}
              onClick={handleExtract}
              loading={loading}
              style={{ marginLeft: "30px", textAlign: "center" }}
            >
              {imports.length > 1 ? " Upload All" : "Upload"}
            </ActionButton>
          ) : !extractionStatus > 0 ? (
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              onTypeError={handleTypeError}
              multiple={true}
            >
              <ActionButton
                bgcolor={themeColor}
                color={btnColor}
                style={{ marginLeft: "30px", textAlign: "center" }}
              >
                Select files
              </ActionButton>
            </FileUploader>
          ) : null // IS NULL BECAUSE IT IS TO BE REPLACED WITH MARGE ALL FROM MAIN.JS
        }
      </ButtonContainer>
    </MainContainer>
  );
};

export default DragAndDrop;

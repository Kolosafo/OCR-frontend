import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { themes } from "../../Context/ThemeContext";
import darkDropIcon from "../../assets/darkDropIcon.png";
import lightDropIcon from "../../assets/lightDropIcon.png";
import {
  Container,
  DragandDropArea,
  ButtonContainer,
  ActionButton,
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
    console.log("THE THEME COLOR", btnColor);
    themeColor === themes.dark.color
      ? setBtnColor(themes.light.color)
      : setBtnColor(themes.dark.color);
  }, [themeColor, btnColor]);
  return (
    <Container color={themeColor}>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        onTypeError={handleTypeError}
        multiple={true}
        style={{ display: "flex" }}
      >
        <>
          <DragandDropArea>
            {children}

            {!imports ? (
              themeColor === themes.dark.color ? (
                <img
                  style={{ width: "70%" }}
                  src={darkDropIcon}
                  alt="darkIcon"
                />
              ) : (
                <img
                  style={{ width: "70%" }}
                  src={lightDropIcon}
                  alt="darkIcon"
                />
              )
            ) : null}

            {}

            <h3 style={{ flex: "1", fontSize: "18px" }}>
              Drop Your Files Here
            </h3>
            <h3 style={{ flex: "1", fontWeight: "300", fontSize: "15px" }}>
              JPG, PNG, SVG, PDF file size no more than 10mb
            </h3>
          </DragandDropArea>
        </>
      </FileUploader>

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
            >
              Upload All
            </ActionButton>
          ) : !extractionStatus > 0 ? (
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              onTypeError={handleTypeError}
              multiple={true}
            >
              <ActionButton bgcolor={themeColor} color={btnColor}>
                Select files
              </ActionButton>
            </FileUploader>
          ) : null // IS NULL BECAUSE IT IS TO BE REPLACED WITH MARGE ALL FROM MAIN.JS
        }
      </ButtonContainer>
    </Container>
  );
};

export default DragAndDrop;

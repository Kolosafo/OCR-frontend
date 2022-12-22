import "./App.css";
import { useState, useReducer, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  extractionReducer,
  INITIAL_STATE,
  EXTRACTION_ACTIONS,
} from "./Reducers/extractionReducer/extractionReducer";
import { extractionApi } from "./api/extractionApi";
import DragAndDrop from "./components/DragAndDrop";
import Preview from "./components/Preview";
import PDFFile from "./components/PDF_File";
import { convertToBase64 } from "./utils/imgConvert";
import { themes } from "./Context/ThemeContext";
import { FiToggleRight, FiToggleLeft } from "react-icons/fi";
import {
  UploadAllContainer,
  UploadedFile,
  MainContainer,
  margeAllStyle,
  relative,
  ToddleContainer,
} from "./mainStyle";
import { CirclesWithBar } from "react-loader-spinner";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { ButtonContainer } from "./components/DragAndDrop/style";

function Main() {
 

  //states
  const [theme, setTheme] = useState(themes.dark);
  const [state, dispatch] = useReducer(extractionReducer, INITIAL_STATE);
  const [invalidFile, setInvalidFile] = useState(false);
  const [imports, setImports] = useState();
  const [extracted, setExtracted] = useState(null);
  const [extractionStatus, setExtractionStatus] = useState(null);
  const [extractedCount, setExtractedCounts] = useState(0);
  const [base64, setBase64] = useState("");
  const [merge, setMerge] = useState([]);

  const modeChanger = {
    backgroundColor: `${theme.color ? theme.color : "red"}`,
    color: `${theme.backgroundColor ? theme.backgroundColor : "#8e8e8f"}`,
  };
  const handleMerge = () => {
    const extractionsArray = state.extractions;
    const textObject = extractionsArray.map((extraction) => extraction);
    const extractedTexts = textObject.map((texts) => texts.extraction).flat(1);
    setMerge(extractedTexts);
  };

  const handleExtract = () => {
    setExtracted("clear");
    dispatch({ type: EXTRACTION_ACTIONS.start });
    if (imports.length > 1) {
      let count = 0;
      console.log("NA PLENTY", imports);
      imports.map(async (_imports) => {
        const { ubuntuUrl, requestOption } = extractionApi(
          _imports.image,
          _imports.index
        );
        fetch(ubuntuUrl, requestOption)
          .then((res) => res.json())
          .then((response) => {
            //start loading
            console.log("CHECKING RESPONSE -->", response);

            const filtered = response.text.filter((str) => {
              return /\S/.test(str);
            });
            dispatch({
              type: EXTRACTION_ACTIONS.success,
              payload: { id: response.id, extraction: filtered },
            });
            setExtracted(response.id);
            setExtractedCounts((count += 1));
          })
          .catch((e) => {
            dispatch({ type: EXTRACTION_ACTIONS.error, payload: e });
          });
      });
    } else if (imports.length === 1) {
      const { ubuntuUrl, requestOption } = extractionApi(imports[0]);
      fetch(ubuntuUrl, requestOption)
        .then((res) => res.json())
        .then((response) => {
          console.log("CHECKING RESPONSE -->", response);

          const filtered = response.text.filter((str) => {
            return /\S/.test(str);
          });
          dispatch({
            type: EXTRACTION_ACTIONS.success,
            payload: { id: response.id, extraction: filtered },
          });
          // HERE I MAKE EXTRACTED COUNT -1 BECAUSE MULTIPLE OBJECT
          // EXTRACTION LOGIC WORKS ON THE INCREASING VALUE OF EXTRACTS
          // HENCE WE CAN NOT USE A POSITIVE NUMBER HERE NEITHER CAN WE
          // USE LETTERS LEST THE WHOLE CODE BREAKS
          setExtractionStatus(-1);
        })
        .catch((e) => {
          dispatch({ type: EXTRACTION_ACTIONS.error, payload: e });
          console.log("BE ERROR --> ", e);
        });
    } else {
      console.log("PLEASE IMPORT AN IMAGE");
    }
  };

  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };
  useEffect(() => {
    if (state) {
      //pre-merging data just incase, no hassle
      handleMerge();
    }
    if (imports) {
      if (extractedCount === imports.length) {
        setExtractionStatus(1);
        console.log("YOU FIT MERGE NOW!", extractedCount);
      }
      if (imports.length === 1) {
        convertToBase64(imports[0], setBase64);
      }
    }
    if (extracted === "cancel") {
      window.location.reload();
    }
  }, [state, extractedCount, imports, extractedCount, extracted]);

  return (
    <div style={{ ...theme, ...relative }}>
      <ToddleContainer>
        <span style={{ marginRight: "1.5rem" }}>Light</span>
        {theme === themes.dark ? (
          <FiToggleRight size={"1.8rem"} onClick={toggleTheme} />
        ) : (
          <FiToggleLeft size={"1.8rem"} onClick={toggleTheme} />
        )}
        <span style={{ marginLeft: "1.5rem" }}>Dark</span>
      </ToddleContainer>

      {/* <input type="file" onChange={(e) => handleChange(e)} /> */}

      <MainContainer
        style={{
          display: `${
            imports && extractionStatus === -1 && imports.length === 1
              ? "none"
              : "flex"
          }`,
        }}
      >
        <DragAndDrop
          setImports={setImports}
          setExtracted={setExtracted}
          setInvalidFile={setInvalidFile}
          themeColor={theme.color}
          imports={imports}
          extractionStatus={extractionStatus}
          handleExtract={handleExtract}
          loading={state.loading}
        >
          <span>{invalidFile ? "Unsupported File Format" : ""}</span>
        </DragAndDrop>
        <UploadAllContainer>
          {imports && imports.length > 1 ? (
            imports.map((importFile, index) => {
              return (
                <UploadedFile
                  bgcolor={theme.color}
                  color={theme.backgroundColor}
                  extracted={extracted}
                  index={index}
                >
                  <span
                    id={`id-${importFile.index}`}
                    style={{ marginRight: "auto", marginLeft: "10px" }}
                  >
                    {importFile.image.name}
                  </span>
                  <span style={{ marginRight: "10px" }}>
                    {state.loading ? (
                      (console.log("I HAVE STARTED LOADING!"),
                      extracted === "clear" ? (
                        <CirclesWithBar
                          height="50"
                          width="50"
                          color="#4fa94d"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          outerCircleColor=""
                          innerCircleColor=""
                          barColor=""
                          ariaLabel="circles-with-bar-loading"
                        />
                      ) : (
                        <CirclesWithBar
                          height="50"
                          width="50"
                          color="#4fa94d"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          outerCircleColor=""
                          innerCircleColor=""
                          barColor=""
                          ariaLabel="circles-with-bar-loading"
                        />
                      ))
                    ) : extractedCount >= index + 1 ? (
                      (console.log(
                        "WETIN SUP FIRST ",
                        extractedCount,
                        index + 1
                      ),
                      (<BsFillPatchCheckFill color="green" size={"24px"} />))
                    ) : extractedCount <= index + 1 && extractedCount !== 0 ? (
                      <CirclesWithBar
                        height="50"
                        width="50"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        outerCircleColor=""
                        innerCircleColor=""
                        barColor=""
                        ariaLabel="circles-with-bar-loading"
                      />
                    ) : (
                      (null,
                      console.log("WETIN SUP ", extractedCount, index + 1))
                    )}
                  </span>
                </UploadedFile>
              );
            })
          ) : imports ? (
            <UploadedFile
              bgcolor={theme.color}
              color={theme.backgroundColor}
              extracted={extracted}
            >
              <span
                id={`id-${imports[0].index}`}
                style={{ marginRight: "auto", marginLeft: "10px" }}
              >
                {imports[0].name}
              </span>
              <span style={{ marginRight: "10px" }}>
                {state.loading ? (
                  (console.log("I HAVE STARTED LOADING!"),
                  extracted === "clear" ? (
                    <CirclesWithBar
                      height="50"
                      width="50"
                      color="#4fa94d"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      outerCircleColor=""
                      innerCircleColor=""
                      barColor=""
                      ariaLabel="circles-with-bar-loading"
                    />
                  ) : (
                    <CirclesWithBar
                      height="50"
                      width="50"
                      color="#4fa94d"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      outerCircleColor=""
                      innerCircleColor=""
                      barColor=""
                      ariaLabel="circles-with-bar-loading"
                    />
                  ))
                ) : extractedCount >= imports[0].index + 1 ? (
                  (console.log(
                    "WETIN SUP FIRST ",
                    extractedCount,
                    imports[0].index + 1
                  ),
                  (<BsFillPatchCheckFill color="green" size={"24px"} />))
                ) : extractedCount <= imports[0].index + 1 &&
                  extractedCount !== 0 ? (
                  <CirclesWithBar
                    height="50"
                    width="50"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    outerCircleColor=""
                    innerCircleColor=""
                    barColor=""
                    ariaLabel="circles-with-bar-loading"
                  />
                ) : null}
              </span>
            </UploadedFile>
          ) : // </div>
          null}
        </UploadAllContainer>
      </MainContainer>

      {imports && state.extractions.length !== 0 && imports.length === 1 && (
        <Preview
          themeColor={theme.color}
          image={base64}
          extractedText={state.extractions}
          setExtracted={setExtracted}
        />
      )}

      {extractionStatus === 1 ? (
        <ButtonContainer style={{ justifyContent: "flex-end" }}>
          <PDFDownloadLink
            document={<PDFFile texts={merge} />}
            fileName={`merged.pdf`}
            style={{ ...margeAllStyle, ...modeChanger }}
          >
            {({ loading }) => (loading ? " Loading Document..." : "Merge All")}
          </PDFDownloadLink>
        </ButtonContainer>
      ) : null}
    </div>
  );
}

export default Main;

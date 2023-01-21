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
import Instruction from "./components/Instruction/index";
import { convertToBase64 } from "./utils/imgConvert";
import { themes } from "./Context/ThemeContext";
import { FiToggleRight, FiToggleLeft } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { ActionButton } from "./components/DragAndDrop/style";
import {
  UploadAllContainer,
  UploadedFile,
  MainContainer,
  margeAllStyle,
  relative,
  ToggleContainer,
  Logo,
} from "./mainStyle";
import { CirclesWithBar } from "react-loader-spinner";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { ButtonContainer } from "./components/DragAndDrop/style";

function Main() {
  //states
  // const currentTheme = JSON.parse(localStorage.getItem(setUserId.id) || '{}');
  const [theme, setTheme] = useState(themes.light);
  const [state, dispatch] = useReducer(extractionReducer, INITIAL_STATE);
  const [invalidFile, setInvalidFile] = useState(false);
  const [imports, setImports] = useState();
  const [extracted, setExtracted] = useState(null);
  const [extractionStatus, setExtractionStatus] = useState(null);
  const [extractedCount, setExtractedCounts] = useState(0);
  const [base64, setBase64] = useState("");
  const [merge, setMerge] = useState([]);
  const [loading, setLoading] = useState(1);
  const [index, setIndex] = useState(0);
  const [previewText, setPreviewText] = useState("");
  const [multiple, setMultiple] = useState(false);

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
    setLoading(0);
    dispatch({ type: EXTRACTION_ACTIONS.start });
    if (imports.length > 1) {
      setMultiple(true);
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
    if (theme === themes.dark) {
      setTheme(themes.light);
      localStorage.removeItem("theme");
      localStorage.setItem("theme", JSON.stringify("light"));
    } else {
      localStorage.removeItem("theme");
      console.log("CHANGING THEME");
      setTheme(themes.dark);
      localStorage.setItem("theme", JSON.stringify("dark"));
    }
  };
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("theme"));
    if (currentTheme === "dark") {
      console.log("rerender? THEME", currentTheme, themes.dark);
      setTheme(themes.dark);
    } else {
      console.log("rerender? THEME", currentTheme, themes.light);
      setTheme(themes.light);
    }

    console.log("PREVIEW CHECK", previewText);
    if (state) {
      //pre-merging data just incase, no hassle
      handleMerge();
      //rever extraction for preview
      console.log("BEFORE REVRSE", state.extractions);

      // state.extractions.sort(function (a, b) {
      //   var keyA = a,
      //     keyB = b
      //   // Compare the 2 dates
      //   if (keyA < keyB) return -1;
      //   if (keyA > keyB) return 1;
      //   return 0;
      // });
      // console.log("REORDERED", state.extractions.sort((a, b) => a.id - b.id));
      // handleReverseArray(state.extractions);
    }
    if (imports) {
      if (extractedCount === imports.length) {
        setExtractionStatus(1);
        setLoading(0);
        console.log("YOU FIT MERGE NOW!", extractedCount);
      } else {
        // state.loading
      }
      if (imports.length === 1) {
        convertToBase64(imports[0], setBase64);
      }
    }
    if (extracted === "cancel") {
      if (imports || state.extractions.length !== 0) {
        window.location.reload();
      } else {
        console.log("CAN'T RELOAD", imports, state.extractions.length);
      }
    }
  }, [state, extractedCount, imports, extractedCount, extracted, previewText]);

  useEffect(() => {
    if (extractedCount === 1) {
      // setPreviewText(state.extractions.sort((a, b) => a.id - b.id)[1]);
      document.getElementById("id-1").click();
    }
  }, [extractedCount, state.extractions]);
  return (
    <div style={{ ...theme, ...relative }}>
      <ToggleContainer multiple={multiple} imports={imports} state={state}>
        <span style={{ marginRight: "1.3rem", fontSize: "1.3rem" }}>Light</span>
        {theme === themes.dark ? (
          <FiToggleRight size={"3rem"} onClick={toggleTheme} />
        ) : (
          <FiToggleLeft size={"3rem"} onClick={toggleTheme} />
        )}
        <span style={{ marginLeft: "1.3rem", fontSize: "1.3rem" }}>Dark</span>
      </ToggleContainer>

      <Logo multiple={multiple} imports={imports} state={state}>
        <h2 style={{ marginLeft: "1.4rem" }}>LOGO</h2>
      </Logo>

      {/* <input type="file" onChange={(e) => handleChange(e)} /> */}
      <Instruction themeColor={theme.color} multiple={multiple} />

      <MainContainer
        style={{
          display: `${
            imports && extractionStatus === -1 && imports.length === 1
              ? "none"
              : "flex"
          }`,
        }}
        bgcolor={theme.color}
      >
        {!multiple ? (
          <DragAndDrop
            setImports={setImports}
            setExtracted={setExtracted}
            setInvalidFile={setInvalidFile}
            themeColor={theme.color}
            imports={imports}
            extractionStatus={extractionStatus}
            handleExtract={handleExtract}
            loading={loading}
          >
            <span>{invalidFile ? "Unsupported File Format" : ""}</span>
          </DragAndDrop>
        ) : multiple ? (
          <Preview
            themeColor={theme.color}
            image={base64}
            extractedText={previewText}
            setExtracted={setExtracted}
            setIndex={setIndex}
            index={index}
            multiple={multiple}
            setTheme={setTheme}
          />
        ) : null}

        <UploadAllContainer
          bgcolor={theme.backgroundColor}
          displayStatus={imports}
          style={{ marginBottom: "50px" }}
        >
          {/* <>
         
          </> */}
          {imports && imports.length > 1 ? (
            (console.log("CHECKING IMPORTS", imports),
            imports.map((importFile, index) => {
              return (
                <UploadedFile
                  bgcolor={theme.color}
                  id={"imported-file"}
                  color={theme.backgroundColor}
                  extracted={extracted}
                  index={index}
                  onClick={() => {
                    // setIndex(index);
                    setPreviewText(
                      state.extractions.sort((a, b) => a.id - b.id)[index]
                    );
                    convertToBase64(imports[index].image, setBase64);
                    // console.log("CHECKING REVERSE INDEX", );
                  }}
                >
                  <IoImageOutline
                    color="grey"
                    size={"25px"}
                    style={{ marginLeft: "15px", marginRight: "10px" }}
                  />
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
                          height="30"
                          width="30"
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
                          height="30"
                          width="30"
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
                        height="30"
                        width="30"
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
            }))
          ) : //SINGLE IMAGE LAODING BELOW
          imports ? (
            <UploadedFile
              bgcolor={theme.color}
              color={theme.backgroundColor}
              extracted={extracted}
            >
              <IoImageOutline
                color="grey"
                size={"25px"}
                style={{ marginLeft: "15px", marginRight: "20px" }}
              />
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
                      height="30"
                      width="30"
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
                      height="30"
                      width="30"
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
                    height="30"
                    width="30"
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

      {multiple ? (
        <ButtonContainer style={{ justifyContent: "space-around" }}>
          <ActionButton
            // style={buttonStyle}
            onClick={() => setExtracted("cancel")}
          >
            Cancel
          </ActionButton>
          {extractionStatus === 1 ? (
            <PDFDownloadLink
              document={<PDFFile texts={merge} />}
              fileName={`merged.pdf`}
              style={{ ...margeAllStyle, ...modeChanger, fontSize: "1.2rem" }}
            >
              {({ loading }) => (loading ? " Merge All" : "Merge All")}
            </PDFDownloadLink>
          ) : (
            <PDFDownloadLink
              document={<PDFFile texts={merge} />}
              fileName={`merged.pdf`}
              style={{
                ...margeAllStyle,
                ...modeChanger,
                fontSize: "1.2rem",
                pointerEvents: "none",
                cursor: "not-allowed",
              }}
            >
              {({ loading }) => (loading ? "Merge All" : "Merge All")}
            </PDFDownloadLink>
          )}
        </ButtonContainer>
      ) : null}
    </div>
  );
}

export default Main;

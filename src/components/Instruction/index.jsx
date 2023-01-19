import React from "react";
import { Container } from "./style";

const Instruction = () => {
  return (
    <Container>
      <ul>
        <li className="steps">
          Welcome to http://image2text.net free online tool.
        </li>
        <li className="steps">
          You can extract text from an image with this tool
        </li>
        <li className="steps">
          Click on the box to drop your files and click upload to begin
          extraction.
        </li>
        {/* <li className="steps">
          For Multiple Files extraction =&gt; choose "Merge All" to export
          extracted text as PDF
        </li>
        <li className="steps">
          For Single Image extraction =&gt; you have the option to copy
          extracted text to clipboard
        </li> */}
      </ul>
    </Container>
  );
};

export default Instruction;

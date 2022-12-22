import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PDFFile = ({ texts }) => {
  console.log("BEFORE PDF-->", texts);
  return (
    <Document>
      <Page style={styles.body}>
        {texts.map((text, index) => {
          return (
            <Text key={index} style={styles.text}>
              {text}
            </Text>
          );
        })}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDFFile;

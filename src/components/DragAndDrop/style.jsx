import styled from "styled-components";

export const Container = styled.div`
  flex: 0 0 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 3px solid ${(p) => (p.color ? `${p.color}` : "#ffffff")};;
  border-radius: 10%;
`;

export const DragandDropArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* flex: 8; */

  border: 2px dashed grey;
  border-radius: 7%;
  margin: 10px 10px;
`;

export const ImgPlaceHolder = styled.div`
  height: 80%;
  width: 70%;
  flex: 8;
  /* border: 2px dashed grey; */
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  width: 25%;
  display: flex;
  justify-content: space-between;
  /* border: 3px solid #efeff4; */
`;
export const ActionButton = styled.button`
  all: unset;
  padding: 10px 40px;
  /* border: 1px solid #8e8e8f; */
  border-radius: 10px;
  background-color: ${(p) => (p.bgcolor ? `${p.bgcolor}` : "transparent")};
  color: ${(p) => (p.color ? `${p.color}` : "#8e8e8f")};
  font-weight: 600;
  cursor: ${(p) => (p.loading ? "not-allowed" : "pointer")};
  z-index: 2;
  pointer-events: ${(p) => (p.loading ? "none" : "auto")};
  border: 1px solid #8e8e8f;
`;

export const buttonStyle = {
  all: "unset",
  padding: "10px 40px",
  border: "1px solid #6b6b6b",
  borderRadius: "10px",
  backgroundColor: "transparent",
  color: "#8e8e8f",
  fontWeight: "600",
  cursor: "pointer",
};

import styled from "styled-components";

export const Container = styled.div`
  /* flex: 0 0 20%; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(p) => (p.imports ? "100%" : "350px")};
  width: ${(p) => (p.imports ? "100%" : "450px")};
  border: 3px solid ${(p) => (p.color ? `${p.color}` : "#ffffff")};
  border-radius: ${(p) => (p.imports ? "10px" : "35px")};
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.37);
  -webkit-box-shadow: 0 0 25px #000000;
  box-shadow: 0 0 35px #000000;

  @media only screen and (max-width: 768px) {
    width: ${(p) => (p.imports ? "100%" : "300px")};
    height: ${(p) => (p.imports ? "100%" : "300px")};
  }
`;

export const DragandDropArea = styled.div`
  height: ${(p) => (p.imports ? "30%" : "330px")};
  /* flex: 8; */
  flex-basis: 100%;
  border: 2px dashed grey;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  @media only screen and (max-width: 768px) {
    height: ${(p) => (p.imports ? "30%" : "285px")};
  }
`;

export const ImgPlaceHolder = styled.div`
  height: 80%;
  width: 70%;
  flex: 8;
  /* border: 2px dashed grey; */
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 4px;
  width: 25%;
  display: flex;
  justify-content: space-between;
  /* border: 3px solid #efeff4; */

  @media only screen and (max-width: 768px) {
    width: 85%;
    justify-content: flex-start;
    margin-left: 20px;
  }
`;
export const ActionButton = styled.button`
  all: unset;
  padding: 10px 40px;
  /* border: 1px solid #8e8e8f; */
  border-radius: 10px;
  background-color: ${(p) => (p.bgcolor ? `${p.bgcolor}` : "transparent")};
  color: ${(p) => (p.color ? `${p.color}` : "#8e8e8f")};
  font-weight: 600;
  cursor: ${(p) => (p.loading === 0 ? "not-allowed" : "pointer")};
  z-index: 2;
  pointer-events: ${(p) => (p.loading === 0 ? "none" : "auto")};
  border: 1px solid #8e8e8f;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const buttonStyle = {
  all: "unset",
  padding: "10px 40px",
  border: "1px solid #6b6b6b",
  borderRadius: "10px",
  backgroundColor: "transparent",
  color: "#8e8e8f",
  fontWeight: "600",
  fontSize: "1.2rem",
  cursor: "pointer",
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 15rem;
  @media only screen and (max-width: 768px) {
    width: 95%;
    justify-content: flex-start;
    margin-left: 20px;
    margin-top: -20rem;
  }
`;

export const H3 = styled.h3`
  flex: 1;
  font-weight: 300;
  font-size: 1.3rem;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

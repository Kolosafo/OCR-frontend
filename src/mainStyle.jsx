import styled from "styled-components";

export const actionBtn = styled.button`
  width: 50px;
  height: 10px;
`;

export const MainContainer = styled.div`
  flex: 7;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 4px solid lightpink; */

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-top: 30px;
    justify-content: center;
  }
`;

export const UploadAllContainer = styled.div`
  display: ${(p) => (p.displayStatus ? "flex" : "none")};
  flex-basis: 35%;
  width: 55%;
  max-height: 250px;
  margin-top: 1rem;
  /* display: flex; */
  font-size: 1.2rem;
  font-weight: 500;
  padding-top: 60px;
  /* flex-direction: column; */
  /* border: 4px solid lightpink; */
  flex-direction: column;
  /* background-color: ${(p) => p.bgcolor}; */
  align-items: center;
  justify-content: space-around;
  overflow-x: scroll;
  scrollbar-width: none;
  @media only screen and (max-width: 768px) {
    padding: 0px 15px;
    max-height: 210px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UploadedFile = styled.div`
  flex: 0 0 30%;
  width: 75%;
  height: 25%;
  border-radius: 1rem;
  display: flex;
  margin-bottom: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;

  /* background-color: ${(p) => (p.color ? `${p.color}` : "white")}; */
  border: ${(p) =>
    p.color === "#373638" ? `1px solid white` : `1px solid black`};
  color: ${(p) => (p.bgcolor ? `${p.bgcolor}` : "#ffffff")};
  @media only screen and (max-width: 768px) {
    flex: none;
    height: 40px;
    width: 115%;
    font-size: 1rem;
  }
  /* border: 2px solid
    ${(p) =>
    parseInt(p.extracted) === p.index + 1
      ? "red"
      : p.extracted === "clear"
      ? "white"
      : null}; */

  &:hover {
    transition: 0.3s;
    background-color: #222122;
    color: white;
  }
`;

export const margeAllStyle = {
  all: "unset",
  padding: "10px 40px",
  border: "1px solid #8e8e8f",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1.2rem",
};

export const ToggleContainer = styled.div`
  /* flex: 1; */
  position: ${(p) =>
    p.imports && p.state.extractions.length !== 0 && p.imports.length === 1
      ? "absolute"
      : "inherit"};
  margin-top: ${(p) => (p.multiple ? "3rem" : "5rem")};
  margin-right: ${(p) => (p.multiple ? "3rem" : "5rem")};
  right: 0px;
  top: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  /* margin: 15px; */
  /* border: 2px solid red; */
  font-size: 1.6rem;
  @media only screen and (max-width: 768px) {
    margin-top: ${(p) => (p.multiple ? "3rem" : "3rem")};
    margin-right: 2rem;
  }
`;

export const Logo = styled.div`
  /* flex: 1; */
  position: ${(p) =>
    p.imports && p.state.extractions.length !== 0 && p.imports.length === 1
      ? "absolute"
      : "inherit"};
  margin-top: ${(p) => (p.multiple ? "-3rem" : "3rem")};
  margin-bottom: ${(p) => (p.multiple ? "3rem" : "3rem")};
  margin-right: ${(p) => (p.multiple ? "3rem" : "5rem")};
  right: 45%;
  top: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  /* margin: 15px; */
  /* border: 2px solid red; */
  font-size: 1.6rem;
  @media only screen and (max-width: 768px) {
    margin-top: ${(p) => (p.multiple ? "3rem" : "3rem")};
    margin-right: 2rem;
    right: 36%;
  }
`;

export const relative = {
  position: "relative",
};

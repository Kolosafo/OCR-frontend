import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  width: ${(p) => (p.multiple ? "100%" : "50%")};
  /* height: ${(p) => (p.multiple ? "100%" : "")}; */
  height: 450px;
  overflow: hidden;

  border-radius: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid lightgrey;

  @media only screen and (max-width: 768px) {
    width: 95%;
    height: 350px;
  }
`;
export const InnerStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 80%;
  height: 100%;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 15px;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    margin-top: 220px;
  }
`;

export const DisplayContainer = styled.div`
  width: 100%;
  flex: 8;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const DisplayToggle = styled.div`
  flex: 2;
  width: 100%;
  border-top: 0.2px solid lightblue;

  display: flex;
  align-items: center;
  justify-content: center;

  & .toggleButton {
    width: 90%;
    height: 75%;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    background-color: ${(p) => (p.bgcolor ? `${p.bgcolor}` : "white")};
    color: ${(p) => (p.color ? `${p.color}` : "#ffffff")};

    /* display: none; */
  }

  & .toggleButton:hover {
    transition: 0.3s;
    background-color: #222122;
    color: white;
  }
`;

export const PreviewMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 70%;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 60%;
    justify-content: space-between;
    align-items: center;
  }
`;

export const CopyClipBoardBtnCont = styled.div`
  position: "inherit";
  display: flex;
  justify-content: space-between;
  width: ${(p) => (p.multiple ? "100%" : "50%")};
  margin-bottom: 20px;
  margin-top: 35px;

  @media only screen and (max-width: 768px) {
    position: inherit;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 35px;
  }
`;

import styled from "styled-components";

export const actionBtn = styled.button`
  width: 50px;
  height: 10px;
`;

export const MainContainer = styled.div`
  width: 30%;
  height: 70%;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 4px solid lightpink; */
`;

export const UploadAllContainer = styled.div`
  flex: 1 1 70%;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  /* border: 4px solid lightpink; */
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UploadedFile = styled.div`
  flex: 0 0 30%;
  width: 90%;
  border-radius: 1rem;
  display: flex;
  margin-bottom: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${(p) => (p.bgcolor ? `${p.bgcolor}` : "white")};
  color: ${(p) => (p.color ? `${p.color}` : "#ffffff")};
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
};

export const ToddleContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const relative = {
  position: "relative",
};

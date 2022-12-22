import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  width: 25%;
  height: 65%;
  border-radius: 1.5rem;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid lightgrey;
`;

export const DisplayContainer = styled.div`
  width: 100%;
  flex: 8;

  display: flex;
  align-items: center;
  justify-content: center;
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

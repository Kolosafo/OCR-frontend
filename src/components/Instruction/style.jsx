import styled from "styled-components";

export const Container = styled.div`
  border: 2px solid #ff450047;
  position: absolute;
  z-index: 10;
  flex: 0;
  width: 50%;
  height: 450px;
  margin: 10px 0px;
  margin-top: -30px;
  font-size: 1.5rem;
  /* margin-bottom: auto; */
  background: #555456;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
  margin-bottom: 3rem;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;

  && ul {
    margin-left: 2rem;
  }
  && li {
    margin-top: 10px;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    margin: ${(p) => (p.multiple ? "-15px 0px" : "0px 0px")};
    margin-top: ${(p) => (p.multiple ? "0px" : "-40px")};
    margin-bottom: ${(p) => (p.multiple ? "0px" : "20px")};

    && li {
      font-size: 1.3rem;
    }
  }
`;

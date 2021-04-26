import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 340px;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  top: 10px;
  right: 600px;
  z-index: 5;

  @media screen and (max-width: 800px) {
    right: unset;
    bottom: 350px;
  }
`;
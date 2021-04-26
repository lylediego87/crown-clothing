import styled, { css } from 'styled-components';


const error = css`
  background-color: #eb4d4b;
`;

const info = css`
  background-color: #4285f4;
`;


const getNoteType = props => {
  if(props.level === "error"){
    return error;
  }
  return info;
}

export const ContentContainer = styled.div`
  height: 90px;
  padding: 10 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  ${getNoteType}
`;

export const Title = styled.span`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
  font-weight: 110px;
  color: white;
`;

export const Message = styled.span`
  font-weight: lighter;
  font-size: 16px;
  font-weight: 30px;
  color: white;
`;



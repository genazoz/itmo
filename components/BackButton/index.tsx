import React from "react";
import styled from "styled-components";

import {useRouter} from 'next/router'
import ArrowLeftIco from '../../public/svg/arrow-left.svg'

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 10px 20px 10px 15px;

  font-weight: 700;
  font-size: 11px;
  color: #FFFFFF;

  background-color: #000000;
  border-radius: 20px;
  cursor: pointer;

  svg {
    width: 11px;
    margin: 0 7px 1px 0;
  }
`;
const ArrowLeftIcon = styled.svg`
  width: 14px;
  height: 14px;

  transform: scale(.8);
  fill: #FFFFFF;
`

interface BackButtonProps {
  text: string
}

const BackButton: React.FC<BackButtonProps> = ({text}) => {
  const router = useRouter()

  return (
    <Button onClick={() => router.back()}>
      <ArrowLeftIcon as={ArrowLeftIco}/>
      {text}
    </Button>
  );
}

export default BackButton;

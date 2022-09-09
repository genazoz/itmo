import React from "react";
import styled from "styled-components";

import ItmoLogo from '../../public/svg/itmo_logo.svg'
import Link from "next/link";
import LocalChanger from "../LangChanger";

const Container = styled.header`
  position: fixed;
  z-index: 11;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: auto;
  padding: 0 var(--unit);
  
  background: linear-gradient(90deg, #3951E7 20.77%, #832AB9 91.64%);
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Link href={'/'}>
        <a style={{display: 'flex'}}>
          <ItmoLogo />
        </a>
      </Link>
      <LocalChanger />
    </Container>
  );
}

export default Header;
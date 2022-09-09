import React from "react";
import styled from "styled-components";

import {CSSTransition} from "react-transition-group";
import Link from "next/link";
import {useRouter} from "next/router";
import ArrowBottomIco from '../../public/svg/arrow-bottom.svg'
import RuIco from '../../public/svg/RU.svg'
import EnIco from '../../public/svg/EN.svg'

const Container = styled.div`
  position: relative;
  
  height: 100%;
  padding: 0 8px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  
  font-size: 12px;
  font-weight: 600;
  color: #FFFFFF;
`
const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  display: flex;
  flex-direction: column;
  width: max-content;
  margin: 0;
  padding: 0;

  background: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  
  opacity: 0;
  transform: translateY(10px);
  
  transition: .3s opacity, .3s transform;

  &.menu-enter-start {
    opacity: 0;
    transform: translateY(10px);
  }
  &.menu-enter-active {
    opacity: 1;
    transform: translateY(0);
  }
  &.menu-enter-done {
    opacity: 1;
    transform: translateY(0);
  }
  &.menu-exit-start {
    opacity: 1;
    transform: translateY(0);
  }
  &.menu-exit-active {
    opacity: 0;
    transform: translateY(10px);
  }
`
const Item = styled.a<{isActive: boolean}>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px 8px 8px;

  font-weight: 600;
  font-size: 12px;
  color: #222222;
  
  cursor: pointer;
  
  ${props => props.isActive && `
    pointer-events: none;
    padding: 5px 8px;
    
    background: #F2F4FF;
    `}
`

const LangChanger: React.FC = () => {
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const changeMenuOpened = (e: any) => {
    if ((!menuRef.current || !menuRef.current.contains(e.target))) {
      setIsOpenMenu(false);
    }
  }

  React.useEffect(() => {

    document.addEventListener("click", (e) => changeMenuOpened(e));

    return () => {
      document.removeEventListener("click", changeMenuOpened);
    }
  }, [isOpenMenu]);

  return (
    <Container
      onBlur={() => setIsOpenMenu(false)}
      ref={menuRef}
      tabIndex={0}>
      <Button onClick={() => setIsOpenMenu(!isOpenMenu)}>
        {router.locale === 'ru' ? <RuIco/> : <EnIco/>}
        {router.locale === 'ru' ? 'Рус' : 'Eng'}
        <ArrowBottomIco />
      </Button>
      <CSSTransition in={isOpenMenu} classNames={'menu'} timeout={500} unmountOnExit={true}>
        <Menu>
          <Link href={router.asPath} locale="ru">
            <Item isActive={router.locale === 'ru'}>
              <RuIco/>
              Рус
            </Item>
          </Link>
          <Link href={router.asPath} locale="en">
            <Item isActive={router.locale === 'en'}>
              <EnIco/>
              Eng
            </Item>
          </Link>
        </Menu>
      </CSSTransition>
    </Container>
  );
}

export default LangChanger;
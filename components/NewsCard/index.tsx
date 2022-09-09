import React, {useEffect} from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import Link from "next/link";
import {Articles} from "../../utils/api/types";
import Image from "next/future/image";
import NoImage from '../../public/img/placeholder.jpg'
import {useSelector} from "react-redux";
import {settingsSelector} from "../../features/settings/settingsSlice";

const Card = styled.a<{ isLoading: boolean }>`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;

  background: #FFFFFF;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
  border-radius: 16px;

  cursor: pointer;

  transition: .2s opacity;

  ${props => props.isLoading && `
    opacity: .3;
    pointer-events: none;
  `}
`;
const ImgWrapper = styled.div`
  position: relative;

  overflow: hidden;
  padding: 58% 0 0;

  pointer-events: none;
`
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 16px;

  @media (max-width: ${theme.media.sm}) {
    padding: 24px;
  }
`
const DateText = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0002px;
  text-transform: uppercase;
  color: #6A6A6A;
`
const Text = styled.span`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #222222;
`;

const NewsCard: React.FC<{ articlesObj: Articles }> = ({articlesObj}) => {
  const [src, setSrc] = React.useState(articlesObj.image_big ? articlesObj.image_big : NoImage);
  const {loading} = useSelector(settingsSelector);

  useEffect(() => {
    setSrc(articlesObj.image_big ? articlesObj.image_big : NoImage)
  }, [articlesObj.image_big])

  return (
    <Link href={`/card/${articlesObj.id}`}>
      <Card className={"card"} isLoading={loading}>
        <ImgWrapper className={"card-bg"}>
          <Img
            as={Image}
            src={src}
            alt={'goods'}
            width={1200}
            height={1200}
            placeholder="blur"
            blurDataURL={'/img/placeholder.jpg'}
            onError={() => setSrc('/img/placeholder.jpg')}
          ></Img>
        </ImgWrapper>
        <Body>
          <DateText>
            {articlesObj.date}
          </DateText>
          <Text>{articlesObj.title}</Text>
        </Body>
      </Card>
    </Link>
  );
}

export default NewsCard;
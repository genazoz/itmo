import React from "react";
import styled from "styled-components";
import {GetServerSideProps, NextPage} from "next";

import theme from "../../styles/theme";
import {Articles} from "../../utils/api/types";
import {Api} from "../../utils/api";
import Image from "next/future/image";
import useWindowDimensions from "../../@hooks/useWindowDimensions";
import BackButton from "../../components/BackButton";
import getDateBeautify from "../../utils/getDateBeautify";

const Page = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  @media (max-width: ${theme.media.md}) {
    display: flex;
    flex-direction: column;
    height: max-content;
  }
}
`;
const ImageWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  pointer-events: none;

  @media (max-width: ${theme.media.md}) {
    height: 50vh;
  }
`;
const Img = styled.img`
  position: absolute;

  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InfoWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 30px 12%;

  background: #FFFFFF;

  @media (max-width: ${theme.media.md}) {
    width: 100%;
    height: max-content;
    margin: auto auto 0;

    border-radius: unset;
  }
  @media (max-width: ${theme.media.sm}) {
    padding: 24px;
  }
`;
const DescriptionText = styled.span`
  width: 100%;

  color: #000000;
`;
const Title = styled(DescriptionText)`
  margin: 0 0 32px;

  font-size: 32px;
  font-weight: 700;

  @media (max-width: ${theme.media.lg}) {
    display: none;
  }
`;
const Text = styled(DescriptionText)`
  @media (max-width: ${theme.media.xs}) {
    display: flex;
    width: 100%;
  }
  @media (max-width: 390px) {
    font-size: 14px;
  }
`;
const Date = styled.div`
  margin: 0 0 10px;

  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0002px;
  text-transform: uppercase;
  color: #6A6A6A;
`
const BackButtonWrapper = styled.div`
  margin: 0 0 24px;
`

interface ArticleProps {
  news: Articles,
  messages: any
}

const Article: NextPage<ArticleProps> = ({news, messages}) => {
  const {width} = useWindowDimensions();
  const date = getDateBeautify(news.date, messages.locales ,{year: 'numeric', month: 'long', day: 'numeric'});

  const textProps = {
    dangerouslySetInnerHTML: {__html: `${news.lead}`},
  };

  return (
    <Page>
      <ImageWrapper>
        <Img as={Image}
             src={width && width > parseInt(theme.media.md) ? news.image_big : news.image_small}
             alt="item" width={1200} height={1200}/>
      </ImageWrapper>
      <InfoWrapper>
        <BackButtonWrapper>
          <BackButton text={messages && messages["back-button"]}/>
        </BackButtonWrapper>
        <Date>{date}</Date>
        <Title>{news.title}</Title>
        <Text {...textProps}/>
      </InfoWrapper>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const resultId = parseInt(ctx.query.id as string)

    // Я не нашёл апи для выбора одной новости, поэтому пишу таким образом ( Как и просили в данной ситуации )
    const lang = ctx.locale === 'ru' ? 1 : 2;
    const {news} = await Api().articles.getOne(resultId, lang);

    return {
      props: {
        news: news[0],
        messages: require(`../../lang/${ctx.locale}.json`)
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      news: null,
      messages: null
    },
  };
};

export default Article;

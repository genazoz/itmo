import {GetServerSideProps, NextPage} from "next";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";

import theme from "../styles/theme";
import {Api} from "../utils/api";
import {Articles, ResponseArticles} from "../utils/api/types";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import getDateBeautify from "../utils/getDateBeautify";

const Container = styled.div`
  padding: 80px var(--unit);
`;
const ErrorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin: 200px auto;

  font-weight: 700;
  font-size: 28px;
  color: #DDDDDD;

  @media (max-width: ${theme.media.sm}) {
    position: relative;

    order: 0;
    margin: 20px auto;
  }

  span {
    font-family: ${theme.fonts.openSans};
    font-weight: 700;
    font-size: 50px;
    color: #EEEEEE;

    @media (max-width: ${theme.media.xs}) {
      padding: 8px 8px 2px 8px;

      font-size: 40px;
    }
  }
`;
const Title = styled.h1`
  margin: 0 0 40px;

  font-family: 'Muller';
  font-weight: 700;
  font-size: 40px;
  line-height: 100%;
  color: #222222;

  @media (max-width: ${theme.media.xs}) {
    font-size: 32px;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`
const NewsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;

  transform: translateY(60px);
  opacity: 0;

  transition: .5s opacity, .4s transform;
  transition-delay: .2s;

  .page-entering & {
    transform: translateY(60px);
    opacity: 0;
  }

  .page-entered & {
    transform: translateY(0px);
    opacity: 1;
  }

  @media (max-width: ${theme.media.lg}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
  }
  @media (max-width: ${theme.media.sm}) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
  }
`;

interface CatalogProps {
  data: ResponseArticles;
  messages: any
}

type urlType = {
  query: {
    page?: string;
  }
};


const Home: NextPage<CatalogProps> = ({data, messages}) => {
  const router = useRouter()
  const changeCurrentPage = (numOfPage: number) => {
    const urlObj: urlType = {
      query: {},
    };

    if (numOfPage !== 1) {
      urlObj.query.page = `${numOfPage}`;
    }

    router.push(urlObj)
  }

  useEffect(() => {
    if(!data?.news){
      const urlObj: urlType = {
        query: {
          page: '1'
        },
      };

      router.push(urlObj)
    }
  }, [data])

  return (<Container>
    <Title>
      {messages.home.title}
    </Title>
    {
      data?.news ? <Wrapper>
        <Pagination currentPage={data.page} newsPerPage={data.per_page} countOfPages={data.last_page} onPageChange={(num) => changeCurrentPage(num)}/>
        <NewsList>
          {data.news.map((newsObj, index) => <NewsCard articlesObj={
            {
              ...newsObj,
              date: getDateBeautify(newsObj.date, messages.locales, {year: 'numeric', month: 'long', day: 'numeric'})
            }
          } key={index}/>)}
        </NewsList>
        <Pagination currentPage={data.page} newsPerPage={data.per_page} countOfPages={data.last_page}
                    onPageChange={(num) => changeCurrentPage(num)}/>
      </Wrapper> : <ErrorInfo>Ошибка</ErrorInfo>
    }
  </Container>);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const currentPage: number = ctx.query.page ? parseInt(ctx.query.page as string) : 1;
    const lang = ctx.locale === 'ru' ? 1 : 2;
    const data = await Api().articles.getPaginate(currentPage, lang);

    return {
      props: {
        data,
        messages: require(`../lang/${ctx.locale}.json`)
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      data: null,
      messages: null
    },
  };
};

export default Home;

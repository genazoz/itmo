import {GetServerSidePropsContext, NextPageContext,} from "next";
import axios from "axios";
import {ArticlesApi} from "./articles";

export type ApiReturnType = {
  articles: ReturnType<typeof ArticlesApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const instance = axios.create({
    baseURL: 'https://news.itmo.ru',
  });
  return {
    articles: ArticlesApi(instance),
  };
};

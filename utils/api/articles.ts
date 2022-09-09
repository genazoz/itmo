import {AxiosInstance} from "axios";
import {ResponseArticles} from "./types";

export const ArticlesApi = (instance: AxiosInstance) => ({
  async getPaginate(page: number, lang: number, limit?: number) {
    try {
      const {data} = await instance.get<ResponseArticles>(`/api/news/list/?ver=2.0&per_page=${limit ? limit : 9}&page=${page ? page : 1}&language_id=${lang}`);

      return data;
    } catch(err) {
      console.log(err);

      return null;
    }

  },
  async getOne(id: number, lang: number) {
    const {data} = await instance.get<ResponseArticles>(`/api/news/list/?ver=2.0&per_page=1&lead=1&page=1&language_id=${lang}`);
    return data;
  },
});

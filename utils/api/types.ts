export type Category = {
  category_id: number,
  category_title: string,
  color_title: string,
  color: string
}

export interface Articles {
  id: number,
  title: string,
  image_small: string,
  image_big: string,
  creation_date: string,
  date: string,
  view_count: number,
  parent_category: Category,
  category: Category,
  url: string,
  lead?: string
}

export interface ResponseArticles {
  category: number;
  total: number;
  page: number;
  per_page: number;
  last_page: number;
  news: Articles[]
};

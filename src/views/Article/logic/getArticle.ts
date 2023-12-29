import { getArticlePageAPI } from "@/api/Article";
import { Article } from "@/types/Article";

export const loading = ref(true);

export const ArticleData = ref<Article[]>();

// 文章总数
export const total = ref<number>(0);

// 获取文章列表
export const getArticleData = async (page?: number, size?: number) => {
  loading.value = true;

  // // 默认分页
  // if (!page) page = 1;
  // if (!size) size = 6;

  // @ts-ignore
  const { code, data, paginate } = await getArticlePageAPI(page, size);
  if(code !== 200) return loading.value = false

  total.value = paginate.total;

  ArticleData.value = data as Article[];

  loading.value = false;
};

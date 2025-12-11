export interface Blogs {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  featuredImage: string;
  category: string;
  status: string;
  page: number;
  size: number;
  search?: string;
}

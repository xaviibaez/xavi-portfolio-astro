import { getCollection } from 'astro:content';
import type { Lang } from '@/i18n/languageUtils';

export async function getBlogStaticPaths(lang: Lang) {
  const posts = await getCollection('blog');
  return posts
    .filter((p) => p.id.startsWith(`${lang}/`))
    .map((post) => ({
      params: { slug: post.id.split('/').pop() },
      props: { post },
    }));
}

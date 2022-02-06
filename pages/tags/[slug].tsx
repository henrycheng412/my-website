// TODO: may remove or refactor

import type {GetStaticPaths, GetStaticProps} from 'next';
import Head from 'next/head';

import PostList from '@/components/blog/PostList';
import {getAllPosts} from '@/lib/post';
import {PostMeta} from '@/models/post';

export default function TagPage({tag, posts}: {tag: string; posts: PostMeta[]}) {
  return (
    <>
      <Head>
        <title>Tag: {tag}</title>
      </Head>
      <h1>Tag: {tag}</h1>
      {/* <PostList posts={posts} /> */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug} = params as {slug: string};
  const posts = getAllPosts().filter((post) => post.meta.tags.includes(slug));

  return {
    props: {
      tag: slug,
      posts: posts.map((post) => post.meta),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const tags = new Set(posts.map((post) => post.meta.tags).flat());
  const paths = Array.from(tags).map((tag) => ({params: {slug: tag}}));

  return {
    paths,
    fallback: false,
  };
};
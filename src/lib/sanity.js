import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

export async function getAllNews() {
  return await client.fetch(`
    *[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _rawBody,
      "mainImage": mainImage.asset->{
        _id,
        url,
        altText
      }
    }
  `);
}

export async function getNewsById(id) {
  return await client.fetch(`
    *[_type == "news" && _id == $id][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _rawBody,
      categories,
      "mainImage": mainImage.asset->{
        _id,
        url,
        altText
      }
    }
  `, { id });
}

export async function getAllProjects() {
  return await client.fetch(`
    *[_type == "projects"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      author,
      categories
    }
  `);
}

export async function getProjectById(id) {
  return await client.fetch(`
    *[_type == "projects" && _id == $id][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _rawBody,
      author,
      names,
      categories,
      "mainImage": mainImage.asset->{
        _id,
        url,
        altText
      }
    }
  `, { id });
}
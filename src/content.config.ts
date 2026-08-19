import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pagesCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/pages' }),
  schema: z.object({
    hero_title: z.string(),
    hero_subtitle: z.string(),
    hero_cta: z.string().optional(),
    diff_1_title: z.string().optional(),
    diff_1_text: z.string().optional(),
    diff_2_title: z.string().optional(),
    diff_2_text: z.string().optional(),
    diff_3_title: z.string().optional(),
    diff_3_text: z.string().optional(),
    about_text: z.string().optional(),
  }),
});

const serviciosCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/servicios' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('Dra. Nuria Ugarte'),
    excerpt: z.string().optional(),
    image: z.string().optional(),
  }),
});

const tratamientosCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/tratamientos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.enum(['facial', 'corporal', 'laser']),
    icon: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const nutricionCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/nutricion' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const oncologiaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/oncologia' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const capilarCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/capilar' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const tecnologiaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/tecnologia' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const testimoniosCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/testimonios' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const seccionesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/secciones' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

const settingsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/settings' }),
  schema: z.object({
    site_name: z.string(),
    phone: z.string(),
    phone_link: z.string(),
    email: z.string(),
    address: z.string(),
    hours: z.string(),
    cta_text: z.string(),
  }),
});

export const collections = {
  pages: pagesCollection,
  servicios: serviciosCollection,
  blog: blogCollection,
  tratamientos: tratamientosCollection,
  nutricion: nutricionCollection,
  oncologia: oncologiaCollection,
  capilar: capilarCollection,
  tecnologia: tecnologiaCollection,
  testimonios: testimoniosCollection,
  secciones: seccionesCollection,
  settings: settingsCollection,
};

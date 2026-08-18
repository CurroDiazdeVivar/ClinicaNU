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

const especialidadesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/especialidades' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoria: z.enum(['nutricion', 'oncologia', 'capilar', 'tecnologia', 'testimonios']),
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

export const collections = {
  pages: pagesCollection,
  servicios: serviciosCollection,
  blog: blogCollection,
  tratamientos: tratamientosCollection,
  especialidades: especialidadesCollection,
  secciones: seccionesCollection,
};

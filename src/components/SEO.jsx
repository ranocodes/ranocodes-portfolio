import { Helmet } from 'react-helmet'

function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  schema,
}) {
  const siteName = 'Portfolio'
  const defaultDescription = 'Custom web design, front-end/back-end development, and e-commerce solutions.'
  const defaultImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80'

  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  const metaUrl = url || 'https://yourportfolio.com'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export function HomeSchema() {
  return (
    <SEO
      type="website"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Portfolio Owner',
        jobTitle: 'Full-Stack Developer',
        description: 'Custom web design, front-end/back-end development, and e-commerce solutions.',
        url: 'https://yourportfolio.com',
        sameAs: [
          'https://github.com',
          'https://linkedin.com',
          'https://twitter.com',
        ],
      }}
    />
  )
}

export function BlogPostSchema({ post }) {
  return (
    <SEO
      title={post.title}
      description={post.excerpt}
      image={post.featuredImage}
      type="article"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: 'Portfolio Owner',
        },
      }}
    />
  )
}

export function ProjectSchema({ project }) {
  return (
    <SEO
      title={project.title}
      description={project.overview}
      image={project.screenshots[0]}
      type="article"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.overview,
        image: project.screenshots[0],
        author: {
          '@type': 'Person',
          name: 'Portfolio Owner',
        },
      }}
    />
  )
}

export default SEO

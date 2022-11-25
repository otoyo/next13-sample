export const dynamicParams = false

export async function generateStaticParams() {
  return [{ slug: 'hello-world' }]
}

export default async function BlogSlugPage({ params }: {
  params: { slug: string },
}) {
  return (
    <>
      <p>{params.slug}</p>
    </>
  )
}

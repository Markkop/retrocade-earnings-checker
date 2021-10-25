import Head from 'next/head'

const title = 'Retrocade Earnings Checker'
const description = "Check how much BUSD you've earned while holding RC tokens"
const ogImage = 'https://user-images.githubusercontent.com/16388408/138710694-e7f74d18-4731-4a15-9833-4859491d5e35.png'

export default function PageHead() {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.png" />
      <meta property="og:image" content={ogImage}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
    </Head>
  )
}

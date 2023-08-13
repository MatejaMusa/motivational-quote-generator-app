import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { GrandientBackgroundCon } from '@/components/QuoteGenerator/QuoteGeneratorElements'


export default function Home() {
  return (
    <>
      <Head>
        <title>Motivational Quote Generator</title>
        <meta name="description" content="Motivational Quote Generator Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GrandientBackgroundCon>
        
      </GrandientBackgroundCon>
    </>
  )
}

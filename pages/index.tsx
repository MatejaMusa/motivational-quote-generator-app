import React, { useEffect, useState} from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuoteButton, GenerateQuoteButtonText, GrandientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from '@/components/QuoteGenerator/QuoteGeneratorElements'
import Clouds1 from '@/assets/cloud-and-thunder.png'
import Clouds2 from '@/assets/cloudy-weather.png'
import { API } from 'aws-amplify'
import { quotesQueryName } from '@/src/graphql/queries'
import{ GraphQLResult } from '@aws-amplify/api-graphql'

// Interface for DynamoDB object
interface UpdateQuoteInfoData {
    id: string;
    queryName: string;
    quotesGenerated: number;
    createdAt: string;
    updatedAt: string;  
}

function isGraphQLResultForQuotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateQuoteInfoData];
  };
}> {
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}

export default function Home() {
  const[numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);

  //Function to fetch DynamoDB object (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: "AWS_IAM",
        variables: {
          queryName: "LIVE",
        },
      })
      console.log('response',response);
      if (!isGraphQLResultForQuotesQueryName(response)) {
        throw new Error("Unexpected response from API.graphql");
      }

      if (!response.data) {
        throw new Error('Response data is undefined');
      }

      const receivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
      setNumberOfQuotes(receivedNumberOfQuotes);
    }catch (error) {
      console.log('error getting quote data', error);
    }
  }

  useEffect(() => {
    updateQuoteInfo();
  }, [])

  return (
    <>
      <Head>
        <title>Motivational Quote Generator</title>
        <meta name="description" content="Motivational Quote Generator Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GrandientBackgroundCon>

      {/* <QuoteGeneratorModal
      /> */}

      <QuoteGeneratorCon>
        <QuoteGeneratorInnerCon>

          <QuoteGeneratorTitle>
            Daily Inspiration Generator
          </QuoteGeneratorTitle>
            
          <QuoteGeneratorSubTitle>
          Looking for a splash of inspiration? Generate a quote card with a random
            inspirational quote provided by <FooterLink href="https://zenquotes.io/" 
            target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
          </QuoteGeneratorSubTitle>

          <GenerateQuoteButton>
            <GenerateQuoteButtonText
            //  onClick={null}
             >
              Make a Quote
            </GenerateQuoteButtonText>
          </GenerateQuoteButton>

        </QuoteGeneratorInnerCon>
      </QuoteGeneratorCon>

      <BackgroundImage1
        src={Clouds1}
        height="300"
        alt="cloudybackground1"  
      />

      <BackgroundImage2
        src={Clouds2}
        height="300"
        alt="cloudybackground1"  
      />

      <FooterCon>
        <>
          Quotes Generated: {numberOfQuotes}
        </>
      </FooterCon>
    
      </GrandientBackgroundCon>
    </>
  )
}

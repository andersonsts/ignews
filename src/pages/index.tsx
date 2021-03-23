import { GetStaticProps } from 'next';
import Head from 'next/head'

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string
    amount: number
  } 
}

/**
 * client-side => informacao que n precisa ser carregada assim que a pagina eh exibida em tela
 * server-side => indexacao com dados dinamicos
 * static site generation => indexacao e com dados que n mudam constantemente
 */

const Home = ({ product }: HomeProps) => {
  return (
   <>
    <Head>
      <title>Home | ig.news</title>
    </Head>

     <main className={styles.contentContainer}>
       <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br/>
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
       </section>

       <img src="/images/avatar.svg" alt="Girl coding"/>
     </main>
   </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // const price = await stripe.prices.retrieve(PRICE_KEY, {
    //   expand: ['product']
    // }) // traz as info do produto...
  
  const PRICE_KEY = 'price_1IXxWtHStbpl6uHI8FkvYJeO'
  const price = await stripe.prices.retrieve(PRICE_KEY)

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100) // esse preço vem em centavos
  }

  const ONE_DAY = 60 * 60 * 24

  return {
    props: {
      product
    },
    revalidate: ONE_DAY // Qunato tempo em segundos essa pagina ficara sem ser "revalidata"/reconstruida
  }
}

export default Home;

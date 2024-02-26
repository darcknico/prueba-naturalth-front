import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layouts/Layout";
import Home from "@/components/Home";
import { buildKey, fetcher } from "@/helpers/utilsFunctions";

const inter = Inter({ subsets: ["latin"] });

export default (props) => {
  const initialKey = props.initialKey;
  const searchParams = JSON.parse(props.searchParams)
  const listPokemon = JSON.parse(props.listPokemon)
  const typesPokemon = JSON.parse(props.typesPokemon)

  return (
    <>
      <Head>
        <title>prueba naturalth</title>
        <meta name="description" content="prueba naturalth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Layout>
          <Home initialKey={initialKey} searchParams={searchParams} listPokemon={listPokemon} typesPokemon={typesPokemon}/>
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps({ query, req }) {
  const { page, search, type } = query
  const searchParams = {
    page: Number(page) || 1,
    type: Number(type) || null,
    search: search || ''
  }
  const initialKey = buildKey(searchParams)
  const pokemon = await fetcher(initialKey)
  const types = await fetcher('http://localhost:4200/api/pokemon/types');
  
  return {
    props: {
      initialKey: initialKey,
      searchParams: JSON.stringify(searchParams),
      listPokemon: JSON.stringify(pokemon),
      typesPokemon: JSON.stringify(types),
    }
  }
}
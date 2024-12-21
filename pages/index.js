import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import fs from "fs";
import Link from "next/link";

export async function getStaticProps() {
  const devFilePath = process.cwd() + "/data/developers.json";

  const devsJson = fs.readFileSync(devFilePath, "utf-8");
  const devsData = JSON.parse(devsJson);

  return {
    props: {
      devsData,
    },
  };
}

export default function Home({devsData }) {
  return (
    <>
      <Head>
        <title>Gamer Devs</title>
        <meta name="description" content="Generated by create next app and modified to display game devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={`container mx-auto px-3 px-md-5 ${styles.page}`}>
          <h1 className="display-4">Game devs that lead the way.</h1>
          <p>
            These are the games I grew up with and inspired me to love working with computers and think about how people would interact with them
          </p>
          <h2 className={styles.subHead}>Developers</h2>
          <ul className={styles.devList}>
            {devsData.map((dev) => (
              <li key={dev.id}>
                <Link href={`/${dev.id}`}>
                  {dev.name}
                </Link>
              </li>
            ))}
          </ul>
        </main>
    </>
  );
}
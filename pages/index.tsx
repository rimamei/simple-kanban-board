import { Board } from '@components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const Home = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Simple Kanban Board</title>
        <meta property="og:title" content="Simple Kanban Board" key="ogtitle" />
        <meta name="twitter:card" content="Simple Kanban Board" key="twcard" />
        <meta property="og:url" content={router.asPath} key="ogurl" />
        <meta property="og:title" content="Simple Kanban Board" key="ogtitle" />
        <meta name="twitter:card" content="Simple Kanban Board" key="twcard" />
        <meta
          name="description"
          content="The Kanban board is tool for workflow. It helps bringing clarity work process and enhance efficiency by limiting work in progress."
        />
        <meta
          property="og:description"
          content="The Kanban board is tool for workflow. It helps bringing clarity work process and enhance efficiency by limiting work in progress."
          key="ogdesc"
        />
        <meta property="og:image" content="" key="ogimage" />
      </Head>
      <Board />
    </>
  );
};

export default Home;

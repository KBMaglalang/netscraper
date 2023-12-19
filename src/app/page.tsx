import React from 'react';
import { Suspense } from 'react';

// components
import { WatchList } from '@/components/WatchList';
import { Searchbar } from '@/components/Searchbar';

// context

// constants and functions

const Home = async () => {
  return (
    <section className="my-4 flex flex-1 flex-col px-4">
      {/* seach bar */}
      <section className="container mx-auto">
        <Searchbar />
      </section>

      {/* watch list */}
      <Suspense>
        <WatchList />
      </Suspense>
    </section>
  );
};

export default Home;

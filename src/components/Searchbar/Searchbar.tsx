'use client';

import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

// components

// state

// constants and functions
import { scrapeAndStoreProduct } from '@/lib/actions';
import { isValidAmazonProductURL } from '@/lib/utilities';

export const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      toast.error('Invalid Amazon Product Link');
      return;
    }

    try {
      setIsLoading(true);
      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
      setSearchPrompt('');
      toast.success(`Product added!`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-row space-x-4 py-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Amazon Product Link"
        className="input input-bordered w-full"
      />

      <button type="submit" className="btn btn-primary" disabled={searchPrompt === ''}>
        {isLoading ? <span className="loading loading-infinity loading-lg"></span> : 'Search'}
      </button>
    </form>
  );
};

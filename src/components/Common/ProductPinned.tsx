'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { StarIcon as FullStarIcon } from '@heroicons/react/24/solid';
import { StarIcon as EmptyStarIcon } from '@heroicons/react/24/outline';

// components

// context

// constants and functions
import { setPinnedState } from '@/lib/actions';

export const ProductPinned = ({ id, pinned }: any) => {
  const [toggleState, setToggleState] = useState(pinned || false);
  const [loading, setLoading] = useState(false);

  const handlePinnedToggle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setToggleState((prev: boolean) => !prev);
      const response = await setPinnedState(id, !toggleState);
      if (!response) {
        toast.error('Unable to update pinned status');
        return;
      }
      toast.success('Pinned status updated');
    } catch (error) {
      toast.error('Unable to update pinned status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      data-test="product-pinned-button"
      className="btn btn-primary"
      onClick={(e) => handlePinnedToggle}
    >
      {loading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : toggleState ? (
        <FullStarIcon className="h-8 w-8" />
      ) : (
        <EmptyStarIcon className="h-8 w-8" />
      )}
    </button>
  );
};

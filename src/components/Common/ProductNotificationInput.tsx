'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

// components

// context

// constants and functions
import { updateNotificationPrice } from '@/lib/actions';

export const ProductNotificationInput = ({ id, value }: any) => {
  const [inputValue, setInputValue] = useState(value || 0);
  const [loading, setLoading] = useState(false);

  const handlePriceNotification = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await updateNotificationPrice(id, parseFloat(inputValue));

      if (!response) {
        toast.error('Unable to update notification price');
        return;
      }

      toast.success('Notification price updated');
    } catch (error) {
      toast.error('Unable to update notification price');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-row gap-2">
      <input
        type="number"
        placeholder="Price"
        className="input input-bordered w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handlePriceNotification} className="btn btn-neutral">
        {loading ? <span className="loading loading-infinity loading-lg"></span> : 'Update'}
      </button>
    </div>
  );
};

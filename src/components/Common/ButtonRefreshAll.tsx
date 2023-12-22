'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

// components

// context

// constants and functions

export const ButtonRefreshAll = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: any) => {
    e.preventDefault();

    const toastNotificationId = toast.loading('Updating products');

    try {
      setLoading(true);

      const response = await fetch('/api/cron');

      if (!response.ok) {
        toast.error('Unable to update products', { id: toastNotificationId });
        return;
      }
      toast.success('Products updated', { id: toastNotificationId });
    } catch (err) {
      toast.error('Unable to update products', { id: toastNotificationId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-outline btn-sm" onClick={handleClick}>
      <ArrowPathIcon className="h-4 w-4" />
    </button>
  );
};

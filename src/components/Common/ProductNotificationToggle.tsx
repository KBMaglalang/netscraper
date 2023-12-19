'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

// components

// context

// constants and functions
import { setNotificationEnabled } from '@/lib/actions';

export const ProductNotificationToggle = ({ id, state }: any) => {
  const [toggleState, setToggleState] = useState(state || false);
  const [loading, setLoading] = useState(false);

  const handleNotificationToggle = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setToggleState((prev: boolean) => !prev);
      const response = await setNotificationEnabled(id, !toggleState);
      if (!response) {
        toast.error('Unable to update notification status');
        return;
      }
      toast.success('Notification status updated');
    } catch (error) {
      toast.error('Unable to update notification status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row space-x-2">
      <button
        data-test="product-notification-toggle-button"
        className={`btn  ${toggleState ? `btn-primary` : `btn-error`}`}
        onClick={handleNotificationToggle}
      >
        {loading ? (
          <span className="loading loading-infinity loading-lg"></span>
        ) : toggleState ? (
          'Enable'
        ) : (
          'Disable'
        )}
      </button>
    </div>
  );
};

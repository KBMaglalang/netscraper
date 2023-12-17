'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// components

// context

// constants and functions
import { deleteProductById } from '@/lib/actions';

type Props = {
  id: string;
};

export const DeleteProductButton = ({ id }: Props) => {
  const router = useRouter();

  const handleDeleteProduct = async (e: any, id: string) => {
    e.preventDefault();

    try {
      const response = await deleteProductById(id);

      if (!response) {
        toast.error('Unable to delete product');
        return;
      }

      router.replace('/');
    } catch (error) {
      toast.error('Unable to delete product');
    }
  };

  return (
    <button className="btn btn-square btn-error" onClick={(e) => handleDeleteProduct(e, id)}>
      <XMarkIcon className="x-8 w-8" />
    </button>
  );
};

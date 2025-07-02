import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from 'next/link';

export function EmptyCartState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingCart className="h-12 w-12 text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link href="/dashboard/shop">
        <Button>
          Browse Programs
        </Button>
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-6">
          <div className="h-16 w-16 rounded-md overflow-hidden mx-auto mb-4">
            <Image 
              src="/favicon.ico" 
              alt="prisma2ts Logo" 
              width={64} 
              height={64}
              priority
              unoptimized
            />
          </div>
          <h1 className="text-5xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-medium text-gray-300 mb-6">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
              Return to Home
            </Button>
          </Link>
        </div>
        <div className="text-gray-500 text-sm">
          <Link href="https://github.com/audn/prisma2ts" className="hover:text-blue-400 transition-colors">
            prisma2ts GitHub
          </Link>
        </div>
      </div>
    </div>
  );
} 
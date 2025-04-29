"use client";

import { convertPrismaSchemaToTs } from "@/converter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CodeEditor from "@/components/preview-code";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Component() {
  const [prismaSchema, setPrismaSchema] = useState("");
  const [typescriptInterfaces, setTypescriptInterfaces] = useState("");
  const [showCopiedState, setShowCopiedState] = useState(false);

  const handleSchemaChange = (value: string) => {
    setPrismaSchema(value);
    const tsCode = convertPrismaSchemaToTs(value);
    setTypescriptInterfaces(tsCode);
  };

  const onCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(typescriptInterfaces);
      setShowCopiedState(true);
      setTimeout(() => {
        setShowCopiedState(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-md overflow-hidden">
              <Image 
                src="/favicon.ico" 
                alt="prisma2ts Logo" 
                width={36} 
                height={36}
                priority
                unoptimized
              />
            </div>
            <h1 className="text-xl font-bold text-white">prisma2ts</h1>
          </div>
          <Link href={"https://github.com/audn/prisma2ts"} target="_blank">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-white">
              <GithubIcon className="h-5 w-5" />
              <span>GitHub</span>
            </Button>
          </Link>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-2">Convert Prisma Schema to TypeScript</h2>
          <p className="text-gray-400">
            A simple tool to transform your Prisma schema into TypeScript interfaces. 
            Paste your schema on the left and get TypeScript types instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 rounded-xl overflow-hidden border border-gray-800 bg-gray-900/30 backdrop-blur-sm shadow-lg">
          <div className="p-5 border-r border-gray-800">
            <div className="mb-2 flex justify-between">
              <h3 className="font-medium text-gray-300">Prisma Schema</h3>
              <div className="text-xs text-gray-500">{prismaSchema.length > 0 ? `${prismaSchema.split('\n').length} lines` : ''}</div>
            </div>
            <Textarea
              id="input-text"
              placeholder="// Paste your Prisma schema here\n\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}"
              value={prismaSchema}
              onChange={(e) => handleSchemaChange(e.target.value)}
              className="h-[500px] text-[#f3f4f6] border-none bg-gray-800/50 resize-none focus:ring-blue-500 font-mono text-sm custom-scrollbar"
            />
          </div>
          <div className="p-5 bg-gray-900/70">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-300">TypeScript Interfaces</h3>
              <Button
                disabled={!typescriptInterfaces}
                variant="ghost"
                onClick={onCopyClick}
                size="sm"
                className={`${showCopiedState ? 'text-green-400' : 'text-gray-300'} hover:text-white`}
              >
                {showCopiedState ? (
                  <>
                    <CheckIcon className="h-4 w-4 mr-1.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-4 w-4 mr-1.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="h-[500px] overflow-auto rounded-md border border-gray-800 custom-scrollbar">
              <CodeEditor
                value={typescriptInterfaces}
                defaultValue={typescriptInterfaces}
              />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p className="mb-1">Built for developers by developers. Simple, fast, and efficient.</p>
          <p>© {new Date().getFullYear()} prisma2ts</p>
        </footer>
      </main>
    </div>
  );
}

function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

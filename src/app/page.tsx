"use client";

import { convertPrismaSchemaToTs } from "@/converter";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import CodeEditor from "@/components/preview-code";
import Link from "next/link";
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
    <div className="flex min-h-screen flex-col p-5">
      <div className="w-full space-y-4">
        <div className="text-start">
          <h1 className="text-3xl font-bold text-white">prisma2ts</h1>
          <p className="text-[#9ca3af]">
            Convert prisma.schema to TypeScript interfaces
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 w-full">
          <div className="space-y-5 col-span-2 md:col-span-1">
            <Textarea
              id="input-text"
              placeholder={"paste your prisma schema here"}
              value={prismaSchema}
              onChange={(e) => handleSchemaChange(e.target.value)}
              className="h-48 text-[#f3f4f6] border-[#292929] "
            />

            <div className="flex justify-between">
              <Button
                disabled={!typescriptInterfaces}
                variant="default"
                onClick={onCopyClick}
                size="sm"
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                {showCopiedState ? "Copied!" : "Copy Generated Types"}
              </Button>{" "}
              <Link href={"https://github.com/audn/prisma2ts"} target="_blank">
                <Button variant="outline" size="sm">
                  <GithubIcon className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-1 col-span-2 w-full">
            <CodeEditor
              value={typescriptInterfaces}
              defaultValue={typescriptInterfaces}
            />
          </div>
        </div>
      </div>
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

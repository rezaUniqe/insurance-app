"use client";
import React, {ReactNode} from 'react';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query";

const ReactQueryProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
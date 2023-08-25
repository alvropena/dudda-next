'use client'

import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      {showLoading && <div className="mt-10 animate-spin"><Loader2Icon size={40}/></div>}
      
    </div>
  );
};

export default Loading;

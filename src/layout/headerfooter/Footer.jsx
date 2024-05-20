import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const Footer = () => {
  return (
    <footer className="w-auto py-4 shadow bg-main-black">
      <div className="px-auto">
        <p className="text-center text-zinc-300 dark:text-zinc-200">
          © 2023 Chấm code tự động giúp công đoạn chấm bài đơn giản hơn -
          Fxdonad. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const EnhancedFooter = withErrorBoundary(Footer, {
  FallbackComponent,
});

export default EnhancedFooter;

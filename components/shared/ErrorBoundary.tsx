"use client";

import React from "react";
import { MdError } from "react-icons/md";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 *
 * A React component that catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} The error boundary component
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: Send error to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <MdError size={24} className="text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                خطا در برنامه
              </h1>
            </div>
            <p className="text-gray-600 mb-6">
              متأسفانه مشکلی در برنامه رخ داده است. لطفاً صفحه را رفرش کنید یا
              دوباره تلاش کنید.
            </p>
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-red-800 font-mono">
                {this.state.error?.message}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              رفرش صفحه
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

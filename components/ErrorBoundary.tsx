import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: ErrorBoundaryProps;

  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    // Intentionally avoid logging error details in production.
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-space text-text-primary font-sans flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold tracking-tight mb-3">Something went wrong</h1>
            <p className="text-text-secondary mb-8">
              We hit an unexpected error. Please refresh the page or try again later.
            </p>
            <button
              type="button"
              onClick={() => window.location.assign('/')}
              className="inline-flex items-center justify-center rounded-lg bg-yellow px-5 py-2.5 text-sm font-semibold text-space hover:opacity-90 transition-opacity"
            >
              Go to homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

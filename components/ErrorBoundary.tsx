
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fixed inheritance and removed 'override' modifiers which are not standard for React class components in this environment.
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // Accessing state via this.state
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
            <p className="text-gray-600 mb-4">The application encountered an unexpected error.</p>
            <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
                Reload Page
            </button>
          </div>
        </div>
      );
    }

    // Accessing props via this.props (Fixed: line 46 error)
    return this.props.children;
  }
}

export default ErrorBoundary;
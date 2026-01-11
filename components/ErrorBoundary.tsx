import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: State is initialized as a class property instead of in the constructor.
  // This is a more modern approach and fixes errors where component properties
  // like `state`, `props`, and `setState` were not being recognized.
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-950 text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-500">Application Error</h1>
                <p className="mt-2 text-gray-400">Something went wrong. Please refresh the page or contact support.</p>
                <button
                    onClick={() => this.setState({ hasError: false })}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500"
                >
                    Try again
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { Component } from 'react';

// One broken page must never blank the whole site. Any render error inside a
// route shows this instead, with the two actions that matter.
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('Page error:', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5 py-16 bg-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-black mb-2" style={{ color: '#081730' }}>This page didn&apos;t load</h1>
          <p className="text-slate-600 mb-6">
            Something went wrong on our end. You can still apply online in a few minutes, or call or text (954) 543-0853.
          </p>
          <a
            href="/get-started"
            className="flex items-center justify-center rounded-xl px-7 py-4 font-bold text-white mb-3"
            style={{ background: '#1A3586' }}
          >
            Apply online
          </a>
          <a href="/" className="text-sm font-semibold underline" style={{ color: '#1A3586' }}>Back to the homepage</a>
        </div>
      </div>
    );
  }
}

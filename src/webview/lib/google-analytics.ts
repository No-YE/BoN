import ReactGA from 'react-ga';

export function initGA(): void {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_CODE as string);
}

export function logPageView(): void {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

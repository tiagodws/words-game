import { Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

const getConnectionSpeed = (): string => {
  if (!('connection' in navigator)) {
    return '';
  }

  const connection = navigator.connection as
    | undefined
    | Record<string, unknown>;

  if (!connection) {
    return '';
  }

  if (!('effectiveType' in connection)) {
    return '';
  }

  const effectiveType = connection.effectiveType as undefined | string;
  return effectiveType ?? '';
};

export const sendToVercelAnalytics = (metric: Metric) => {
  const analyticsId = process.env.REACT_APP_VERCEL_ANALYTICS_ID;
  if (!analyticsId) {
    return;
  }

  const body = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
};

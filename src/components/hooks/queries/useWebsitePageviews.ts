import { useApi, useDateRange, useNavigation, useTimezone } from 'components/hooks';

export function useWebsitePageviews(websiteId: string, options?: { [key: string]: string }) {
  const { get, useQuery } = useApi();
  const [dateRange] = useDateRange(websiteId);
  const { startDate, endDate, unit } = dateRange;
  const [timezone] = useTimezone();
  const {
    query: { url, referrer, query, os, browser, device, country, region, city, title },
  } = useNavigation();

  const params = {
    startAt: +startDate,
    endAt: +endDate,
    unit,
    timezone,
    url,
    referrer,
    query,
    os,
    browser,
    device,
    country,
    region,
    city,
    title,
  };

  return useQuery({
    queryKey: ['websites:pageviews', { websiteId, ...params }],
    queryFn: () => get(`/websites/${websiteId}/pageviews`, params),
    ...options,
  });
}

export default useWebsitePageviews;

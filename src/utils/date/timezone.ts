export const getTimezoneLabel = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone || 'local';

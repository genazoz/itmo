const getDateBeautify = (datetime: string, locales: string, options: Intl.DateTimeFormatOptions): string => {
  const date = new Date(datetime).toLocaleDateString(locales, options)  ;

  return date;
};

export default getDateBeautify;
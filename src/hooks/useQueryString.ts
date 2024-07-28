import { useSearchParams } from 'next/navigation';
import * as React from 'react';

const useQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name !== '' && value !== '') {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  )

  const removeQueryString = React.useCallback((param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(param);
    return params.toString();
  }, [searchParams]);

  const remainQueryString = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    return params.toString();
  }, [searchParams]);

  return {
    createQueryString,
    removeQueryString,
    remainQueryString,
  };
};

export default useQueryString;

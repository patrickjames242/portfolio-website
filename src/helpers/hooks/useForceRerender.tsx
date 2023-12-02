import { useCallback, useState } from 'react';

export function useForceReRender(): () => void {
  const [, setVal] = useState({});
  return useCallback(() => {
    setVal({});
  }, []);
}

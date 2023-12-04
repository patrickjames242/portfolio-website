import { useEffect, useLayoutEffect } from 'react';

export function useDisableBodyScroll(disable = true): void {
  useLayoutEffect(() => {
    document.body.classList.toggle('overflow-hidden', disable);
  }, [disable]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
}

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export function useDisableBodyScroll(
  disable = true,
  delay: number | undefined = undefined,
): void {
  const latestTimeout = useRef<number | null>(null);
  const setHidden = useCallback(
    (isHidden: boolean) => {
      latestTimeout.current && clearTimeout(latestTimeout.current);
      const action = (): void => {
        document.body.classList.toggle('overflow-hidden', isHidden);
      };
      if (delay == null) {
        action();
      } else {
        latestTimeout.current = setTimeout(action, delay) as any as number;
      }
    },
    [delay],
  );
  useLayoutEffect(() => {
    setHidden(disable);
  }, [disable, setHidden]);

  useEffect(() => {
    return () => {
      setHidden(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

import { useCallback, useEffect, useRef } from 'react';
import { useForceReRender } from './useForceRerender';

/**
 * This hook allows you to create a resource that will be cleaned up
 * when the component is unmounted and recreated when the component is remounted.
 * It is resilient to the new React 18 StrictMode unmount/remount functionality.
 */

export function useCleanedUpResource<Resource>(config: {
  init: (prevResource: Resource | null) => Resource;
  cleanUp: (resource: Resource) => void;
}): Resource {
  const forceRerender = useForceReRender();

  const resource = useRef<{ resource: Resource; cleanedUp: boolean } | null>(
    null,
  );

  const needsToBeRebuilt = useCallback(() => {
    return !resource.current || resource.current.cleanedUp;
  }, []);

  if (needsToBeRebuilt()) {
    resource.current = {
      resource: config.init(resource.current?.resource ?? null),
      cleanedUp: false,
    };
  }

  useEffect(() => {
    if (needsToBeRebuilt()) {
      forceRerender(); // to give the resource a chance to be recreated and to provide the caller with the new resource (because react doesn't necessarily rerender after remounting)
    }
    return () => {
      if (resource.current) {
        config.cleanUp(resource.current.resource);
        resource.current.cleanedUp = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return resource.current!.resource;
}

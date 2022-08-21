import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

export function useElementSize<T extends HTMLElement>() {
  // change to useRef
  const ref = useRef<T>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setSize({
      width: ref.current?.offsetWidth ?? 0,
      height: ref.current?.offsetWidth ?? 0,
    });
  }, []);

  useEventListener('resize', handleSize);

  useEffect(() => {
    if (
      size.width !== ref.current?.offsetWidth ||
      size.height !== ref.current?.offsetHeight
    )
      handleSize();
  });

  return [ref, size] as const;
}

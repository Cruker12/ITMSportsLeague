import { useState, useCallback, useRef } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

let globalId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const remove = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type: ToastType, message: string, duration = 3500) => {
      const id = ++globalId;
      setToasts((prev) => [...prev, { id, type, message }]);
      const timer = setTimeout(() => remove(id), duration);
      timers.current.set(id, timer);
    },
    [remove]
  );

  const success = useCallback((msg: string) => show('success', msg), [show]);
  const error = useCallback((msg: string) => show('error', msg, 5000), [show]);
  const info = useCallback((msg: string) => show('info', msg), [show]);
  const warning = useCallback((msg: string) => show('warning', msg), [show]);

  return { toasts, success, error, info, warning, remove };
}

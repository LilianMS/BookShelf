/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import type {
  ToastActionElement,   
  ToastProps,
} from "@/components/ui/toast" 

const TOAST_LIMIT = 5 
const DEFAULT_DURATION = 3000

type CustomToastVariant = 'success' | 'loading' | 'destructive' | 'default';

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: CustomToastVariant
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type Action =
  | { type: typeof actionTypes["ADD_TOAST"]; toast: ToasterToast }
  | { type: typeof actionTypes["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: typeof actionTypes["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: typeof actionTypes["REMOVE_TOAST"]; toastId?: ToasterToast["id"] }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const setToastTimeout = (toast: ToasterToast) => {
  if (toastTimeouts.has(toast.id)) {
      clearTimeout(toastTimeouts.get(toast.id));
      toastTimeouts.delete(toast.id);
  }
    
  if (toast.variant === 'loading') {
      return;
  }

  if (toast.duration && toast.duration > 0) {
    const timeout = setTimeout(() => {
      dispatch({
        type: "DISMISS_TOAST",
        toastId: toast.id,
      })
    }, toast.duration)

    toastTimeouts.set(toast.id, timeout)
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      const newToast = action.toast;
      if (newToast.variant === 'loading') {
          newToast.duration = 0;
      } else if (newToast.duration === undefined) {
          newToast.duration = DEFAULT_DURATION;
      }
      
      setToastTimeout(newToast);

      return {
        ...state,
        toasts: [newToast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      const updatedToastData = action.toast;
      const existing = state.toasts.find(t => t.id === updatedToastData.id);

      if (existing) {
          const isLeavingLoading = existing.variant === 'loading' && updatedToastData.variant !== 'loading';

          if (isLeavingLoading) {
              updatedToastData.duration = updatedToastData.duration ?? DEFAULT_DURATION; 
          }
          
          const finalToast = { ...existing, ...updatedToastData };
          
          setToastTimeout(finalToast as ToasterToast);
          
          return {
              ...state,
              toasts: state.toasts.map((t) =>
                  t.id === updatedToastData.id ? finalToast as ToasterToast : t
              ),
          };
      }
      return state

    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
          toastTimeouts.delete(toastId)
      } else {
          state.toasts.forEach((toast) => {
              toastTimeouts.delete(toast.id)
          })
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return state
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id" | "open">
type ToastFn = (props: Toast) => {
  id: string
  dismiss: () => void
  update: (props: Partial<Toast>) => void
}

const toast: ToastFn = (props) => {
  const id = genId()
  const finalProps = { ...props, variant: props.variant === 'default' ? 'success' : props.variant }

  const update = (newProps: Partial<Toast>) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...newProps, id },
    })
    
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...finalProps,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
  }
}

export { useToast, toast }

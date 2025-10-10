import 'react'

declare module 'react' {
  interface DialogHTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    closedBy?: string
  }
}

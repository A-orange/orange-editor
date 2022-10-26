const isServer = typeof window === 'undefined';

const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element?.addEventListener(event, handler, useCapture)
  }
}

import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from 'vue'
type Nullable<T> = T | null

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void
type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler
    bindingFn: (...args: unknown[]) => unknown
  }[]
>

const nodeList: FlushList = new Map()

let startClick: MouseEvent

if (!isServer) {
  on(document, 'mousedown', (e: any) => (startClick = e))
  on(document, 'mouseup', (e: any) => {
    for (const handlers of nodeList.values()) {
      for (const { documentHandler } of handlers) {
        documentHandler(e, startClick)
      }
    }
  })
}

function createDocumentHandler(
  el: HTMLElement,
  binding: DirectiveBinding
): DocumentHandler {
  let excludes: HTMLElement[] = []
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg
  } else if ((binding.arg as unknown) instanceof HTMLElement) {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push(binding.arg as unknown as HTMLElement)
  }
  return function (mouseup, mousedown) {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: Nullable<HTMLElement>
      }>
    ).popperRef
    const mouseUpTarget = mouseup.target as Node
    const mouseDownTarget = mousedown?.target as Node
    const isBound = !binding || !binding.instance
    const isTargetExists = !mouseUpTarget || !mouseDownTarget
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    const isSelf = el === mouseUpTarget

    const isTargetExcluded =
      (excludes.length &&
        excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement))
    const isContainedByPopper =
      popperRef &&
      (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return
    }
    binding.value(mouseup, mousedown)
  }
}

const ClickOutside: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    // there could be multiple handlers on the element
    if (!nodeList.has(el)) {
      nodeList.set(el, [])
    }

    // @ts-ignore
    nodeList.get(el).push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    })
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, [])
    }

    const handlers = nodeList.get(el)
    // @ts-ignore
    const oldHandlerIndex = handlers.findIndex(
      (item) => item.bindingFn === binding.oldValue
    )
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    }

    if (oldHandlerIndex >= 0) {
      // replace the old handler to the new handler
      handlers!.splice(oldHandlerIndex, 1, newHandler)
    } else {
      handlers!.push(newHandler)
    }
  },
  unmounted(el: HTMLElement) {
    // remove all listeners when a component unmounted
    nodeList.delete(el)
  },
}

export default ClickOutside

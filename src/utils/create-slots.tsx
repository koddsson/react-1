import React, {useCallback, useMemo} from 'react'
import {useForceUpdate} from './use-force-update'
import useLayoutEffect from './useIsomorphicLayoutEffect'

/** createSlots is a factory that can create a
 *  typesafe Slots + Slot pair to use in a component definition
 *  For example: ActionList.Item uses createSlots to get a Slots wrapper
 *  + Slot component that is used by LeadingVisual, Description
 */
const createSlots = <SlotNames extends string>() => {
  type Slots = {
    [key in SlotNames]?: React.ReactNode
  }

  type ContextProps = {
    registerSlot: (name: SlotNames, contents: React.ReactNode) => void
    unregisterSlot: (name: SlotNames) => void
  }
  const SlotsContext = React.createContext<ContextProps>({
    registerSlot: () => null,
    unregisterSlot: () => null
  })

  /** Slots uses a Double render strategy inspired by [reach-ui/descendants](https://github.com/reach/reach-ui/tree/develop/packages/descendants)
   *  Slot registers themself with the Slots parent.
   *  When all the children have mounted = registered themselves in slot,
   *  we re-render the parent component to render with slots
   */
  const useSlots = () => {
    const slotsRef = React.useRef<Slots>({})

    const rerenderWithSlots = useForceUpdate()

    const isMountedRef = React.useRef(false)

    // fires after all the effects in children
    useLayoutEffect(() => {
      rerenderWithSlots()
      isMountedRef.current = true
    }, [rerenderWithSlots])

    const registerSlot = React.useCallback(
      (name: SlotNames, contents: React.ReactNode) => {
        slotsRef.current[name] = contents

        // don't render until the component mounts = all slots are registered
        if (isMountedRef.current) rerenderWithSlots()
      },
      [rerenderWithSlots]
    )

    // Slot can be removed from the tree as well,
    // we need to unregister them from the slot
    const unregisterSlot = React.useCallback(
      (name: SlotNames) => {
        slotsRef.current[name] = null
        rerenderWithSlots()
      },
      [rerenderWithSlots]
    )

    const context = useMemo(
      () => ({
        registerSlot,
        unregisterSlot
      }),
      [registerSlot, unregisterSlot]
    )

    const slots = slotsRef.current

    const SlotsProvider = useCallback(
      ({children}: {children: React.ReactNode}) => (
        <SlotsContext.Provider value={context}>{children}</SlotsContext.Provider>
      ),
      [context]
    )

    return {SlotsProvider, slots}
  }

  const Slot: React.FC<
    React.PropsWithChildren<{
      name: SlotNames
      children: React.ReactNode
    }>
  > = ({name, children}) => {
    const {registerSlot, unregisterSlot} = React.useContext(SlotsContext)

    useLayoutEffect(() => {
      registerSlot(name, children)
      return () => unregisterSlot(name)
    }, [name, children, registerSlot, unregisterSlot])

    return null
  }

  return {useSlots, Slot}
}

export default createSlots

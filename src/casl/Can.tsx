import { createContext } from 'react'
import { createContextualCan } from '@casl/react'

export const AbilityContext: any = createContext(undefined!)
export const Can = createContextualCan(AbilityContext.Consumer)

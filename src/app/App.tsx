import routes, { renderRoutes } from '@src/routes'
import GetPermissions from '@src/casl/GetPermissions'
import { useAppSelector } from '@src/store'
import { useTranslation } from 'react-i18next'
import { AbilityContext } from '@src/casl/Can'
const App = () => {
  const { i18n } = useTranslation('translation')

  document.body.dir = i18n?.dir()

  const user: any = useAppSelector((state) => state.auth.user)

  const listOfPermissions = GetPermissions(user?.roles)
  return (
    <AbilityContext.Provider value={listOfPermissions}>
      <div>{renderRoutes(routes)}</div>
    </AbilityContext.Provider>
  )
}

export default App

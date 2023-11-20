import type { Theme } from 'vite-plugin-react-pages'
import { useStaticData } from 'vite-plugin-react-pages/client'

import { Container } from '@mui/material'
import { Header, Hero, Cards } from '.'

const theme:Theme = ({ loadedData, loadState }) => {
  const staticData = useStaticData()
  const { routePath } = loadState

  // You can generate side nav menu from staticData
  // const sideMenuData = useMemo(() => generateSideMenu(staticData), [staticData])

  if (loadState.type === '404') return <p>Page not found.</p>
  if (loadState.type === 'load-error') {
    console.error("load-error in loadState.type -- Likely error is not specific to plugin-react-pages")
    return <p>"load-error" {JSON.stringify(loadState)}</p>
  }
  // First pass type is 'loading'
  if (loadState.type === 'loading')
    return null//<p>Loading...</p>

  // loadState.type is now 'loaded'
  const pageData = loadedData[routePath]
  const { main } = staticData[routePath]
console.log('in Theme',{staticData, loadedData, loadState, pageData, main})
  const Component = pageData.main.default
  return <Container className='body'>
    <Header/>
    {routePath.startsWith('/post') && main?.title &&
      <h2 className='mt3 mb15'>
        {main.title}
      </h2>
    }
    <Component/>
  </Container>
}
export default theme
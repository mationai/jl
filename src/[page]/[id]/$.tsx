import { useParams } from 'react-router-dom'
import { Header, Hero } from '@/.'
import cfg from '@/config'
const { navs, dbg } = cfg

export default function PageItem() {
  // const { page } = useParams<{ page: string }>()
  // const page_ = page || ''
  // const _Label = page_.charAt(0).toUpperCase() + page_.slice(1)
  // const nav = navs.find(({ label }) => label === _Label) || { label: '404' }
  // if (dbg && nav.label === '404') console.info('404',{_Label, nav})

  return <Hero title='404'
    subtitle='a web jargon for' subtext='page not found'
  />
}
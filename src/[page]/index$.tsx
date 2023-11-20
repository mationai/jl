import { useParams } from 'react-router-dom'
import { Hero, Cards } from '@/index'
import cfg from '@/config'
const { navs, projects, talks } = cfg

export default function Page() {
  const { page } = useParams<{ page: string }>()
  const lc = (page || '').toLocaleLowerCase()
  const nav = navs.find(({ path }) => path.slice(1) === lc)
    || { label: '404', path: null }

  return <>
    {!nav.path
      ? <Hero title='404'
          subtitle='a web jargon for' subtext='page not found'
        />
      : <Hero title={nav.label}/>
    }
    { nav.path === '/posts' ? <div>posts - todo</div>
    : nav.path === '/talks' ? <Cards lists={talks}/>
    : nav.path === '/projects' ? <Cards lists={projects}/>
    : null
    }
  </>
}
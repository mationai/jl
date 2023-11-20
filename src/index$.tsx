import { Hero, Cards } from '.'
import cfg from './config'

const { projects } = cfg

export default function Index() {
  return <>
    <Hero {...cfg.hero} />
    <Cards lists={projects}/>
  </>
}
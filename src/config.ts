import projects from './_projects'
import talks from './_talks'
import blogs from './_blogs'
import { Item } from './types'

const projectItems = projects.flatMap(g => g.items)
const blogItems = blogs.flatMap(g => g.items)
const cfg = {
  dbg: true,
  len: {
    miniWd: 140,
    imgWd: 290,
    imgHt: 230,
  },
  title: 'John Leung',
  hero: {
    title: "Welcome",
    subtitle: "my super power is",
    subtext: 'Bringing Products to Life from Ideas with Creativity & Elegant Maintainable Solutions',
  },
  links: [{
    label: 'john @ johnleung.com',
    icon: 'fa-envelope-square',
    path: 'mailto:john@johnleung.com',
  }, {
    label: 'github',
    icon: 'fa-github',
    path: 'https://github.com/mationai',
  }, {
    label: 'linkedin',
    icon: 'fa-linkedin',
    path: 'https://linkedin.com/johnleung',
  }],
  projects,
  talks,
  blogs,
  posts: [...projectItems, ...blogItems]
    .sort((a, b) => b.date > a.date ? 1 : -1) as Item[],
  navs: [{
    label: 'Projects',
    path: '/projects',
    lists: projects,
  }, {
    label: 'Talks',
    path: '/talks',
    lists: talks,
  }, {
    label: 'Posts',
    path: '/posts',
  }, {
    label: 'CV',
    path: '/resume',
  }],
}
export default cfg
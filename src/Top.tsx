import { Tooltip } from '@mui/material'
import './main.css'
import '../assets/fa/font-awesome.min.css'
import cfg from './config'
const { title, links, navs } = cfg

export default function Header() {
  return <header style={{ overflow: 'hidden' }}>
    <div style={{ float: 'left' }}>
      <a href='/' className='logo'>
        {title}
      </a>
      {/* < // uncomment to render your initials & screen capture to save as favicon 
      > <span className='abs icoGen' style={{ left:5, top:0 }}>J</span>
        <span className='abs icoGen' style={{ left:21, top:0 }}>L</span>
      </> */}
      <ul className='menu'>
        {navs.map(({ label, path }) =>
          <li className='menu__entry' key={label}>
            <a href={path}>{label}</a>
          </li>
        )}
      </ul>
    </div>
    <ul className='social-links'>
      {links.map(({ label, path, icon }) =>
        <a href={path} key={label} 
          className='social-links__entry' target='_blank'
        >
          <Tooltip title={
            <span style={{ fontSize: 14+'px' }}>{label}</span>
          }>
            <i className={'fa '+icon}/>
          </Tooltip>
        </a>
      )}
    </ul>
  </header>
}
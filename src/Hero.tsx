import './main.css'
import '../assets/fa/font-awesome.min.css'

export default function Hero({ title='', subtitle='', subtext='' }={}) {
  return <h1 className='page-title'>
    <div className='page-title__text'>{title}</div>
    {subtitle &&
      <div className='page-title__subtitle'>{subtitle}</div>
    }
    {subtext &&
      <div className='page-title__subtext'>{subtext}</div>
    }
  </h1>
}
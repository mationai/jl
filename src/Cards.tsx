
import React from 'react' // random "file is a module" error w/o it
import { Stack, Card, Grid, Divider, Link,
  CardContent  } from '@mui/material'
import { List } from './types'
import cfg from './config'

const { len } = cfg

export default function Projects({ lists }:{ lists :List[] }) {
  return <Stack direction='column' useFlexGap mt={1}>
    {lists.map(({ label, items }, i) =>
      <Stack
        direction='column' spacing={1} p={2} key={label}
        justifyContent='flex-start'
        sx={{ width:'100%' }}
      >
        <h2 className='list-title'>
          {label}
        </h2>
        <Grid container spacing={3}>
          {items.map(({ title, img, imgHt, path, text }) =>
            <Link href={path} underline='none' key={path}>
              <Card elevation={3} sx={{
                width: len.imgWd+'px',
                margin: '1em',
              }}>
                {img ?
                  <img loading='lazy'
                    src={img} alt={title}
                    width={len.imgWd}
                    height={imgHt || len.imgHt}
                  /> :
                  <Stack height={len.imgHt+'px'}
                    alignItems='center' justifyContent='center'
                  > 
                    <h3 className='img-title'>{title || ''}</h3>
                  </Stack>
                }
                <CardContent sx={{ pt:1.5, pb:'1em !important' }}>
                  {img && title ?
                    <p className='item-text'>
                      <span className='item-title'>{title}</span>&nbsp; {text}
                    </p> :
                    <p className='item-text'>{text}</p>
                  }
                </CardContent>
              </Card>
            </Link>
          )}
        </Grid>
        {i < lists.length - 1 &&
          <Divider sx={{
            width: '88%',
            mt:'2em !important', // mb on Grid doesn't work 
          }}/>
        }
      </Stack>
    )}
  </Stack>
}
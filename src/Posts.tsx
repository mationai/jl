
import React from 'react' // random "file is a module" error w/o it
import { Link, List, ListItem, ListItemText, ListItemAvatar,
  Divider } from '@mui/material'
import { Item } from './types'
import cfg from './config'

const { posts, len } = cfg

export default function Posts({ lists }:{ lists :Item[] }) {
  return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {posts.map(({ title, img, path, text }, i) =>
      <div key={i}>
        <Link href={path} underline='none' key={path}>
          <ListItem alignItems="flex-start" sx={{m:1}}>
            <ListItemAvatar sx={{ mr: 3 }}>
              {img
                ? <img alt='image' src={img} width={len.miniWd+'px'} //height={99}
                />
                : <div style={{ width: len.miniWd+'px' }}/>
              }
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{ fontSize: '1.2em', color:'#444' }}>
                {title}
              </div>}
              secondary={<>
                <p style={{ fontSize: '1.1em', color:'#666' }}>
                  {text}
                </p>
                {'read more ...'}
              </>}
            />
          </ListItem>
        </Link>
        {i < lists.length - 1 &&
          <Divider sx={{ width: '68%' }}/>
        }
      </div>
    )}
  </List>
}
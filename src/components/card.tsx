import React from 'react'

type Props = {
    children: React.ReactNode;
    title: string
}

function Card({
    children,
    title
}: Props) {
  return (
    <div style={{
        border: '1px solid gray',
        boxShadow: '10px 10px lightblue',
        padding: '10px'
    }}>
        <div>{title}</div>
        {children}
    </div>
  )
}

export default Card
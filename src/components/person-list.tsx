import React from 'react'
import Card from './card'

type Props = {}

function PersonList({}: Props) {
  return (
  <>
   <Card title='Hava durumu uygulaması'>
        <div>Hello World</div>
   </Card>

   <Card title='Kişi Listesi' >
        <div>Hello World</div>
   </Card>
  </>

   
  )
}

export default PersonList
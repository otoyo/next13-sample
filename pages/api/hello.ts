import { NextResponse } from 'next/server'

export const config = { runtime: 'edge' }

export default async function handler() {
  const typicode = await (await fetch('https://jsonplaceholder.typicode.com/posts/1')).json()
  console.log(`typicode: ${JSON.stringify(typicode)}`)

  const notion = await (await fetch(`https://api.notion.com/v1/databases/${process.env.DATABASE_ID}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_SECRET}`,
      'Notion-Version': '2022-06-28',
    },
  })).json()
  console.log(`Notion: ${JSON.stringify(notion)}`)

  const token = btoa(`${process.env.ZENDESK_USER_EMAIL}/token:${process.env.ZENDESK_API_TOKEN}`)
  const zendesk = await (await fetch(`https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets/1.json`, {
    headers: {
      'Authorization': `Basic ${token}`,
    },
  })).json()
  console.log(`Zendesk: ${JSON.stringify(zendesk)}`)

  return NextResponse.json(
    { status: 200 },
  )
}

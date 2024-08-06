'use server'

import { createWriteStream } from 'fs'
import { getIsAdmin } from '@/app/serverSideUtils'

import sharp from 'sharp'

import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Link,
} from '@react-pdf/renderer'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export async function generatePdf() {
  const pagePromises: Promise<JSX.Element>[] = []
  for (let i = 0; i < 100; i++) {
    pagePromises.push(generateSubmissionPage())
  }

  const pages = await Promise.all(pagePromises)
  return await renderToBuffer(<Document>{...pages}</Document>)
}

const generateSubmissionPage = async () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    statement: {
      fontSize: 10,
    },
    image: {
      width: '75%',
    },
  })

  const url =
    'https://2onz6szh6o2ipztz.public.blob.vercel-storage.com/EaC8-wJ1_ApcDimjMiu8c-taKvYDw9hraG0lD6nHFtlSD5omCor1.webp'
  console.log('fetching webp')
  const response = await fetch(url)

  const buffer = Buffer.from(await response.arrayBuffer())

  const jpegBuffer = await sharp(buffer).jpeg({ quality: 100 }).toBuffer()

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* eslint-disable-next-line jsx-a11y/alt-text*/}
        <Image style={styles.image} src={jpegBuffer} cache />
        <Text>Section #1</Text>
        <Text style={styles.statement}>{lorem}</Text>
        <Link href={url}>Link</Link>
      </View>
    </Page>
  )
}

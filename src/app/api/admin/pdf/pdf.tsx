'use server'

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
import { DAO } from '@/db/dao'
import { SubmissionForPdf } from '@/db/types'
import { PAGE_SIZE } from '@/consts'

export async function generatePdf() {
  const pagePromises: Promise<JSX.Element>[] = []
  let page = 1
  let totalSubs = 0
  do {
    const { data, error } = await DAO.readSubmissionsForPdf(page)
    if (error !== null) {
      break
    }
    for (const sub of data.results) {
      pagePromises.push(generateSubmissionPage(sub))
      pagePromises.push(generateSubmissionPage(sub))
      pagePromises.push(generateSubmissionPage(sub))
      pagePromises.push(generateSubmissionPage(sub))
    }
    totalSubs = data.total
    page++
  } while (page * PAGE_SIZE <= totalSubs)

  const pages = await Promise.all(pagePromises)
  return await renderToBuffer(<Document>{...pages}</Document>)
}

const generateSubmissionPage = async (sub: SubmissionForPdf) => {
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
    sub.imageSrc.length > 20
      ? sub.imageSrc
      : 'https://2onz6szh6o2ipztz.public.blob.vercel-storage.com/EaC8-wJ1_ApcDimjMiu8c-taKvYDw9hraG0lD6nHFtlSD5omCor1.webp'
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
        <Text style={styles.statement}>{sub.statement}</Text>
        <Link href={url}>Link</Link>
      </View>
    </Page>
  )
}

import { getRoleAndId } from '../../serverSideUtils'
import {
  AdapterReturn,
  PaginatedResults,
  SubmissionForGallery,
} from '@/drizzle/types'
import { Level, Role } from '@/drizzle/util'
import { DAO } from '@/drizzle/dao'
import { Pager } from '@/components/Pager'
import { SubmissionGalleryImage } from '@/components/SubmissionGalleryImage'

type Filter = 'unscored'

type GalleryParams = {
  params: { page: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: GalleryParams) {
  const { role, id } = await getRoleAndId()
  const page = getPage(params.page)
  const level = (searchParams.level || Level.HighSchool) as Level
  const filter = searchParams.filter as Filter

  let res: AdapterReturn<PaginatedResults<SubmissionForGallery>>

  if (role === Role.Judge && id !== null && filter === 'unscored') {
    res = await DAO.readUnscoredSubmissionsForGallery(id, level, page)
  } else {
    res = await DAO.readSubmissionsForGallery(level, page)
  }
  if (res.error != null) {
    return <div>ERROR: {res.error.message}</div>
  }

  const { total, results } = res.data

  return (
    <>
      <div className="grid grid-cols-2 gap-x-1 gap-y-1">
        {results.map((sub) => (
          <SubmissionGalleryImage key={sub.id} sub={sub} />
        ))}
      </div>
      <Pager totalPages={total} page={page} path="/gallery" />
    </>
  )
}

const getPage = (page: string) => {
  const int = parseInt(page)
  return isNaN(int) ? 1 : int
}

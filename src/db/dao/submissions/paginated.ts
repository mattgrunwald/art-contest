import { scores, submissions } from '@/db/schema'
import {
  AdapterReturn,
  SubmissionForGallery,
  PaginatedResults,
} from '@/db/types'
import { Level } from '@/db/util'
import { db } from '@/db/db'
import { and, eq, notExists, count, sql } from 'drizzle-orm'
import { getPaginationParams, q, wrap } from '../util'
import { PAGE_SIZE } from '@/consts'

const submissionsForGalleryStatement = q.submissions
  .findMany({
    columns: {
      id: true,
      level: true,
      imageSrc: true,
    },
    where: and(
      eq(submissions.level, sql.placeholder('level')),
      eq(submissions.approved, sql.placeholder('approved')),
    ),
    limit: sql.placeholder('limit'),
    offset: sql.placeholder('offset'),
  })
  .prepare('submissionsForGallery')

const countSubmissionsForGalleryStatement = db
  .select({ count: count() })
  .from(submissions)
  .where(
    and(
      eq(submissions.level, sql.placeholder('level')),
      eq(submissions.approved, sql.placeholder('approved')),
    ),
  )
  .prepare('countSubmissionsForGallery')

export const readSubmissionsForGallery = wrap(
  async (
    level: Level,
    page: number,
    approved = true,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>> => {
    const { offset, limit } = getPaginationParams(page)
    const subsQuery = submissionsForGalleryStatement.execute({
      level,
      offset,
      limit,
      approved,
    })

    const countQuery = countSubmissionsForGalleryStatement.execute({
      level,
      approved,
    })

    const [total, subs] = await Promise.all([countQuery, subsQuery])

    const pageCount = Math.ceil(total[0].count / PAGE_SIZE)
    return {
      error: null,
      data: {
        page,
        results: subs,
        total: pageCount !== 0 ? pageCount : 1,
      },
    }
  },
)

export const readUnapprovedSubmissionsForGallery = async (
  level: Level,
  page: number,
): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>> =>
  readSubmissionsForGallery(level, page, false)

const scoredSubIds = db
  .select({ submissionId: scores.submissionId })
  .from(scores)
  .where(
    and(
      eq(scores.submissionId, submissions.id),
      eq(scores.judgeId, sql.placeholder('judgeId')),
    ),
  )
  .groupBy(scores.submissionId)

const countUnscoredSubsStatement = db
  .select({ count: count() })
  .from(submissions)
  .where(
    and(
      eq(submissions.level, sql.placeholder('level')),
      eq(submissions.approved, true),
      notExists(scoredSubIds),
    ),
  )

const unscoredSubsStatement = db
  .select({
    id: submissions.id,
    level: submissions.level,
    imageSrc: submissions.imageSrc,
  })
  .from(submissions)
  .where(
    and(
      eq(submissions.level, sql.placeholder('level')),
      eq(submissions.approved, true),
      notExists(scoredSubIds),
    ),
  )
  .limit(sql.placeholder('limit'))
  .offset(sql.placeholder('offset'))
  .prepare('unscoredSubs')

export const readUnscoredSubmissionsForGallery = wrap(
  async (
    judgeId: string,
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>> => {
    const { offset, limit } = getPaginationParams(page)

    const countQuery = countUnscoredSubsStatement.execute({ level, judgeId })
    const unscoredSubsQuery = unscoredSubsStatement.execute({
      level,
      judgeId,
      limit,
      offset,
    })

    const [total, unscoredSubs] = await Promise.all([
      countQuery,
      unscoredSubsQuery,
    ])

    const pageCount = Math.ceil(total[0].count / PAGE_SIZE)

    return {
      error: null,
      data: {
        page,
        results: unscoredSubs,
        total: pageCount !== 0 ? pageCount : 1,
      },
    }
  },
)

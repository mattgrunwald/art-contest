import { submissions } from '@/drizzle/schema'
import {
  AdapterReturn,
  Submission,
  SubmissionForGallery,
  PaginatedResults,
} from '@/drizzle/types'
import { Level } from '@/drizzle/util'
import { db } from '@/drizzle/db'
import { and, eq, notExists, count } from 'drizzle-orm'
import { getPaginationParams, q, wrap } from '../util'
import { PAGE_SIZE } from '@/env'

export const readSubmissions = wrap(
  async (
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<Submission>>> => {
    const { offset, limit } = getPaginationParams(page)
    const subsQuery = q.submissions.findMany({
      where: eq(submissions.level, level),
      limit,
      offset,
    })

    const countQuery = db
      .select({ count: count() })
      .from(submissions)
      .where(eq(submissions.level, level))
      .limit(limit)
      .offset(offset)

    const [total, subs] = await Promise.all([countQuery, subsQuery])

    const pageCount = Math.ceil(total[0].count / PAGE_SIZE)

    return {
      error: null,
      data: {
        page,
        results: subs,
        total: pageCount,
      },
    }
  },
)

export const readSubmissionsForGallery = wrap(
  async (
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>> => {
    const { offset, limit } = getPaginationParams(page)
    const subsQuery = await q.submissions.findMany({
      columns: {
        id: true,
        level: true,
        imageSrc: true,
      },
      where: eq(submissions.level, level),
      limit,
      offset,
    })

    const countQuery = db
      .select({ count: count() })
      .from(submissions)
      .where(eq(submissions.level, level))
      .limit(limit)
      .offset(offset)

    const [total, subs] = await Promise.all([countQuery, subsQuery])

    const pageCount = Math.ceil(total[0].count / PAGE_SIZE)

    return {
      error: null,
      data: {
        page,
        results: subs,
        total: pageCount,
      },
    }
  },
)

export const readUnscoredSubmissionsForGallery = wrap(
  async (
    userId: string,
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>> => {
    const { offset, limit } = getPaginationParams(page)
    const fields = {
      id: submissions.id,
      level: submissions.level,
      imageSrc: submissions.imageSrc,
    }

    const scoredSubs = db
      .select(fields)
      .from(submissions)
      .where(and(eq(submissions.userId, userId), eq(submissions.level, level)))

    const countQuery = db
      .select({ count: count() })
      .from(submissions)
      .where(and(eq(submissions.level, level), notExists(scoredSubs)))

    const unscoredSubsQuery = db
      .select(fields)
      .from(submissions)
      .where(and(eq(submissions.level, level), notExists(scoredSubs)))
      .limit(limit)
      .offset(offset)

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
        total: pageCount,
      },
    }
  },
)

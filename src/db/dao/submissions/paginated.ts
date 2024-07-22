import { scores, submissions } from '@/db/schema'
import {
  AdapterReturn,
  Submission,
  SubmissionForGallery,
  PaginatedResults,
} from '@/db/types'
import { Level } from '@/db/util'
import { db } from '@/db/db'
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
        total: pageCount !== 0 ? pageCount : 1,
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
      where: and(eq(submissions.level, level), eq(submissions.approved, true)),
      limit,
      offset,
    })

    const countQuery = db
      .select({ count: count() })
      .from(submissions)
      .where(and(eq(submissions.level, level), eq(submissions.approved, true)))
      .limit(limit)
      .offset(offset)

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

export const readUnscoredSubmissionsForGallery = wrap(
  async (
    judgeId: string,
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>> => {
    const { offset, limit } = getPaginationParams(page)
    const fields = {
      id: submissions.id,
      level: submissions.level,
      imageSrc: submissions.imageSrc,
    }

    const scoredSubIds = db
      .select({ submissionId: scores.submissionId })
      .from(scores)
      .where(
        and(
          eq(scores.submissionId, submissions.id),
          eq(scores.judgeId, judgeId),
        ),
      )
      .groupBy(scores.submissionId)

    const countQuery = db
      .select({ count: count() })
      .from(submissions)
      .where(
        and(
          eq(submissions.level, level),
          eq(submissions.approved, true),
          notExists(scoredSubIds),
        ),
      )

    const unscoredSubsQuery = db
      .select(fields)
      .from(submissions)
      .where(and(eq(submissions.level, level), notExists(scoredSubIds)))
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
        total: pageCount !== 0 ? pageCount : 1,
      },
    }
  },
)

export const readUnapprovedSubmissionsForGallery = wrap(
  async (
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>> => {
    const { offset, limit } = getPaginationParams(page)
    const countQuery = db
      .select({ count: count() })
      .from(submissions)
      .where(and(eq(submissions.level, level), eq(submissions.approved, false)))

    const unapprovedSubsQuery = q.submissions.findMany({
      columns: {
        id: true,
        level: true,
        imageSrc: true,
      },
      where: and(eq(submissions.level, level), eq(submissions.approved, false)),
      limit,
      offset,
    })

    const [total, unapprovedSubs] = await Promise.all([
      countQuery,
      unapprovedSubsQuery,
    ])

    const pageCount = Math.ceil(total[0].count / PAGE_SIZE)

    return {
      error: null,
      data: {
        page,
        results: unapprovedSubs,
        total: pageCount !== 0 ? pageCount : 1,
      },
    }
  },
)

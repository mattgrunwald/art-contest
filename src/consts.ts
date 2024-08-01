export const PAGE_SIZE = 36

export const MAX_INPUT_LENGTH = 500
export const MAX_STATEMENT_LENGTH = 1000
export const MAX_FILE_SIZE = 4.719e6
export const BASE_INPUT_STYLE =
  'block w-full rounded-lg border-none bg-slate-200 px-3 py-1.5 text-sm/6 text-slate-950 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 dark:bg-slate-800 dark:text-slate-50'

const maxScore = process.env.MAX_SCORE || ''
const minScore = process.env.MIN_SCORE || ''
export const MAX_SCORE = parseFloat(maxScore) || 4.0
export const MIN_SCORE = parseFloat(minScore) || 0.0

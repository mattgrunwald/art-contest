export type SubmissionStatementProps = {
  text: string
}

export const SubmissionStatement = ({ text }: SubmissionStatementProps) => (
  <div className="flex w-full justify-center">
    <div className="w-full bg-slate-200 p-2 dark:bg-slate-900 md:w-[650px]">
      <div className="pb-2 text-2xl font-bold">{"Artist's Statement"}</div>
      <p>{text}</p>
    </div>
  </div>
)

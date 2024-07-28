export type SubmissionStatementProps = {
  text: string
}

export const SubmissionStatement = ({ text }: SubmissionStatementProps) => (
  <div className="pb-4 pl-4">
    <div className="pb-2 text-2xl font-bold">{"Artist's Statement"}</div>
    <p>{text}</p>
  </div>
)

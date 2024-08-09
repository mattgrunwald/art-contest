export type SubmissionStatementProps = {
  text: string
}

const newlineRegex = /[\n\r]+/
export const SubmissionStatement = ({ text }: SubmissionStatementProps) => (
  <div className="flex w-full justify-center">
    <div className="w-full max-w-[600px] rounded-lg p-4 xl:w-[600px]">
      <div className="pb-2 text-2xl font-bold">{"Artist's Statement"}</div>
      {...text.split(newlineRegex).map((p, index) => (
        <p className="pb-2" key={index}>
          {p}
        </p>
      ))}
    </div>
  </div>
)

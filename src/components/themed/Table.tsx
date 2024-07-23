import { PropsWithChildren } from 'react'

export const Th = ({ children }: PropsWithChildren) => (
  <th className="border-b p-4 pb-3 pt-0 text-left font-medium capitalize text-slate-400 dark:border-slate-600 dark:text-slate-200">
    {children}
  </th>
)
export const Td = ({ children }: PropsWithChildren) => {
  let position = ''
  switch (typeof children) {
    case 'string':
      position = 'text-left'
      break
    default:
      position = 'text-center'
  }

  return (
    <td
      className={` ${position} border-b border-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400`}
    >
      {children !== null ? children : '-'}
    </td>
  )
}

export type Primitive = JSX.Element | string | number | boolean | null

export type TableProps = {
  headers: string[]
  rows: Primitive[][]
}
export const Table = ({ headers, rows }: TableProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <Th key={index}>{header}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <Td key={colIndex}>{col}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const TableTitle = ({ children }: PropsWithChildren) => (
  <div className="pb-2 pl-4 text-2xl font-bold capitalize">{children}</div>
)

export const TableSubtitle = ({ children }: PropsWithChildren) => (
  <div className="pb-2 pl-4 text-xl font-semibold capitalize">{children}</div>
)

export type FullTableProps = TableProps & {
  title: string
  subtitle?: string
}
export const FullTable = ({
  title,
  subtitle,
  headers,
  rows,
}: FullTableProps) => {
  return (
    <div className="pb-4">
      <TableTitle>{title}</TableTitle>
      {subtitle && <TableSubtitle>{subtitle}</TableSubtitle>}
      <Table {...{ headers, rows }} />
    </div>
  )
}

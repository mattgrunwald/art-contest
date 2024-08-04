import { PropsWithChildren } from 'react'

type TProps = PropsWithChildren & {
  small?: boolean
}
type TDProps = TProps & {
  align: 'text-left' | 'text-center' | 'text-right'
}
export const Th = ({ small = false, align, children }: TDProps) => (
  <th
    className={`border-b border-slate-300 py-4 pb-3 pt-0 font-semibold ${small ? 'px-3 text-sm' : 'px-4'} ${align} capitalize text-slate-600 dark:border-slate-600 dark:text-slate-200`}
  >
    {children}
  </th>
)

export const Td = ({ small = false, align, children }: TDProps) => (
  <td
    className={` ${align} ${small ? 'px-3 text-sm' : 'px-4'} border-b border-slate-300 py-4 text-slate-900 dark:border-slate-700 dark:text-slate-200`}
  >
    {children !== null ? children : '-'}
  </td>
)

export type Primitive = JSX.Element | string | number | boolean | null

export type TableProps = {
  headers: string[]
  rows: Primitive[][]
  small?: boolean
}

const getAlign = (col: Primitive) => {
  switch (typeof col) {
    case 'string':
      return 'text-left'
    case 'object':
      return col === null ? 'text-center' : 'text-left'
    default:
      return 'text-center'
  }
}
export const Table = ({ headers, rows, small = false }: TableProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <Th
              key={index}
              small={small}
              align={index === 0 ? 'text-left' : 'text-center'}
            >
              {header}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <Td key={colIndex} small={small} align={getAlign(col)}>
                {col}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const TableTitle = ({ children, small = false }: TProps) => (
  <div
    className={`pb-2 ${small ? 'pl-3' : 'pl-4'} text-2xl font-bold capitalize`}
  >
    {children}
  </div>
)

export const TableSubtitle = ({ children, small = false }: TProps) => (
  <div
    className={`pb-4 ${small ? 'pl-3' : 'pl-4'} text-xl font-semibold capitalize text-slate-950 dark:text-slate-50`}
  >
    {children}
  </div>
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
  small = false,
}: FullTableProps) => {
  return (
    <div className="pb-4">
      <TableTitle small={small}>{title}</TableTitle>
      {subtitle && <TableSubtitle small={small}>{subtitle}</TableSubtitle>}
      <Table {...{ headers, rows, small }} />
    </div>
  )
}

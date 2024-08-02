// todo move these to types folder
export enum Role {
  Contestant = 'CONTESTANT',
  Judge = 'JUDGE',
  Admin = 'ADMIN',
  Readonly = 'READONLY',
}

export enum Level {
  MiddleSchool = 'ms',
  HighSchool = 'hs',
}

export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any
}

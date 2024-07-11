export enum Role {
  Contestant = 'CONTESTANT',
  Judge = 'JUDGE',
  Administrator = 'ADMINISTRATOR',
}

// TODO get these from env vars
const judges = ['mngreenforest@gmail.com']
const admins = ['matt.grunwald.dev@gmail.com']

export const getRole = (email: string) => {
  if (admins.includes(email)) {
    return Role.Administrator
  } else if (judges.includes(email)) {
    return Role.Judge
  } else {
    return Role.Contestant
  }
}

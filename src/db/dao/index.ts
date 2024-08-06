import { Adapter } from '../adapter'
import { CategoriesDAO } from './categories'
import { ScoresDAO } from './scores'
import { SubmissionsDAO } from './submissions'
import { UsersDAO } from './user'

class DrizzleDAO implements Adapter {
  categories = new CategoriesDAO()
  scores = new ScoresDAO()
  submissions = new SubmissionsDAO()
  users = new UsersDAO()
}

export const DAO = new DrizzleDAO()

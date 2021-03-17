import { User } from '../../model/User'
import { IUsersRepository, ICreateUserDTO } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private users: User[]

  private static INSTANCE: UsersRepository

  private constructor() {
    this.users = []
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository()
    }

    return UsersRepository.INSTANCE
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User()

    const data = new Date(Date.now())

    Object.assign(user, {
      name: name,
      email: email,
      created_at: data,
      updated_at: data
    })

    this.users.push(user)

    return user
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  turnAdmin(receivedUser: User): User {
    const user = this.users.find((user) => user.id === receivedUser.id)
    
    user.admin = true
    user.updated_at = new Date()

    return user;
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository }

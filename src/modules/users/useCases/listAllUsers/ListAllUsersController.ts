import { Request, Response } from 'express'

import { ListAllUsersUseCase } from './ListAllUsersUseCase'
class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers

    try {
      const list = this.listAllUsersUseCase.execute({user_id: String(user_id)})
      return response.json(list)
    } catch(err) {
      return response.status(400).json({error: err.message})
    }
    
  }
}

export { ListAllUsersController }

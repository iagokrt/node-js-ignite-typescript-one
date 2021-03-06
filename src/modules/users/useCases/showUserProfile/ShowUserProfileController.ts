import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params
    
    try {
      const user_info = this.showUserProfileUseCase.execute({user_id: String(user_id)})
      return response.status(200).json(user_info)
    } catch(err) {
      return response.status(404).json({error: err.message})
    }

  }
}

export { ShowUserProfileController };

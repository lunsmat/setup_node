import { Request, Response } from 'express';

class PingController {
    public index(request: Request, response: Response): Response {
        return response.json({
            pong: true,
        });
    }
}

export default PingController;

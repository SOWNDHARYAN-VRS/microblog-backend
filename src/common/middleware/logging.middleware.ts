import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {

    const token = req.headers['authorization'] || 'No token provided';

    this.logger.log(`Request received. Token: ${token}`);

    next();
  }
}
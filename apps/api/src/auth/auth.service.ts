import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getProfile(user: any) {
    return user; 
  }
}

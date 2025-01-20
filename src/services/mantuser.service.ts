import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResult } from 'src/entities/mantuser.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserResult,'primary')
    private readonly userResultRepository: Repository<UserResult>,
  ) {}

  async executeStoredProcedure(codusuario: string): Promise<UserResult[]> {
    return await this.userResultRepository.query(
      'EXEC SEG_Usuario_sp_ListaTodosLosUsuarios @codusuario = @0',
      [codusuario],
    );
  }
}

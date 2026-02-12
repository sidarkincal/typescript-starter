import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LabModule } from './lab/lab.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, LabModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entities';
import { ReportEntity } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          database: config.get<string>('DB_NAME'),
          type: 'sqlite',
          entities: [UserEntity, ReportEntity],
          synchronize: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   database: 'db.sqlite',
    //   type: 'sqlite',
    //   entities: [UserEntity, ReportEntity],
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
  ],
})
export class AppModule {}

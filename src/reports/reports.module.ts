import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportEntity } from './reports.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
  imports: [TypeOrmModule.forFeature([ReportEntity])],
})
export class ReportsModule {}

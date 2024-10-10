import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report-entity';
import { Repository } from 'typeorm';
import { ReportDTO } from './dtos/create-report';
import { UserEntity } from 'src/users/user.entities';
import { PatchDTO } from './dtos/patch-report';
import { EstimateReportDTO } from './dtos/report-estimate-dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  async createPost(body: ReportDTO, user: UserEntity) {
    const report = this.repo.create(body);
    report.user = user;

    await this.repo.save(report);
    return report;
  }
  async approveReport(id: string, body: PatchDTO) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = body.approve;
    return this.repo.save(report);
  }
  async makeEstimate(query: EstimateReportDTO) {
    const { make, model, long, lat, year, milage } = query;
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('long - :long BETWEEN -5 AND 5', { long })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(milage - :milage)', 'DESC')
      .setParameters({ milage })
      .limit(3)
      .getRawOne();
  }
}

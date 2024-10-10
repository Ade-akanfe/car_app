import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportDTO } from './dtos/create-report';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth-guard';
import { currentUser } from 'src/decorator/current-user';
import { UserEntity } from 'src/users/user.entities';
import { ReportDTO as RDTO } from './dtos/report';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { PatchDTO } from './dtos/patch-report';
import { EstimateReportDTO } from './dtos/report-estimate-dto';

// serialize to use to cut what to show using expose
@Controller('reports')
export class ReportsController {
  constructor(private report_service: ReportsService) {}
  @UseGuards(AuthGuard)
  @Post('/new')
  @Serialize(RDTO)
  async createReport(@Body() body: ReportDTO, @currentUser() user: UserEntity) {
    const result = await this.report_service.createPost(body, user);
    return result;
  }

  @Patch('/:id')
  async approveReport(@Param('id') id: string, @Body() body: PatchDTO) {
    return await this.report_service.approveReport(id, body);
  }

  @Get('/estimate')
  async computeModel(@Query() query: EstimateReportDTO) {
    return this.report_service.makeEstimate(query);
  }
}

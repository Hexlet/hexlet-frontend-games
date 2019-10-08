import { Controller, Get, Render } from '@nestjs/common';
import { InterviewService } from '../interview/interview.service';
import { getPreviewFromVideoLink } from '../../utils/youtube-preview.util';
import { Interview } from '../interview/interview.entity';

@Controller()
export class AppController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get()
  @Render('index')
  async index(): Promise<{ comingInterviews: InterviewWithPreview[]; pastInterviews: InterviewWithPreview[] }> {
    const pastInterviews = (await this.interviewService.getPast()).map(interview => {
      return {
        ...interview,
        ...{ preview: getPreviewFromVideoLink(interview.videoLink) },
      } as InterviewWithPreview;
    });

    const comingInterviews = (await this.interviewService.getComing()).map(interview => {
      return {
        ...interview,
        ...{ preview: getPreviewFromVideoLink(interview.videoLink) },
      } as InterviewWithPreview;
    });

    return { comingInterviews, pastInterviews };
  }
}

type InterviewWithPreview = Interview & { preview: string };

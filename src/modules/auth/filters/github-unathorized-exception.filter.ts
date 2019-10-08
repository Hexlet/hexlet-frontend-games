import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import * as i18n from 'i18n';

import { Request, Response } from 'express';
import { GitHubUnauthorizedException } from '../../../utils/custom-errors';

@Catch(GitHubUnauthorizedException)
export class GitHubUnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: GitHubUnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: any = ctx.getRequest<Request>();

    response.status(HttpStatus.UNAUTHORIZED);
    request.flash('error', i18n.__('users.form.github_auth_err'));
    return response.render('auth/sign_in');
  }
}

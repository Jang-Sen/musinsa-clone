import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly nodemailer: Mail;

  constructor(private readonly configService: ConfigService) {
    createTransport({
      service: configService.get('MAIL_SERVICE'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    });
  }

  // 메일 보내는 로직
  async sendMail(option: Mail.Options) {
    return this.nodemailer.sendMail(option);
  }
}

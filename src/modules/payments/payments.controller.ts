import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-checkout-session')
  @UseGuards(JwtAuthGuard)
  createCheckoutSession(
    @Body('orderId') orderId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.createCheckoutSession(orderId, userId);
  }

  @Post('webhook')
  handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.paymentsService.handleWebhook(req.rawBody!, signature);
  }
}

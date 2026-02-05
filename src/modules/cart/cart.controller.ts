import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@CurrentUser('sub') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post('items')
  addItem(
    @CurrentUser('sub') userId: string,
    @Body() dto: AddCartItemDto,
  ) {
    return this.cartService.addItem(userId, dto);
  }

  @Patch('items/:id')
  updateItem(
    @CurrentUser('sub') userId: string,
    @Param('id') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(userId, itemId, dto);
  }

  @Delete('items/:id')
  removeItem(
    @CurrentUser('sub') userId: string,
    @Param('id') itemId: string,
  ) {
    return this.cartService.removeItem(userId, itemId);
  }
}

import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('message') message: string,
    @Body('type') type?: 'info' | 'success' | 'warning' | 'error',
  ) {
    return this.notificationsService.create(userId, title, message, type);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Query('unreadOnly') unreadOnly?: string) {
    if (unreadOnly === 'true') {
      return this.notificationsService.findUnreadByUser(userId);
    }
    return this.notificationsService.findByUser(userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch('user/:userId/read-all')
  markAllAsRead(@Param('userId') userId: string) {
    const count = this.notificationsService.markAllAsRead(userId);
    return { markedAsRead: count };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationsService.delete(id);
  }
}
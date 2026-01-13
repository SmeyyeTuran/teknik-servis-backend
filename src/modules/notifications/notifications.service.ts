import { Injectable } from '@nestjs/common';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [];
  private idCounter = 1;

  create(userId: string, title: string, message: string, type: Notification['type'] = 'info'): Notification {
    const notification: Notification = {
      id: `NOTIF-${String(this.idCounter++).padStart(4, '0')}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    };

    this.notifications.push(notification);
    return notification;
  }

  findByUser(userId: string): Notification[] {
    return this.notifications.filter(n => n.userId === userId);
  }

  findUnreadByUser(userId: string): Notification[] {
    return this.notifications.filter(n => n.userId === userId && !n.read);
  }

  markAsRead(id: string): Notification | null {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
    return notification;
  }

  markAllAsRead(userId: string): number {
    const userNotifications = this.notifications.filter(n => n.userId === userId && !n.read);
    userNotifications.forEach(n => n.read = true);
    return userNotifications.length;
  }

  delete(id: string): { deleted: boolean } {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
      return { deleted: true };
    }
    return { deleted: false };
  }
}
import { Alert } from 'react-native';
import api from './ApiService';

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

class NotificationService {
  private static instance: NotificationService;
  private isEnabled: boolean = true;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled) {
      this.notify('Notifications Enabled', 'You will now receive updates on your activities.');
    }
  }

  public async getNotifications(): Promise<Notification[]> {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      return [];
    }
  }

  public async markAsRead(id: number): Promise<void> {
    try {
      await api.put(`/notifications/${id}/read`);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }

  public notify(title: string, message: string) {
    if (!this.isEnabled) return;

    // Persist to DB if needed (This would usually happen on the backend, 
    // but we can trigger it here for local actions if desired)
    
    Alert.alert(
      title,
      message,
      [{ text: 'OK', style: 'default' }],
      { cancelable: true }
    );
  }

  public notifyBookingSuccess(restaurantName: string) {
    this.notify(
      'Booking Confirmed! 📅',
      `Your table at ${restaurantName} has been successfully booked.`
    );
  }

  public notifyOrderSuccess(orderId: string) {
    this.notify(
      'Order Placed! 🍔',
      `Your order #${orderId} is being prepared and will be with you soon.`
    );
  }

  public notifyPaymentSuccess(amount: string) {
    this.notify(
      'Payment Successful! 💳',
      `Your payment of ${amount} has been processed successfully.`
    );
  }

  public notifyReorderSuccess(restaurantName: string) {
    this.notify(
        'Reordered! 🍕',
        `Rest assured, we're getting your favorites from ${restaurantName} ready again!`
      );
  }

  public notifyAddToCart(itemName: string) {
    this.notify(
      'Added to Cart! 🛒',
      `${itemName} has been added to your shopping bag.`
    );
  }
}

export default NotificationService.getInstance();

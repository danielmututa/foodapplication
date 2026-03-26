import { Alert, Platform } from 'react-native';

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

  public notify(title: string, message: string) {
    if (!this.isEnabled) return;

    // In a real app, this would use expo-notifications or FCM.
    // For this demo, we'll use Alert to simulate a push notification.
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
}

export default NotificationService.getInstance();

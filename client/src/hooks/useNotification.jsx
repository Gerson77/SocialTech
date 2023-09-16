import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationService from '../services/NotificationService';
import { getNotificationSuccess } from '../state/slices/notification';

export default function useNotification() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function getNotifications() {
    const notifications = await NotificationService.getAllNotifications(user?.id);
    dispatch(getNotificationSuccess(notifications));
  }

  async function addNewNotification(formData) {
    await NotificationService.addNotification(user.id, formData);
    getNotifications();
  }

  useEffect(() => {
    getNotifications();
  }, [user?.id]);

  return { getNotifications, addNewNotification };
}

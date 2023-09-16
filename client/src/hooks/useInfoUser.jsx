import { useDispatch, useSelector } from 'react-redux';
import UserService from '../services/UserService';
import { setUser } from '../state/slices/auth';

export default function useInfoUser() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function getInfoUser() {
    const userInfo = await UserService.getUser(user.id);
    dispatch(setUser({ user: userInfo }));
  }

  return { getInfoUser };
}

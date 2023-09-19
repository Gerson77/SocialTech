import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from '../Notfication';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(dayjsRelativeTime);
dayjs.extend(advancedFormat);
dayjs.locale(ptBR);

const timeZone = dayjs.tz.guess();
dayjs().tz(timeZone).format('DD/MM/YYYY z');

const dateCurrent = (dayjs().format('DD/MM/YYYY'));

export default function NotificationWidget({ handleNotification }) {
  const { notification } = useSelector((state) => state.notification);

  const groupedDataSave = notification.reduce((groups, item) => {
    const { savedAt } = item;
    const dateConverted = dayjs(Number(savedAt)).format('DD/MM/YYYY');

    if (!groups[dateConverted]) {
      groups[dateConverted] = [];
    }
    groups[dateConverted].push(item);
    return groups;
  }, {});

  return (
    <div className="w-full lg:w-[420px] h-auto lg:max-h-[500px] z-20 bg-gray-100 dark:bg-gray-800 shadow-md shadow-gray-900/100 overflow-y-auto absolute mt-2 lg:top-10 lg:right-[-190px] lg:rounded-lg">
      {Object.entries(groupedDataSave).map(([date, items]) => (
        <div key={date}>
          <div className="bg-gray-700 dark:bg-gray-950 p-4 text-white">
            {dateCurrent === date ? (
              <h3>Hoje</h3>
            ) : (
              <h3>{date}</h3>
            )}
          </div>
          <ul>
            {items.map(
              ({
                id,
                userPicturePath,
                action,
                firstName,
                contentComment,
                postPicturePath,
                createdAt,
                idPost,
                idFriend,
                status,
                savedAt,
              }) => (
                <Notification
                  key={id}
                  id={id}
                  userPicturePath={userPicturePath}
                  action={action}
                  firstName={firstName}
                  contentComment={contentComment}
                  postPicturePath={postPicturePath}
                  createdAt={createdAt}
                  idPost={idPost}
                  idFriend={idFriend}
                  handleNotification={handleNotification}
                  status={status}
                  savedAt={savedAt}
                />
              ),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

NotificationWidget.propTypes = {
  handleNotification: PropTypes.func.isRequired,
};

// component
import SvgColor from '../../../components/svg-color';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ReportIcon from '@mui/icons-material/Report';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Docs',
    path: '/dashboard/docs',
    icon: icon('ic_document'),
  },
  {
    title: 'Notification',
    path: '/dashboard/notification',
    icon: icon('ic_notification'),
  },
  {
    title: 'Levels',
    path: '/dashboard/levels',
    icon: <LeaderboardIcon/>
  },
  {
    title: 'Reported Users',
    path: '/dashboard/reportedUsers',
    icon: <ReportIcon/>
  },
];

export default navConfig;

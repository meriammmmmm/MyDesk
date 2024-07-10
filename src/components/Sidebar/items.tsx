import { ReactComponent as ImageIcon } from '../../assets/icons/sidebar/vector.svg'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'

export const SIDEBARITEMS = [
  {
    link: '/user',
    label: 'User&Group',
    icon: <ProfileIcon />,
  },

  {
    link: '/images',
    label: 'Images&Group',
    icon: <ImageIcon />,
  },
]

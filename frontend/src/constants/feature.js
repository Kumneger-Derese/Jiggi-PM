import { LuBellRing, LuCpu } from 'react-icons/lu'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { RiTeamLine, RiTimeLine } from 'react-icons/ri'
import { BsCardChecklist } from 'react-icons/bs'

export const features = [
  {
    id: 1,
    title: 'Task Management',
    content: `Create, assign and prooritize tasks in seconds. Keep your projects organized from start to finish.`,
    icon: BsCardChecklist
  },
  {
    id: 2,
    title: 'Team Collaboration',
    content: `Work and brainstorm with your team. Work togather in real time, no matter where you are.`,
    icon: RiTeamLine
  },
  {
    id: 3,
    title: 'Project Timeline',
    content: `Track every milestone with Kanban views. Stay on schedule and deliver projects on time.`,
    icon: RiTimeLine
  },
  {
    id: 4,
    title: 'Integrations',
    content: `Seamlessly connect with your favorite tools.We've got you covered to make decisions with ease.`,
    icon: LuCpu
  },
  {
    id: 5,
    title: 'Report and Analytics',
    content: `Gain valuable insights into your team's performance. Make data-driven decisions with ease.`,
    icon: IoAnalyticsOutline
  },
  {
    id: 6,
    title: 'Notifications & Reminders',
    content: `Never miss an update or deadline again. Stay focused with smart reminders and alerts`,
    icon: LuBellRing
  }
]

import {
  HomeIcon,
  LightBulbIcon,
  GlobeAsiaAustraliaIcon,
  TrophyIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeActive,
  LightBulbIcon as SkillActive,
  GlobeAsiaAustraliaIcon as WorkActive,
  TrophyIcon as ProjectActive,
  BookOpenIcon as EducationActive,
  ChatBubbleBottomCenterTextIcon as GuessBookActive,
  IdentificationIcon as AboutActive,
} from '@heroicons/react/24/solid'

export const menuData = [
  { name: 'Home', icon: HomeIcon, activeIcon: HomeActive, route: '/' },
  { name: 'Education', icon: BookOpenIcon, activeIcon: EducationActive, route: '/education' },
  { name: 'Skill', icon: LightBulbIcon, activeIcon: SkillActive, route: '/skill' },
  { name: 'Expirence', icon: GlobeAsiaAustraliaIcon, activeIcon: WorkActive, route: '/work-expirence' },
  { name: 'Project', icon: TrophyIcon, activeIcon: ProjectActive, route: '/project' },
  { name: 'GuessBook', icon: ChatBubbleBottomCenterTextIcon, activeIcon: GuessBookActive, route: '/guess-book' },
  // { name: 'About', icon: IdentificationIcon, activeIcon: AboutActive, route: '/about' },
]
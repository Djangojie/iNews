import { lazy, Suspense } from 'react'
import { Skeleton } from 'antd'
import { Navigate } from 'react-router'
const Header = lazy(() => import('../layout/Header'))
// import Header from '../layout/Header'
// import Home from '../pages/home'
// 配置懒加载
const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))
const Detail = lazy(() => import('../pages/detail'))
const User = lazy(() => import('../pages/user'))
const CovidMap = lazy(() => import('../pages/covidMap'))
// 为个人中心中的组件配置懒加载
const PersonalPage = lazy(() =>
  import('../pages/user/components/personal-page'),
)
const CollectNews = lazy(() => import('../pages/user/components/collect'))
const Likes = lazy(() => import('../pages/user/components/likes'))
const Concern = lazy(() => import('../pages/user/components/concern'))
const ReadingReport = lazy(() =>
  import('../pages/user/components/reading-report'),
)
const UserSetting = lazy(() => import('../pages/user-setting'))
const UserProfile = lazy(() =>
  import('../pages/user-setting/components/user-profile'),
)
const UserAccount = lazy(() =>
  import('../pages/user-setting/components/user-account'),
)
const ConcernTags = lazy(() =>
  import('../pages/user/components/concern/components/tags'),
)
const ConcernFollowers = lazy(() =>
  import('../pages/user/components/concern/components/followers'),
)
const ConcernFollowing = lazy(() =>
  import('../pages/user/components/concern/components/following'),
)
const ReadHistory = lazy(() => import('../pages/user/components/read-history'))

// 解决懒加载白屏时间
const lazyLoad = (children) => {
  return <Suspense fallback={<Skeleton active />}>{children}</Suspense>
}

// 路由配置
const routes = [
  {
    path: '/',
    element: lazyLoad(<Header />),
    children: [
      {
        path: '/',
        element: lazyLoad(<Home />),
      },
      {
        path: '/detail/:id',
        element: lazyLoad(<Detail />),
      },
      {
        path: '/user/:id',
        element: lazyLoad(<User />),
        children: [
          {
            path: '',
            element: lazyLoad(<PersonalPage />),
          },
          {
            path: 'person',
            element: lazyLoad(<ReadHistory />),
          },
          {
            path: 'collect',
            element: lazyLoad(<CollectNews />),
          },
          {
            path: 'likes',
            element: lazyLoad(<Likes />),
          },
          {
            path: 'concern',
            element: lazyLoad(<Concern />),
            children: [
              {
                path: '',
                element: <Navigate to="followers" />,
              },
              {
                path: 'tags',
                element: lazyLoad(<ConcernTags />),
              },
              {
                path: 'followers',
                element: lazyLoad(<ConcernFollowers />),
              },
              {
                path: 'following',
                element: lazyLoad(<ConcernFollowing />),
              },
            ],
          },
          {
            path: 'report',
            element: lazyLoad(<ReadingReport />),
          },
        ],
      },
      {
        path: '/user/setting',
        element: lazyLoad(<UserSetting />),
        children: [
          {
            path: '',
            element: <Navigate to="profile" />,
          },
          {
            path: 'profile',
            element: lazyLoad(<UserProfile />),
          },
          {
            path: 'account',
            element: lazyLoad(<UserAccount />),
          },
        ],
      },
      {
        path: 'covidMap',
        element: lazyLoad(<CovidMap />),
      },
    ],
  },
  {
    path: 'login',
    element: lazyLoad(<Login />),
  },
]

// 导出
export default routes

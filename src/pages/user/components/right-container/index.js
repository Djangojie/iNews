import React, { memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import {
  RightContainerWrapper,
  UserAchievementWrapper,
  CollectionInfoWrapper,
  FollowNumWrapper,
} from './style'

export default memo(function RightContainer() {
  const navigate = useNavigate()
  const location = useLocation()

  // 模拟店在哪数、关注数、评论数等数据
  const likeNum = 70
  const concernNum = 12
  const commentNum = 20

  const discoveryData = [
    {
      title: `贡献了 ${likeNum} 次点赞`,
      icon: 'M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z',
    },
    {
      title: `关注了 ${concernNum} 位作者`,
      icon: 'M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z',
    },
    {
      title: `发送了 ${commentNum} 个评论`,
      icon: 'M16.694 13.516l-3.719 3.055a1.1 1.1 0 0 1-1.412-.013l-2.77-2.362-3.597 2.437a.693.693 0 0 1-.895-.101.649.649 0 0 1-.008-.876l3.68-4.096a1.1 1.1 0 0 1 1.507-.122l2.653 2.135 2.248-2.4-1.34-1.358a.5.5 0 0 1 .327-.85l5.438-.313a.5.5 0 0 1 .528.533l-.368 5.449a.5.5 0 0 1-.855.317l-1.417-1.435z',
    },
  ]

  const bottomData = [
    {
      title: '收藏数',
      num: 31,
    },
    {
      title: '关注标签',
      num: 9,
    },
    {
      title: '加入于',
      num: '2021-12-10',
    },
  ]
  return (
    <RightContainerWrapper>
      <div className="sticky">
        <UserAchievementWrapper>
          <div className="title">探索之旅</div>
          <div className="items">
            {discoveryData.map((item) => {
              return (
                <div className="item" key={item.title}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="26"
                  >
                    <g>
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="12.5"
                        fill="#E1EFFF"
                      ></circle>
                      <path fill="#7BB9FF" d={item.icon}></path>
                    </g>
                  </svg>
                  <span>{item.title}</span>
                </div>
              )
            })}
          </div>
        </UserAchievementWrapper>
        <FollowNumWrapper>
          <a href="#/">
            <p className="title">关注了</p>
            <p className="concern-num">12</p>
          </a>
          <a href="#/">
            <p className="title">关注者</p>
            <p className="concern-num">15</p>
          </a>
        </FollowNumWrapper>
        <CollectionInfoWrapper>
          {bottomData.map((item, index) => {
            const { title, num } = item
            return (
              <div key={title}>
                <span>{title}</span>
                <span>{num}</span>
              </div>
            )
          })}
        </CollectionInfoWrapper>
        {(() => {
          // 根据路径判断用户当前是否处于年度报告页面，如果在，则不显示图片
          const pathname = location.pathname
          const flagStr = pathname.substring(pathname.length - 6)
          return (
            flagStr !== 'report' && (
              <CSSTransition
                timeout={1000}
                classNames="report"
                in={true}
                appear
              >
                <div
                  className="report-enter"
                  title="打开年度报告"
                  onClick={(e) => navigate('report')}
                ></div>
              </CSSTransition>
            )
          )
        })()}
      </div>
    </RightContainerWrapper>
  )
})

import React, { useEffect, useMemo, useState } from 'react'
import { Skeleton, List, message } from 'antd'

import { throttle } from 'lodash'
import { useLocation } from 'react-router-dom'
import { HomeContainer } from './style'
import Search from './components/Search'
import Article from './components/Article'
import Loading from './components/Loading'

import { getArticles } from '../../services/home'
import HotArticle from './components/HotArticle'
let num = 0
let tag = 'recommend'
let isOnGet = false
let hasMore = true
const Home = (props) => {
  const [onLoading, setOnLoading] = useState(false)
  // const [homeLoading, setHomeLoading] = useState(true) //骨架
  const [articleList, setArticleList] = useState([])
  const getArticleList = async (tag) => {
    if (!hasMore) {
      message.warn('该类新闻都在这里了，看看其他类的吧！')
      return
    }
    if (isOnGet) return
    isOnGet = true
    try {
      setOnLoading(true) //开启加载中
      const data = await getArticles({
        tag,
        n: 8,
        skip: num,
      })
      num = num + 8 //跳过的条数增加

      const newList = data?.data?.article_list ? data.data.article_list : []
      if (!newList.length) hasMore = false
      //添加到文章列表
      setArticleList((val) => [...val, ...newList])

      // setHomeLoading(false) //骨架消失
    } catch (error) {
      // throttle()
      message.error('数据获取失败,请重试！')
    } finally {
      isOnGet = false
      setOnLoading(false) //取消加载中
    }
  }
  const location = useLocation()
  // const channel =
  useMemo(() => {
    // setHomeLoading(true) //骨架出现
    hasMore = true
    let scrollTopTimer = setInterval(function () {
      //回到顶部
      let top = document.body.scrollTop || document.documentElement.scrollTop
      let speed = top / 30
      document.documentElement.scrollTop -= speed
      if (top === 0) {
        clearInterval(scrollTopTimer)
      }
    }, 5)
    num = 0 //跳转条数重新置零
    setArticleList([]) //列表清空

    tag = location.state?.current ? location.state.current : tag

    console.log(tag)
    if (tag !== 'app') getArticleList(tag)

    return tag
    // return location.state?.current ?? 'app'
  }, [location.state])

  const showHot = () => {
    if (tag === 'app') return <HotArticle />
    return (
      <div className="content">
        <div className="main">
          <List
            dataSource={articleList}
            renderItem={(item) => (
              <List.Item style={{ padding: 0 }} key={item.article_id}>
                <Article data={item} />
              </List.Item>
            )}
          />
          {showLoad()}
        </div>
        <div className="home_right"></div>
      </div>
    )
  }

  const showLoad = () => {
    if (onLoading) return <Loading />
  }

  // // 判断滚动方向
  // // let scrollTop = 0
  let topValue = 0

  // const bindHandleScroll = throttle(() => {
  //   // 下滚
  //   if (scrollTop <= topValue) {
  //   }
  //   setTimeout(function () {
  //     topValue = scrollTop
  //   }, 0)
  // }, 200)

  useEffect(() => {
    const handelToBottom = throttle((e) => {
      // console.log(e.target.scrollingElement)
      const { clientHeight, scrollHeight, scrollTop } =
        e.target.scrollingElement

      const isBottom = scrollTop + clientHeight + 10 > scrollHeight //是否到达底部

      // 下滚
      if (scrollTop > topValue) {
        if (isBottom && tag !== 'app') {
          console.log(
            '---------------------isBottom && channel !== app---------------------',
          )
          getArticleList(tag)
        }
      }
      setTimeout(function () {
        topValue = scrollTop
      }, 0)
    }, 1000)

    window.addEventListener('scroll', handelToBottom)

    return () => {
      window.removeEventListener('scroll', handelToBottom)
    }
  }, [])

  return (
    <HomeContainer>
      <Search></Search>
      {/* <div style={{ height: '60px', lineHeight: '60px', textAlign: 'center' }}>
        过渡一下
      </div> */}
      {/* <Button onClick={toDetail}> 测试详情 </Button> */}
      {/* <Skeleton active loading={homeLoading} paragraph={{ rows: 16 }} round> */}
      {/* {channel} */}
      {showHot()}
      {/* </Skeleton> */}
    </HomeContainer>
  )
}

export default Home

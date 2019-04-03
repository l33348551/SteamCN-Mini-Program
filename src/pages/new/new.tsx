import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux';
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from '../../interfaces/thread'
import { fetchHome } from '../../actions/home'

import './new.scss'

type PageStateProps = {
  newThreadList: IThreadMeta[]
}

type PageDispatchProps = {
  fetchHome: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface New {
  props: IProps;
}

@connect(({ home }) => ({
  newThreadList: home.newThreadList
}), (dispatch) => ({
  fetchHome() {
    dispatch(fetchHome())
  }
}))
class New extends Component {
  config: Config = {
    navigationBarTitleText: '最新回复',
    enablePullDownRefresh: true
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(this.props, nextProps)
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onPullDownRefresh() {
    this.props.fetchHome()
  }

  onShareAppMessage () {
    return {
      title: 'SteamCN 蒸汽动力 - 最新回复',
      path: 'pages/new/new'
    }
  }

  render() {
    const { newThreadList } = this.props
    const threadCards = newThreadList.map(item => {
      return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>
    })
    return (
      <View>
        <AtMessage />
        <View className='thread-list'>
          {threadCards}
        </View>
      </View>
    )
  }
}

export default New as ComponentClass<PageOwnProps, PageState>

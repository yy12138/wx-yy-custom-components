// import todo from '../../components/calendar/plugins/todo'
import selectable from '../../components/calendar/plugins/selectable'
// import solarLunar from '../../components/calendar/plugins/solarLunar/index'
import timeRange from '../../components/calendar/plugins/time-range'
// import week from '../../components/calendar/plugins/week'
// import holidays from '../../components/calendar/plugins/holidays/index'
import plugin from '../../components/calendar/plugins/index'

plugin
  // .use(todo)
  // .use(solarLunar)
  .use(selectable)
  // .use(week)
  .use(timeRange)
  // .use(holidays)

const conf = {
  data: {
    calendarConfig: {
      multi: true, // 是否开启多选,
      // weekMode: true, // 周视图模式
      theme: 'elegant', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题色在参考 /theme 文件夹
      inverse: true, // 单选模式下是否支持取消选中,
      // takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中)
      chooseAreaMode: true, // 开启日期范围选择模式，该模式下只可选择时间段
      preventSwipe: true, // 是否禁用日历滑动切换月份
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      disableMode: {
        // 禁用某一天之前/之后的所有日期
        type: 'after' // [‘before’, 'after']
      },
    }
  },
  afterTapDate(e) {
    console.log('afterTapDate', e.detail)
    const calendar = this.selectComponent('#calendar').calendar
    // console.log('afterCalendarRender -> calendar', calendar)
    // 已选中的日期
    const selectedDay = calendar.getSelectedDates()
    console.log(selectedDay)
  },
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
  },
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail)
  },
  takeoverTap(e) {
    console.log('takeoverTap', e.detail)
  },
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e)
    // 获取日历组件上的 calendar 对象
    // const calendar = this.selectComponent('#calendar').calendar
    // console.log('afterCalendarRender -> calendar', calendar)
  },
  onSwipe(e) {
    console.log('onSwipe', e)
  },
  showToast(msg) {
    if (!msg || typeof msg !== 'string') return
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500
    })
  }
}

Page(conf)

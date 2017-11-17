import React, { Component } from 'react'
import styled from 'styled-components'
import './chart.css' 
import moment from 'moment'
import momentzone from 'moment-timezone'
import ReactTooltip from 'react-tooltip'

import cityes from './cityes.json'

const ReactHighcharts = require('react-highcharts')

const beginTimeOnChart = Date.UTC(2017, 10, 7, 22, 0, 0, 0)

const getCurrentIndex = () => {
  const currentDate = new Date()
  const currentUTCTimeInMinutes = (currentDate.getUTCHours() * 60) + currentDate.getUTCMinutes()
  if (currentUTCTimeInMinutes >= 1320 && currentUTCTimeInMinutes <= 1439) {
    return((currentUTCTimeInMinutes - 1319) / 10)
  } else {
    return(Math.round((currentUTCTimeInMinutes + 120) / 10))
  }
}

const getChartData = () => {
  const initData = [-32, -20, -22, -17, -10, -12, -40, -66, -70, -99, -82, -55, -30, -32, -28, -30, -25, -24, -22, -33, -50, -60, -44, -53, -40, -38, -38, -27, -20, -40, -32, -20, -2, -7, -10, -12, -40, -66, -70, -65, -82, -55, -30, -12, -1, 0, 5, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 22, 17, 10, 12, 40, 66, 70, 78, 82, 55, 30, 12, 11, 10, 5, 14, 22, 20, 25, 26, 27, 38, 34, 21, 13, 17, 15, 14, 12, 20, 12, 7, 10, 12, 40, 46, 47, 39, 32, 35, 30, 22, 21, 20, 15, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 2, 7, 10, 12, 40, 66, 70, 99, 82, 55, 30, 12, 1, -3, -5, -14, -22, -33, -50, -60, -77, -65]
  const processedData = []
  
  initData.map((value, index) => {
    if (index < getCurrentIndex()) {
      processedData.push({ y: value, color: '#2874cd'})
      return null
    } else {
      processedData.push({ y: value, color: '#acacac' })
      return null
    }
  })
  return processedData
} 

const Componentborder = styled.div`
  background: #f4f6f9;
  margin-top: 100px;
  padding: 0;
  padding-bottom: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  z-index: 10;
`

const Title = styled.div`
  position: relative;
  background: #37548a;
  color: #dde4ec;
  font-family: Verdana, Helvetica;
  text-align: left;
  font-size: 11.2px;
  font-weight: bold;
  padding-left: 15px;
  padding-top: 3px;
  padding-bottom: 3px;
  z-index: 1;
`

const Chartbar = styled.div`
  padding-right: 0px;
  padding-left: 0px;
`

const TimeLine = styled.div`
  background: #758ab4;
  margin-bottom: 10px;
`

const Country = styled.div`
  position: relative;
  height: 17px;
  border: ${props => props.active ? 'none' : '1px solid #bfc8db'};
  margin-top: 3px;
  background: ${props => props.active ? '#87d687' : '#d5d9e2'};
  color: ${props => props.active ? '#fff' : '#3E4B5B'};
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 11.2px;
  font-weight: bold;
  z-index: 1;  
  width: ${props => props.width};
  margin-left: ${props => props.marginleft};
`

const Indicator = styled.div`
  width: 3px;
  background: #87d687;
  position: absolute;
  height: 100%;
  z-index: 1;
  margin-bottom: 100px;
  margin-left: ${ props => props.minutes};
  opacity: 0.8;
`

const TimeLaber = styled.div`
  color: #dde4ec;
  font-size: 9px;
  font-family: Verdana, Helvetica, sans-serif;
  text-align: center;
  padding: 3px;
  padding-top: 1px;
  padding-bottom: 0px;
`

const Tick = styled.div`
  border-right: ${props => props.last ? '0px' : '1px solid #dde4ec' };
  height: 4px;
  width: 8.33334%;
`

const Halftick = styled.div`
  border-right: ${props => props.last ? '0px' : '1px solid #dde4ec'};
  height: 4px;
  width: 50%;
`

const LiquidityTitle = styled.div`
  cursor: pointer;
  background: ${props => props.open ? '#87d687' : '#4766a0'};
  color: ${props => props.open ? '#ffffff' : '#dde4ec'};
  font-family: Verdana, Helvetica;
  text-align: left;
  font-size: 11.2px;
  font-weight: normal;
  padding-left: 15px;
  padding-right: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  z-index: 1;
`
// const GraphIndicator = styled.div`
//   !font-weight: bold;
//   color: white;
// `
class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      clientTime: new Date(),
      showChart: false,
      chartData: [-32, -20, -22, -17, -10, -12, -40, -66, -70, -99, -82, -55, -30, -32, -28, -30, -25, -24, -22, -33, -50, -60, -44, -53, -40, -38, -38, -27, -20, -40, -32, -20, -2, -7, -10, -12, -40, -66, -70, -65, -82, -55, -30, -12, -1, 0, 5, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 22, 17, 10, 12, 40, 66, 70, 78, 82, 55, 30, 12, 11, 10, 5, 14, 22, 20, 25, 26, 27, 38, 34, 21, 13, 17, 15, 14, 12, 20, 12, 7, 10, 12, 40, 46, 47, 39, 32, 35, 30, 22, 21, 20, 15, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 2, 7, 10, 12, 40, 66, 70, 99, 82, 55, 30, 12, 1, -3, -5, -14, -22, -33, -50, -60, -77, -65],
    }
  }

  tick = () => {
    this.setState({ clientTime: new Date() })
  }

  componentDidMount = () => {
    this.interval = setInterval(this.tick, 60000)
  }

  componentWillMount = () => {
    clearInterval(this.interval)
  }

   getCurrentIndex = () => {
    const currentDate = new Date()
    const currentUTCTimeInMinutes = (currentDate.getUTCHours() * 60) + currentDate.getUTCMinutes()
    if (currentUTCTimeInMinutes >= 1320 && currentUTCTimeInMinutes <= 1439) {
      return ((currentUTCTimeInMinutes - 1319) / 10)
    } else {
      return (Math.round((currentUTCTimeInMinutes + 120) / 10))
    }
  }

   getChartData = () => {
    const initData = this.state.chartData
    const processedData = []

    initData.map((value, index) => {
      if (index < this.getCurrentIndex()) {
        processedData.push({ y: value, color: '#2874cd', livedata: true })
        return null
      } else {
        processedData.push({ y: value, color: '#acacac', livedata: false })
        return null
      }
    })
    return processedData
  } 

  getConfig = () => {
   return {
      chart: {
      type: 'column',
      height: 160,
      marginLeft: -7,
      marginRight: -7,
      marginTop: 13,
    },
    plotOptions: {
      series: {
        crisp: false,
        pointPadding: 0,
        pointStart: beginTimeOnChart,
        pointInterval: 600000
      },
      column: {
        borderWidth: 0,
        maxPointWidth: 7
      }
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false,
      type: 'category'
    },
    xAxis: {
      crosshair: true,
      title: {
        text: null
      },
      labels: false,
      visible: false,
      type: 'datetime'
    },
    yAxis: {
      labels: {
        align: 'left',
        x: 8,
        y: -3,
        formatter: function () {
          if (this.value > 0) {
            return `+${this.value}%`
          } else if (this.value === 0) {
            return '30 Day Avg'
          }
          return null
        }
      },
      visible: true,
      title: {
        text: null
      },
      max: 100,
      min: -100,
      tickAmount: 5,
      tickPositions: [-100, -50, 0, 50, 100]
    },
    title: {
      text: null
    },
    tooltip: {
      crosshairs: true,
      animation: false,
      positioner: function (boxWidth, boxHeight, point) {
        if ((boxWidth / 2) + 10 > point.plotX) {
          return { x: -5, y: 140 }
        } else if (((boxWidth / 2) + 15) + point.plotX > this.chart.plotWidth) {
          return { x: this.chart.plotWidth - boxWidth - 9, y: 140 }
        }
        return { x: point.plotX - (boxWidth + 15) / 2, y: 140 };
      },
      followPointer: true,
      hideDelay: 50,
      distance: 10,
      shared: true,
      borderWidth: 0,
      useHTML: true,
      xDateFormat: '%Y-%m-%d',
      formatter: function () {
        const d = new Date(this.x)
        if (this.y === 0) {
          if (this.points[0].color === '#2874cd') {
            return '<div style="background-color: #87d687; padding-left: 5px; padding-right: 5px;">' + moment(d).utc().format('h:mm a') + ' | = Avg </div>'
          } else {
            return '<div style="background-color: #d5d9e2; padding-left: 5px; padding-right: 5px;">Previous session ' + moment(d).utc().format('h:mm a') + ' | = Avg </div>'
          }
        } else if (this.y > 0) {
          if (this.points[0].color === '#2874cd') {
            return '<div style="background-color: #87d687; padding-left: 5px; padding-right: 5px;">' + moment(d).utc().format('h:mm a') + ' | ' + this.y + '% > Avg </div>'
          } else {
            return '<div style="background-color: #d5d9e2; padding-left: 5px; padding-right: 5px;"> Previous session ' + moment(d).utc().format('h:mm a') + ' | ' + this.y + '% > Avg </div>'
          }
          
        } else if (this.y < 0) {
          if (this.points[0].color === '#2874cd') {
            return '<div style="background-color: #87d687; padding-left: 5px; padding-right: 5px;">'+moment(d).utc().format('h:mm a') + ' | ' + this.y + '% < Avg </div>'
          } else {
            return '<div style="background-color: #d5d9e2; padding-left: 5px; padding-right: 5px;">Previous session ' + moment(d).utc().format('h:mm a') + ' | ' + this.y + '% < Avg </div>'
          }
        }

      },
      shadow: false,
      padding: 0
    },
    series: [{
      data: getChartData()
    }]
    }
    
  }

  getMarginPercent = () => {
    const currentUTCTimeInMinutes = (this.state.clientTime.getUTCHours() * 60) + this.state.clientTime.getUTCMinutes()
    if ( currentUTCTimeInMinutes >= 1320 && currentUTCTimeInMinutes <= 1439) {
      return (currentUTCTimeInMinutes - 1319) * 0.0694445
    } else {
      return (currentUTCTimeInMinutes + 120) * 0.0694445
    }
  }

  getCurrentValueOfLiquidity = () => {
    const currentIndex = Math.floor(((this.state.clientTime.getUTCHours() * 60) + this.state.clientTime.getUTCMinutes()) / 10) + 12
    return this.state.chartData[currentIndex]
  }

  displayChart = () => {
    this.setState({ showChart: !this.state.showChart })
  }

  getActiveCity = (city) => {
    const startTime = moment.utc(city.startTime, 'h:m A')
    if (startTime.day() === 6 || startTime.day() === 0) {
      return false
    }
    const finishTime = moment(startTime).add(city.tradingDuration, 'hour')
    const currentTime = moment().utc()
    const midnight = moment('0:00 AM', 'h:m A').utc()
    const difference = moment(midnight).diff(startTime, 'minutes')
    if (Math.abs(difference) > 1440) {
      startTime.subtract(1, 'days').format('DD h:m A')
      finishTime.subtract(1, 'days').format('DD h:m A')
    }
    return (moment(currentTime).isBetween(startTime.utc(), finishTime.utc()))
  }

  calculateCityMargin = (city) => {
    const startTime = moment(city.startTime, 'h:m A')
    const midnight = moment('0:00 AM', 'h:m A')
    const difference = moment(midnight).diff(startTime, 'minutes')
    return (difference < -1319 ? 
      ((Math.abs(difference) - 1320) * 0.0694445) : ((Math.abs(difference) + 120) * 0.0694445))
  }

  getTimeDifference = (e) => {
    const startTimeUTC = moment.utc(e.startTime, 'h:m A')
    const endTimeUTC = moment.utc(e.startTime, 'h:m A').add(e.tradingDuration, 'h').day() > moment().utc().day() ?
                        moment.utc(e.startTime, 'h:m A').add(e.tradingDuration, 'h').subtract(1, 'days') :
                        moment.utc(e.startTime, 'h:m A').add(e.tradingDuration, 'h')
    const offset = moment().utcOffset()
    const amountOfTimeToEnd = moment.duration(endTimeUTC.diff(moment.utc()))
    const amountOfTimeToBegin = moment(startTimeUTC).isBefore(moment().utc()) ? 
            moment.duration(moment.utc().diff(startTimeUTC.add(1, 'days'))) : 
            moment.duration(moment.utc().diff(startTimeUTC))

    if (!this.getActiveCity(e)) {
      const hours = Math.abs(parseInt(amountOfTimeToBegin.asHours()))
      const minutes = Math.abs(parseInt(amountOfTimeToBegin.asMinutes()) - 1) - hours * 60
      const beginLocalTime = moment(startTimeUTC).utcOffset(offset).format('h:mm A')
      return (`Begins in ${hours === 0 ? '' : hours + 'hr'} ${minutes}min
              (${beginLocalTime} at your time)`)
    } else {
      const hours = Math.abs(parseInt(amountOfTimeToEnd.asHours()))
      const minutes = Math.abs(parseInt(amountOfTimeToEnd.asMinutes()) + 1) - hours * 60
      const endLocalTime = moment(endTimeUTC).utcOffset(offset).format('h:mm A')
      // console.log(endTimeUTC.format('M D h:mm A'))
      return (`Ends in ${hours === 0 ? '' : hours + 'hr'} ${minutes}min
              (${endLocalTime} at your time)`)
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-1'></div>
        <Componentborder className='col-10 col-md-7'>
            <div>
            <Indicator minutes={`${this.getMarginPercent()}%`}></Indicator>
              <div className='container'>
                <div className='row'>
                <Title className='col'>Sessions | {moment(this.state.clientTime).utc().format('LT')}</Title>
                <LiquidityTitle onClick={this.displayChart} open={this.state.showChart}>Liquidity: {Math.abs(this.getCurrentValueOfLiquidity())}{this.getCurrentValueOfLiquidity() >= 0 ? '% > ' : '% < '}Avg</LiquidityTitle>
                <LiquidityTitle onClick={this.displayChart} open={this.state.showChart}> {this.state.showChart ? <i className="icon-collapse-top"></i> : <i className="icon-collapse"></i>} </LiquidityTitle>
                </div>
                <div className='row' style={{display: this.state.showChart ? 'block' : 'none'}}>
                <Chartbar className='col-12'>
                  <Indicator minutes={`${this.getMarginPercent()}%`}></Indicator>
                    <ReactHighcharts config={this.getConfig()}></ReactHighcharts>
                  </Chartbar>
                </div>
              </div>
              <TimeLine>
                <div className='container'>
                  <div className='row'>
                    <TimeLaber className='col-1'>11pm</TimeLaber>
                    <TimeLaber className='col-1'>1am</TimeLaber>
                    <TimeLaber className='col-1'>3am</TimeLaber>
                    <TimeLaber className='col-1'>5am</TimeLaber>
                    <TimeLaber className='col-1'>7am</TimeLaber>
                    <TimeLaber className='col-1'>9am</TimeLaber>
                    <TimeLaber className='col-1'>11am</TimeLaber>
                    <TimeLaber className='col-1'>1pm</TimeLaber>
                    <TimeLaber className='col-1'>3pm</TimeLaber>
                    <TimeLaber className='col-1'>5pm</TimeLaber>
                    <TimeLaber className='col-1'>7pm</TimeLaber>
                    <TimeLaber className='col-1'>9pm</TimeLaber>
                  </div>
                  <div className='row'>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick><Halftick /></Tick>
                    <Tick last><Halftick /></Tick>
                  </div>
                </div>
              </TimeLine>
                {cityes.cityes.map((e) => {
                  return <div key={e.name}className='container'>
                          <div key={e.name} className='row'>
                            <Country
                              data-tip={this.getTimeDifference(e)}
                              data-place={this.getMarginPercent > 35 ? 'right' : 'left'}
                              data-class={this.getActiveCity(e) ? 'activeTheme' : 'customeTheme'}
                              key={e.name} 
                              active={this.getActiveCity(e)} 
                              width={`${e.tradingDuration * 4.16667}%`} 
                              marginleft={`${this.calculateCityMargin(e)}%`}
                              >
                              {e.name} <span style={{fontWeight:'normal'}}>{momentzone(moment().utc()).tz(e.timezone).format('LT')}</span>
                            </Country>
                            </div>
                          </div>
                          })
                    }
            </div>
          <ReactTooltip
            type='light'
            class='customeTheme'
            effect='solid'
          />
        </Componentborder>
        <div className='col-1 col-md-4'></div>
      </div>
      )
  }
}

export default Chart
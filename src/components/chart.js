import React, { Component } from 'react'
import styled from 'styled-components'
import './chart.css' 
import moment from 'moment'
import momentzone from 'moment-timezone'
import cityes from './cityes.json'
const ReactHighcharts = require('react-highcharts')
// import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'

const beginTimeOnChart = Date.UTC(2017, 10, 7, 22, 0, 0, 0)
const chartData = [-32, -20, -22, -17, -10, -12, -40, -66, -70, -99, -82, -55, -30, -32, -28, -30, -25, -24, -22, -33, -50, -60, -44, -53, -40, -38, -38, -27, -20, -40, -32, -20, -2, -7, -10, -12, -40, -66, -70, -65, -82, -55, -30, -12, -1, 0, 5, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 22, 17, 10, 12, 40, 66, 70, 78, 82, 55, 30, 12, 11, 10, 5, 14, 22, 20, 25, 26, 27, 38, 34, 21, 13, 17, 15, 14, 12, 20, 12, 7, 10, 12, 40, 46, 47, 39, 32, 35, 30, 22, 21, 20, 15, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 2, 7, 10, 12, 40, 66, 70, 99, 82, 55, 30, 12, 1, -3, -5, -14, -22, -33, -50, -60, -77, -65]

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
  border: 1px solid #bfc8db;
  margin-top: 3px;
  background: ${props => props.active ? '#87d687' : '#d5d9e2'};
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

const config = {
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
      if ((boxWidth/2)+10 > point.plotX) {
        return { x: 0, y: 140 }
      } else if (((boxWidth/2) + 15) + point.plotX > this.chart.plotWidth) {
        return { x: this.chart.plotWidth - boxWidth - 15, y: 140}
      }
      return { x: point.plotX-(boxWidth+15)/2, y: 140 };
    },
    followPointer: true,
    hideDelay: 50,
    distance: 10,
    shared: true,
    backgroundColor: '#87d687',
    borderColor: '#87d687',
    borderRadius: 1,
    xDateFormat: '%Y-%m-%d',
    formatter: function () {
      const d = new Date(this.x)
      if (this.y === 0 ) {
        return moment(d).utc().format('h:mm a') + ' | = Avg'
      } else if (this.y > 0) {
        return moment(d).utc().format('h:mm a') + ' | ' + this.y+'% > Avg'
      } else if (this.y < 0) {
        return moment(d).utc().format('h:mm a') + ' | ' + this.y + '% < Avg'
      }
      
    },
    shadow: false,
    padding: 1
  },
  series: [{
    data: chartData
  }]
}

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
    this.interval = setInterval(this.tick, 600000)
  }

  componentWillMount = () => {
    clearInterval(this.interval)
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
    const finishTime = moment(startTime).add(city.tradingDuration, 'hour')
    const currentTime = moment().utc()
    const midnight = moment('0:00 AM', 'h:m A').utc()
    const difference = moment(midnight).diff(startTime, 'minutes')
    console.log(moment(startTime).utc().format('DD h:m A'))
    console.log(moment(finishTime).utc().format('DD h:m A'))
    console.log(currentTime.format('DD h:m A'))
    if (Math.abs(difference) > 1440) {
      startTime.subtract(1, 'days').format('DD h:m A')
      finishTime.subtract(1, 'days').format('DD h:m A')
    }
    console.log('------------')
    return (moment(currentTime).isBetween(startTime.utc(), finishTime.utc()))
    // console.log(moment().utc().add(8, 'hour'))
    // console.log(momentzone(moment().utc()).tz(city.timezone))
    // console.log(moment().utc().isBetween(moment().utc(), (momentzone(moment().utc()).tz(city.timezone))))
  }

  calculateCityMargin = (city) => {
    const startTime = moment(city.startTime, 'h:m A')
    const midnight = moment('0:00 AM', 'h:m A')
    const difference = moment(midnight).diff(startTime, 'minutes')
    return (difference < -1319 ? `${((Math.abs(difference) - 1320) * 0.0694445)}%` : `${((Math.abs(difference) + 120) * 0.0694445)}%`)
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
                <Title className='col'>Sessions | {moment().utc().format('LT')}</Title>
                <LiquidityTitle onClick={this.displayChart} open={this.state.showChart}>Liquidity: {Math.abs(this.getCurrentValueOfLiquidity())}{this.getCurrentValueOfLiquidity() >= 0 ? '% > ' : '% < '}Avg</LiquidityTitle>
                <LiquidityTitle onClick={this.displayChart} open={this.state.showChart}> {this.state.showChart ? <i className="icon-collapse-top"></i> : <i className="icon-collapse"></i>} </LiquidityTitle>
                </div>
                <div className='row' style={{display: this.state.showChart ? 'block' : 'none'}}>
                <Chartbar className='col-12'>
                  <Indicator minutes={`${this.getMarginPercent()}%`}></Indicator>
                    <ReactHighcharts config={config} data={this.state.chartData}></ReactHighcharts>
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
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick />
                    <Tick last/>
                  </div>
                </div>
              </TimeLine>
            {/* {`${(600 - (momentzone(moment().utc()).tz(e.timezone).utcOffset())) * 0.0694445}%`}  */}
                {cityes.cityes.map((e) => {
                  return <Country key={e.name} active={this.getActiveCity(e)} width={`${e.tradingDuration * 4.16667}%`} marginleft={this.calculateCityMargin(e)}>{e.name} {momentzone(moment().utc()).tz(e.timezone).format('LT')}</Country>
                  })
                }
            </div>
        </Componentborder>
        <div className='col-1 col-md-4'></div>
        
      </div>
      )
  }
}

export default Chart
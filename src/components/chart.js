import React, { Component } from 'react'
import styled from 'styled-components'
import './chart.css' 
import moment from 'moment'
import momentzone from 'moment-timezone'
const ReactHighcharts = require('react-highcharts')
// import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'

const beginTimeOnChart = Date.UTC(2017, 10, 7, 22, 0, 0, 0)

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
  background: #d5d9e2;
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
    // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    labels: {
      align: 'left',
      x: 5,
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
        return moment(d).utc().format('h:mm a') + ' | ' + '= Avg'
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
    data: [-32, -20, -22, -17, -10, -12, -40, -66, -70, -99, -82, -55, -30, -32, -28, -30, -25, -24, -22, -33, -50, -60, -44, -53, -40, -38, -38, -27, -20, -40, -32, -20, -2, -7, -10, -12, -40, -66, -70, -65, -82, -55, -30, -12, -1, 0, 5, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 22, 17, 10, 12, 40, 66, 70, 78, 82, 55, 30, 12, 11, 10, 5, 14, 22, 20, 25, 26, 27, 38, 34, 21, 13, 17, 15, 14, 12, 20, 12, 7, 10, 12, 40, 46, 47, 39, 32, 35, 30, 22, 21, 20, 15, 14, 22, 33, 50, 60, 77, 83, 98, 100, 83, 70, 55, 40, 32, 20, 2, 7, 10, 12, 40, 66, 70, 99, 82, 55, 30, 12, 1, -3, -5, -14, -22, -33, -50, -60, -77, -65]
  }]
}

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      clientTime: new Date()
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

  render() {
    return (
      <div className='row'>
        <div className='col-1'></div>
        <Componentborder className='col-10 col-md-7'>
            <div>
            <Indicator minutes={`${this.getMarginPercent()}%`}></Indicator>
              <div className='container'>
                <div className='row'>
                  <Title className='col-12'>Sessions {`${this.state.clientTime.getUTCHours()}:${this.state.clientTime.getUTCMinutes()}`}</Title>
                </div>
                <div className='row'>
                  <Chartbar className='col-12'>
                  <Indicator minutes={`${this.getMarginPercent()}%`}></Indicator>
                    <ReactHighcharts config={config}></ReactHighcharts>
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
              <Country width='34%'>Sydney {momentzone(moment().utc()).tz("Australia/Sydney").format('LT')}</Country> 
              
              <Country width='34%' marginleft='10%'>Tokyo {momentzone(moment().utc()).tz("Asia/Tokyo").format('LT')}</Country>
              <Country width='34%' marginleft='40%'>London {momentzone(moment().utc()).tz("Europe/London").format('LT')}</Country>
              <Country width='30%' marginleft='70%'>New York {momentzone(moment().utc()).tz("America/New_York").format('LT')}</Country>
            </div>
            
        </Componentborder>
        <div className='col-1 col-md-4'></div>
        
      </div>
      )
  }
}

export default Chart
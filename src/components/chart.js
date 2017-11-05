import React, { Component } from 'react'
import styled from 'styled-components'

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
  z-index: 0;
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


class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      clientTime: new Date(),
      live: false

    }
  }

  getMarginPercent = () => {
    const clientTimeInMinutes = (this.state.clientTime.getHours() * 60) + this.state.clientTime.getMinutes()
    if ( clientTimeInMinutes >= 1020 && clientTimeInMinutes <= 1439) {
      return (clientTimeInMinutes - 1019) * 0.0694445
    } else {
      return (clientTimeInMinutes + 420) * 0.0694445
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-1'></div>
        <Componentborder className='col-10 col-md-7'>
            <div>
            <Indicator minutes={`${this.getMarginPercent()}%`}></Indicator>
              <Title>Sessions</Title>
              <TimeLine>
                <div className='container'>
                  <div className='row'>
                    <TimeLaber className='col'>6pm</TimeLaber>
                    <TimeLaber className='col'>8pm</TimeLaber>
                    <TimeLaber className='col'>10pm</TimeLaber>
                    <TimeLaber className='col'>12am</TimeLaber>
                    <TimeLaber className='col'>2am</TimeLaber>
                    <TimeLaber className='col'>4am</TimeLaber>
                    <TimeLaber className='col'>6am</TimeLaber>
                    <TimeLaber className='col'>8am</TimeLaber>
                    <TimeLaber className='col'>10am</TimeLaber>
                    <TimeLaber className='col'>12pm</TimeLaber>
                    <TimeLaber className='col'>2pm</TimeLaber>
                    <TimeLaber className='col'>4pm</TimeLaber>
                  </div>
                  <div className='row'>
                    <Tick ></Tick>
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
              <Country width='34%'>Sydney</Country>
              <Country width='34%' marginleft='10%'>Tokyo</Country>
              <Country width='34%' marginleft='40%'>London</Country>
              <Country width='30%' marginleft='70%'>New York</Country>
            </div>
        </Componentborder>
        <div className='col-1 col-md-4'></div>
      </div>
      )
  }
}

export default Chart
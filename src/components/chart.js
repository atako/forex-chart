import React, { Component } from 'react'
import styled from 'styled-components'

const Componentborder = styled.div`
  background: #f4f6f9;
  margin-top: 100px;
  padding: 0;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
`

const Title = styled.div`
  position: relative;
  background: #37548a;
  width: 100%;
  color: white;
  font-family: Verdana, Helvetica;
  text-align: left;
  font-size: 11.2;
  font-weight: bold;
  padding-left: 15px;
  z-index: 1;
`

const Timeline = styled.div`
  background: #758ab4;
`

const Country = styled.div`
  position: relative;
  width: 37.44%;
  border: 1px solid #bfc8db;
  background: #d5d9e2;
  margin-top: 20px;
  z-index: 1;  
`

const Country2 = styled.div`
  position: relative;
  width: 37.44%;
  border: 1px solid #bfc8db;
  background: #d5d9e2;
  margin-top: 20px;
  margin-left: 8.32%;
  margin-top: 5px;
  z-index: 1;
`

const Country3 = styled.div`
  width: 37.44%;
  border: 1px solid #bfc8db;
  background: #d5d9e2;
  margin-left: 62.4%;
  margin-top: 5px;
  margin-bottom: 10px;
`

const Country4 = styled.div`
  width: 37.44%;
  border: 1px solid #bfc8db;
  background: #d5d9e2;
  margin-left: 30.4%;
  margin-top: 5px;
`

const Indicator = styled.div`
  width: 3px;
  background: #87d687;
  position: absolute;
  height: 100%;
  z-index: 0;
  margin-bottom: 100px;
  margin-left: 50%;
`

class Chart extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-1'></div>
        <Componentborder className='col-10 col-md-7'>
            <div>
              <Indicator></Indicator>
              <Title>Sessions</Title>
              <Timeline>time</Timeline>
              <Country>Sydney</Country>
              <Country2>Tokyo</Country2>
              <Country4>London</Country4>
              <Country3>New York</Country3>
            </div>
        </Componentborder>
        <div className='col-1 col-md-4'></div>
      </div>
      )
  }
}

export default Chart
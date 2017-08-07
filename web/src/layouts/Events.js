import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import _ from 'lodash';
import '../css/events.css';

const Events = ({events, image, content, title}) => (
  <div style={{maxWidth: '960px', padding:'0px 36px', margin: '0 auto',}}>
    {/* <div style={{
      position: 'absolute',
      top: '50%',
      width: '100vw',
      transform:'translateY(-50%)',
    }}> */}
     <h1>{title}</h1>

    <div className={css(styles.row)}>
      <div className={css(styles.half)}>
        <img src={image} alt="" style={{
          maxWidth: '100%',
        }}/>
      </div>
      <div className={css(styles.half)}>
        <div dangerouslySetInnerHTML={{__html: content}} className="events-content" style={{
          fontWeight: '300',
          fontSize: '22px',
          marginBottom:'52px',
        }}/>

        <div className={css(styles.events)} >
          <h2 style={{
            textTransform: 'uppercase',
            fontSize: '18px',
          }}>Upcoming Appearances</h2>

          {_.sortBy(events, ['eventDate']).map((event,i)=>{
            // const mapsSearchUrl = `https://www.google.com/maps/search/${event.address}`
            return (
              <div key={`event_${i}`} className={css(styles.eventRow)} >
                <div className={css(styles.eventColumn, styles.eventVenue)}>
                <a href={event.event_link} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none', color: 'white'}}>
                  <span className={css(styles.eventTitle)}>
                    {event.venue}
                  </span>
                </a>
                </div>
                <div className={css(styles.eventColumn, styles.eventAddress)}>
                <span>{event.address}</span>
                </div>
                <div className={css(styles.eventColumn, styles.eventDate)}>
                  {moment(event.eventDate).format('MM.DD.YY')}
                </div>
              </div>
            )
          })}

          <a  href="mailto:charlie.duke@charlieduke.net"
            className={css(styles.specialContactButton)}>
            Contact
          </a>
        </div>
      </div>
    </div>

  </div>
)


const styles = StyleSheet.create({
  row: {
    display: 'flex',
    // padding: '0 36px',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    '@media (max-width: 670px)':{
      flexDirection:'column-reverse',
    }
    // alignItems: 'center',
  },
  half: {
    width: '48%',
    '@media(max-width: 960px)':{
      width: '48%',
    },
    '@media (max-width: 670px)':{
      width: '100%'
    }
  },
  eventRow: {
    display: 'flex',
    // padding: '0 36px',
    // justifyContent: 'space-between',
    marginBottom: '22px',
    width: '100%',
    flexWrap: 'no-wrap',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  eventColumn: {
    flexGrow: '0',
    flexShrink: '0',
    verticalAlign: 'top',
  },
  eventVenue: {
    width: '40%'
  },
  eventAddress:{
    width: '40%',
    color: '#adadad',
    padding:'0px 5px',
    boxSizing: 'border-box',
  },
  eventDate: {
    width: '20%',
    textAlign: 'right',
    color: '#adadad',
  },
  eventTitle: {
    // fontSize: '33px',
    // '@media (max-width: 670px)':{
    //   fontSize: '22px',
    // }
  },
  specialContactButton: {
      color: 'white',
      textDecoration:'none',
      width: '100%',
      padding: '17px',
      fontSize: '18px',
      margin: '15px 0px',
      display: 'inline-block',
      boxSizing: 'border-box',
      textAlign: 'center',
      border:'2px solid white',
      textTransform:'uppercase',
      fontWeight: '600',
      ':hover': {
        background: 'white',
        color: 'black',
      }
    },
})


const mapStateToProps = state => {
  const { events } = state

  return {
    events
  }
}

export default connect(mapStateToProps)(Events)

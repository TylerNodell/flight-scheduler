import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {}

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Cessna Citation' },
  { resourceId: 2, resourceTitle: 'Solara 50' },
  { resourceId: 3, resourceTitle: 'Piper Seneca' },
  { resourceId: 4, resourceTitle: 'Cessna 179S' },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: events,
    }
    this.moveEvent = this.moveEvent.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

  }
  
  delEvent = (event) => {
    this.setState({
      events: this.state.events.filter((test) => {return test.id !== event.id})
    })
  }

  submit = (event) => {
    confirmAlert({
      title: 'Delete this Flight?',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.delEvent(event)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  handleSelect = ({ start, end, resourceId }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
            resourceId
          },
        ],
      })
  }

  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, resourceId, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  render() {
    return (
      <div className="App">
        <DnDCalendar
          defaultDate={new Date(2018, 0, 29)}
          defaultView={Calendar.Views.DAY}
          views={['day', 'work_week']}
          // defaultView="day"
          events={this.state.events}
          // onEventDrop={this.onEventDrop}
          // onEventResize={this.onEventResize}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          onDoubleClickEvent ={this.submit}
          resizable
          selectable
          onSelectEvent={event => this.submit(event)}
          onSelectSlot={this.handleSelect}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          style={{ height: "100vh", width: "100vw", overflowX: 'scroll' }}
        />
      </div>
    );
  }
}

App.propTypes = propTypes

export default App;

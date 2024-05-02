import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Modal from 'react-modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import guitarImage from '../../../../public/images/guitar.png';
import pianoImage from '../../../../public/images/piano.png';
import closeIcon from '../../../../public/images/close.png';

class SessionDrag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      selectedDate: new Date(),
      courses: [],
      courseImages: {
        Guitar: guitarImage,
        Piano: pianoImage
      },
      showModal: false,
      courseDescription: '',
      courseType: '',
      courseLevel: '',
      selectedCourse: ''
    };
  }

  componentDidMount() {
    this.fetchSessions();
    this.fetchCourses();
  }

  fetchSessions = async () => {
    try {
      const response = await fetch('https://backendexpressjs-2.onrender.com/sessions');
      const sessionsData = await response.json();
      this.setState({ sessions: sessionsData });
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  fetchCourses = async () => {
    try {
      const response = await fetch('https://backendexpressjs-2.onrender.com/courses');
      const coursesData = await response.json();
      this.setState({ courses: coursesData });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleEventClick = (event) => {
    const { courses } = this.state;
    const selectedCourse = courses.find(course => course._id === event.course);
    if (selectedCourse) {
      this.setState({
        showModal: true,
        courseDescription: selectedCourse.description,
        courseType: selectedCourse.courseType,
        courseLevel: selectedCourse.level,
        selectedCourse: selectedCourse.name
      });
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { sessions } = this.state;
    const newSessions = Array.from(sessions);
    const [reorderedSession] = newSessions.splice(result.source.index, 1);
    newSessions.splice(result.destination.index, 0, reorderedSession);

    this.setState({ sessions: newSessions });
  };

  render() {
    const localizer = momentLocalizer(moment);
    const { selectedCourse, courseDescription, courseType, courseLevel, showModal, courseImages, sessions } = this.state;

    return (
      <div>
        <h2>Session List</h2>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="sessions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sessions.map((session, index) => (
                  <Draggable key={session._id} draggableId={session._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>{session.title}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Calendar
          localizer={localizer}
          events={sessions.map(session => ({
            ...session,
            title: session.course,
            start: new Date(session.startDate), // Make sure start is of type Date
            end: moment(session.startDate).add(session.duree, 'minutes').toDate()
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectDate={this.handleDateChange}
          eventPropGetter={(event) => ({
            style: {
              backgroundImage: `url(${courseImages[event.title]})`,
              backgroundSize: 'cover',
              backgroundPositionX: '2px',
              backgroundPositionY: '24px',
              color: 'white'
            }
          })}
          onSelectEvent={this.handleEventClick}
          step={30} // Set the step prop to display time slots at 30-minute intervals
        />
        <Modal
          isOpen={showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Course Picture Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            },
            content: {
              width: '50%',
              height: '50%',
              margin: 'auto',
              border: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {selectedCourse && (
              <>
                <img src={courseImages[selectedCourse]} alt={selectedCourse} style={{ width: '100%', height: '100%' }} />
                <p>Description: {courseDescription}</p>
                <p>Type: {courseType}</p>
                <p>Level: {courseLevel}</p>
              </>
            )}
            <img src={closeIcon} alt="Close" style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', width: '20px', height: '20px' }} onClick={this.handleCloseModal} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default SessionDrag;

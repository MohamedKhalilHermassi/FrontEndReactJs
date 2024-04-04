import React from 'react';
import * as Tone from 'tone';

const Guitar = () => {
  // Define the notes on each string of the guitar
  const strings = [
    ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'], // E Standard tuning
    ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'], // Drop D tuning
  ];

  // Function to play a note
  const playNote = (note) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, '8n');
  };

  // CSS styles
  const styles = {
    guitar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    string: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '10px',
    },
    fret: {
      width: '40px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #000',
      cursor: 'pointer',
      fontSize: '14px',
    },
    fretHover: {
      backgroundColor: '#f0f0f0',
    },
  };

  // Render fretboard
  return (
    <div style={styles.guitar}>
      {strings.map((string, stringIndex) => (
        <div key={stringIndex} style={styles.string}>
          {string.map((note, fretIndex) => (
            <div
              key={fretIndex}
              style={styles.fret}
              onClick={() => playNote(note)}
            >
              {note}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Guitar;

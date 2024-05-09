import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import BeatLoader from "react-spinners/BeatLoader";
import './ChatBot.css';
import { FaPaperPlane } from "react-icons/fa"; 

function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  
  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading answer...");
  
    const eventKeywords = ['event', 'events', 'concert', 'festival', 'show'];
  
    try {
      if (eventKeywords.some(keyword => question.toLowerCase().includes(keyword))) {
        const dbResponse = await axios.get(`https://backendexpressjs-2.onrender.com/events`, {
          params: {
            query: question,
          },
        });
  
        console.log('Local API response:', dbResponse.data); 
  
        if (dbResponse.data.length > 0) {
          setAnswer(`Found ${dbResponse.data.length} events: ${dbResponse.data.map(event => `${event.title} at ${event.location} on ${event.date}.`).join('\n')}`);
        }
      } else {
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
            import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
          }`,
          method: "post",
          data: {
            contents: [{ parts: [{ text: question }] }],
          },
        });
  
        console.log('Generative Language API response:', response.data);
  
        setAnswer(
          response["data"]["candidates"][0]["content"]["parts"][0]["text"]
        );
      }
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
  
    setGeneratingAnswer(false);
  }
  const answerContainerStyle = {
    height: answer ? '200px' : '50px',
    overflowY: answer ? 'scroll' : 'hidden'
  };

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">Welcome to Chat AI</header>
      <h1 className="chatbot-title">Chat AI</h1>
      <form onSubmit={generateAnswer} className="chatbot-form">
        <textarea
          required
          className="chatbot-textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button type="submit" className="chatbot-button" disabled={generatingAnswer}>
          {generatingAnswer ? <BeatLoader /> : <FaPaperPlane />} 
        </button>
      </form>
      <div className="chatbot-answer-container" style={answerContainerStyle}>
        <ReactMarkdown className="chatbot-answer">{answer}</ReactMarkdown>
        {generatingAnswer && <p>Typing...</p>} 
      </div>
      <footer className="chatbot-footer">Thank you for using Chat AI</footer>
    </div>
  );
}


export default ChatBot;
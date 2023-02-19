import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';



const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>SalesMail</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Your Own Personal Coach</h1>
          </div>
          <div className="header-subtitle">
            <h2> Get advice from your own personal coach. 
            </h2>
          </div>
        </div>
                <div className="prompt-container">
                <textarea
  className="prompt-box"
  placeholder="I have a sales presentation tomorrow. Give me a step by step guide on how to prepare....."
  value={userInput}
  onChange={onUserChangedText}
/>
<div className="prompt-buttons">
    <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}>
      <div className="generate">
      {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
      </div>
    </a>
  </div>


  <div  className="whatsapp-link">
<a href="whatsapp://send?text=Your own personal coach:    ">Share your advice</a>
 </div>

  <div  className="whatsapp-link">
<a href="https://twitter.com/intent/tweet?text=Today I learned">Tweet your advice</a>

</div>

  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3> Your Plan </h3>
      </div>
    </div>
    
    <div className="output-content">
      <p>{apiOutput}</p>
</div>


<div>

</div>

</div>

)}

</div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/HarryArkwright1"
          target="_blank"
          rel="noreferrer"
        >
<div className="badge">
            <p>Built with ❤️ this Christmas</p>
          </div>
        </a>
      </div>
    </div>

  );
};


export default Home;

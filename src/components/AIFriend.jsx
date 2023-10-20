import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../css/AIFriend.css';

function AIFriend() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleGenerateText = async () => {
        setLoading(true); // Show the loader while fetching data
        try {
            const apiUrl = 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyA8ldCM9qJ4Y0Eu7Nvn5noyfOgYpTcDkNs';
            const requestData = {
                prompt: {
                    text: prompt,
                },
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setResponse(response.data.candidates[0].output);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide the loader after fetching data
        }
    };

    return (
        <div className="container">
            <h1>AI Friend</h1>
            <div>
                <label htmlFor="prompt">Enter a text prompt: </label>
                <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={handlePromptChange}
                />
            </div>
            <div>
                <button onClick={handleGenerateText}>Generate Text</button>
            </div>
            <div className="generated-text">
                {loading ? (
                    <div className="loader"></div>
                ) :
                    // typeof response === 'string' ? (
                    <SyntaxHighlighter language="python" style={stackoverflowDark} customStyle={{ fontSize: '11px' }}>
                        {response.replace("```","//")}
                    </SyntaxHighlighter>
                // )
                //         : (
                //     <pre>{JSON.stringify(response, null, 2)}</pre>
                // )
                }
            </div>
        </div>
    );
}

export default AIFriend;

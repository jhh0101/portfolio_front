import React, { useState, useEffect, useRef } from 'react';
import { useAskAi } from '@/hooks/ai/useAskAi.js';
import './AiChatView.css';

const AiChatView = () => {
    const { mutate, isPending, streamedAnswer } = useAskAi();
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: '안녕하세요! 옥션마켓 AI Assistant입니다. \n경매에 대해 궁금한 점을 편하게 물어보세요.'
        }
    ]);

    const chatAreaRef = useRef(null);

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamedAnswer]);

    useEffect(() => {
        if (!isPending && streamedAnswer) {
            setMessages((prev) => [...prev, { sender: 'ai', text: streamedAnswer }]);
        }
    }, [isPending, streamedAnswer]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim() || isPending) return;

        setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
        mutate(inputText);
        setInputText('');
    };

    return (
        <div className="chat-container">
            <div className="chat-messages" ref={chatAreaRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-wrapper ${msg.sender}`}>
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                ))}

                {isPending && (
                    <div className="message-wrapper ai">
                        <div className="message-bubble streaming">
                            {streamedAnswer || <span className="loading-dots">답변을 생각하는 중입니다...</span>}
                        </div>
                    </div>
                )}
            </div>

            <form className="chat-form" onSubmit={onSubmit}>
                <div className="chat-form-inner">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder=" 무엇이든 물어보세요..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isPending}
                        required
                    />
                    <button type="submit" disabled={isPending || !inputText.trim()} className="chat-button">
                        {isPending ? '대기' : '전송'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AiChatView;
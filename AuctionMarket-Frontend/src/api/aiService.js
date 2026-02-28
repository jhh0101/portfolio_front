export const aiService = {
    askAi: async ({question, onChunk}) => {
        let sessionId = localStorage.getItem('ai_session_id');
        if (!sessionId) {
            sessionId = Math.random().toString(36).substring(2, 11);
            localStorage.setItem('ai_session_id', sessionId);
        }

        const response = await fetch(`/api/groq/chat/stream`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({sessionId, question})
        });

        if (!response.ok) {
            throw new Error('AI 서버 응답 에러');
        }

        const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

        let fullAnswer = '';
        let buffer = '';

        while (true) {
            const {done, value} = await reader.read();
            if (done) break;

            buffer += value;

            const lines = buffer.split('\n');

            buffer = lines.pop();

            for (const line of lines) {
                const trimmedLine = line.trim();

                if (trimmedLine.startsWith('data:')){
                    const jsonStr = trimmedLine.replace('data:', '').trim();

                    if (jsonStr && jsonStr !== '[DONE]') {
                        try {
                            const data = JSON.parse(jsonStr);
                            const content = data.answer;

                            if (content) {
                                fullAnswer += content;
                                onChunk(content);
                            }
                        } catch (e) {
                            console.log("JSON 파싱 에러 (조각 찢어짐) : ", e, "데이터:", jsonStr);
                        }
                    }
                }
            }
        }
        return fullAnswer;
    }
}
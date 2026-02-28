import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { aiService } from '@/api/aiService.js';

export const useAskAi = () => {
    const [streamedAnswer, setStreamedAnswer] = useState('');

     const mutate = useMutation({
        mutationFn: (question) => {
            return aiService.askAi({question,
                onChunk: (chunkText) =>
                    setStreamedAnswer((prev) => prev + chunkText)
            });
        },

        onMutate: () => {
            setStreamedAnswer('');
        },

    })
    return {
        ...mutate,
        streamedAnswer
    };
}
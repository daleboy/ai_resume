
import { type QWenResponseMessage, type QWenResponseText } from "@/models/qwen"
import { type MessageType } from "@/models/qwen";

export async function callQwen(prompt: string, messageType: MessageType) {
    const URL = "/api/proxy/api/v1/services/aigc/text-generation/generation";
    const API_KEY = String(process.env.NEXT_PUBLIC_QWEN_API_KEY);
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "X-DashScope-SSE": "disable",
            },
            body: getParams(prompt),
        });
        const reader = response.body?.getReader();

        if (!reader) return;
        const { value, done } = await reader.read();
        const utf8Decoder = new TextDecoder("utf-8");
        const resultText = value ? utf8Decoder.decode(value, { stream: true }) : "";
        return getResult(resultText, messageType);
    } catch (e) {
        if (e instanceof Error) {
            throw Error(e.message);
        } else {
            throw new Error('failed to decode ai result');
        }
    }
}

function getParams(message: string): string {
    return JSON.stringify({
        model: "qwen-max",
        input: {
            prompt: message,
        },
        parameters: {
            "result_format": message,//text or message
        },
    });
}


function getResult(resultText: string, messageType: MessageType): string {
    if (messageType === 'message') {
        const data: QWenResponseMessage = JSON.parse(resultText);
        if (data?.output?.choices?.length > 0) {
            const content = data.output.choices[0].message.content
            console.log(content);
            return content;
        }
    } else {
        const data: QWenResponseText = JSON.parse(resultText);
        if (data?.output?.text) {
            const content = data.output.text;
            console.log(content);
            return content;
        }
    }
    return '';
}
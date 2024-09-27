
import { type QWenResponse } from "@/models/qwen"


export async function callQwen(prompt: string) {
    const URL = "/api/proxy/api/v1/services/aigc/text-generation/generation";
    const API_KEY = String(process.env.NEXT_PUBLIC_QWEN_API_KEY);
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
    try {
        const data = getResult(resultText);
        if (data?.output?.choices?.length > 0) {
            const content = data.output.choices[0].message.content
            console.log(content);
            return content;
        }
    } catch (e) {
        if (e instanceof Error) {
            throw Error(e.message);
        } else {
            throw new Error('failed to decode ai result');
        }
    }
}

function getParams(message: string) {
    return JSON.stringify({
        model: "qwen-max",
        input: {
            prompt: message,
        },
        parameters: {
            "result_format": "message",//text or message
        },
    });
}


function getResult(resultText: string) {
    const result: QWenResponse = JSON.parse(resultText);
    return result;
}
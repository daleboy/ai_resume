//request parameters
interface Message {
  role: 'user'; // Restricting the role to specific values(user message)
  content: string;         // Content of the message
}

interface Input {
  messages: Message[];     // Array of messages
}

export type MessageType = 'message'|'text';
interface Parameters {
  result_format: MessageType; // Restricting the result_format to a specific value
}

export interface RequestPayload {
  model: string;           // Model name
  input: Input;           // Input object
  parameters: Parameters;  // Parameters object
}

// Example usage:
export const defaultPayload: RequestPayload = {
  model: "qwen-plus",
  input: {
      messages: [
          {
              role: "user",
              content: "You are a helpful assistant."
          },
          {
              role: "user",
              content: "Who are you？"
          }
      ]
  },
  parameters: {
      result_format: "text"
  }
};

//response object for message
interface Choice {
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
  }
  
  export interface QWenResponseMessage {
    status_code: number;
    request_id: string;
    code: string;
    message: string;
    output: {
      text: string | null;
      finish_reason: string | null;
      choices: Choice[];
    };
    usage: {
      input_tokens: number;
      output_tokens: number;
      total_tokens: number;
    };
  }

  // response object for text
  export interface QWenResponseText {
    output: {
        finish_reason: string;
        text: string;
    };
    usage: {
        total_tokens: number;
        output_tokens: number;
        input_tokens: number;
    };
    request_id: string;
};
//request parameters
interface Message {
  role: 'user'; // Restricting the role to specific values(user message)
  content: string;         // Content of the message
}

interface Input {
  messages: Message[];     // Array of messages
}

interface Parameters {
  result_format: 'message'|'text'; // Restricting the result_format to a specific value
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

//response object
interface Choice {
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
  }
  
  export interface QWenResponse {
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
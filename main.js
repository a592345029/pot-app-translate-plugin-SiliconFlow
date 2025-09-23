async function translate(text, from, to, options) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    
    let { apiKey, model = "deepseek-chat" } = config;
    
    // 设置默认请求路径
    const requestPath = "https://api.siliconflow.cn/v1/chat/completions";
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
    
    const body = {
        model: model,  // 使用用户选择的模型
        messages: [
  {
    "role": "system",
    "content": "You are a knowledgeable assistant. When answering multiple-choice or short questions, always put the final answer option (e.g., A, B, C, D, or the number) at the very beginning, followed by a concise explanation in one short sentence. Keep answers brief and professional."
  },
  {
    "role": "user",
    "content": "Question: ${text}"
  }
],
        temperature: 0,
        top_p: 0.99,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 15000
    }
    
    let res = await fetch(requestPath, {
        method: 'POST',
        url: requestPath,
        headers: headers,
        body: {
            type: "Json",
            payload: body
        }
    });
    
    if (res.ok) {
        let result = res.data;
        return result.choices[0].message.content.trim().replace(/^"|"$/g, '');
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}

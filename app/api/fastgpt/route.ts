import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { emotion, userAnswer, type } = await request.json();

    // 类型1：生成故事和提问
    if (type === 'generate-story') {
      const prompt = `
      你是一个温柔的儿童情绪引导师，专门帮助3-8岁的孩子认识情绪。
      现在孩子的情绪是：${emotion}
      
      请你生成一个简短的儿童绘本故事场景，然后提出一个简单的引导问题。
      要求：
      1. 故事要非常简单，只有1-2句话
      2. 使用孩子熟悉的日常场景
      3. 句子简短，没有复杂词汇
      4. 提问要引导孩子说出对应的情绪词
      
      输出格式必须严格按照：
      故事内容|||提问内容
      
      例如：
      小明的气球飞走了，他站在路边难过地哭了。|||如果你是小明，你现在是什么心情？
      冰淇淋掉在地上了，小红看着地上的冰淇淋，嘴巴瘪了起来。|||你会对妈妈说什么？
      
      不要输出任何其他内容，不要有解释，不要有markdown格式，只输出故事和提问，用|||分隔。
      `;

      const response = await fetch('https://cloud.fastgpt.cn/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FASTGPT_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-v4-flash',
          messages: [{ role: 'user', content: prompt }],
          appId: process.env.FASTGPT_APP_ID,
          stream: false
        })
      });

      if (!response.ok) throw new Error('FastGPT API 调用失败');
      const data = await response.json();
      return NextResponse.json({ success: true, content: data.choices[0].message.content });
    }

    // 类型2：判断用户回答是否正确
    if (type === 'check-answer') {
      const prompt = `
      你是一个温柔的儿童情绪引导师。
      现在的情绪主题是：${emotion}
      孩子的回答是：${userAnswer}
      
      请判断孩子的回答是否正确表达了${emotion}这种情绪。
      如果正确，只输出一个字：是
      如果不正确，输出一句温柔的引导语，引导孩子说出正确的情绪词。
      引导语要简单易懂，比如："再想想，小云朵现在是什么心情呀？"
      
      不要输出任何其他内容。
      `;

      const response = await fetch('https://cloud.fastgpt.cn/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FASTGPT_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-v4-flash',
          messages: [{ role: 'user', content: prompt }],
          appId: process.env.FASTGPT_APP_ID,
          stream: false
        })
      });

      if (!response.ok) throw new Error('FastGPT API 调用失败');
      const data = await response.json();
      const result = data.choices[0].message.content.trim();
      
      return NextResponse.json({ 
        success: true, 
        isCorrect: result === '是',
        feedback: result === '是' ? '' : result
      });
    }

    return NextResponse.json({ success: false, error: '无效的请求类型' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: '请求失败' }, { status: 500 });
  }
}
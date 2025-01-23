import OpenAI from 'openai'

let openAi: OpenAI

export const generateArticle = async (title: string, description: string) => {
   if (!openAi) {
      console.log('init openai')
      openAi = new OpenAI({
         apiKey: import.meta.env.VITE_OPEN_AI_KEY,
         dangerouslyAllowBrowser: true,
      })
   }
   const result = await openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
         {
            role: 'system',
            content: `You are a helpful AI assisstance that is here to help me write an article about ${title}.`,
         },
         {
            role: 'user',
            content: `Please create an article based on the following information. 
            Here is the list of information:  \ntitle: ${title}, \ndescription:
            ${description}
            \nRemember the post should be based on the information that I have mentioned  above. 
            Output should be Markdown text format strictly.`,
         },
      ],
   })
   return result.choices[0].message.content
}

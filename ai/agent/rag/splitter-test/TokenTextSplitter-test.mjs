import "dotenv/config";
import { 
    // CharacterTextSplitter,
    // RecursiveCharacterTextSplitter,
    TokenTextSplitter,
} from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { getEncoding } from"js-tiktoken"; 

// 日志文档
const logDocument = new Document({
    pageContent: `
        [2024-01-15 10:00:00] INFO: Application started
        [2024-01-15 10:00:05] DEBUG: Loading configuration file
        [2024-01-15 10:00:10] INFO: Database connection established
        [2024-01-15 10:00:15] WARNING: Rate limit approaching
        [2024-01-15 10:00:20] ERROR: Failed to process request
        [2024-01-15 10:00:25] INFO: Retrying operation
        [2024-01-15 10:00:30] SUCCESS: Operation completed
    `
});

// const logSplitter = new CharacterTextSplitter({
//     separator: '\n',
//     chunkSize: 200,
//     chunkOverlap: 20,
// });

const logTextSplitter = new TokenTextSplitter({
    chunkSize: 50,
    chunkOverlap: 10,
    encodingName: "cl100k_base", // Openai 使用的编码方式
});




const splitDocuments = await logTextSplitter.splitDocuments([logDocument]);
console.log(splitDocuments);

const enc = getEncoding("cl100k_base");
splitDocuments.forEach(doc => {
    console.log(doc);
    console.log('character length',doc.pageContent.length);
    console.log('token length',enc.encode(doc.pageContent).length);
});

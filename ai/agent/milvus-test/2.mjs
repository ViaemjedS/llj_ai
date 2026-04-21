import {
    MilvusClient,
    IndexType,      // 添加这行
    MetricType,      // 添加这行
    DataType,
} from '@zilliz/milvus2-sdk-node'
import 'dotenv/config'
import {
    OpenAIEmbeddings
} from '@langchain/openai'

const VECTOR_DIM = 1024 // 向量维度
const COLLECTION_NAME = 'ai_diary';
const TOKEN = process.env.MILVUS_TOKEN;
const ADDRESS = process.env.MILVUS_ADDRESS;

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDINGS_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
    dimensions: VECTOR_DIM,
})

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
})

// 嵌入模型， 将文本转换为函数封装
async function getEmbeddings(test) {
    const result = await embeddings.embedQuery(test);
    return result;
}

async function main() {
    console.log('正在连接Milvus');
    const checkHealth = await client.checkHealth();
    if (!checkHealth.isHealthy) {
        console.error('Milvus数据库连接失败', checkHealth.reasons);
        return;
    }
    console.log('连接成功， 集群状态正常');
    //加载更加专业一些
     await client.loadCollection({
        collection_name: COLLECTION_NAME,
    });
    const query = '我想看看关于户外活动的日记';
    const queryVector = await getEmbeddings(query);
    const searchResult = await client.search({
        collection_name: COLLECTION_NAME,
        vector: queryVector,
        limit: 3,
        metric_type: MetricType.COSINE,
        output_fields: ['id', 'content', 'date', 'mood', 'tags'],
    })
    // 2. 打印检索到的日记及相似度
    searchResult.results.forEach((diary, i) => {
      console.log(`\n[日记 ${i + 1}] 相似度: ${diary.score.toFixed(4)}`);
      console.log(`日期: ${diary.date}`);
      console.log(`心情: ${diary.mood}`);
      console.log(`标签: ${diary.tags?.join(', ')}`);
      console.log(`内容: ${diary.content}`);
    });
    console.log('\n 搜索结果：');
    console.log(`共找到了 ${searchResult.results.length} 条日记`);



    // await client.createCollection({
    //     collection_name: COLLECTION_NAME,
    //     fields: [
    //         { name: 'id', data_type: DataType.VarChar, max_length: 50, is_primary_key: true },
    //         { name: 'vector', data_type: DataType.FloatVector, dim: VECTOR_DIM },
    //         { name: 'date', data_type: DataType.VarChar, max_length: 50 },
    //         { name: 'content', data_type: DataType.VarChar, max_length: 5000 },
    //         { name: 'mood', data_type: DataType.VarChar, max_length: 50 },
    //         { name: 'tags', data_type: DataType.Array, element_type: DataType.VarChar,
    //             max_capacity: 10, max_length: 50    
    //         }
    //     ]
    // })

    // await client.createIndex({
    //     collection_name: COLLECTION_NAME,
    //     field_name: 'vector',   // 常用的查询字段
    //     index_type: IndexType.IVF_FLAT,
    //     metric_type: MetricType.COSINE,
    //     params: {
    //         nlist: VECTOR_DIM
    //     }
    // })


    // await client.loadCollection({
    //     collection_name: COLLECTION_NAME,
    // });

    // console.log('\nInserting diary entries...');
    // const diaryContents = [
    //     {
    //         id: 'diary_001',
    //         content: '今天天气很好，去公园散步了，心情愉快。看到了很多花开了，春天真美好。',
    //         date: '2026-01-10',
    //         mood: 'happy',
    //         tags: ['生活', '散步']
    //     },
    //     {
    //         id: 'diary_002',
    //         content: '今天工作很忙，完成了一个重要的项目里程碑。团队合作很愉快，感觉很有成就感。',
    //         date: '2026-01-11',
    //         mood: 'excited',
    //         tags: ['工作', '成就']
    //     },
    //     {
    //         id: 'diary_003',
    //         content: '周末和朋友去爬山，天气很好，心情也很放松。享受大自然的感觉真好。',
    //         date: '2026-01-12',
    //         mood: 'relaxed',
    //         tags: ['户外', '朋友']
    //     },
    //     {
    //         id: 'diary_004',
    //         content: '今天学习了 Milvus 向量数据库，感觉很有意思。向量搜索技术真的很强大。',
    //         date: '2026-01-12',
    //         mood: 'curious',
    //         tags: ['学习', '技术']
    //     },
    //     {
    //         id: 'diary_005',
    //         content: '晚上做了一顿丰盛的晚餐，尝试了新菜谱。家人都说很好吃，很有成就感。',
    //         date: '2026-01-13',
    //         mood: 'proud',
    //         tags: ['美食', '家庭']
    //     }
    // ];

    // console.log('Generating embeddings...');
    // const diaryData = await Promise.all(
    //     diaryContents.map(async (diary) => ({
    //         ...diary,
    //         vector: await getEmbedding(diary.content),
    //     }))
    // );
    // const insertRes = await client.insert({
    //     collection_name: COLLECTION_NAME,
    //     data: diaryData,
    // })

    // console.log(`插入成功: ${insertRes.insert_cnt} 条数据`);
}



main();


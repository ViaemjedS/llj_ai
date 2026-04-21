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
async function getEmbedding(test) {
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


    await client.loadCollection({
        collection_name: COLLECTION_NAME,
    });

    console.log('\nInserting diary entries...');
    const diaryContents = [
        {
            id: 'diary_001',
            content: '今天天气很好，去公园散步了，心情愉快。看到了很多花开了，春天真美好。',
            date: '2026-01-10',
            mood: 'happy',
            tags: ['生活', '散步']
        },
        {
            id: 'diary_002',
            content: '今天工作很忙，完成了一个重要的项目里程碑。团队合作很愉快，感觉很有成就感。',
            date: '2026-01-11',
            mood: 'excited',
            tags: ['工作', '成就']
        },
        {
            id: 'diary_003',
            content: '周末和朋友去爬山，天气很好，心情也很放松。享受大自然的感觉真好。',
            date: '2026-01-12',
            mood: 'relaxed',
            tags: ['户外', '朋友']
        },
        {
            id: 'diary_004',
            content: '今天学习了 Milvus 向量数据库，感觉很有意思。向量搜索技术真的很强大。',
            date: '2026-01-12',
            mood: 'curious',
            tags: ['学习', '技术']
        },
        {
            id: 'diary_005',
            content: '晚上做了一顿丰盛的晚餐，尝试了新菜谱。家人都说很好吃，很有成就感。',
            date: '2026-01-13',
            mood: 'proud',
            tags: ['美食', '家庭']
        }
    ];

    console.log('Generating embeddings...');
    const diaryData = await Promise.all(
        diaryContents.map(async (diary) => ({
            ...diary,
            vector: await getEmbedding(diary.content),
        }))
    );
    const insertRes = await client.insert({
        collection_name: COLLECTION_NAME,
        data: diaryData,
    })

    console.log(`插入成功: ${insertRes.insert_cnt} 条数据`);
}



main();




/* 

    无使用Embeddings模型， 直接使用Milvus的向量存储

*/
// async function main() {
//     const client = new MilvusClient({
//         address: process.env.MILVUS_ADDRESS,
//         token: process.env.MILVUS_TOKEN,
        
//     });
//     console.log('正在连接Milvus数据库...');
//     const checkHealth = await client.checkHealth();
//     if (!checkHealth.isHealthy) {
//         console.error('Milvus数据库连接失败', checkHealth.reasons);
//         return;
//     }
//     console.log('Milvus数据库连接成功');

//     // table collection
//     const COLLECTION_NAME = 'test';
//     const DIMENSION = 4; // 向量维度
    
    // try {
    //     await client.createCollection({
    //         collection_name: COLLECTION_NAME,
    //         dimension: DIMENSION,
    //         auto_id : true,
    //     });
    //     console.log(`Collection ${COLLECTION_NAME} 创建成功....`);
    //     await client.createIndex({
    //         collection_name: COLLECTION_NAME,
    //         field_name: 'vector',
    //         index_type: IndexType.AUTOINDEX,
    //         metric_type: MetricType.COSINE,
    //     })
    //     console.log(`Index 创建成功...`);
    // } catch (err) {
    //     console.log(`Collection ${COLLECTION_NAME} 创建失败: ${err.message}`);                
    // }
    // const data = [
    //     {
    //         vector: [0.1, 0.2, 0.3, 0.4],
    //         content: '这是第一条数据'
    //     },
    //     {
    //         vector: [0.5, 0.6, 0.7, 0.8],
    //         content: '这是第二条数据'
    //     },
    // ];
    // const insertRes = await client.insert({
    //     collection_name: COLLECTION_NAME,
    //     data: data,
    // })
    // console.log(`插入成功: ${insertRes.IDs.length} 条数据`);
//     const searchRes = await client.search({
//         collection_name: COLLECTION_NAME,
//         data: [[0.5, 0.6, 0.7, 0.8]],
//         limit: 1,
//         output_fields: ['content'],
//     })
//     console.log(`搜索结果: ${JSON.stringify(searchRes)}`);
// }
// main();

import {
    MilvusClient,
} from '@zilliz/milvus2-sdk-node'
import 'dotenv/config'
async function main() {
    const client = new MilvusClient({
        address: process.env.MILVUS_ADDRESS,
        token: process.env.MILVUS_TOKEN,
        
    });
    console.log('正在连接Milvus数据库...');
    const checkHealth = await client.checkHealth();
    if (!checkHealth.isHealthy) {
        console.error('Milvus数据库连接失败', checkHealth.reasons);
        return;
    }
    console.log('Milvus数据库连接成功');

    // table collection
    const COLLECTION_NAME = 'test';
    const DIMENSION = 4; // 向量维度
    
    try {
        await client.createCollection({
            collection_name: COLLECTION_NAME,
            dimension: DIMENSION,
            auto_id : true,
        });
        console.log(`Collection ${COLLECTION_NAME} 创建成功....`);
        await client.createIndex({
            collection_name: COLLECTION_NAME,
            field_name: 'vector',
            index_type: IndexType.AUTOINDEX,
            metric_type: MetricType.COSINE,
        })
        console.log(`Index 创建成功...`);
    } catch (err) {
        console.log(`Collection ${COLLECTION_NAME} 创建失败: ${err.message}`);                
    }
    
    
}
main();

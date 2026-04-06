import "dotenv/config";
import "cheerio"; // 后端，使用css选择器 像前端一样查找DOM节点
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const cheerioLoader = new CheerioWebBaseLoader(
    "https://juejin.cn/post/7233327509919547452?searchId=20260406163251E145B2119EE211E0E796",
    {
        selector: '.main-area p'
    }
);

const documents = await cheerioLoader.load();
console.log(documents);
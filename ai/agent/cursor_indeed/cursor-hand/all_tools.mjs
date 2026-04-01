// langchain tool 工具
import { tool } from '@langchain/core/tools';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
    spawn
} from 'node:child_process';
import { z } from 'zod';



// 创建读取文件工具
/* 
    tool() 函数接收两个参数：
    1.第一个参数 ：异步函数，定义工具的实际执行逻辑
    2.第二个参数 ：配置对象，包含工具的名称、描述和参数验证规则
*/
const readFileTool = tool (
    // 工具执行逻辑
    async({ filePath }) => {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            console.log(`[工具调用] read_file("${filePath}") 成功读取了${content.length} 字节`)
            return `文件内容: \n${content}`;
        } catch(error) {
            console.log(`工具调用 read_file("${filePath}") 失败:${error.message}`);
            return `错误: ${error.message}`;
        }
    },
    // 工具配置
    /* 
        - name : 工具名称为 read_file
        - description : 工具描述，说明该工具的作用
        - schema : 使用 Zod 定义参数验证规则
            - filePath : 必须是字符串类型，描述为"文件路径"
    */
    {
        name: 'read_file',
        description: '读取指定路径的文件内容',
        schema: z.object({
            filePath: z.string().describe('文件路径')
        })
    }
)

// 创建写入文件工具
const writeFileTool = tool(
    // 工具执行逻辑
    async({ filePath, content }) => {
        try {
            // 提取文件路径中的目录部分
            const dir = path.dirname(filePath);
            // make directory 目录,recursive: true 递归创建
            await fs.mkdir(dir, { recursive: true })   
            await fs.writeFile(filePath, content, "utf-8");
            console.log(`[工具调用] write_file("${filePath}") 成功写入 ${content.length} 字节`)
            return `文件写入成功:${filePath}`;
        } catch(error) {
            console.log(`[工具调用] write_file("${filePath}") 失败:${error.message}`);
            return `写入文件失败:${error.message}`;
        }
    }, 
    // 工具配置
    /* 
    - name : 工具名称为 write_file
    - description : 说明工具功能，强调会自动创建目录
    - schema : 定义两个参数
        - filePath : 字符串类型，文件路径
        - content : 字符串类型，要写入的内容
    */
    {
        name: 'write_file',
        description: '向指定路径写入文件内容，自动创建目录',
        schema: z.object({
            filePath: z.string().describe('文件路径'),
            content: z.string().describe('要写入的文件内容'),
        })
    }
)

// 执行命令工具
// 工具执行逻辑
const executeCommandTool = tool(
    /* 
        - command : 要执行的命令字符串
        - workingDirectory : 可选的工作目录
    */
    async({ command, workingDirectory }) => {
        const cwd = workingDirectory || process.cwd(); //默认当前目录
        console.log(`[工具调用] execute_command("${command}") 在目录 ${cwd} 执行命令`);
        return new Promise((resolve, reject) => {
            const [cmd, ...args] = command.split(' ');
            // 使用 spawn() 创建子进程执行命令
            /* 
                - cwd : 工作目录
                - stdio: 'inherit' : 继承父进程的标准输入输出，实时显示命令输出
                - shell: true : 在 shell 中执行命令，支持 shell 特性
            */
            const child = spawn(cmd, args, {
                cwd,
                stdio: 'inherit',
                shell: true
            })
            // 初始化错误信息变量
            let errorMsg = '';
            // 监听子进程的 error 事件，捕获错误信息
            child.on('error',(error) => {
                errorMsg = error.message;
            })
            // 监听子进程的 close 事件，命令结束时触发
            child.on('close', (code) => {
                if (code === 0) {
                    // 成功退出
                    console.log(`[工具调用 execute_command("${command}") 命令执行成功]`);
                    // 根据是否指定了工作目录，返回不同的提示信息
                    const cwdInfo = workingDirectory?
                    `
                    \n\n重要提示: 命令在目录"${workingDirectory}"中执行成功。
                    如果需要在这个项目中继续执行命令，请使用 workingDirectory
                    "${workingDirectory}" 参数，不要使用cd命令
                    `: ``
                    resolve(`命令执行成功: ${command} ${cwdInfo}`);
                } else {
                    if(errorMsg) {
                        console.error(`错误: ${errorMsg}`);
                    }
                    process.exit(code || 1);
                }
            })
        })
    },
    /* 
        - name : 工具名称为 execute_command
        - description : 说明工具功能
        - schema : 定义参数
            - command : 字符串类型，要执行的命令
            - workingDirectory : 可选的字符串类型，工作目录
    */
    {
        name: 'execute_command',
        description: '执行系统命令，支持指定工作目录，实时显示输出',
        schema: z.object({
            command: z.string().describe('要执行的命令'),
            workingDirectory: z.string().optional().describe('指定工作目录，默认当前目录')
            
        }),
    }
)

// 列出目录工具
const listDirectoryTool = tool(
    async({ directoryPath }) => {
        try {
            // 读取目录内容
            const files = await fs.readdir(directoryPath);
            console.log(`[工具调用] list_directory("${directoryPath}") 成功列出 ${files.length} 个文件`);
            return `目录内容: \n ${files.map(f => `-${f}`).join('\n')}`;
        } catch(error) {
            console.log(`[工具调用] list_directory("${directoryPath}") 失败: ${error.message}`);
            return `列出目录失败: ${error.message}`;
        }
    },
    {
        name: 'list_directory',
        description: '列出指定目录下的所有文件和文件夹',
        schema: z.object({
            directoryPath: z.string().describe('目录路径')
        })
    }
)


export {
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool
}

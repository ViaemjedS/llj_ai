import jwt from 'jsonwebtoken'

// 安全性 编码的时候加密
// 解码的时候用于解密
// 加盐 --- secret 密钥
const {sign} = jwt;
const secret = '!&123doddefhh';
export default [
    {
        url: '/api/login',
        method: 'post',
        timeout: 2000, //请求耗时
        response: (req, res) => {
            // req, username, password
            const {username, password} = req.body;
            if (username !== 'admin' || password !== '123456') {
                return {
                    code: 1,
                    message: '账号或密码错误'
                }
            }
            // 生成token 颁发令牌
            // json 用户数据

            const token = sign({
                user: {
                    id: "001",
                    username: "admin"
                }
            }, secret, {
                expiresIn: '86400' //过期时间
            })
            console.log(token, '——————');
            return {
                token,
                data: {
                    id: "001",
                    username: "admin"
                }
            }
        }
    },
    {
        url: '/api/user',
        method: 'get',
        response: (req, res) => {
            // 用户端 token headers
            const token = req.headers['authorization'].split(' ')[1]
            console.log(token)
            try {
                const decode = jwt.decode(token, secret);
                console.log(decode)
                return {
                    code: 0,
                    data: decode.user
                }
            } catch(err) {
                return {
                    code: 1,
                    message: 'Invalid token'
                }
            }
            return {
                token
            }
        }
    }
]
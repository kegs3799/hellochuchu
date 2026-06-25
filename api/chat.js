出口 默认 异步 功能 处理程序(req, res) {
  如果 (req.方法!=='POST') {
    返回 res.状态(405).JSON({ 误差: '不允许使用方法' });
  }

  Const{ 消息 }=req.身体;

  尝试 {
    Const响应=等候 取来('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      方法: 'POST',
      页眉: {
        '内容类型': '应用程序/json',
        '授权': '承载器${过程.env.ZHIPU_API_KEY}`,
        'X-Api-Resource-Id': 'glm-4.5-air'
      },
      身体: JSON.使字符串化({
        模型: 'glm-4.5-air',
        消息: 消息.地图(米=>({
          角色: 米.角色==='assistant' ? 'assistant' : 米.角色==='user' ? 'user' : 'system',
          内容: 米.内容
        })),
        温度: 0.7,
        最大标记数(_T): 2048
      })
    });

    Const数据=等候 响应.JSON();
    
    如果 (!响应.好的) {
      返回 res.状态(响应.状态).JSON({ 误差: 数据.误差||'AI 请求失败' });
    }

    Const内容=数据.选择?.[0]?.消息?.内容||'抱歉，我无法生成回复。';
    
    res.状态(200).JSON({ 内容 });
  } 赶上 (误差) {
    控制台.误差('聊天API错误：', 误差);
    res.状态(500).JSON({ 误差: '服务器内部错误' });
  }
}

const schedule = require('node-schedule');
const ChatBot = require('dingtalk-robot-sender');
const tokens = require('./tokens');

const { eatAssistantToken, weeklyAssistantToken } = tokens;

function eatAssistantRobot() {
  const feChatRobot = createRobot(eatAssistantToken);
  const mdTxt = `![提醒吃饭小助手](http://wx2.sinaimg.cn/large/62528dc5gy1g58ehvwu9fj20rs0rsqc5.jpg)`;
  feChatRobot
    .markdown('提醒吃饭小助手', mdTxt, {
      isAtAll: true,
    })
    .catch(ex => console.error(ex));
}

function weeklyAssistantRobot() {
  const feChatRobot = createRobot(weeklyAssistantToken);
  const mdTxt = `## 该发周报啦！ ![提醒发周报小助手](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2653677097,870881111&fm=26&gp=0.jpg)`;
  feChatRobot
    .markdown('提醒发周报小助手', mdTxt, {
      isAtAll: true,
    })
    .catch(ex => console.error(ex));
}
function createRobot(token) {
  return new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=' + token,
  });
}

function createSchedule(cronFormatStr, jobs, jobsName) {
  schedule.scheduleJob(cronFormatStr, () => {
    console.log(jobsName + ':' + new Date());
    jobs();
  })
}

function schedules() {
  createSchedule('0 58 11 * * *', eatAssistantRobot, '提醒吃饭小助手');
  createSchedule('0 58 17 * * *', eatAssistantRobot, '提醒吃饭小助手');
  createSchedule('0 30 19 * * 6', weeklyAssistantRobot, '提醒发周报小助手');
  createSchedule('0 30 11 * * 7', weeklyAssistantRobot, '提醒发周报小助手');
}

schedules();
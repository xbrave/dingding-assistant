const schedule = require('node-schedule');
const ChatBot = require('dingtalk-robot-sender');
const tokens = require('./tokens');

const { eatAssistantToken } = tokens;

function eatAssistantRobot() {
  const feChatRobot = createRobot(eatAssistantToken);
  const mdTxt = `![提醒吃饭小助手](http://wx2.sinaimg.cn/large/62528dc5gy1g58ehvwu9fj20rs0rsqc5.jpg)`;
  feChatRobot
    .markdown('提醒吃饭小助手', mdTxt, {
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
  createSchedule('* 57 11 * * *', eatAssistantRobot, '提醒吃饭小助手');
  createSchedule('* 57 17 * * *', eatAssistantRobot, '提醒吃饭小助手');
}

schedules();
/*
[task_local]
0 0 8 ? * * https://raw.githubusercontent.com/deezertidal/shadowrocket-rules/main/js/oil.js, tag=每日油价, enabled=true
*/
const apiurl = "https://apis.tianapi.com/oilprice/index?key=d1666ef61ef05d151f2f715a4563b359&prov=%E9%99%95%E8%A5%BF";

(async () => {
    try {
        const response = await $task.fetch({ url: apiurl });
        const obj = JSON.parse(response.body);
        const { prov, p0, p92, p95, p98, time } = obj.result;
        
        const message = `${prov}油价提醒\n${time}\n92号汽油: ¥${p92} 95号汽油: ¥${p95} 98号汽油: ¥${p98} 0号柴油: ¥${p0}`;
        
        $notify(prov + "油价提醒", time, message);
    } catch (error) {
        console.log("Error:", error);
    } finally {
        $done();
    }
})();

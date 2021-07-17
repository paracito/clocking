const AV = require('leancloud-storage');
const { Query, User } = AV;

AV.init({
  appId: "XDcXxMdiSuYWAdlNC8s5K9XE-gzGzoHsz",
  appKey: "SDqhmTgCSFNVzq0e9LETSGHF",
  serverURL: "https://xdcxxmdi.lc-cn-n1-shared.com"
});

const ClockList = AV.Object.extend('clock_list');



function query () {
        const query = new AV.Query('clock_list');
		query.descending('id');
        let res = query.find()
        return res
        // query.find().then((res) => {
        //     for(let item of res) {
        //         data.push(item.attributes)
        //     }
        //     console.log('res:',data);
}
function query_single (target) {
	const query = new AV.Query('clock_list');
	query.equalTo('date', target);
	let res = query.find()
	return res
}

function add (data) {
	let new_clock = new ClockList();
	new_clock.set('user', data.user)
	new_clock.set('level', data.level)
	new_clock.set('date', data.date)
	new_clock.set('title', data.title)
	new_clock.set('duration', data.duration)
	new_clock.set('ways', data.ways)
	new_clock.set('detail', data.detail)
	// new_clock.save().then((res) => {
	// 	console.log('数据添加成功：',res)
	// }, (err) => {
	// 	console.log('ERROR:', err);
	// })
	return new_clock.save()
}

// addData()

function modify (target, data) {
	const new_clock = AV.Object.createWithoutData('clock_list', target);
	new_clock.set('user', data.user)
	new_clock.set('level', data.level)
	new_clock.set('date', data.date)
	new_clock.set('title', data.title)
	new_clock.set('duration', data.duration)
	new_clock.set('ways', data.ways)
	new_clock.set('detail', data.detail)
	// new_clock.save().then((res) => {
	// 	console.log('数据修改成功：',res)
	// }, (err) => {
	// 	console.log('ERROR:', err);
	// })
	return new_clock.save()
}

// modifyData({"name":"123","date:":"2021-06-23","value":"zxczxczxczxc"})

export {query, query_single, add, modify}
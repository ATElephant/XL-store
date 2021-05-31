export default {
	state:{
		list:[
			{
				name:"summer",
				phone:"158****531",
				path:"广东省 广州市 白云区 XXXXX街道",
				isdefault:false
			},
			{
				name:"summer",
				phone:"158****2211",
				path:"广西省 广州市 白云区 XXXXX街道",
				isdefault:false
			}
		],
	},
	getters:{
		// 获取默认地址
		defaultPath:(state)=>{
			return state.list.filter(v=> v.isdefault)
		}
	},
	mutations:{
		// 创建收货地址
		createPath(state,item){
			state.list.unshift(item)
		},
		// 删除地址
		delPath(state,index){
			state.list.splice(index,1)
		},
		// 修改收货地址标题(真实修改)
		upDataPath(state,{index,item}){
			for(let key in item){
				state.list[index][key]= item[key]
			}
		},
		// 取消默认地址
		removeDefault(state){
			state.list.forEach((v)=>{
				if(v.isdefault){
					v.isdefault = false;
				}
			})
		}
	},
	actions:{
		// 修改地址默认选项
		updatePathAction({commit},obj){
			if (obj.item.isdefault) {
				commit('removeDefault');
			}
			commit('upDataPath',obj)
		},
		// 增加地址
		createPathAction({commit},item){
			if (item.isdefault) {
				commit('removeDefault');
			}
			commit('createPath',item)
		}
	}
}




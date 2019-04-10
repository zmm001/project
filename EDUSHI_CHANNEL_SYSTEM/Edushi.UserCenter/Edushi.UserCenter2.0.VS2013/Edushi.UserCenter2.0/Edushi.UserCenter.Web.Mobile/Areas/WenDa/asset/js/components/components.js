Vue.component('header-bar', {
    template: '<header><span class="back" @click="back"></span><div class="logo"><a href="http://m.edushi.com/" class="eds"></a><a href="http://m.edushi.com/wenda/" class="wenda"></a></div><span class="title"  :data-number="data.number == 0 ? false : data.number">{{ data.title }}</span><span class="right-btn" @click="rightClick" v-if="data.rightBtn">{{ data.rightBtn instanceof Array ? data.rightBtn[index] : data.rightBtn }}</span></header>',
  props: ['data'],
	data: function(){
		return {
			index: 0,
		}
	},
	methods: {
		back: function(){
			if( this.data.back ){
				this.$emit('back');
			}else{
				window.history.back()
			}
		},
		rightClick: function(){
			this.index == 0 ? this.index = 1 : this.index = 0;
			this.$emit('rightclick');
		}
	}
})
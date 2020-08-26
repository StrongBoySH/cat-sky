;(function($){
    "use strict";

    // console.log($);
    // $.table = function(){}
    // $.extend({
    //     table:function(){}
    // })

    $.fn.table = function(ops){
        let {btns,conts,index=0,type=0,iNow} = ops;

        let eveType = type === 0 ? "click" : "mouseenter";

        // 设置默认样式
        btns.eq(index).addClass(iNow).siblings().removeClass(iNow);
        conts.eq(index).addClass(iNow).siblings().removeClass(iNow);

        // 根据用户传入的行为，添加切换功能
        btns.on(eveType,function(){
            $(this).addClass(iNow).siblings().removeClass(iNow);

            conts.eq($(this).index()).addClass(iNow).siblings().removeClass(iNow);
        })
    }
    // $.fn.extend({
    //     table:function(){

    //     }
    // })

    

})(jQuery);
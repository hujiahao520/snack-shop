
$(function () {
    $('.search-but').on('click',function () {
         /*跳转去搜索列表页 并且需要带上关键字*/

         var key = $.trim($('input').val());
          
         /*判断  没有关键字就提示用户“请输入关键字搜索”*/
         if(!key){
             /*mui 消息提示*/
             mui.toast('请输入关键字');
             return false;
         }
         /*如果合法*/
         /*searchList.html?key=xxx*/
         console.log(key)
         location.href = '/biye/html/'+'searchList.html?key='+key;
        //  调用setLocalStorage，赋值
         setLocalStorage('demo', key);         
    });

    function setLocalStorage(key,val){
        window.localStorage.setItem(key,JSON.stringify(val));
    };
    //取
    // function getLocalStorage(key){
    //     let val = JSON.parse(window.localStorage.getItem(key));
    //     return val;
    // };
    //测试
    // setLocalStorage('demo',[1,2,3]);
    // let  a = getLocalStorage('demo');//[1,2,3]

 });
/**
 * Created by xx on 2017/3/14.
 */

$(function(){
   function resize(){
       var windowwidth=$(window).width();
       /*/!*也可以是$(window).width()来获取屏幕的宽度，并根据屏幕的大小来判断北京的图片，根据bootstrap*!/*/
       var issamllscreen=windowwidth<768;

       $('#main-ad> .carousel-inner> .item').each(function(index,item){
           var $item=$(item);/*/!*因为传的参数是dom对象，所以要转换为jQuery对象先*!/*/
           var imagesrc=issamllscreen ? $item.data('image-xs') : $item.data('image-lg');
           $item.css('backgroundImage','url("' + imagesrc + '")');
           if (issamllscreen) {
               $item.html('<img src="' + imagesrc + '" alt="" />');
           } else {
               $item.empty();
           }

       })
   }
    $(window).on('resize', resize).trigger('resize');
    $('[data-toggle="tooltip"]').tooltip();

    /*控制标签页的宽度*/

    var $ulContainer=$('.nav-tabs');
    /*获取所有子元素的宽度和*/
    var width=0;
    /*遍历子元素*/

    $ulContainer.children().each(function(index,ele){
        width+=ele.clientWidth;
    });
    /*这里要判断一下，手机里面是正常了，但是pc端有问题，如果超出就出现横向滚动条*/

    if(width>$(window).width()){
        $ulContainer.css('width',width).parent().css('overflow-x','scroll')
    }


    /*这下面的额代码是设置titlr的不同的属性值，这里相当的灵活*/
    var $newtitle=$('.news-title')
    $('#news .nav-pills a').on('click',function(){
        var $this=$(this)/*这里的意思dom对象。。是装换的为jquery对象，*/
        /*获取对应的tilte值；*/
        var title=$this.data('title');
        $newtitle.text(title)//要记住逻辑
    });



    /*手指的轮播图上面滑动的时候切换到下一张图片。 还要看手指的方向！在javascript组件下面去找carouse这一块的轮播图
     * 这个情况的相对于移动端来说的状况
     * 用原声生 的方法去获取：http://v3.bootcss.com/javascript/#carousel-methods
     * 移动端：touch
      * */
    /*第一步*    获取轮播的容器*/

    var $carousels=$('.carousel');
    /*注册滑动事件。是想左啊还是向右，那你怎么样判断呢；只要找到那个点的偏移量就可以了*/
    var startX,endX;
    var offset=50;
    $carousels.on('touchstart',function(e){
        /*第三部，手指触摸开始的时候记录手指所在的坐标，
        * 不能使用touchend
        * */
        startX=e.originalEvent.touches[0].clientX;
        //console.log(startX);
    })
    $carousels.on('touchmove',function(e){
        /*变量重复赋值*/
        endX=e.originalEvent.touches[0].clientX;
        console.log(endX);
    })
    $carousels.on('touchend',function(e){
        /*在结束触摸式的一瞬间  比较大小才是正确的做法*/
        console.log(endX);
        var distant=Math.abs(startX-endX);
        if(distant>offset){
            /*console.log(startX);根据或的方向选择上一张或者下一张*/
           // $carousels.carousel(startX>endX?'next':'prev');
            /*不然会出现多屏互动的效果*/
            $(this).carousel(startX>endX?'next':'prev')
        }

    })
})
/*
$(function() {
    // 当文档加载完成才会执行
    /!**
     * 根据屏幕宽度的变化决定轮播图片应该展示什么
     * @return {[type]} [description]
     *!/
    function resize() {
        // 获取屏幕宽度
        var windowWidth = $(window).width();
        // 判断屏幕属于大还是小
        var isSmallScreen = windowWidth < 768;
        // 根据大小为界面上的每一张轮播图设置背景
        // $('#main_ad > .carousel-inner > .item') // 获取到的是一个DOM数组（多个元素）
        $('#main-ad > .carousel-inner > .item').each(function(i, item) {
            // 因为拿到是DOM对象 需要转换
            var $item = $(item);
            // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            var imgSrc =
                isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

            // jQuery方式
            // $element.data()
            // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
            // 函数的参数是我们要取得属性名称（abc）
            //
            // $element.attr('data-abc')
            //
            // JS中的写法
            // element.dataset['abc']
            //
            // element.getAttribute('data-abc')
            // element.setAttribute('data-abc','')

            // 设置背景图片
            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            //
            // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="" />');
            } else {
                $item.empty();
            }
        });
    }
    // $(window).on('resize', resize);
    // // 让window对象立即触发一下resize
    // $(window).trigger('resize');


    $(window).on('resize', resize).trigger('resize');
});
*/

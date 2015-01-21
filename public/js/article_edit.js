$(function(){
     window.editor = new Simditor({
        textarea: $('#editor'),
        upload:{
            url: '/home/upload',
            params: {position:"article"},
            fileKey: 'upload_file',
            connectionCount: 3,
            leaveConfirm: '正在上传文件，如果离开上传会自动取消',
            pasteImage:true
        }
        
    });

    /**
     * 添加删除标签
     * @return {[type]} [description]
     */
    $(".chose-tag").on('click','.btn',function(){
        var tag = $(this).attr("data-tag");

        $(this).hasClass("btn-success") ? deRel(tag) : addRel(tag);

    })
    
    /**
     * 保存文章
     * @return {[type]} [description]
     */
    $("#save").click(function(){
        var form  = $("#form");
        var url = form.attr("action");
        
        var data = form.serializeArray();

        $.post(url,data,function(res){
            if(res.state){
                $("#tip").html('<span class="label label-danger">'+ res.msg +'</span>');
                return;
            }
            if(/add/i.test(url)){
                window.location.href = "/home?action=edit&aid=" + res.aid;
                return;
            }
            $("#tip").html('<span class="label label-success">'+ res.msg +'</span>');
        },"JSON")

    })

    /**
     * 添加新标签
     * @return {[type]} [description]
     */
    $("#addtag").click(function(){
        if(!window.aid)
            return;
        var input = $("input[name=tags]");
        var tags = $.trim(input.val());
        input.val("");
        $.post("/home/tag/add",{tags:tags,aid:window.aid},function(res){
            if(res.state){
                alert(res.msg)
                return;
            }
            var tag = res.data;
            $(".chose-tag").append('<a href="javascript:" data-tag="'+ tag +'"  class="btn btn-default">'+ tags +'</a>');
            addRel(tag);
        })
    })



    /**
     * 添加标签
     * @return {[type]} [description]
     */
    function addRel(tag){
        if(!window.aid)
            return ;

        $.getJSON("/home/tag/rel",{aid:aid,tag:tag},function(res){
            if(res.state){
                alert(res.msg)
                return ;
            }
            $(".chose-tag").find('a.btn[data-tag='+ tag +']').addClass("btn-success");
        })
    }
    /**
     * 删除标签
     * @param {[type]} tag [description]
     */
    function deRel(tag){
        if(!window.aid)
            return ;

        $.getJSON("/home/tag/unrel",{aid:aid,tag:tag},function(res){
            if(res.state){
                alert(res.msg)
                return ;
            }
            $(".chose-tag").find('a.btn[data-tag='+ tag +']').removeClass("btn-success");
        })
    }
});

$(function(){
    var aid = $("input[name=aid]").val()>>0;
    if(!aid)
        return;

    window.aid = aid;
    
    // $.getJSON("/home/article/tags",{aid:aid},function(res){
    //     var tagdiv = $(".chose-tag");
    //     res.forEach(function(t){
    //         tagdiv.find('a.btn[data-tid='+ t.tid +']').addClass("btn-success");
    //     })
    // })
})

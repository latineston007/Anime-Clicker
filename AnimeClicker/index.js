 
 $(document).ready(function()
 {
//////////////////////////////////// Model starts here \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var model=
{
    'anime'  :
        {
        'names'      :     ['name1','name2', 'name3'],
        'counts'     :     [0,0,0],
        'img'        :     ['contex/yo.jpg','contex/yo.jpg','contex/yo.jpg'],
        'index'      :     3,
        'current'    :     0,
        'adminView'  :     false
        }
};
//////////////////////////////////// View starts here \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var view = 
{
    init: function()
    {
        this.list  =    $('#list');
        this.boyd  =    $('#body');
        this.count =    $('#count');
        this.img   =    $('#img');
        this.name  =    $('#name');
        this.admin=    $('#btnAdmin');
        this.form  =    $('#form');
        this.textName=  $('#txtName');
        this.textImgurl=    $('#txtImgUrl');
        this.textClicks=$('#txtClicks');
        this.btnCansel =$('#btnCancel');
        this.btnSave = $('#btnSave');
        this.SetView();
        this.ImgView();
        this.btnSave.click(function(){controller.AdminSave()});
        this.img.click(function(){controller.ImgClick()});
        this.btnCansel.click(function(){ controller.AdminCansel()});
        this.admin.click(function()
        {
            let t =controller.GetModelAdminView();
            if(t)controller.SetModelAdminView(false);
            else controller.SetModelAdminView(true);
            view.AdminClear();
            view.AdminView(controller.GetModelAdminView());
        });
    },
    ListView: function()
    {
        $('li').each(function(index)
        {

            
            $(this).text(controller.GetModelName(index));
        })
    },
    SetView: function()
    {
        for(let i=0; i<controller.GetModelIndex(); i++)
        {
            var tmp= $('<li>'+controller.GetModelName(i)+'</li>');
            tmp.click(function(){controller.ListClick(i)});
            this.list.append(tmp);
        }
    },
    ImgView: function()
    {
        this.name.html(controller.GetModelName(controller.GetModelCurrent()));
        this.img.attr('src',controller.GetModelImg(controller.GetModelCurrent()));
        this.count.html( controller.GetModelCount(controller.GetModelCurrent()));

    },
    AdminClear: function()
    {
       this.textName.val('');
       this.textClicks.val('');
       this.textImgurl.val('');
       
       
        
    },
    AdminView: function(e)
    {
        if(e)
        {
             this.form.show();
        }
        else this.form.hide();
    },
   

};
//////////////////////////////////// Controller start here \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var controller=
{
    init: function()
    {
        view.init();
    },
    ListClick: function(e)
    {
      controller.SetModelCurrent(e);
        view.ImgView();
    },
    ImgClick: function()
    {
        model.anime.counts[model.anime.current]++;
        view.ImgView();
    },
    AdminCansel: function()
    {
        
        view.AdminClear();
        this.SetModelAdminView(false);
        view.AdminView(false);
    },
    AdminSave: function()
    {
        
        if(view.textName.val()!='') model.anime.names[model.anime.current]=view.textName.val();
        if(view.textImgurl.val()!='') model.anime.img[model.anime.current]=view.textImgurl.val();
        if(view.textClicks.val()!='') model.anime.counts[model.anime.current]=view.textClicks.val();
        view.ListView();
        view.AdminClear();
        this.SetModelAdminView(false);
        view.AdminView(false);
        view.ImgView();

    },
    GetModelIndex:   function(){return model.anime.index;},
    GetModelName:    function(e){return model.anime.names[e];},
    GetModelCount:   function(e){return model.anime.counts[e];},
    GetModelImg:     function(e){return model.anime.img[e];},
    GetModelCurrent: function(e){return model.anime.current;},
    GetModelAdminView: function(){return model.anime.adminView;},
    SetModelCurrent: function(e){ model.anime.current=e;},
    SetModelAdminView: function(e){ model.anime.adminView=e;}
    

}

//////////////////////////////////// End of document.ready  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
controller.init();
 });
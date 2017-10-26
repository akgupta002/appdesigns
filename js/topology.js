$(function(){
    // Topology tree
    $('.toggle-menu-btn').on('click',toggleMenuSidebar);

    $('.sidebar-nav').find('a').attr('title','Click to collapse');
    $('.sidebar-nav').find('a').on('click',showMenuTree);

    $('.input-text').blur(validateInput);

    $('#create-btn').on('click',createAccessGroup);

    $('#save-btn').on('click',updateAccessGroup);

    $('#remove-btn').on('click', confirmRemoval);

    $('.new-list-item').hover(function(){
        var $this = $(this);
        $this.find('.group-icons').addClass('in');
    },function(){
        var $this = $(this);
        $this.find('.group-icons').removeClass('in');
    });
    $('.new-group').on('click','span.glyphicon-pencil',editGroupName);
    $('.new-group').on('click','span.glyphicon-remove',removeGroup);

});
function removeGroup(){
    var $this = $(this);
    var $activeListItem = $this.closest('.new-list-item').addClass('active');
    var $modal = $('#modal-remove-group');
    $modal.modal('show');
}
function confirmRemoval(){
    var $this = $(this);
    var $newGroup = $('.new-group');
    var $activeListItem = $newGroup.find('.active');

    $activeListItem.removeClass('in').find('.group-name').empty();
    console.log('removed');
}
function updateAccessGroup(){
    var $this = $(this);
    var $container = $this.closest('.modal-content');
    var $newName = $container.find('.input-text').val();
    var $body = $this.closest("body");
    var $accessGroupList = $body.find('.new-group');
    var $activeListItem = $accessGroupList.find('.group-name');

    $activeListItem.html($newName);
}

function editGroupName(){
    var $this = $(this);
    var $parent = $this.closest('.new-list-item');
    var $oldGroupName = $parent.find('.group-name').html();
    var $modal = $('#modal-save-group');
    var $inputText = $modal.find('.input-text');
    var $savedValue = $inputText.val($oldGroupName);
    //Show modal
    $modal.closest('.modal').modal('show');
}

function createAccessGroup(){
    console.log('hi');
    var $this = $(this);
    var $container = $this.closest('.modal-content');
    var $error = $container.find('.error-text');
    var $newName = $container.find('.input-text').val();

    if(!$newName){
        $error.addClass("in");
        return;
    }

    var $body = $this.closest("body");
    var $sideBar = $body.find('.sidebar-nav');
    var $newList = $sideBar.find('.new-list-item');
    $newList.find('.group-name').html($newName).closest('.new-list-item').addClass('in');
}

function validateInput(){
    var $this = $(this);
    var $container = $this.closest('.modal-content');
    var $error = $container.find('.error-text');
    var $value = $this.val();

    if($value){
        $error.removeClass("in");
    }else{
        $error.addClass("in");
    }
}

function showMenuTree(){

    var $this = $(this);
    var $container = $this.closest('li');
    var $childNodes = $container.find('ul');

    $this.attr('title','Click to expand');
    $childNodes.toggle(200);
    $this.attr('title','Click to collapse');
}
function toggleMenuSidebar() {
    var $this = $(this);
    var $container = $this.closest('.container');
    var $toggleMenu = $container.find('.sidebar-nav');

    var isZero = $this.css('margin-left')>0+'px'? 1: 0;

    if(isZero){
        $this.animate({
            marginLeft: 0
        })
        $toggleMenu.animate({
            marginLeft: -250
        }).fadeOut(100);
    }else{
        $this.animate({
            marginLeft: 250
        })
        $toggleMenu.hide().show().animate({
            marginLeft: 0
        });
    }
}

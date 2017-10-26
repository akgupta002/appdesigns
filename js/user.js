//User.js
$(function(){
    $('.left-wrapper').on('click','.list-group-item',showSelected);
    $('.right-wrapper').on('click','.list-group-item',removeSelected);

    $('#user-next-btn').on('click',updateNavButtons);

    $('.caret').on('click',function(){
        var $this = $(this);
        var $container = $this.closest('a').data('toggle','collapse');
        var $allArrow = $container.find('.caret');

        if($this.hasClass('caret-right')){
            $allArrow.removeClass('caret-right');
        }else{
            $allArrow.addClass('caret-right');
        }
    });
});

function updateNavButtons(){
    var $this = $(this);
    console.log($this);
    var $modal = $('.create-user');
    var $contents = $modal.find('.modal-body');
    var $footer = $modal.find('.modal-footer');
    var totalTabs = $contents.find('.tab-pane').length;
    var $activeTab = $contents.find('.tab-pane.active');


}
function removeSelected(){
    var $this = $(this),
        $container = $this.closest('.list-group'),
        $parent = $this.closest('.right-wrapper'),
        $totalItems = $container.children().length,
        checkListItem = $container.has('.list-group-item') ? 1 : 0;

        //Check for no item remaining
        if($totalItems <= 1) {
            // when container is empty
            $container.append('<li class=instruction-text>No role assigned to this user.</li>');
        };

        //Get the target list group
        var $targetContainer = $this.closest('.tab-pane').find('.left-wrapper .list-group');

        //remove Remove icon
        $this.find('.pull-right').remove();
        $this.attr('title','Click to assign this role.');

        var checkInstruction = $targetContainer.find('.instruction-text') ? 1 : 0;

        if(checkInstruction){
            $targetContainer.find('.instruction-text').remove();
        };

        /*
        Append the clicked list-item to the target list-group
        after removing the instructions  and then add a remove Icon
        */
        $targetContainer.append($this);

        updateNavButtons();
}

function showSelected(){
    var $this = $(this),
        $container = $this.closest('.list-group'),
        $parent = $this.closest('.left-wrapper'),
        $totalItems = $container.children().length,
        checkListItem = $container.has('.list-group-item') ? 1 : 0;

    //Check for no item remaining
    if($totalItems <= 1) {
        // when container is empty
        console.log("All assigned!")
        $container.append('<li class=instruction-text>All roles assigned.</li>');
    };

    //Get the target list group
    var $targetContainer = $this.closest('.tab-pane').find('.right-wrapper .list-group');

    //Add remove icon
    var eleRemoveIcon = '<span class=pull-right><span class="glyphicon glyphicon-remove"></span></span>';

    // Update the list-item by appending remove Icon to this
    $this.append(eleRemoveIcon);

    // Update the list-item by replacing title content
    $this.attr('title','Click to remove this role.');

    var checkInstruction = $targetContainer.find('.instruction-text') ? 1 : 0;

    if(checkInstruction){
        $targetContainer.find('.instruction-text').remove();
    };

    /*
    Append the clicked list-item to the target list-group
    after removing the instructions  and then add a remove Icon
    */
    $targetContainer.append($this);

    updateNavButtons();

}

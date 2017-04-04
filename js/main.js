/*!
 * Perfect Pay UI Frame Work v1.0.0
*/

$(function () {

    $(".voucher").on('click',function(){
        var $this = $(this),
            $arrow = $this.find(".caret");

        if($arrow.hasClass("caret-right")){
            $arrow.removeClass("caret-right");
        } else {
            $arrow.addClass("caret-right");
        }

        $this.toggleClass("expanded");

    });

    $("#section-2").fadeToggle(100);

    $("#section-1 tr").on("click",function(){
        var $this = $(this);
        $this.closest("#section-1").fadeToggle(500,function(){
            $("#section-2").fadeToggle(400);
        });
    });
    $("#section-2 tr").on("click",function(){
        var $this = $(this);
        $this.closest("#section-2").fadeToggle(500,function(){
            $("#section-1").fadeToggle(400);
        });
    });

  // TOOLTIPS
  // ========

  $('[data-toggle=tooltip]').tooltip();

  // Make this clickable to open HTML page
  $('.clickable').on('click', function() {
      window.document.location = $(this).data("href");
  });

// DATETIME PICKER

// $('#start-time-picker, #stop-time-picker, #roll-time-picker').datetimepicker({
//     language: 'en',
//     pickDate: false,
//     pickSeconds: false,
//     pick12HourFormat: false
//   });
//
//   $('#gaming-day-picker').datetimepicker({
//     language: 'en',
//     pickTime: false,
//     format: "dd-MM-yyyy"
//   });
//
// $('#roll-time-picker-1,#roll-time-picker-2,#roll-time-picker-3,#roll-time-picker-4').datetimepicker({
//     language: 'en',
//     pickDate: false,
//     pickSeconds: false,
//     pick12HourFormat: false
//   });

  //TREEGRID
  //   $('.tree').treegrid();
    $('#checkbox0').on('click', toggleCheckboxActionsL0);
    $('#checkbox1').on('click', toggleCheckboxActionsL1);
    $('#checkbox2, #checkbox11').on('click', toggleCheckboxActionsL2);
    $('#checkbox3, #checkbox4').on('click', toggleCheckboxActionsL3);
    $('#checkbox5, #checkbox8').on('click', toggleCheckboxActionsL4);

    $('#create-role-btn').on('click',function(){
        var $this = $(this),
        $container = $this.closest('.form-group'),
        $target = $container.find('.role-inputs');
        $target.addClass('in').find('.input-text').focus();
        $this.addClass('disable');
    });
    $('#submit-role-btn').on('click',function(){
        var $this = $(this),
        $container = $this.closest('.form-group'),
        $inputs = $this.val()? 1 : 0;
        $container.find('.submit-role-btn').addClass('active');
    });
    $('#submit-role-btn').blur(function(){
        var $this = $(this),
        $container = $this.closest('.form-group'),
        $error = $container.find('.error-text'),
        $inputs = $this.val()? 1 : 0;

        if($inputs){
            $error.addClass('in');
            return;
        } else {
            $error.removeClass('in');
            $container.find('.submit-role-btn').removeClass('active');
        };

    });

    $('.view-topology-button').on('click',function(){

        var $this = $(this);
        var $target = $('.view-tree-block');
        var isVisible = $target.hasClass('in');

        if(isVisible){
            $target.removeClass('in');
        }else{
            $target.addClass('in');
        }
    });
    //

});



function toggleCheckboxActionsL0() {
    var $this               = $(this);
    var $thisTable          = $this.closest(".tree");
    $thisTable.find(".table-action-checkbox").prop('checked', this.checked);
}

function toggleCheckboxActionsL1(){
    var $this               = $(this);
    var $thisTable          = $this.closest(".tree");
    var $thisRow    = $this.closest("tr");
    var treegridRows   = $thisTable.find("tbody > tr");
    if($thisRow.hasClass("treegrid-expanded")||$thisRow.hasClass("treegrid-collapsed")){
        treegridRows.find(".table-action-checkbox").prop('checked', this.checked);
    }else{
        $(this).prop('checked', this.checked);
    }
}
function toggleCheckboxActionsL2(){
    var $this               = $(this);
    var $thisTable          = $this.closest(".tree");
    var $thisRow    = $this.closest("tr");
    var treegridRows   = $thisTable.find("tbody > tr");
    if($thisRow.hasClass("treegrid-expanded")||$thisRow.hasClass("treegrid-collapsed")){
        treegridRows.find(".table-action-checkbox").prop('checked', this.checked);
        $('#checkbox1, #checkbox11').prop('checked', false);
    }else{
        $(this).prop('checked', this.checked);
    }
}
function toggleCheckboxActionsL3(){
    var $this               = $(this);
    var $thisTable          = $this.closest(".tree");
    var $thisRow    = $this.closest("tr");
    var treegridRows   = $thisTable.find("tbody > tr");
    if($thisRow.hasClass("treegrid-expanded")||$thisRow.hasClass("treegrid-collapsed")){
        treegridRows.find(".table-action-checkbox").prop('checked', this.checked);
        $('#checkbox1,#checkbox2,#checkbox3,#checkbox11').prop('checked', false);
    }else{
        $(this).prop('checked', this.checked);
    }
}
function toggleCheckboxActionsL4(){
    var $this        = $(this);
    var $thisTable   = $this.closest(".tree");
    var $thisRow    = $this.closest("tr");
    var treegridRows   = $thisTable.find("tbody > tr");
    if($thisRow.hasClass("treegrid-expanded")||$thisRow.hasClass("treegrid-collapsed")){
        if($this.attr("id")=="checkbox5"){
            $('#checkbox5,#checkbox6,#checkbox7').prop('checked', this.checked);
        }
        if($this.attr("id")=="checkbox8"){
            $('#checkbox8,#checkbox9,#checkbox10').prop('checked', this.checked);
        }
    }else{
        $(this).prop('checked', this.checked);
    }
}


function checkRowExpansion(){

    var $this               = $(this);
    var $thisTable          = $this.closest(".tree");
    var $thisRow            = $this.closest("tr");
    var $thisParentRowId    = $thisRow.treegrid('getParentNodeId');

    var $thisRowId          = $this.closest("tr").treegrid('getNodeId');

    var isRowExpanded       = $thisRow.hasClass("treegrid-expanded");

        if(!isRowExpanded){
            //find all checkboxes in this hierarchy
            //find the child node id
            var childNodeId = $thisRowId;

            //search for 'treegrid-parent-nodeId' class
            var childRows = $thisTable.find(".treegrid-parent-"+childNodeId);

            //find child checkboxes and check them
            childRows.find(".table-action-checkbox").prop('checked', this.checked);

        }else{

            //find its treegrid-id
            var $thisRowId = $this.closest("tr").treegrid('getNodeId');

            //search for 'treegrid-parent-nodeId' class
            var childRows = $thisTable.find(".treegrid-parent-"+$thisRowId);

            //find child checkboxes and check them
            childRows.find(".table-action-checkbox").prop('checked', this.checked);
        }
    }

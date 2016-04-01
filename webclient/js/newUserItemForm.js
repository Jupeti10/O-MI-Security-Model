// Generated by CoffeeScript 1.10.0
(function() {
  (function(consts, requests, omi) {
    var cloneAbove, createTimestampPicker, findDuplicate, getGroups, notifyErrorOn, readValues, resetInfoItemForm, updateOdf;
    var groupUnderEdit;

    notifyErrorOn = function(jqElement, errorMsg) {
      return jqElement.tooltip({
        placement: "top",
        title: errorMsg
      }).focus().on('input', function() {
        return $(this).tooltip('destroy').closest('.form-group').removeClass('has-error');
      }).closest('.form-group').addClass('has-error');
    };
    consts.afterJquery(function() {
      consts.userItemDialog = $('#newUserItem');
      consts.userItemForm = consts.userItemDialog.find('form');
      consts.originalUserItemForm = consts.userItemForm.clone();
      consts.userItemDialog.on('hide.bs.modal', function() {
        return resetUserItemForm();
      });
      // $('#newUserItem').on('show.bs.modal', function (event) {
      //   var button = $(event.relatedTarget);
      //   var action = button.data('action');
      //
      //   if (action == "edit") {
      //
      //     $("#newGroupItemLabel").text("Edit Group");
      //     var selectedGroup = $("#groupsSelect").chosen().val();
      //     var currentGroups = WebOmi.formLogic.readedGroups['groups'];
      //     if (currentGroups != null) {
      //       for (var i=0;i<currentGroups.length;i++) {
      //         // console.log("Cur[i]:"+currentGroups[i].id +"/Sel:"+selectedGroup);
      //         if (currentGroups[i].id == selectedGroup) {
      //           groupUnderEdit = currentGroups[i];
      //
      //           console.log("Selected group:"+JSON.stringify(groupUnderEdit));
      //
      //           $("#groupItemName").val(groupUnderEdit.name);
      //           $("#addUsersSelect").val(groupUnderEdit.values).trigger("chosen:updated");
      //           break;
      //         }
      //       }
      //     }
      //   } else {
      //     $("#newGroupItemLabel").text("New Group");
      //   }
      // });
      //resetGroupItemForm();
      consts.userItemDialog.find('#newUserItemSubmit').on('click', function() {
        var infoitemData;
        infoitemData = readValues();
        return updateUsers(infoitemData);
      });
    });

    readValues = function() {
      var results = {};
      results["username"] = $("#userItemName").val();
      results["email"] = $("#userItemEmail").val();
      return results;
    };

    updateUsers= function(newUserItem) {
      // if (newUserItem["name"].length < 1)
      // {
      //   notifyErrorOn($('#groupItemName'),"Wrong name for new group");
      // } else {

        WebOmi.formLogic.updateUsers(newUserItem, function(err) {

          if (err == null) {
            consts.userItemDialog.modal('hide');
          } else {

            var field,msg;

            if (err['type'] == 'name') {
              field = '#userItemName';
            } else {
              field = '#userItemEmail';
            }
            msg = err['msg'];

            notifyErrorOn($(field), msg);
          }

        });
      // }
    };
    return resetUserItemForm = function() {
      $('#userItemName').val('');
      $('#userItemEmail').val('');

    };
  })(WebOmi.consts, WebOmi.requests, WebOmi.omi);

}).call(this);

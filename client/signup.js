import { Template } from 'meteor/templating';

import './signup.html'

Template.signup.onCreated(function signupOnCreated() {
  AccountsTemplates.setState('signUp');
});

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true,
  func: function(value){
    if (Meteor.isClient) {
      console.log("Validating username...");
      var self = this;
      Meteor.call("userExists", value, function(err, userExists){
        if (!userExists)
        self.setSuccess();
        else
        self.setError(userExists);
        self.setValidating(false);
      });
      return;
    }
    // Server
    return Meteor.call("userExists", value);
  },
});
function moveFieldBefore(fieldName, referenceFieldName) {
  var fieldIds = AccountsTemplates.getFieldIds();
  var refFieldId = _.indexOf(fieldIds, referenceFieldName);
  // In case the reference field is not present, just return...
  if (refFieldId === -1) {
    return;
  }
  var fieldId = _.indexOf(fieldIds, fieldName);
  // In case the sought field is not present, just return...
  if (fieldId === -1) {
    return;
  }

  if (fieldId !== -1 && fieldId !== (refFieldId - 1)) {

    var field = AccountsTemplates._fields.splice(fieldId, 1)[0];
    // push the field right after the reference field position
    var newFieldIds = AccountsTemplates.getFieldIds();
    var newReferenceFieldId = _.indexOf(newFieldIds, referenceFieldName);
    AccountsTemplates._fields.splice(newReferenceFieldId, 0, field);
  }
};
moveFieldBefore("username", "email");

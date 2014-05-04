define('taskFormView', ['marionette', 'TaskModel', 'eventBus'], function (Marionette, TaskModel, eventBus) {
    var taskFormView = Marionette.ItemView.extend({
        template: JST["taskForm.html"],
        onBeforeRender: function () {
            if (!this.model) {
                this.model = new TaskModel();
            }
        },
        serializeData: function(){
            var data = this.model.toJSON();
            data.possibleStatuses = this.model.getPossibleStatuses();

            return data;
        },
        events: {
            'click .save': 'save',
            'click .cancel': 'cancel'
        },
        onRender: function(){
            this.$el.find('[name=state]').val(this.model.get('state'));
        },
        getFormData: function(){
            var attributes = {};
            var keys = _.keys(this.model.toJSON());
            var that = this;
            _.each(keys, function(key, num){
                var $fieldEl = that.$el.find('[name='+key + "]");
                if($fieldEl.length){
                    attributes[key] = $fieldEl.val();
                }
            });

            return attributes;
        },
        'save': function () {
            var formData = this.getFormData();
            var errorMsg;

            if (errorMsg = this.model.validate(formData)) {
                this.$el.find('.message').text(errorMsg);
            } else {
                this.stopListening(eventBus, 'task-saved')
                    .listenToOnce(eventBus, 'task-saved',  _.bind(this.cancel, this));

                this.model.set(formData);
                eventBus.trigger('saveTask', this.model.toJSON());
            }
        },
        cancel: function(){
            this.remove();
        }
    });

    return taskFormView;
});
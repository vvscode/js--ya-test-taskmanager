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
            var keys = _.keys(this.model.toJSON());
            _.each(keys, _.bind(function(key, num){
                var $fieldEl = this.$el.find('[name='+key + "]");
                if($fieldEl.length){
                    this.model.set(key, $fieldEl.val());
                }
            }, this));
        },
        'save': function () {
            this.getFormData();
            if (this.model.isValid()) {
                eventBus.trigger('saveTask', this.model.toJSON());
                this.cancel();
            } else {
                this.$el.find('.message').text(this.model.validationError);
            }
        },
        cancel: function(){
            this.remove();
        }
    });

    return taskFormView;
});
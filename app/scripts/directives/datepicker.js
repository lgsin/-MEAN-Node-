angular.module('directives', [])
  .directive('datepicker', function() {
    return {
      // Enforce the angularJS default of restricting the directive to
      // attributes only
      restrict: 'A',
      // Always use along with an ng-model
      require: '?ngModel',
      // This method needs to be defined and passed in from the
      // passed in to the directive from the view controller
      scope: {
        select: '&'        // Bind the select function we refer to the right scope
      },
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        var optionsObj = {};
        optionsObj = {  
          prevText: '前一月',  
          nextText: '后一月',  
          yearSuffix: '年',  
          dateFormat: "yy/mm/dd",  
          showMonthAfterYear: true,  
          dayNamesMin: ['日','一','二','三','四','五','六'],  
          monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
        var updateModel = function(dateTxt) {
          scope.$apply(function () {
            // Call the internal AngularJS helper to
            // update the two way binding
            ngModel.$setViewValue(dateTxt);
          });
        };

        optionsObj.onSelect = function(dateTxt, picker) {
          updateModel(dateTxt);
          if (scope.select) {
            scope.$apply(function() {
              scope.select({date: dateTxt});
            });
          }
        };

        ngModel.$render = function() {
          // Use the AngularJS internal 'binding-specific' variable
          element.datepicker('setDate', ngModel.$viewValue || '');
        };
        element.datepicker(optionsObj);
      }
    };
  });
